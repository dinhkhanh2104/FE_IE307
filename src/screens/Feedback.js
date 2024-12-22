import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { COLORS } from '../constants/theme'; // Import your color constants

const FeedbackScreen = ({ navigation,route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const productId = route.params


  console.log(productId)

  // Validate form data
  const validateForm = () => {
    if (!name || !email || !feedback) {
      Alert.alert('Error', 'Please fill all the fields');
      return false;
    }
    // Add more validation if needed (e.g., email format)
    return true;
  };

  // Handle the submit action
  const handleSubmit = () => {
    if (validateForm()) {
      // Example of API call for sending feedback (replace with actual API)
      const feedbackData = { name, email, feedback };

      // Call your API or handle the data submission
      console.log('Feedback submitted:', feedbackData);

      Alert.alert('Success', 'Your feedback has been submitted');
      navigation.goBack(); // Go back to previous screen after submission
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gửi Phản Hồi</Text>
      
      {/* Name input */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn"
        value={productId}
        onChangeText={setName}
      />

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Nhập email của bạn"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Feedback input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Nhập phản hồi của bạn"
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi Phản Hồi</Text>
      </TouchableOpacity>

      {/* Back button */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.secondary,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    alignItems: 'center',
  },
  goBackText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
