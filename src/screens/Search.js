import {
    StyleSheet, Text, View, SafeAreaView,
    TextInput, TouchableOpacity, StatusBar,
    ScrollView, FlatList, Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { COLORS, SIZES } from '../constants/theme';
import { searchProducts } from '../services/axios/actions/ProductAction';
import Card from '../components/Card';
import Searching from '../components/Searching';
import Loading from '../components/Loading';

const Search = ({ route, navigation }) => {
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const recommendedProducts = ['Váy công sở', 'Đầm dạ hội', 'Quần tây nam', 'Áo vest lịch lãm', 'Áo thun basic'];
    const [searchText, setSearchText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleSearch = async () => {
            if (!searchQuery) return; 
            try {
                setIsLoading(true);
                const response = await searchProducts(searchQuery);
                setResult(response);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        handleSearch();
    }, [searchQuery]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const { products } = route.params;
    const popularProducts = [...products].slice(10, 18);

    const directProductDetail = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading /> : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.wrapper}
                >

                    <View style={styles.inputField}>
                        <TouchableOpacity onPress={() => setSearchQuery(searchText)}>
                            <Icon name='search' type='fontisto' color={"#BBBBBB"} size={24} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Search any Products...'
                            placeholderTextColor={"#BBBBBB"}
                            cursorColor={COLORS.lightGray}
                            style={styles.textInput}
                            onChangeText={(value) => setSearchText(value)}
                            value={searchText}
                            onSubmitEditing={() => setSearchQuery(searchText)} 
                        />
                        <TouchableOpacity>
                            <Icon name='mic' type='feather' color={"#BBBBBB"} size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>Đề xuất cho bạn</Text>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", gap: 10 }}>
                            {recommendedProducts.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.textWrapper}
                                    onPress={() => {
                                        setSearchText(item);
                                        setSearchQuery(item); 
                                    }}
                                >
                                    <Text style={{ fontSize: 16 }}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontWeight: "600", fontSize: 18, marginTop: 10 }}>Kết quả tìm kiếm</Text>
                        {result.length === 0 && <Searching />}
                        <FlatList
                            data={result}
                            keyExtractor={(_, index) => index.toString()}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            columnWrapperStyle={{ justifyContent: "space-between" }}
                            renderItem={({ item }) => <Card data={item} onPress={() => { directProductDetail(item); }} />}
                            scrollEnabled={false}
                            style={{ marginTop: 10 }}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: "600", fontSize: 18, marginBottom: 10 }}>Có thể thuộc gu của bạn</Text>
                        <FlatList
                            data={popularProducts}
                            horizontal={true}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingBottom: 5 }}
                            renderItem={({ item }) => (
                                <View style={styles.card}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                                        <Image style={styles.imageThumbnail} source={{ uri: item.images[0] }} />
                                        <Text style={{ fontSize: 12, paddingLeft: 10, marginTop: 10 }}>
                                            {item.name.length > 19 ? `${item.name.slice(0, 19)}...` : item.name}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: COLORS.primary, fontWeight: "bold", paddingLeft: 10 }}>
                                            {formatCurrency(item.variations[0].price)}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        backgroundColor: "#f9f9f9",
        paddingTop: StatusBar.currentHeight + 20 || 0,
    },
    wrapper: {
        paddingHorizontal: 20,
    },
    inputField: {
        marginTop: 2,
        paddingVertical: 5,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 8,
        elevation: 2,
        gap: 10,
        width: "100%",
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
});
