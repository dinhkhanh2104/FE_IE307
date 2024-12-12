import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { Icon } from 'react-native-elements';
import { createNativeWrapper } from 'react-native-gesture-handler';

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState()
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    { uri: 'https://s3-alpha-sig.figma.com/img/337a/22ae/49b350434fc9e50a9abb7351559ff374?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BAq~MJwQhMRVfwkfIa1kaSBiHG730qlg0bV~~KolTmp3mkXKn-elmHOvlrZpCIgVjMoMY~gn1EO-m1eiC6EuSV4QLH1mvUP7TtoemlpS9GHj-fcewTLmiwDDceBrnDo2cIVP-6aqY39HSlmnGTJh9FKd9MZ5BOya-q0J13YSR3xHnDCvyDqXim0zNuxh14fjn1p5aMb0~pAn1jZIhkbVXqGukdnCKHwGyY-8Qia4Y7-V2k5DniuW1Jgm8ov5j0~sI1zJk2RBy1j-VonvM0tCwwAc7U17AcYDMHfRfWqHDL62OLlHAvSYoHthd~mctzxVMKJo2vmgdVUpbLhpnaOnSg__' },
    { uri: 'https://s3-alpha-sig.figma.com/img/337a/22ae/49b350434fc9e50a9abb7351559ff374?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BAq~MJwQhMRVfwkfIa1kaSBiHG730qlg0bV~~KolTmp3mkXKn-elmHOvlrZpCIgVjMoMY~gn1EO-m1eiC6EuSV4QLH1mvUP7TtoemlpS9GHj-fcewTLmiwDDceBrnDo2cIVP-6aqY39HSlmnGTJh9FKd9MZ5BOya-q0J13YSR3xHnDCvyDqXim0zNuxh14fjn1p5aMb0~pAn1jZIhkbVXqGukdnCKHwGyY-8Qia4Y7-V2k5DniuW1Jgm8ov5j0~sI1zJk2RBy1j-VonvM0tCwwAc7U17AcYDMHfRfWqHDL62OLlHAvSYoHthd~mctzxVMKJo2vmgdVUpbLhpnaOnSg__' },
    { uri: 'https://s3-alpha-sig.figma.com/img/337a/22ae/49b350434fc9e50a9abb7351559ff374?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BAq~MJwQhMRVfwkfIa1kaSBiHG730qlg0bV~~KolTmp3mkXKn-elmHOvlrZpCIgVjMoMY~gn1EO-m1eiC6EuSV4QLH1mvUP7TtoemlpS9GHj-fcewTLmiwDDceBrnDo2cIVP-6aqY39HSlmnGTJh9FKd9MZ5BOya-q0J13YSR3xHnDCvyDqXim0zNuxh14fjn1p5aMb0~pAn1jZIhkbVXqGukdnCKHwGyY-8Qia4Y7-V2k5DniuW1Jgm8ov5j0~sI1zJk2RBy1j-VonvM0tCwwAc7U17AcYDMHfRfWqHDL62OLlHAvSYoHthd~mctzxVMKJo2vmgdVUpbLhpnaOnSg__' },
  ];

  const colors = ['Pink', 'Yellow', 'Blue'];
  const sizes = ['X', 'L', 'M']

  const popularItems = [

    { id: 1, title: 'Item 1', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/337a/22ae/49b350434fc9e50a9abb7351559ff374?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BAq~MJwQhMRVfwkfIa1kaSBiHG730qlg0bV~~KolTmp3mkXKn-elmHOvlrZpCIgVjMoMY~gn1EO-m1eiC6EuSV4QLH1mvUP7TtoemlpS9GHj-fcewTLmiwDDceBrnDo2cIVP-6aqY39HSlmnGTJh9FKd9MZ5BOya-q0J13YSR3xHnDCvyDqXim0zNuxh14fjn1p5aMb0~pAn1jZIhkbVXqGukdnCKHwGyY-8Qia4Y7-V2k5DniuW1Jgm8ov5j0~sI1zJk2RBy1j-VonvM0tCwwAc7U17AcYDMHfRfWqHDL62OLlHAvSYoHthd~mctzxVMKJo2vmgdVUpbLhpnaOnSg__' } },
    { id: 2, title: 'Item 2', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/902c/2ed6/848fbde49066a7244b1f4197b721c175?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgQpK~jDV3IopeXCIAw8m5sTwln45rWkENqh0V~BXL3GBjp5194SqeGFF6UDy0tnxstBVG6k91iYlAY0-w7AjUJNJtWBOLvroQjcUogKt~uSNI5~CwAljS~Rb3V9ikKQ53XbPXQ8I4DWIYadTxGzGea-Lb3A4MH5EjU~Hd1fZV3UpUE0YaT79at8BBnosQCON75S7KtmJ2Ex6xHjJiH37a8ufjJIViy5PJ5vpuK1NkuiNeCBbaiyhm4ohwHORvNEL~CDkj65jm5NNSQFp03u1BTzsHs7bTkY6DRWCr8uBRPdOnQgiipqv6-vS2ZaMeJHAzYM6n4reFZwkzZasyMBPw__' } },
    { id: 3, title: 'Item 2', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/902c/2ed6/848fbde49066a7244b1f4197b721c175?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgQpK~jDV3IopeXCIAw8m5sTwln45rWkENqh0V~BXL3GBjp5194SqeGFF6UDy0tnxstBVG6k91iYlAY0-w7AjUJNJtWBOLvroQjcUogKt~uSNI5~CwAljS~Rb3V9ikKQ53XbPXQ8I4DWIYadTxGzGea-Lb3A4MH5EjU~Hd1fZV3UpUE0YaT79at8BBnosQCON75S7KtmJ2Ex6xHjJiH37a8ufjJIViy5PJ5vpuK1NkuiNeCBbaiyhm4ohwHORvNEL~CDkj65jm5NNSQFp03u1BTzsHs7bTkY6DRWCr8uBRPdOnQgiipqv6-vS2ZaMeJHAzYM6n4reFZwkzZasyMBPw__' } },
    { id: 4, title: 'Item 2', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/902c/2ed6/848fbde49066a7244b1f4197b721c175?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgQpK~jDV3IopeXCIAw8m5sTwln45rWkENqh0V~BXL3GBjp5194SqeGFF6UDy0tnxstBVG6k91iYlAY0-w7AjUJNJtWBOLvroQjcUogKt~uSNI5~CwAljS~Rb3V9ikKQ53XbPXQ8I4DWIYadTxGzGea-Lb3A4MH5EjU~Hd1fZV3UpUE0YaT79at8BBnosQCON75S7KtmJ2Ex6xHjJiH37a8ufjJIViy5PJ5vpuK1NkuiNeCBbaiyhm4ohwHORvNEL~CDkj65jm5NNSQFp03u1BTzsHs7bTkY6DRWCr8uBRPdOnQgiipqv6-vS2ZaMeJHAzYM6n4reFZwkzZasyMBPw__' } },
    { id: 5, title: 'Item 2', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/902c/2ed6/848fbde49066a7244b1f4197b721c175?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgQpK~jDV3IopeXCIAw8m5sTwln45rWkENqh0V~BXL3GBjp5194SqeGFF6UDy0tnxstBVG6k91iYlAY0-w7AjUJNJtWBOLvroQjcUogKt~uSNI5~CwAljS~Rb3V9ikKQ53XbPXQ8I4DWIYadTxGzGea-Lb3A4MH5EjU~Hd1fZV3UpUE0YaT79at8BBnosQCON75S7KtmJ2Ex6xHjJiH37a8ufjJIViy5PJ5vpuK1NkuiNeCBbaiyhm4ohwHORvNEL~CDkj65jm5NNSQFp03u1BTzsHs7bTkY6DRWCr8uBRPdOnQgiipqv6-vS2ZaMeJHAzYM6n4reFZwkzZasyMBPw__' } },
    { id: 6, title: 'Item 2', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/902c/2ed6/848fbde49066a7244b1f4197b721c175?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgQpK~jDV3IopeXCIAw8m5sTwln45rWkENqh0V~BXL3GBjp5194SqeGFF6UDy0tnxstBVG6k91iYlAY0-w7AjUJNJtWBOLvroQjcUogKt~uSNI5~CwAljS~Rb3V9ikKQ53XbPXQ8I4DWIYadTxGzGea-Lb3A4MH5EjU~Hd1fZV3UpUE0YaT79at8BBnosQCON75S7KtmJ2Ex6xHjJiH37a8ufjJIViy5PJ5vpuK1NkuiNeCBbaiyhm4ohwHORvNEL~CDkj65jm5NNSQFp03u1BTzsHs7bTkY6DRWCr8uBRPdOnQgiipqv6-vS2ZaMeJHAzYM6n4reFZwkzZasyMBPw__' } },
    { id: 7, title: 'Item 2', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/902c/2ed6/848fbde49066a7244b1f4197b721c175?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgQpK~jDV3IopeXCIAw8m5sTwln45rWkENqh0V~BXL3GBjp5194SqeGFF6UDy0tnxstBVG6k91iYlAY0-w7AjUJNJtWBOLvroQjcUogKt~uSNI5~CwAljS~Rb3V9ikKQ53XbPXQ8I4DWIYadTxGzGea-Lb3A4MH5EjU~Hd1fZV3UpUE0YaT79at8BBnosQCON75S7KtmJ2Ex6xHjJiH37a8ufjJIViy5PJ5vpuK1NkuiNeCBbaiyhm4ohwHORvNEL~CDkj65jm5NNSQFp03u1BTzsHs7bTkY6DRWCr8uBRPdOnQgiipqv6-vS2ZaMeJHAzYM6n4reFZwkzZasyMBPw__' } },
  ];

  const relatedItems = [
    { id: 1, title: 'Item 1', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/32b2/fed3/dd6e97ca36cbcbf5ca57596f7c6547d3?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cMvCxnGq5IAD7O4TkGF6K30c0Xv8QNdC3CwdnW2Xagf37NzAxgGHXhr8CSQtgN26DLS9Oili5YHq9sa1c9hm78aWj7mV6PF4tIji2nj5U7PvgmkUaNd48yRMCD81pjA56Wb30~Rtxk22rsQxlgZOvMi9l9yK8EG9dKaQaFy0oIvxQIJhZFjHruWOSR-BRl~JOUPrbxLpguj-8~E1e11ykUWKDsCUIxAmy5Ngo0MGba2pAljqFpf5ZCv3cg4-MWTCwALie-kVsIDRnmQrZYtekWmljesj5IAHfDUVBa6nVCHINUrm0zsvAj0weYIeSm~kFd5OcLj84hkuIKbfC3nksQ__' } },
    { id: 2, title: 'Item 2', price: '$17.00', image: { uri: 'https://s3-alpha-sig.figma.com/img/32b2/fed3/dd6e97ca36cbcbf5ca57596f7c6547d3?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cMvCxnGq5IAD7O4TkGF6K30c0Xv8QNdC3CwdnW2Xagf37NzAxgGHXhr8CSQtgN26DLS9Oili5YHq9sa1c9hm78aWj7mV6PF4tIji2nj5U7PvgmkUaNd48yRMCD81pjA56Wb30~Rtxk22rsQxlgZOvMi9l9yK8EG9dKaQaFy0oIvxQIJhZFjHruWOSR-BRl~JOUPrbxLpguj-8~E1e11ykUWKDsCUIxAmy5Ngo0MGba2pAljqFpf5ZCv3cg4-MWTCwALie-kVsIDRnmQrZYtekWmljesj5IAHfDUVBa6nVCHINUrm0zsvAj0weYIeSm~kFd5OcLj84hkuIKbfC3nksQ__' } },

  ];

  const handleImageScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SIZES.width);
    setActiveImageIndex(index);
  };

  const [selectedItem, setSelectedItem] = useState(null);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.imageSlider}>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            onScroll={handleImageScroll}
            renderItem={({ item }) => (
              <Image source={item} style={styles.productImage} />
            )}
          />
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeImageIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.productInfo}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.price}>200.000đ</Text>
            <View style={styles.iconWrapper}>
              <Icon name='share-a' type='fontisto' size={14} color={"#B5A2A2"} />
            </View>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu
            mauris, scelerisque eu mauris id, pretium pulvinar sapien.
          </Text>
        </View>

        <View style={styles.variations}>
          <Text style={styles.sectionTitle}>Variations</Text>
          <FlatList
            data={colors}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  selectedColor === item && styles.selectedVariation,
                ]}
                onPress={() => setSelectedColor(item)}
              >
                <Text style={styles.variationText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <FlatList
            data={sizes}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.colorBox,
                  selectedSize === item && styles.selectedVariation,
                ]}
                onPress={() => setSelectedSize(item)}
              >
                <Text style={styles.variationText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <FlatList
            data={popularItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.popularItem,
                  selectedItem === item.id && styles.selectedItemBorder,
                ]}
                onPress={() => setSelectedItem(item.id)}
              >
                <Image source={item.image} style={styles.popularImage} />
              </TouchableOpacity>
            )}
          />

        </View>

        {/* Specifications */}
        <View style={styles.specifications}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: "600" }}>Material </Text>
          <View style={{ flexDirection: "row", gap: 10, marginVertical: 10, }}>

            <View style={styles.materialWrapper}>
              <Text style={{ color: "black", fontWeight: "500" }}> Cotton 95% </Text>
            </View>
            <View style={styles.materialWrapper}>
              <Text style={{ color: "black", fontWeight: "500" }}> Nylon 5%</Text>
            </View >

          </View>

          <Text style={{ color: 'black', fontSize: 18, fontWeight: "600", marginBottom: 10, }}>Origin </Text>
          <View style={[styles.materialWrapper, { backgroundColor: "#E5EBFC" }]}>
            <Text style={{ color: "black", fontWeight: "500" }}> EU </Text>
          </View>

        </View>

        {/* Delivery */}
        <View style={styles.delivery}>
          <Text style={styles.sectionTitle}>Delivery</Text>

          <View style={styles.deliveryWrapper}>
            <Text style={{ fontSize: 16, fontWeight: 500, width: 100, }}>Tiêu chuẩn</Text>
            <View style={styles.deliveryInfo}>
              <Text style={{ color: "#004CFF", fontWeight: "500", }}>3 - 5 ngày</Text>
            </View>
            <Text style={{ color: "black", fontWeight: "700", fontSize: 16 }}>30.000đ</Text>
          </View>

          <View style={styles.deliveryWrapper}>
            <Text style={{ fontSize: 16, fontWeight: 500, width: 100, }}>Hỏa Tốc</Text>
            <View style={styles.deliveryInfo}>
              <Text style={{ color: "#004CFF", fontWeight: "500", }}>1 - 2 ngày</Text>
            </View>
            <Text style={{ color: "black", fontWeight: "700", fontSize: 16 }}>60.000đ</Text>
          </View>


        </View>

        {/* Rating & Reviews */}
        <View style={styles.reviews}>
          <Text style={styles.sectionTitle}>Rating & Reviews</Text>
          {/* handle sau */}
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
              <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
              <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
              <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
              <Icon name='star' type='feather' color={"#ECA61B"} size={20} />
            </View>
            <View style={[styles.materialWrapper, { backgroundColor: "#E5EBFC", width: 60, height: 30 }]}>
              <Text style={{ fontWeight: 500, fontSize: 14 }}>4.5 / 5</Text>
            </View>
          </View>
          <View style={styles.reviewItem}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Image source={require('../../assets/images/default_avatar.jpg')} style={styles.reviewerImage} />
              <View>
                <Text style={{ fontWeight: "500", fontSize: 16 }} >Veronika</Text>
                <View style={{ flexDirection: "row" }}>
                  <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                  <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                  <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                  <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                  <Icon name='star' type='feather' color={"#ECA61B"} size={20} />
                </View>
              </View>
            </View>
            <Text style={{ fontSize: 15, marginLeft: 50, }}>Great product, loved it!</Text>
          </View>
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity style={styles.viewAllReviewsButton}>
              <Text style={styles.viewAllText}>View All Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* You Might Like */}
        <View style={styles.related}>
          <Text style={styles.sectionTitle}>You Might Like</Text>
          <FlatList
            data={relatedItems}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.relatedItem}>
                <Image source={item.image} style={styles.relatedImage} />
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.actions}>
        {/* <Icon name="heart" type="octicon" size={40} color={COLORS.black} /> */}
        <Icon name="heart-fill" type="octicon" size={40} color={COLORS.primary} />

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy now</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight + 12 || 0,
    paddingBottom: 50,
  },
  wrapper: {
    paddingBottom: 10,
  },
  imageSlider: {
    height: 300,
    width: "100%",
    position: 'relative',
  },
  productImage: {
    width: SIZES.width,
    height: 300,
    resizeMode: 'cover',
  },
  pagination: {
    bottom: 20,
    flexDirection: 'row',
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 24,
  },
  productInfo: {
    padding: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconWrapper: {
    backgroundColor: "#FFEBEB",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999
  },
  description: {
    fontSize: 15,
    color: 'black',
    marginTop: 8,
    textAlign: "justify"
  },
  variations: {
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorBox: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f5f5f5",
    marginRight: 8,
    borderRadius: 12,
  },
  selectedVariation: {
    backgroundColor: "#f8375869",
  },
  variationText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 500,
  },
  specifications: {
    padding: 16,
  },
  materialWrapper: {
    backgroundColor: "#FFEBEB",
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  delivery: {
    padding: 16,
  },
  deliveryWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#004CFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  deliveryInfo: {
    paddingHorizontal: 10,
    backgroundColor: "#E5EBFC",
    paddingVertical: 4,
    borderRadius: 20,
  },
  reviews: {
    padding: 16,
    width: "100%",
  },
  reviewItem: {
    // alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  viewAllReviewsButton: {
    backgroundColor: "#004CFF",
    padding: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  viewAllText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  popular: {
    padding: 16,
  },
  popularItem: {
    marginRight: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white"
  },
  selectedItemBorder: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
  },
  popularImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10
  },
  related: {
    padding: 16,
  },
  relatedItem: {
    marginRight: 16,
  },
  relatedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: "center",
    position: 'absolute',
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
  },
  addToCartButton: {
    width: 130,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 14,
  },
  buyNowButton: {
    width: 130,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 14,
  },
  addToCartText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buyNowText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});


