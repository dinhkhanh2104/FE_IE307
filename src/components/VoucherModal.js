import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';

const VoucherModal = ({ visible, vouchers, onClose, onApply }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Vouchers hiện có</Text>
          <FlatList
            data={vouchers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.voucherCard}
                onPress={() => onApply(item)} // Apply voucher and close modal
              >
                <View>
                  <Text style={styles.voucherTitle}>{item.code}</Text>
                  <Text style={styles.voucherDiscount}>{item.discountAmount}% đơn hàng của bạn</Text>
                  <Text style={styles.endDate}>Ưu đãi đến: {item.expiry}</Text>
                </View>
                <Text style={styles.applyText}>Áp dụng</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});

export default VoucherModal;
