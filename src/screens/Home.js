import {
  Image, SafeAreaView, StyleSheet,
  Text, TextInput, View, TouchableOpacity,
  ScrollView, FlatList, flatListRef, StatusBar
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { COLORS, SIZES } from '../constants/theme'
import { carousel as carouselData } from '../../data/carousel'
import Card from '../components/Card'
import { getProducts } from '../services/axios/actions/ProductAction'
import Spinner from 'react-native-loading-spinner-overlay'
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Loading from '../components/Loading'



const Home = ({ navigation }) => {

  const { cart } = useContext(AuthContext)

  const [products, setProducts] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollViewRef = useRef(null);



  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SIZES.width);
    setCurrentIndex(index);

  };

  const handleScrollTop = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(yOffset > 250);
  }

  const handleNavigateCart = () => {
    navigation.navigate('CartNavigator')
  }

  const directProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product })
  }



  const initialTime = 22 * 60 * 60 + 55 * 60 + 20;

  const [timeRemaining, setTimeRemaining] = useState(initialTime);

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

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
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
      {isLoading ? (<Loading />) : (
        <ScrollView
          contentContainerStyle={styles.wrapper}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onScroll={handleScrollTop}
          scrollEventThrottle={16}
        >
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <Icon name='menu' type='feather' size={24} />
            </View>
            <Image
              source={require("../../assets/images/logo_home.png")}
              style={{ width: 140, height: 40 }}
            />

            <TouchableOpacity onPress={handleNavigateCart} style={styles.cartIconWrapper}>
              <Icon name="shopping-cart" type="feather" size={26} color={COLORS.primary} />
              {cart.length >= 0 && (
                <View style={styles.customBadge}>
                  <Text style={styles.badgeText}>{cart.length}</Text>
                </View>
              )}
            </TouchableOpacity>

          </View>

          <View style={styles.inputField}>
            <Icon name='search' type='fontisto' color={"#BBBBBB"} size={24} />
            <TextInput
              placeholder='Search any Products...'
              placeholderTextColor={"#BBBBBB"}
              cursorColor={COLORS.lightGray}
              style={styles.textInput}
              onFocus={() => {
                navigation.navigate('Search', { products })
                // console.log(products)
              }}
            />
            <TouchableOpacity>
              <Icon name='mic' type='feather' color={"#BBBBBB"} size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.titleArea}>



            {/* <View style={{ flexDirection: "row", gap: 16 }}>
     <TouchableOpacity style={styles.button}>
       <Text style={styles.buttonText}>Sort</Text>
       <Image
         source={require("../../assets/images/sort.png")}
         style={{ width: 18, height: 18 }}
       />
     </TouchableOpacity>

     <TouchableOpacity style={styles.button}>
       <Text style={styles.buttonText}>Filter</Text>
       <Icon name='filter' type='feather' size={18} />
     </TouchableOpacity>
   </View> */}

          </View>



          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={carouselData}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              onScroll={handleScroll}
              renderItem={({ item }) => (
                <Image source={item} style={styles.carouselImage} />
              )}
            />
            <View style={styles.pagination}>
              {carouselData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>

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

            <TouchableOpacity style={styles.dealButton} onPress={() => { navigation.navigate("SaleNavigator") }}>
              <Text style={styles.dealTextButton}>View all </Text>
              <Icon name='arrowright' type='antdesign' color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={products.slice(0, Math.ceil(products.length / 2 + 1))}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={
              ({ item }) => <Card data={item} onPress={() => { directProductDetail(item) }} />
            }
            scrollEnabled={false}
          />

          <View style={{ marginTop: 10, elevation: 1, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.white, borderRadius: 8 }}>
            <Image
              source={require('../../assets/images/banner/banner1.png')}
              style={{ width: "100%", height: 80, }}
            />
          </View>

          <Image
            source={require('../../assets/images/banner/banner2.png')}
            style={{ width: "100%", height: 140, marginTop: 16 }}
          />

          <View style={[styles.dealArea, { backgroundColor: "#FD6E87" }]}>
            <View style={styles.dealWrapper}>
              <Text style={styles.dealText}>Trending Products</Text>
              <View style={styles.dealTime}>
                <Icon name='calendar' type='antdesign' size={24} color={COLORS.white} />
                <Text style={{ color: COLORS.white }}>Last Date 30/12/2024</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.dealButton} onPress={() => { navigation.navigate("SaleNavigator") }}>
              <Text style={styles.dealTextButton}>View all</Text>
              <Icon name='arrowright' type='antdesign' color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={products.slice(Math.floor(products.length / 2 + 1))}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={
              ({ item }) => <Card data={item} onPress={() => { directProductDetail(item) }} />
            }
            scrollEnabled={false}
          />

          <View style={{ backgroundColor: COLORS.white, borderRadius: 10, paddingVertical: 10 }}>
            <Image
              source={require("../../assets/images/banner/banner3.png")}
              style={{ width: "100%", height: 120, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            />
            <View style={{ flexDirection: "row", paddingHorizontal: 10, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ gap: 6 }} >
                <Text style={{ fontFamily: "Montserrat_500Medium", fontSize: 22, marginTop: 6 }}>New Arrivals</Text>
                <Text style={{ fontFamily: "Montserrat_400Reular", fontSize: 16 }}>Summer's 25 Collections</Text>
              </View>

              <TouchableOpacity style={[styles.dealButton, { backgroundColor: COLORS.primary, height: 40 }]}>
                <Text style={styles.dealTextButton}>View all</Text>
                <Icon name='arrowright' type='antdesign' color={COLORS.white} />
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      )
    }
     

      {showScrollToTop && (
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={() => scrollViewRef.current?.scrollTo({ animated: true, y: 0 })}
        >
          <Icon name="arrow-up" type="feather" size={24} color="#fff" />
        </TouchableOpacity>
      )}


    </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: StatusBar.currentHeight + 20 || 0,
  },

  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  iconWrapper: {
    width: 36,
    height: 36,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  inputField: {
    marginTop: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 1,
    gap: 10,
    width: "100%"
  },
  textInput: {
    width: "80%",
    fontSize: SIZES.font16,
  },
  titleArea: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeader: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: SIZES.font18,
    width: "40%",
  },
  button: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: COLORS.white,
    width: 70,
    height: 34,
    elevation: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Montserrat_500Medium"
  },
  categoryWrapper: {
    marginTop: 30,
    flexDirection: "row",
  },
  categoryItem: {
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 9,
    gap: 10
  },
  categoryImage: {
    width: 74,
    height: 74,
    borderRadius: 999,
  },
  carouselContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  carouselImage: {
    width: SIZES.width - 40,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: '#DEDBDB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFA3B3',
    width: 9,
    height: 9,
  },
  dealArea: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#4392F9",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
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
  dealButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,

  },
  dealTextButton: {
    color: COLORS.white,
    fontSize: SIZES.font14,
    fontFamily: "Montserrat_600SemiBold"
  },
  cartIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: "center",
    elevation: 2,
  },

  customBadge: {
    position: 'absolute',
    top: 10,
    right: 8,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollToTopButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#FF6347",
    backgroundColor: COLORS.primary,
    opacity: 0.9,
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },

})