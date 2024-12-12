import { SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import React from 'react'
import CardWishList from '../components/CardWishList'


const Wishlist = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 28, fontWeight: 600 }}>Wishlist</Text>
        <CardWishList />
        <CardWishList />
        <CardWishList />
        <CardWishList />
        <View style={{ width: 120, height: 120, borderRadius: 999, backgroundColor: "white", elevation: 22, justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../assets/images/Favorites_empty.png")} style={{ width: 70, height: 70 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Wishlist

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: StatusBar.currentHeight + 20 || 0,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  }
})