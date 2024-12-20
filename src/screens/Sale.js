import { SafeAreaView, StyleSheet, Text, View, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { Icon } from 'react-native-elements'
import { getProducts } from '../services/axios/actions/ProductAction'
import Card from '../components/Card'
import Spinner from 'react-native-loading-spinner-overlay'


const Sale = ({navigation}) => {

    const initialTime = 22 * 60 * 60 + 55 * 60 + 20;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [isLoading, setIsLoading] = useState(true)

    const [saleProducts, setSaleProducts] = useState([])

    const directProductDetail = (product) => {
        navigation.navigate('ProductDetail', { product })
      }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                const random = data.sort(() => 0.5 - Math.random()).slice(0, 8);
                setSaleProducts(random);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
              }
        }
        fetchData()

    }, []);


    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                size="large"
                visible={isLoading}
            />
            <View style={styles.dealArea}>
                <View style={styles.dealWrapper}>
                    <Text style={styles.dealText}>Deal of the day</Text>
                    <View style={styles.dealTime}>
                        <Icon name='alarm' type='MaterialCommunityIcons' size={24} color={COLORS.white} />
                        <Text style={{ color: COLORS.white }}>
                            {`${hours}h ${minutes}m ${seconds}s remaining`}
                        </Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={saleProducts}
                keyExtractor={(_, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={
                    ({ item }) => <Card data={item} isDiscounted={true} onPress={() => { directProductDetail(item) }} />
                }
                scrollEnabled={true}
            />


        </SafeAreaView>
    )
}

export default Sale

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingTop: StatusBar.currentHeight + 20 || 0,
        paddingHorizontal: 20,
    },
    dealArea: {
        marginBottom: 10,
        backgroundColor: "#4392F9",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: "space-between",
        // alignItems: "center",
        flexDirection: "row"
        // width: "100%",
    },
    dealText: {
        color: COLORS.white,
        fontFamily: "Montserrat_500Medium",
        fontSize: SIZES.font16,
    },
    dealWrapper: {
        gap: 6
    },
    dealTime: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

})