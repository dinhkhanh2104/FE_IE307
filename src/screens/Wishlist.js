import { SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import CardWishList from '../components/CardWishList'

import Spinner from 'react-native-loading-spinner-overlay';
import { getWishlist } from '../services/axios/actions/WishlistAction';
import { deleteWishlist } from '../services/axios/actions/WishlistAction';
import Loading from '../components/Loading';

const Wishlist = ({ navigation }) => {

  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleDirectDetail = (product) => {
    navigation.navigate("ProductDetail", { product })
  }
  


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true)
        const data = await getWishlist()
        setWishlist(data)
      }
      catch (error) {
        console.error("Error fetching wishlist", error);
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchWishlist()
  }, []);

  const handleDeleteWishlist = async (productId) => {
    try {
      setIsLoading(true)
      await deleteWishlist(productId)
      const data = await getWishlist()
      setWishlist(data)
    }
    catch (error) {
      console.error("Error deleting wishlist", error);
    }
    finally {
      setIsLoading(false)
  }
}


  return (
    <SafeAreaView style={styles.container}>

    {isLoading ? (<Loading />) : (
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>Wishlist</Text>

        {
          wishlist?.length ? (
            <FlatList
              data={wishlist}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              style={{ width: "100%" }}
              renderItem={
                ({ item }) => <CardWishList item={item} onPress={() => { handleDirectDetail(item.product) }} onDelete={() => { handleDeleteWishlist( item.product._id) }} />
              }
            />
          ) :
            (<View style={{ width: 120, height: 120, borderRadius: 999, backgroundColor: "white", elevation: 22, justifyContent: "center", alignItems: "center" }}>
              <Image source={require("../../assets/images/Favorites_empty.png")} style={{ width: 70, height: 70 }} />
            </View>)
        }

      </ScrollView>
    )}
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
    alignItems: "center",
  }
})