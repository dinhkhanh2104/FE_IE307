import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const Loading = () => {
    return (
        <View style = {{  flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"  }}>
            <LottieView
                source={require("../../assets/animation/loading-animation.json")}
                autoPlay
                loop
                style={{width: 180, height: 180 }}
            />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})