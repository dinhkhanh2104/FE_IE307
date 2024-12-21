import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/axios/actions/ProductAction';
import { getCategories } from '../services/axios/actions/Categories';
import Card from '../components/Card';
import { COLORS } from '../constants/theme';
import Loading from '../components/Loading';

const Categories = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryChoosen, setCategoryChoosen] = useState(null);

  const directProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);

        if (categoriesData.length > 0) {
          setCategoryChoosen(categoriesData[0]._id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryChoosen) {
      const dataFilter = products.filter(
        (product) => product.category === categoryChoosen
      );
      setFilteredProducts(dataFilter);

    }
  }, [categoryChoosen, products]);


  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (<Loading />) : (
        <>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.categoryWrapper}
            horizontal
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => setCategoryChoosen(item._id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                />
                <Text
                  style={{
                    fontWeight: '500',
                    color: categoryChoosen === item._id ? COLORS.primary : 'black'
                  }}
                >{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <FlatList
            style={{ paddingVertical: 10 }}
            data={filteredProducts}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={
              ({ item }) => <Card data={item} onPress={() => { directProductDetail(item) }} />
            }
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: StatusBar.currentHeight + 20 || 0,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  categoryWrapper: {
    marginBottom: 15,
    height: 150,
  },
  categoryItem: {
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 9,
    gap: 10,
  },
  categoryImage: {
    width: 74,
    height: 74,
    borderRadius: 999,
  },
});
