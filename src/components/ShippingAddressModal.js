import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ShippingAddressModal = ({ visible, onClose, address, onSave }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(address?.province || '');
  const [selectedDistrict, setSelectedDistrict] = useState(address?.district || '');
  const [streetAddress, setStreetAddress] = useState(address?.street || '');
  const [postcode, setPostcode] = useState(address?.postcode || '');
  const [loading, setLoading] = useState(false);

  const [provinceDropdownOpen, setProvinceDropdownOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);

  // Fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://provinces.open-api.vn/api/p');
        const data = await response.json();
        const formattedProvinces = data.map((province) => ({
          label: province.name,
          value: province.code,
        }));
        setProvinces(formattedProvinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch districts when a province is selected
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
          );
          const data = await response.json();
          const formattedDistricts = data.districts.map((district) => ({
            label: district.name,
            value: district.name,
          }));
          setDistricts(formattedDistricts);
        } catch (error) {
          console.error('Error fetching districts:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDistricts();
    }
  }, [selectedProvince]);

  // Ensure only one dropdown is open at a time
  const handleProvinceOpen = () => {
    setDistrictDropdownOpen(false); // Close district dropdown when province dropdown opens
    setProvinceDropdownOpen(true);
  };

  const handleDistrictOpen = () => {
    setProvinceDropdownOpen(false); // Close province dropdown when district dropdown opens
    setDistrictDropdownOpen(true);
  };

  const saveChanges = () => {
    onSave({
      province: selectedProvince,
      district: selectedDistrict,
      street: streetAddress,
      postcode,
    });
    onClose();
  };

  if (loading) {
    return (
      <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Shipping Address</Text>
          
          {/* Province Dropdown */}
          <Text style={styles.label}>Province</Text>
          <DropDownPicker
            open={provinceDropdownOpen}
            setOpen={setProvinceDropdownOpen}
            onOpen={handleProvinceOpen}
            items={provinces}
            value={selectedProvince}
            setValue={setSelectedProvince}
            placeholder="Select Province"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={5000} // Ensure higher zIndex for proper stacking
            zIndexInverse={1000}
          />

          {/* District Dropdown */}
          <Text style={styles.label}>District</Text>
          <DropDownPicker
            open={districtDropdownOpen}
            setOpen={setDistrictDropdownOpen}
            onOpen={handleDistrictOpen}
            items={districts}
            value={selectedDistrict}
            setValue={setSelectedDistrict}
            placeholder="Select District"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={4000} // Lower zIndex than Province Dropdown
            zIndexInverse={2000}
          />

          {/* Address and Postcode */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={streetAddress}
            onChangeText={setStreetAddress}
          />

          <Text style={styles.label}>Postcode</Text>
          <TextInput
            style={styles.input}
            value={postcode}
            onChangeText={setPostcode}
            keyboardType="numeric"
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
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
    padding: 20,
    width: '90%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  dropdown: {
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  dropdownContainer: {
    borderColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ShippingAddressModal;
