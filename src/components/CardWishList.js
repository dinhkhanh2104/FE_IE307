import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { COLORS } from '../constants/theme'
import Ionicons from '@expo/vector-icons/Ionicons';

const CardWishList = () => {
  return (
    <TouchableOpacity style={{ backgroundColor: "white", borderRadius: 10, elevation: 2, flexDirection: "row", height: 180, flex: 1, paddingRight: 5, gap: 10 }}>
      <View style={{}}>
        <Image
          source={require('../../assets/images/card/card1.jpg')}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <Text style={{ color: "black", fontSize: 16, fontWeight: 500, }}>Lorem ipsum dolor sit amet consectetur.</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 30 }}>
          <Text style={{ color: "black", fontSize: 19, fontWeight: 800 }}>$17,00</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingRight: 10}}>
          <View style={styles.properties}>
            <Text style={styles.textProperties}>Pink</Text>
          </View>
          <View style={styles.properties}>
            <Text style={styles.textProperties}>Pink</Text>
          </View>
          <TouchableOpacity>
            <Icon name='shopping-cart' type='feather' size={32} color={COLORS.primary} />\
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={
        {
          position: "absolute", bottom: 10, left: 10, backgroundColor: "white", borderRadius: 999,
          width: 40, height: 40, justifyContent: "center", alignItems: "center"
        }}>
        <Ionicons name="trash-outline" size={26} color={COLORS.primary} />
      </TouchableOpacity>

    </TouchableOpacity>
  )
}

export default CardWishList

const styles = StyleSheet.create({


  image: {
    width: 160,
    height: 180,
    borderRadius: 10,

  },
  properties: {
    backgroundColor: "#E5EBFC",
    width: 60,
    height: 34,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  textProperties: {
    color: "black",
    fontWeight: 500,
    fontSize: 16
  }
})