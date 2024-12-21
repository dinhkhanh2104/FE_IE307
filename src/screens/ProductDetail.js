import React, { useContext, useState, useEffect } from 'react';
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
import Toast from 'react-native-toast-message';
import { addToCart } from '../services/axios/actions/CartAction';

import AuthContext from '../contexts/AuthContext';
import { getProductByCategory } from '../services/axios/actions/ProductAction';
import { addToWishlist } from '../services/axios/actions/WishlistAction';


const ProductDetail = ({ route, navigation }) => {

  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState(new Set()); // Track selected items

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [navigation]);

  useEffect(() => {
    const fetchRelatedProduct = async () => {
      try {
        const data = await getProductByCategory(product.category)
        const randomData = [...data].sort(() => 0.5 - Math.random()).slice(0, 4);
        setRelatedProducts(randomData)

      }
      catch (error) {
        console.error(error)
      }
    }
    fetchRelatedProduct()
  }, []);

  const { fetchCart, fetchWishlist } = useContext(AuthContext)

  const { product } = route.params


  const images = [...product?.images, ...product?.variations.flatMap(variation => variation.images)]
  const price = product.variations[0].price

  const colors = product?.variations.map(variation => {
    const colorAttribute = variation.attributes.find(attr => attr.attributeName === "Màu sắc");
    return colorAttribute ? colorAttribute.values[0] : null;
  });

  const [selectedColor, setSelectedColor] = useState();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(price);
  const [selectedItem, setSelectedItem] = useState()
  const [showReviews, setShowReviews] = useState(false)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };



  const handleImageScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SIZES.width);
    setActiveImageIndex(index);
  };

  const selectedVariation = product?.variations.find(variation =>
    variation.attributes.some(attr => attr.attributeName === "Màu sắc" && attr.values.includes(selectedColor))
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const variation = product?.variations.find(variation =>
      variation.attributes.some(attr => attr.attributeName === "Màu sắc" && attr.values.includes(color))
    );
    if (variation) {
      setSelectedPrice(variation.price);
      setActiveImageIndex(0);
      setSelectedItem(variation)
    }
  };


  const handleAddToWishlist = async (productId) => {
    try {
      const response = await addToWishlist(productId)
      if (response.message === "Product already in wishlist") {
        Toast.show({
          type: 'info',
          text1: "Sản phẩm đã có trong danh sách yêu thích",
        });
      }
      else {
        Toast.show({
          type: 'success',
          text1: "Thêm vào danh sách yêu thích thành công",
        });
        await fetchWishlist()
        console.log("hihi");
        

      }
    }
    catch (error) {
      console.error("Error from detail: ", error.response.status);
      Toast.show({ type: 'error', text1: "Thêm vào danh sách yêu thích thất bại. Vui lòng thử lại." });
    }
  }

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(selectedItem.sku, product?._id)
      Toast.show({
        type: 'success',
        text1: "Add to cart successfully",
      });
      await fetchCart()
    }
    catch (error) {
      console.error("Error", error);
      Toast.show({ type: 'error', text1: "Add to cart failed. Please try again." });
    }
  }

  const handleBuyNow = async (params) => {
    const formattedData = [{
      quantity: 1,
      totalPrice: selectedPrice,
      price: selectedPrice,
      productName: product?.name,
      productId: product?._id,
      category: product?.category,
      variation: {
        sku: selectedItem.sku,
        price: selectedItem.price,
        stockQuantity: selectedItem.stockQuantity,
        attributes: selectedItem.attributes,
        images: selectedItem.images,
        features: [],
        specifications: []
      }
    }]

    navigation.navigate('CheckOut', { selectedCartItems: formattedData });
  }

  return (
    <>

      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.wrapper}
          showsVerticalScrollIndicator={false}
        >


          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={30} color={COLORS.black} />
          </TouchableOpacity>

          <View style={styles.imageSlider}>
            <FlatList
              data={selectedVariation ? selectedVariation.images : images}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              keyExtractor={(_, index) => index.toString()}
              onScroll={handleImageScroll}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.productImage} />
              )}
            />
            <View style={styles.pagination}>
              {selectedVariation ? selectedVariation.images.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, activeImageIndex === index && styles.activeDot]}
                />
              )) : images.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, activeImageIndex === index && styles.activeDot]}
                />
              ))}
            </View>
          </View>

          <View style={styles.productInfo}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.price}>{formatCurrency(selectedPrice)}</Text>
              <View style={styles.iconWrapper}>
                <Icon name='share-a' type='fontisto' size={14} color={"#B5A2A2"} />
              </View>
            </View>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product?.description}</Text>
          </View>

          {/* Phần màu sắc (variations) */}
          <View style={styles.variations}>
            <Text style={styles.sectionTitle}>Màu sắc</Text>
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
                  onPress={() => handleColorChange(item)}
                >
                  <Text style={styles.variationText}>{item}</Text>
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
              <View style={styles.materialWrapper}>
                <Text style={{ color: "black", fontWeight: "500" }}>Wool 80%</Text>
              </View >

            </View>

            <Text style={{ color: 'black', fontSize: 18, fontWeight: "600", marginBottom: 10, }}>Origin </Text>
            <View style={[styles.materialWrapper, { backgroundColor: "#E5EBFC" }]}>
              <Text style={{ color: "black", fontWeight: "500" }}> Viet Nam </Text>
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


            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                {
                  Array.from({ length: 5 }).map((_, index) => {
                    const isFullStar = index < Math.floor(product?.rating);
                    const isHalfStar = index === Math.floor(product?.rating) && product?.rating % 1 !== 0;

                    return (
                      <Icon
                        key={index}
                        name={isFullStar ? 'star' : isHalfStar ? 'star-half' : 'star-outline'}
                        type='Ionicons'
                        color={isFullStar || isHalfStar ? "#EDB310" : "#BBBBBB"}
                        size={20}
                      />
                    );
                  })
                }
              </View>
              <View style={[styles.materialWrapper, { backgroundColor: "#E5EBFC", width: 60, height: 30 }]}>
                <Text style={{ fontWeight: 500, fontSize: 14 }}>{product?.rating} / 5</Text>
              </View>

            </View>


            <View style={styles.reviewItem}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Image source={require('../../assets/images/avatar-1.jpg')} style={styles.reviewerImage} />
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
            {
              showReviews ? (
                <>
                  <View style={styles.reviewItem}>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <Image source={require('../../assets/images/avatar-2.jpg')} style={styles.reviewerImage} />
                      <View>
                        <Text style={{ fontWeight: "500", fontSize: 16 }} >Huệ Nguyễn</Text>
                        <View style={{ flexDirection: "row" }}>
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                        </View>
                      </View>
                    </View>
                    <Text style={{ fontSize: 15, marginLeft: 50, }}>Sản phẩm chất lượng cao, rất đáng trải nghiệm</Text>
                  </View>
                  <View style={styles.reviewItem}>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <Image source={require('../../assets/images/avatar-3.jpg')} style={styles.reviewerImage} />
                      <View>
                        <Text style={{ fontWeight: "500", fontSize: 16 }} >Khánh Đình</Text>
                        <View style={{ flexDirection: "row" }}>
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                          <Icon name='star' type='FontAwesome' color={"#ECA61B"} size={20} />
                        </View>
                      </View>
                    </View>
                    <Text style={{ fontSize: 15, marginLeft: 50, }}>Mình rất hài lòng khi mua sản phẩm</Text>
                  </View>
                </>

              ) : (<View></View>)
            }

            <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
              <TouchableOpacity style={styles.viewAllReviewsButton} onPress={() => (setShowReviews(!showReviews))}>
                <Text style={styles.viewAllText}> {!showReviews ? "View All Reviews" : "Hide All Reviews"}</Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* You Might Like */}
          <View style={styles.related}>
            <Text style={styles.sectionTitle}>Đề xuất dành cho bạn</Text>
            <FlatList
              data={relatedProducts}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.relatedItem}>
                  <Image source={{ uri: item.images[0] }} style={styles.relatedImage} />
                  <Text style={{ paddingLeft: 6 }}>
                    {item.name.length > 14 ? `${item.name.slice(0, 14)}...` : item.name}
                  </Text>
                  <Text style={{ color: COLORS.primary, fontWeight: '600', paddingLeft: 6 }}>{formatCurrency(item.variations[0].price)}</Text>
                </View>
              )}
            />
          </View>

        </ScrollView>

        {/* Buttons */}
        <View style={styles.actions}>
          {/* <Icon name="heart" type="octicon" size={40} color={COLORS.black} /> */}
          <TouchableOpacity onPress={() => handleAddToWishlist(product._id)}>
            <Icon name="heart-fill" type="octicon" size={40} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Buy now</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView >
      <Toast
        position='top'
      />
    </>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight + 12 || 0,
    // paddingBottom: 50,
  },
  wrapper: {
    paddingBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    opacity: 0.4,
    left: 5,
    padding: 10,
    borderRadius: 99,
    zIndex: 1,
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
    fontSize: 22,
    color: COLORS.primary,
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
  title: {
    fontSize: 20,
    fontWeight: "bold"
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
    marginRight: 10,
    width: 152,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "gray",
    paddingBottom: 10,
  },
  relatedImage: {
    width: 150,
    height: 150,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: "center",
    height: 70,
    // position: 'absolute',
    // backgroundColor: "white",
    // bottom: 0,
    // left: 0,
    // right: 0,
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


