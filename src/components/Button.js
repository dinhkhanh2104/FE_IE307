import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style = {styles.buttonContainer} onPress={onPress}>
      <Text style = {styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        backgroundColor: COLORS.primary,
        height: 56,
        justifyContent: "center",
        borderRadius: 4,
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: "Montserrat_600SemiBold",
        fontSize: SIZES.font20,
        textAlign: "center"
    }
})