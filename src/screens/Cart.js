import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import CardWishList from '../components/CardWishList';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      image: 'https://via.placeholder.com/80',
      title: 'Lorem ipsum dolor sit amet consectetuer.',
      price: 17.0,
      quantity: 1,
      size: 'M',
      color: 'Pink',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/80',
      title: 'Lorem ipsum dolor sit amet consectetuer.',
      price: 17.0,
      quantity: 1,
      size: 'M',
      color: 'Pink',
    },
  ]);

  const [wishlistItems] = useState([
    {
      id: '3',
      image: 'https://via.placeholder.com/80',
      title: 'Lorem ipsum dolor sit amet consectetuer.',
      price: 17.0,
      size: 'M',
      color: 'Pink',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/80',
      title: 'Lorem ipsum dolor sit amet consectetuer.',
      price: 17.0,
      size: 'M',
      color: 'Pink',
    },
  ]);

  const incrementQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () =>
    cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.heading}>Cart</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          </View>

          {/* Shipping Address */}
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Shipping Address</Text>
            <View style={styles.addressRow}>
              <Text style={styles.address}>
                26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh City
              </Text>
              <TouchableOpacity style={styles.editIconContainer}>
                <Ionicons name="pencil-sharp" color="#fff" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Cart Items */}
          {
             cartItems.length > 0 ? 
             <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <TouchableOpacity style={
                  {
                    position: "absolute", bottom: 10, left: 10, backgroundColor: "white", borderRadius: 999,
                    width: 40, height: 40, justifyContent: "center", alignItems: "center"
                  }}>
                  <Ionicons name="trash-outline" size={26} color={COLORS.primary} />
                </TouchableOpacity>
                <View style={styles.itemDetails}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{`${item.color}, Size ${item.size}`}</Text>
                  <View style={styles.itemFooter}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        onPress={() => decrementQuantity(item.id)}
                        style={styles.controlButtonContainer}
                      >
                        <Text style={styles.controlButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => incrementQuantity(item.id)}
                        style={styles.controlButtonContainer}
                      >
                        <Text style={styles.controlButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={styles.cartList}
          />  : 
          <View style={styles.iconContainer}>
            <Ionicons
              name="bag-add-sharp"
              size={80}
              color="#004CFF"
              style={styles.iconStyle}
            />
          </View>
        
          }

          {/* Wishlist Section */}
          <Text style={styles.sectionTitle}>From Your Wishlist</Text>
          <FlatList
            data={wishlistItems}
            renderItem={({ item }) => (
              <View style={{ margin: 16 }}>
                <CardWishList />
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={styles.cartList}
          />
        </ScrollView>

        {/* Fixed Total and Checkout */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          { cartItems.length > 0 ? 
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity style={styles.checkoutButtonNone} disabled>
              <Text style={styles.checkoutTextNone}>Checkout</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  badge: {
    marginLeft: 8,
    backgroundColor: "#E5EBFC",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  addressTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  editIconContainer: {
    backgroundColor: '#004BFE',
    borderRadius: 17.5,
    padding: 5,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  cartList: {
    marginBottom: 16,
  },
  scrollViewContent: {
    paddingBottom: 100, // Prevent overlap
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 1,  // Add border
    borderColor: '#ddd', // Light gray border
    borderRadius: 8, // Rounded corners
    backgroundColor: '#fff', // Set a background color
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow direction
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 2, // For Android shadow
    padding:5
  },
  image: {
    width: 160,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
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
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#004BFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  controlButton: {
    fontSize: 16,
    color: '#004BFE',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#E5EBFC',
    lineHeight: 32,
    width: 37,
    textAlign: 'center',
    borderRadius: 6,
  },
  deleteButton: {
    fontSize: 20,
    fontWeight: 700,
    color: '#D97474',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 8,
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
    flexDirection:'row',
    justifyContent:'space-between',
    gap:10
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center',
    justifyContent:'center'
  },
  checkoutButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutButtonNone: {
    backgroundColor: '#fff',
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
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    flex: 1,
    padding:10,
    marginVertical:80
  },
  iconStyle: {
    borderRadius: 80, // Half of the size to make it circular
    borderWidth: 0,
    borderColor: '#ddd', // Light gray border
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.3, // Shadow transparency
    shadowRadius: 6, // Shadow blur
    elevation: 4, // For Android shadow
    backgroundColor: '#fff', // Background for the icon
    padding: 40, // Optional padding for inner spacing
  },
});

export default Cart;
