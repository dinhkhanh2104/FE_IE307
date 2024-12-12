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
import { COLORS } from '../constants/theme'; // Ensure COLORS is correctly imported
import Ionicons from '@expo/vector-icons/Ionicons';

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
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={styles.address}>
              26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh City
            </Text>
            <TouchableOpacity style={styles.editIconContainer}>
              <Ionicons
                name="pencil-sharp"
                color="#fff"
                size={20} // Adjust icon size as per your preference
              />
            </TouchableOpacity>
          </View>
        </View>


        {/* Cart Items */}
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{justifyContent:'space-between', flex:0.8}}>
                <Text style={styles.title}>
                {item.title}
                </Text>
                <Text style={styles.subtitle}>
                  {`${item.color}, Size ${item.size}`}
                </Text>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.controlButtonContainer}>
                      <Text style={styles.controlButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.controlButtonContainer}>
                      <Text style={styles.controlButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash-bin-outline" style={styles.deleteButton}></Ionicons>
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
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{`${item.color}, Size ${item.size}`}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
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
    padding:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    margin:10,
    borderRadius: 8,
    marginBottom: 16,
  },
  addressTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  address: {
    flex: 1, // Takes available space
    fontSize: 14,
    color: '#000',
  },
  editIconContainer: {
    backgroundColor: 'blue',
    borderRadius: 17,
    padding:5, // Circular shape
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16, // Space between address and icon
  },
  cartList: {
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal:10
  },
  image: {
    width: 110,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  controlButtonContainer: {
    paddingHorizontal: 8,

  },
  controlButton: {
    fontSize: 20,
    color: COLORS.primary || '#007bff',
    fontWeight: '600',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  deleteButton: {
    fontSize: 20,
    color: 'red',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
