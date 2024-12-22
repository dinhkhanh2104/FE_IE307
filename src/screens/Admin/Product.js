import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const Product = ({navigation}) => {

  // useEffect(() => {
    
  // }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerSection}>
        <Text style={styles.header}>Products</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("CreateProduct")}} style={styles.button}>
          <AntDesign name="plus" size={17} color="white" />
          <Text style={{ fontSize: 16, fontWeight: '500', color: "white" }}>Add Product</Text>
        </TouchableOpacity>
      </View>



      
    </SafeAreaView>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#8c5ff8",
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 10
  },
  reportSection: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  }
})