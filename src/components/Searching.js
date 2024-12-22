import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Searching = () => {
    return (
        <View style = {{  flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9"  }}>
            <LottieView
                source={require("../../assets/animation/searching-animation.json")}
                autoPlay
                loop
                style={{width: 220 , height: 220 }}
            />
        </View>
    )
}

export default Searching

const styles = StyleSheet.create({})