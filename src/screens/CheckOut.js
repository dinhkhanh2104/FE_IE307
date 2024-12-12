import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import VoucherModal from '../components/VoucherModal';
import ShippingAddressModal from '../components/ShippingAddressModal';
import { useNavigation } from '@react-navigation/native';

const Checkout = () => {
  const navigation = useNavigation()
  const [shippingOption, setShippingOption] = useState('Standard');
  const [isShippingModalVisible, setShippingModalVisible] = useState(false);
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const vouchers = [
    { id: '1', title: 'First Purchase', discount: 5, expiry: '2024-12-31' },
    { id: '2', title: 'Gift From Customer Care', discount: 15, expiry: '2025-01-15' },
  ];

  const cartItems = [
    {
      id: '1',
      image: 'https://vcdn1-vnexpress.vnecdn.net/2022/04/14/SYM-Elegant-110-8477-1649899780.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=YNO52FgeSHMXgU8q-JWBIQ',
      title: 'Lorem ipsum dolor sit amet consectetuer.',
      price: 17.0,
      quantity: 1,
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/80',
      title: 'Lorem ipsum dolor sit amet consectetuer.',
      price: 17.0,
      quantity: 1,
    },
  ];

  const [shippingAddress, setShippingAddress] = useState({
    country: 'India',
    street: '26, Duong So 2, Thao Dien Ward, An Phu',
    city: 'Ho Chi Minh City',
    postcode: '70000',
  });

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
            <View style={{ width: "90%", flex: 0.9 }}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>
              <Text style={styles.addressText}>
                26, Duong So 2, Thao Dien Ward, An Phu, District 2, Ho Chi Minh City
              </Text>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => setShippingModalVisible(true)}>
              <Ionicons name="pencil" size={24} color="#F83758" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <Text style={styles.contactText}>+84932000000</Text>
              <Text style={styles.contactText}>amandamorgan@example.com</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="pencil" size={24} color="#F83758" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Items</Text>
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: "red", borderRadius: 10, padding: 7 }}
              onPress={() => setVoucherModalVisible(true)} // Open Voucher Modal
            >
              <Text style={styles.addVoucher}>Add Voucher</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
            )}
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
          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          <TouchableOpacity style={styles.payButton}>
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
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    marginTop:StatusBar.currentHeight
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
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
    paddingHorizontal:10
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
    padding:10,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
  },
  shippingOptionSelected: {
    backgroundColor: '#FDE3E9',
  },
  shippingText: {
    fontSize: 14,
    marginLeft: 8,
  },
  shippingSubtext: {
    flex: 1,
    fontSize: 12,
    color: '#888',
    marginLeft: 16,
  },
  shippingPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight:10
  },
  deliveryInfo: {
    fontSize: 12,
    color: '#555',
    marginTop: 8,
  },
  paymentMethod: {
    paddingVertical: 12,
    backgroundColor: '#FDE3E9',
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  paymentText: {
    fontSize: 14,
    fontWeight: 'bold',
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
    backgroundColor: '#F83758',
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
    borderRadius: 20, // Thêm bo tròn cho icon button
    backgroundColor: '#f0f0f0', // Thêm nền sáng cho icon button
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  voucherCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voucherTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  voucherDiscount: {
    fontSize: 14,
    color: '#555',
  },
  voucherExpiry: {
    fontSize: 12,
    color: '#888',
  },
  applyText: {
    color: '#F83758',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#F83758',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  appliedVoucherText: {
    fontSize: 16,
    color: '#333',
  },
  noVoucherText: {
    fontSize: 14,
    color: '#888',
  },
});

export default Checkout;
