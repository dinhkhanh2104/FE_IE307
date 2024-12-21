import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { COLORS } from '../constants/theme'
import Ionicons from '@expo/vector-icons/Ionicons';

const CardWishList = ({ item, onPress, onDelete }) => {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={{ height: "100%" }}>
        <Image
          source={{ uri: item?.product?.images[0] }}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1}}>
        <Text style={{ color: "black", fontSize: 16, fontWeight: 500, }}>{item?.product?.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 }}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: 500 }}>Rating: {item?.product?.rating}</Text>
          <Icon name='star' type='antdesign' size={20} color={"#EDB310"} />
        </View>
        <View style = {{marginTop: 10}}>
          <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: 500,  }}> {formatCurrency(item?.product?.variations[0].price)}</Text>
        </View>
        <View style={{ paddingRight: 10, flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={onDelete}
            style={styles.iconWrapper}>
            <Ionicons name="trash-outline" size={26} color={COLORS.primary} />
          </TouchableOpacity>

        </View>
      </View>



    </TouchableOpacity>
  )
}

export default CardWishList

const styles = StyleSheet.create({

  container: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    flexDirection: "row",
    height: 150,
    flex: 1,
    paddingRight: 5,
    gap: 10,
    marginBottom: 10,
  },
  image: {
    width: 160,
    height: "100%",
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
  },
  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: "white",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
})