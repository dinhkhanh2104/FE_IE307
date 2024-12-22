import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import DropdownComponent from '../../components/DropdownComponent';
import Entypo from '@expo/vector-icons/Entypo';

const Product = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerSection}>
        <Text style={styles.header}>Products</Text>
        <View style={styles.button}>
          <AntDesign name="plus" size={17} color="white" />
          <Text style={{ fontSize: 16, fontWeight: '500', color: "white" }}>Add Product</Text>
        </View>
      </View>

      <View style={styles.reportSection}>


        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Products Stats</Text>
          <View style={{ width: 150 }}>
            <DropdownComponent />
          </View>
        </View>

      
        <View style={{ flexDirection: "row", paddingVertical: 14, paddingHorizontal: 10, backgroundColor: "#f9eafd", borderRadius: 20, }}>
          <View style = {{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Text style={{ fontSize: 17, fontWeight: "400" }}>Daily Sales</Text>
            <Entypo name="dots-three-horizontal" size={24} color="#7584a5" />
          </View>
          <View style = {{backgroundColor: "#c339e7"}}>

          </View>
        </View>

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
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 20,
  }
})