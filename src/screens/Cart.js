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
      <ScrollView>
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
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
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
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash-bin-outline" style={styles.deleteButton} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.cartList}
        />

        {/* Wishlist Section */}
        <Text style={styles.sectionTitle}>From Your Wishlist</Text>
        <FlatList
          data={wishlistItems}
          renderItem={({ item }) => (
            <View style={{margin:10}}>
              <CardWishList/>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.cartList}
        />

        {/* Total and Checkout */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: COLORS.lightGray || '#f5f5f5',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressContainer: {
    backgroundColor: '#f5f5f5',
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
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  image: {
    width: 130,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
    padding:10,
    backgroundColor:'red',
    shadowColor:'#ccc'
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
    lineHeight:32,
    width:37,
    textAlign:'center',
    borderRadius:6
  },   
  deleteButton: {
    fontSize: 20,
    color: '#D97474',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
