import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Product = () => {
  return (
    <SafeAreaView style = {styles.container}>
      <Text>Product</Text>
    </SafeAreaView>
  )
}

export default Product

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9f9f9",
        flex: 1,

    }
})