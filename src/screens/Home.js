import {
  Image, SafeAreaView, StyleSheet,
  Text, TextInput, View, TouchableOpacity,
  ScrollView, FlatList, flatListRef, StatusBar
} from 'react-native'
import React, { useState, useRef } from 'react'
import { colors, Icon } from 'react-native-elements'
import { COLORS, SIZES } from '../constants/theme'
import { categories } from '../../data/categories'
import { carousel as carouselData } from '../../data/carousel'
import Card from '../components/Card'
import { products } from '../../data/product'
import { color } from 'react-native-elements/dist/helpers'

const Home = () => {

  const handleChooseCategory = () => {

  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SIZES.width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Icon name='menu' type='feather' size={24} />
          </View>
          <Image
            source={require("../../assets/images/logo_home.png")}
            style={{ width: 140, height: 40 }}
          />
          <Image
            source={require("../../assets/images/default_avatar.jpg")}
            style={{ width: 50, height: 50, borderRadius: 999 }}
          />
        </View>

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

        <View style={styles.titleArea}>

          <Text style={styles.textHeader}>
            All Featured
          </Text>

          <View style={{ flexDirection: "row", gap: 16 }}>
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
          </View>

        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.categoryWrapper}
          horizontal
        >
          {
            categories.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => handleChooseCategory()}
                >
                  <Image
                    source={item.image}
                    style={styles.categoryImage}
                  />
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>

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
            <Text style={styles.dealText}>Deal of the Day</Text>
            <View style={styles.dealTime}>
              <Icon name='alarm' type='MaterialCommunityIcons' size={24} color={COLORS.white} />
              <Text style={{ color: COLORS.white }}>22h 55m 20s remaining</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.dealButton}>
            <Text style={styles.dealTextButton}>View all </Text>
            <Icon name='arrowright' type='antdesign' color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={
            ({ item }) => <Card data={item} />
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

          <TouchableOpacity style={styles.dealButton}>
            <Text style={styles.dealTextButton}>View all</Text>
            <Icon name='arrowright' type='antdesign' color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={
            ({ item }) => <Card data={item} />
          }
          scrollEnabled={false}
        />

        <View style={{backgroundColor: COLORS.white, borderRadius: 10, paddingVertical: 10 }}>
          <Image
            source={require("../../assets/images/banner/banner3.png")}
            style={{ width: "100%", height: 120, borderTopLeftRadius: 10,  borderTopRightRadius: 10 }}
          />
          <View style = {{flexDirection: "row", paddingHorizontal: 10, justifyContent: "space-between", alignItems: "center"}}>
            <View style = {{gap: 6}} >
              <Text style = {{fontFamily: "Montserrat_500Medium", fontSize: 22, marginTop: 6}}>New Arrivals</Text>
              <Text style = {{fontFamily: "Montserrat_400Reular", fontSize: 16}}>Summer's 25 Collections</Text>
            </View>

            <TouchableOpacity style={[styles.dealButton, {backgroundColor: COLORS.primary, height: 40}]}>
              <Text style={styles.dealTextButton}>View all</Text>
              <Icon name='arrowright' type='antdesign' color={COLORS.white} />
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>

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
    marginTop: 20,
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

})