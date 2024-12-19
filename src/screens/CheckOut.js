import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import VoucherModal from '../components/VoucherModal';
import ShippingAddressModal from '../components/ShippingAddressModal';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext'; // Import the AuthContext
import formatCurrency from '../../utils/formatCurrency';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = ({route}) => {
  const navigation = useNavigation();
  const [shippingOption, setShippingOption] = useState('Standard');
  const [isShippingModalVisible, setShippingModalVisible] = useState(false);
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(address);

  const {address} =  useContext(AuthContext)

  const { selectedCartItems } = route.params; // Get selected items from route params

  // Lọc địa chỉ mặc định khi component mount hoặc khi danh sách address thay đổi
  useEffect(() => {
    const defaultAddress = address.find((addr) => addr.isDefault);
    setShippingAddress(defaultAddress || null); // Nếu không có địa chỉ mặc định, set null
  }, [address]);

  console.log(address)

  useEffect(() => {
    navigation.getParent()?.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  const vouchers = [
    { id: '1', title: 'First Purchase', discount: 5, expiry: '2024-12-31' },
    { id: '2', title: 'Gift From Customer Care', discount: 15, expiry: '2025-01-15' },
  ];

  const calculateTotal = () => {
    const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = appliedVoucher ? (subtotal * appliedVoucher.discount) / 100 : 0;
    return (subtotal - discount).toFixed(2);
  };

  const saveShippingAddress = (address) => {
    setShippingAddress(address);
  };

  const applyVoucher = (voucher) => {
    setAppliedVoucher(voucher);
    setVoucherModalVisible(false); // Close the modal after applying the voucher
  };

  // Function to handle the "Pay" button click
  const handlePayment = async () => {
    const orderData = {
      items: selectedCartItems.map((item) => ({
        productId: item.productId,
        sku: item.variation.sku,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
      })),
      shippingAddress: {
        detailAddress: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.country}`,
      },
      paymentMethod: 'credit card', // Assuming the user selected "credit card" for payment method
    };

    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ orderData }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Order Created', 'Your order has been placed successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Order Error', result.message || 'There was an error creating your order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert('Order Error', 'An error occurred while processing your order');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 1 }}>
            <Ionicons name='arrow-back' size={30} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Payment</Text>
        </View>

         {/* Shipping Address */}
         <View style={styles.section}>
          <View style={styles.row}>
            <View style={{ width: '90%', flex: 0.9 }}>
              <Text style={styles.sectionTitle}>Địa Chỉ Giao Hàng</Text>
              {shippingAddress ? (
                <>
                  <Text style={styles.addressText}>{shippingAddress.name}</Text>
                  <Text style={styles.addressText}>{shippingAddress.phoneNumber}</Text>
                  <Text style={styles.addressText}>
                    {shippingAddress.addressLine}, {shippingAddress.ward}, {shippingAddress.city}, {shippingAddress.country}
                  </Text>
                </>
              ) : (
                <Text style={styles.noAddressText}>Vui lòng chọn địa chỉ giao hàng</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('AddressSelection')}
            >
              <Ionicons name="pencil" size={24} color="#F83758" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Items</Text>
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: 'red', borderRadius: 10, padding: 7 }}
              onPress={() => setVoucherModalVisible(true)} // Open Voucher Modal
            >
              <Text style={styles.addVoucher}>Add Voucher</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedCartItems} // Use cart data from route params
            renderItem={({ item }) => {
              const itemTotalPrice = item.price * item.quantity;
              return (
                <View style={styles.itemRow}>
                  <Image
                    source={{ uri: item?.variation?.images[0] }} // Image URL
                    style={styles.itemImage}
                    onError={() => console.log('Image failed to load')} // Error logging for the image
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.productName}</Text>
                    <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                  </View>
                  <View style={styles.itemQuantity}>
                    <Text style={styles.quantityText}>x{item.quantity}</Text>
                    <Text style={styles.totalPriceText}>Total: {formatCurrency(itemTotalPrice)}</Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Applied Voucher */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Applied Voucher</Text>
          {appliedVoucher ? (
            <Text style={styles.appliedVoucherText}>
              {appliedVoucher.title} - {appliedVoucher.discount}% off
            </Text>
          ) : (
            <Text style={styles.noVoucherText}>No voucher applied</Text>
          )}
        </View>

        {/* Total and Pay Button */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: {formatCurrency(calculateTotal())}</Text>
          <TouchableOpacity
            style={[styles.payButton, { backgroundColor: selectedCartItems.length > 0 ? '#F83758' : '#ccc' }]}
            onPress={selectedCartItems.length > 0 ? handlePayment : null}
            disabled={selectedCartItems.length === 0}
          >
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Voucher Modal */}
      <VoucherModal 
        visible={isVoucherModalVisible} 
        vouchers={vouchers} 
        onApply={applyVoucher} 
        onClose={() => setVoucherModalVisible(false)}
      />
      {/* Shipping Address Modal */}
      <ShippingAddressModal
        visible={isShippingModalVisible}
        onClose={() => setShippingModalVisible(false)}
        address={shippingAddress}
        onSave={saveShippingAddress}
      /> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#555',
  },
  addVoucher: {
    color: '#F83758',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 10,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemQuantity: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalPriceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F83758',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  payButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  appliedVoucherText: {
    fontSize: 16,
    color: '#333',
  },
  noVoucherText: {
    fontSize: 14,
    color: '#888',
  },
  noAddressText: {
    fontSize: 14,
    color: '#888',
  },
});

export default Checkout;
