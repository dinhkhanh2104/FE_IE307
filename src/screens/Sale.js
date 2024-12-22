import { SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/axios/actions/ProductAction'
import Card from '../components/Card'
import Loading from '../components/Loading'
import CountDown from '../components/CountDown'

const Sale = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    
    const [saleProducts, setSaleProducts] = useState([])
    
    const directProductDetail = (product) => {
        navigation.navigate('ProductDetail', { product })
    }
    

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




    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading /> : (
                <>
                   <CountDown />
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
                </>
            )}

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
    
})