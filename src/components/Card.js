import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { COLORS, SIZES } from '../constants/theme'

const Card = () => {
  return (
    <View style = {styles.cardContainer}>
        <Image 
            source={require("../../assets/images/card/card1.jpg")}
            style = {styles.cardImage}
        />
        <Text style = {styles.cardTitle}>Women Printed Kurta</Text>
        <Text style = {styles.cardDescription}>Neque porro quisquam est qui dolorem ipsum quia</Text>
        <Text style = {styles.cardPrice}>₹1500</Text>
        <Text style = {styles.cardOldPrice}>₹2499</Text>
        <Text style = {styles.cardPercentSale}>-40%</Text>
        <View style = {{flexDirection: "row", }}>
            <Icon name='star' type='Ionicons' color={"#EDB310"} size={24}/>
            <Icon name='star-half' type='Ionicons' color={"#BBBBBB"} size={24}/>
        </View>
        <Text style = {styles.cardPercentSale}></Text>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%"
    },
    cardImage: {
        width: "100%",
        height: 125,
        objectFit: "cover"
    },
    cardTitle: {
        fontFamily: "Montserrat_600SemiBold",
        fontSize: SIZES.font14,

    },
    cardDescription: {
        fontFamily: "Montserrat_400Regular",
        fontSize: SIZES.font12,
    },
    cardPrice: {
        fontWeight: "Montserrat_600SemiBold",
        fontSize: SIZES.font14,
    },
    cardOldPrice: {
        color: "#BBBBBB",
        borderColor: "#808488",
        textDecorationLine: "line-through",
    },
    cardPercentSale: {
        color: COLORS.primary,
    }
})