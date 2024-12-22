import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import CardWishList from '../components/CardWishList';
import AuthContext from '../contexts/AuthContext';
import formatCurrency from '../../utils/formatCurrency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Cart = ({ navigation }) => {
  const { cart, setCart ,fetchCart} = useContext(AuthContext); // Access cart from context and setCart to update it
  const [cartItems, setCartItems] = useState(cart); // Local state to manage UI
  const [selectedItems, setSelectedItems] = useState(new Set()); // Track selected items

  const { wishlist } = useContext(AuthContext);


  const updateCart = async (sku, quantity, productId) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          sku,
          quantity,
          productId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart.items);
        setCartItems(data.cart.items);  // Update cart items locally for UI
      } else {
        console.error('Failed to update cart:', response);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const delCart = async (sku, productId) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          sku,
          productId,
        }),
      });

      let del = []
      if (response.ok) {
        del = await fetchCart();
      } else {
        console.error('Failed to delete cart item:', response);
      }
      setCartItems(del); // Update local cart state
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  // Increment Quantity
  const incrementQuantity = async (productId, itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.variation.sku === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    const updatedItem = updatedCartItems.find((item) => item.variation.sku === itemId);
    await updateCart(itemId, updatedItem.quantity, productId); // Update the cart on the server
  };

  // Decrement Quantity
  const decrementQuantity = async (productId, itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.variation.sku === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updatedCartItems); // Update local cart state immediately

    const updatedItem = updatedCartItems.find((item) => item.variation.sku === itemId);
    await updateCart(itemId, updatedItem.quantity, productId); // Update the cart on the server
  };

  // Toggle selection for cart item
  const toggleSelection = (sku) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(sku)) {
      newSelectedItems.delete(sku);
    } else {
      newSelectedItems.add(sku);
    }
    setSelectedItems(newSelectedItems);
  };

  // Calculate Total Price for selected items
  const calculateTotal = () =>
    cartItems
      .filter(item => selectedItems.has(item.variation.sku))
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

  // Navigate to Checkout with selected items
  const handleNavigateCheckOut = () => {
    const selectedCartItems = cartItems.filter(item => selectedItems.has(item.variation.sku));
    navigation.navigate('Checkout', { selectedCartItems });
    // console.log(selectedCartItems)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 5 }}>
              <Icon name="arrow-back" size={30} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.heading}>Cart</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          </View>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={cartItems}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <TouchableOpacity
                    style={styles.selectionButton}
                    onPress={() => toggleSelection(item.variation.sku)}
                  >
                    <Ionicons
                      name={selectedItems.has(item.variation.sku) ? "checkbox" : "square-outline"}
                      size={24}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                  <Image source={{ uri: item.variation.images[0] }} style={styles.image} />

                  <View style={styles.itemDetails}>
                    <TouchableOpacity
                      onPress={() => delCart(item.variation.sku, item.productId)} // Remove item
                      style={styles.deleteButton}
                    >
                      <MaterialIcons name="cancel" size={30} color="red" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{item.productName}</Text>
                    <Text style={styles.subtitle}>
                      {`Màu: ${item.variation.attributes[0].values[0]}`}
                    </Text>
                    <View style={styles.itemFooter}>
                      <Text style={styles.price}>{formatCurrency(item.price)}</Text>
                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          onPress={() => decrementQuantity(item.productId, item.variation.sku)}
                          style={styles.controlButtonContainer}
                        >
                          <AntDesign name="minuscircle" size={24} color={"#333"} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => incrementQuantity(item.productId, item.variation.sku)}
                          style={styles.controlButtonContainer}
                        >
                          <AntDesign name="pluscircle" size={24} color={"#333"} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.variation.sku}
              style={styles.cartList}
            />
          ) : (
            <View style={styles.iconContainer}>
              <Ionicons name="bag-add-sharp" size={80} color={COLORS.primary} style={styles.iconStyle} />
            </View>
          )}

         
         
        </ScrollView>

        {/* Fixed Total and Checkout */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: {formatCurrency(calculateTotal())}</Text>
          {selectedItems.size > 0 ? (
            <TouchableOpacity style={styles.checkoutButton} onPress={handleNavigateCheckOut}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.checkoutButtonNone} disabled>
              <Text style={styles.checkoutTextNone}>Checkout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight + 5 || 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  badge: {
    marginLeft: 8,
    backgroundColor: '#E5EBFC',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primary,
  },
  cartList: {
    marginBottom: 16,
  },
  scrollViewContent: {
    position: "relative",
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    padding: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  controlButton: {
    fontSize: 19,
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: "gray",
  },
  quantity: {
    fontSize: 13,
    fontWeight: '500',
    backgroundColor: '#333',
    lineHeight: 32,
    width: 37,
    textAlign: 'center',
    borderRadius: 6,
    color: "white"
  },
  deleteButton: {
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#D74A4A',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 8,
    color: '#333',
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutButtonNone: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutTextNone: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    marginVertical: 80,
  },
  iconStyle: {
    borderRadius: 80,
    backgroundColor: '#fff',
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  selectionButton: {
    marginHorizontal: 10,
  },

});

export default Cart;
