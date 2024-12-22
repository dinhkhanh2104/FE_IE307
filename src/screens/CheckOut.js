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
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import VoucherModal from '../components/VoucherModal';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';
import formatCurrency from '../../utils/formatCurrency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Thêm trạng thái phương thức thanh toán
  const { address, fetchCart } = useContext(AuthContext);
  const { selectedCartItems } = route.params;


  const [isPayPalVisible, setPayPalVisible] = useState(true);
  const [orderID, setOrderID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lọc địa chỉ mặc định khi component mount hoặc khi danh sách address thay đổi
  useEffect(() => {
    const defaultAddress = address.find((addr) => addr.isDefault);
    setShippingAddress(defaultAddress || null);
    fetchDiscounts();
  }, [address]);

  useEffect(() => {
    if (orderID) {
      setPayPalVisible(true);  // Show PayPal WebView only when orderID is set
    }
  }, [orderID]);  // Effect runs when orderID changes

  const fetchDiscounts = async () => {
    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/discount/valid');
      const data = await response.json();

      if (response.ok) {
        setDiscounts(data.data);
      } else {
        console.error('Error fetching discounts:', data.message);
        setDiscounts([]);
      }
    } catch (error) {
      console.error('Error fetching discounts:', error);
      setDiscounts([]);
    }
  };

  const applyDiscount = async (code) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/discount/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ discountCode: code, cartTotal: calculateSubtotal() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAppliedVoucher({
          code: code,
          discountAmount: data.discountAmount,
          newTotal: data.newTotal,
        }); // Lưu thông tin discount đã áp dụng
        Alert.alert('Thành công', data.message || 'Voucher đã được áp dụng');
      } else {
        Alert.alert('Lỗi', data.message || 'Không thể áp dụng voucher');
      }
    } catch (error) {
      console.error('Lỗi khi áp dụng discount:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi áp dụng voucher');
    }
  };

  const calculateTotal = () => {
    if (appliedVoucher) {
      return appliedVoucher.newTotal; // Sử dụng tổng tiền mới từ API
    }
    return calculateSubtotal(); // Nếu chưa áp dụng voucher, trả về tổng tiền ban đầu
  };

  const calculateSubtotal = () => {
    return selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const applyVoucher = (voucher) => {
    applyDiscount(voucher.code); // Gửi mã voucher đến API
    setVoucherModalVisible(false); // Đóng modal sau khi chọn voucher
  };

  // Hàm tạo đơn hàng trên backend và lấy orderID
  const createPayPalOrder = async () => {
    const subtotal = calculateTotal();
    setIsLoading(true);
    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: subtotal, // Tổng tiền đơn hàng
          return_url: 'https://your-app-url.com/thankyou', // URL sau khi thanh toán thành công
          cancel_url: 'https://your-app-url.com/cancel',   // URL khi hủy thanh toán
        }),
      });

      const data = await response.json();

      if (data.id) {
        setOrderID(data.id);
      } else {
        Alert.alert('Lỗi', 'Không thể tạo đơn hàng PayPal');
      }



    } catch (error) {
      console.error('Error creating PayPal order:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tạo đơn hàng PayPal');
    } finally {
      setIsLoading(false);
    }
  };


  // Hàm xử lý thanh toán
  const handlePayment = async () => {
    if (!shippingAddress) {
      Alert.alert('Lỗi', 'Vui lòng chọn địa chỉ giao hàng');
      return;
    }

    setIsLoading(true)

    if (paymentMethod === 'cod') {
      // Xử lý thanh toán COD
      const orderData = {
        items: selectedCartItems.map((item) => ({
          productId: item.productId,
          sku: item.variation.sku,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity,
        })),
        shippingAddress: {
            province:shippingAddress.city,
            ward:shippingAddress.ward,
            addressDetail:`${shippingAddress.addressLine}, ${shippingAddress.ward}, ${shippingAddress.city}, ${shippingAddress.country}`
        },
        paymentMethod: 'cod', // Sử dụng phương thức đã chọn
      };

      const token = await AsyncStorage.getItem('userToken');

      try {
        const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        const result = await response.json();

        await fetchCart();
        setIsLoading(false)


        if (response.ok) {
          Alert.alert('Đặt hàng thành công', 'Đơn hàng của bạn đã được đặt!');
          navigation.navigate("HomeScreen");
        } else {
          // console.log('Lỗi đặt hàng', result.error || 'Đã xảy ra lỗi khi đặt hàng');
        }
      } catch (error) {
        console.error('Error creating order:', error);
        Alert.alert('Lỗi đặt hàng', 'Đã xảy ra lỗi khi xử lý đơn hàng của bạn');
      }
    } else if (paymentMethod === 'paypal') {
      // Tạo đơn hàng PayPal và mở WebView
      await createPayPalOrder();
    }
  };

  const handleSaveOrder = async () => {
    const token = await AsyncStorage.getItem('userToken');

      const orderData = {
        items: selectedCartItems.map((item) => ({
          productId: item.productId,
          sku: item.variation.sku,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity,
        })),
        shippingAddress: {
          detailAddress: `${shippingAddress.addressLine}, ${shippingAddress.ward}, ${shippingAddress.city}, ${shippingAddress.country}`,
        },
        paymentMethod: 'paypal', 
      };

      try {
        const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        const result = await response.json();

        await fetchCart();

        if (response.ok) {
          Alert.alert('Đặt hàng thành công', 'Đơn hàng của bạn đã được đặt!');
          navigation.navigate("HomeScreen");
        } else {
          // console.log('Lỗi đặt hàng', result.error || 'Đã xảy ra lỗi khi đặt hàng');
        }
      } catch (error) {
        console.error('Error creating order:', error);
      }
  }

  const handleNavigationStateChange = async (navState) => {
    const { url } = navState;

    // console.log(url)
  
    if (url.includes('token')) {
      const token = url.match(/token=([^&]+)/)[1]; // Lấy token từ URL
      // console.log('PayPal Token:', token);
  
      // Gọi API capture order
      const captureUrl = `https://ie-307-6017b574900a.herokuapp.com/paypal/capture-order/${token}`;
      try {
        const response = await fetch(captureUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        // console.log('Capture Order Response:', data);
  
        if (data.status === 'COMPLETED') {
          await handleSaveOrder()
          await Alert.alert('Thanh toán thành công', 'Cảm ơn bạn đã mua hàng!');
          await setPayPalVisible(false);

        } else {
          console.log('Thanh toán không thành công', 'Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error capturing PayPal order:', error);
      }
    } else if (url.includes('cancel')) {
      setPayPalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 1 }}>
            <Ionicons name="arrow-back" size={30} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh Toán</Text>
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
            <Text style={styles.sectionTitle}>Sản Phẩm</Text>
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: 'red', borderRadius: 10, padding: 7 }}
              onPress={() => setVoucherModalVisible(true)}
            >
              <Text style={styles.addVoucher}>Thêm Voucher</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={selectedCartItems}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const itemTotalPrice = item.price * item.quantity;
              return (
                <View style={styles.itemRow}>
                  <Image source={{ uri: item?.variation?.images[0] }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.productName}</Text>
                    <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                  </View>
                  <View style={styles.itemQuantity}>
                    <Text style={styles.quantityText}>x{item.quantity}</Text>
                    <Text style={styles.totalPriceText}>
                      Tổng: {formatCurrency(itemTotalPrice)}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Applied Voucher */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Áp Dụng Voucher</Text>
          {appliedVoucher ? (
            <View>
              <Text style={styles.appliedVoucherText}>
                Mã: {appliedVoucher.code} - Giảm: {formatCurrency(appliedVoucher.discountAmount)}
              </Text>
              <Text style={styles.newTotalText}>
                Tổng Mới: {formatCurrency(appliedVoucher.newTotal)}
              </Text>
            </View>
          ) : (
            <Text style={styles.noVoucherText}>Chưa áp dụng voucher</Text>
          )}
        </View>

        {/* Phương Thức Thanh Toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương Thức Thanh Toán</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cod' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('cod')}
          >
            <Ionicons
              name={paymentMethod === 'cod' ? 'radio-button-on' : 'radio-button-off'}
              size={24}
              color="#F83758"
            />
            <Text style={styles.paymentOptionText}>Thanh Toán Khi Nhận Hàng (COD)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'paypal' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('paypal')}
          >
            <Ionicons
              name={paymentMethod === 'paypal' ? 'radio-button-on' : 'radio-button-off'}
              size={24}
              color="#F83758"
            />
            <Text style={styles.paymentOptionText}>PayPal</Text>
          </TouchableOpacity>
        </View>

        {/* Total and Pay Button */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}> {formatCurrency(calculateTotal())}</Text>
          <TouchableOpacity
            style={[
              styles.payButton,
              { backgroundColor: selectedCartItems.length > 0 ? '#F83758' : '#ccc' },
            ]}
            onPress={selectedCartItems.length > 0 ? handlePayment : null}
            disabled={selectedCartItems.length === 0}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.payButtonText}>Thanh Toán</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Voucher Modal */}
      <VoucherModal
        visible={isVoucherModalVisible}
        vouchers={discounts}
        onApply={applyVoucher}
        onClose={() => setVoucherModalVisible(false)}
      />

      {/* PayPal WebView */}
      {isPayPalVisible && orderID && (
        <View style={styles.webViewContainer}>
          <WebView
            source={{
              uri: `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`,
            }}
            onNavigationStateChange={handleNavigationStateChange}
            startInLoadingState
            renderLoading={() => (
              <ActivityIndicator
                color="#F83758"
                size="large"
                style={styles.loadingIndicator}
              />
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setPayPalVisible(false)}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
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
  noAddressText: {
    fontSize: 14,
    color: '#888',
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
  appliedVoucherText: {
    fontSize: 14,
    color: '#F83758',
    marginTop: 4,
  },
  newTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  noVoucherText: {
    fontSize: 14,
    color: '#888',
  },
  addVoucher: {
    color: 'red',
    fontWeight: 'bold',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectedPaymentOption: {
    borderColor: '#F83758',
    backgroundColor: '#ffe6e6',
  },
  paymentOptionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  totalContainer: {
    // Điều chỉnh lại để không bị che khuất khi thêm phần chọn phương thức thanh toán
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  },
  webViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#F83758',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Checkout;
