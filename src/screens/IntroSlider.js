import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../constants/theme";
import { onboardData } from "../../data/onboard";

const IntroSlider = ({navigation}) => {

    const buttonLabel = (label, colorInput) => (
        <View style={{ padding: 11 }}>
            <Text style={[styles.button, { color: colorInput }]}>{label}</Text>
        </View>
    );
    
    const handleNavigateLogin = () => {
        navigation.navigate("Login")
    }

    return (
        <View style={styles.introSliderContainer}>
            <AppIntroSlider
                data={onboardData}
                style={styles.introSliderWrapper}
                renderItem={({ item }) => (
                    <View style={styles.introSliderContent}>
                        <Image
                            source={item.image}
                            style={styles.introSliderImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.introSliderTitle}>{item.title}</Text>
                        <Text style={styles.introSliderDescription}>{item.description}</Text>
                    </View>
                )}
                activeDotStyle={styles.introSliderDot}
                renderNextButton={() => buttonLabel("Next", COLORS.primary)}
                renderDoneButton={() => buttonLabel("Start", COLORS.primary)}
                renderPrevButton={() => buttonLabel("Prev", "#C4C4C4")}
                showSkipButton={false}
                showPrevButton={true}
                onDone={handleNavigateLogin}
            />
        </View>
    );
};

export default IntroSlider;

const styles = StyleSheet.create({
    button: {
        fontFamily: "Montserrat_500Medium",
        fontSize: SIZES.font18,
    },
    introSliderContainer: {
        flex: 1,
        paddingBottom: 14,
        paddingHorizontal: 14,
        backgroundColor: "white"
    },
    introSliderContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    introSliderImage: {
        width: 300,
        height: 300,
    },
    introSliderTitle: {
        color: COLORS.black,
        fontSize: SIZES.font24,
        fontFamily: "Montserrat_700Bold",
    },
    introSliderDescription: {
        textAlign: "center",
        paddingTop: 10,
        color: COLORS.lightGray,
        fontSize: SIZES.font16,
        fontFamily: "Montserrat_500Medium",
        lineHeight: 26,
    },
    introSliderDot: {
        backgroundColor: COLORS.darkGray,
        width: 40,
        height: 10,
    },
});
