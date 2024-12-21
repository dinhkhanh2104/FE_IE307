import {
    StyleSheet, Text, View, SafeAreaView,
    TextInput, TouchableOpacity, StatusBar,
    ScrollView, FlatList, Image
} from 'react-native'
import React, { useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { COLORS, SIZES } from '../constants/theme'

const Search = ({ route, navigation }) => {

    // useEffect(() => {
    //     navigation.getParent()?.setOptions({
    //         tabBarStyle: { display: 'none' },
    //     });
    //     return () => {
    //         navigation.getParent()?.setOptions({
    //             tabBarStyle: undefined,
    //         });
    //     };
    // }, [navigation]);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const { products } = route.params
    console.log(products);

    const popularProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
    console.log(popularProducts);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputField}>
                <Icon name='search' type='fontisto' color={"#BBBBBB"} size={24} />
                <TextInput
                    placeholder='Search any Products...'
                    placeholderTextColor={"#BBBBBB"}
                    cursorColor={COLORS.lightGray}
                    style={styles.textInput}
                />
                <TouchableOpacity>
                    <Icon name='mic' type='feather' color={"#BBBBBB"} size={24} />
                </TouchableOpacity>
            </View>
            <View style={{ gap: 10, marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Đề xuất cho bạn</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 10 }}>

                    <TouchableOpacity style={styles.textWrapper} onPress={() => { }}>
                        <Text style={{ fontSize: 16 }}>Váy công sở</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textWrapper} onPress={() => { }}>
                        <Text style={{ fontSize: 16 }}>Đầm dạ hội</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textWrapper} onPress={() => { }}>
                        <Text style={{ fontSize: 16 }}>Quần tây nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textWrapper} onPress={() => { }}>
                        <Text style={{ fontSize: 16 }}>Áo vest lịch lãm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textWrapper} onPress={() => { }}>
                        <Text style={{ fontSize: 16 }}>Áo thun basic</Text>
                    </TouchableOpacity>

                </View>
            </View>

            

            <FlatList
                data={popularProducts}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                            <Image style={styles.imageThumbnail} source={{ uri: item.images[0] }} />
                            <Text style={{ fontSize: 12, paddingLeft: 10, marginTop: 10 }}>
                                {item.name.length > 19 ? `${item.name.slice(0, 19)}...` : item.name}
                            </Text>
                            <Text style={{ fontSize: 12, color: COLORS.primary, fontWeight: "bold", paddingLeft: 10 }}>{formatCurrency(item.variations[0].price)}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />


        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        backgroundColor: "#f9f9f9",
        paddingTop: StatusBar.currentHeight + 20 || 0,
    },
    inputField: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 8,
        elevation: 2,
        gap: 10,
        width: "100%"
    },
    textInput: {
        width: "80%",
        fontSize: SIZES.font16,
    },
    textWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: 10,
        alignSelf: "flex-start",
    },
    card: { 
        flex: 1, 
        marginRight: 10,
        flexDirection: 'column', 
        padding: 4, 
        backgroundColor: "white", 
        elevation: 2, 
        borderRadius: 10,
        paddingBottom: 10,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 140,
        width: 140,
        borderRadius: 10,
    },
})