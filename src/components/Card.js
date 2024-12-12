import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../constants/theme';

const Card = ({ data, onPress}) => {
    // console.log(data.);
    
    return (
        <TouchableOpacity 
            style={styles.cardContainer}
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: data.images[0] }}
                    style={styles.cardImage}
                />
                <Text style={styles.cardPercentSale}> - 40%</Text>
            </View>

            <View style={{ paddingHorizontal: 8, gap: 10 }}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                    {data.name}
                </Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                    {data.description}
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <Text style={styles.cardPrice}>$ {data.variations[0].price}</Text>
                    <Text style={styles.cardOldPrice}>$ {data.variations[0].oldPrice}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10}}>
                    <View style={{ flexDirection: "row" }}>
                        {
                            Array.from({ length: 5 }).map((_, index) => {
                                const isFullStar = index < Math.floor(data.rating);
                                const isHalfStar = index === Math.floor(data.rating) && data.rating % 1 !== 0;

                                return (
                                    <Icon
                                        key={index}
                                        name={isFullStar ? 'star' : isHalfStar ? 'star-half' : 'star-outline'}
                                        type='Ionicons'
                                        color={isFullStar || isHalfStar ? "#EDB310" : "#BBBBBB"}
                                        size={16}
                                    />
                                );
                            })
                        }
                    </View>
                    <Text style={styles.cardAmount}>8999</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        width: "49%",
        backgroundColor: COLORS.white,
        borderRadius: 8,
        gap: 10,
        paddingBottom: 10,
        elevation: 1,
        marginBottom: 10,
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: 140,
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    cardPercentSale: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 56,
        backgroundColor: COLORS.primary,
        color: "#fff",
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: SIZES.font12,
        fontFamily: "Montserrat_600SemiBold",
        borderRadius: 4,
        overflow: "hidden",
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
        color: "red",
        fontFamily: "Montserrat_600SemiBold",
        fontSize: SIZES.font14,
        width: 60
    },
    cardOldPrice: {
        color: "#BBBBBB",
        textDecorationLine: "line-through",
        fontSize: SIZES.font14,
    },
    cardAmount: {
        fontFamily: "Montserrat_300Light",
        fontSize: SIZES.font12,
    }
});
