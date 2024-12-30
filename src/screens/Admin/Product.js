import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Modal, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProducts, updateProduct } from '../../services/axios/actions/ProductAction';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getCategories } from '../../services/axios/actions/Categories';
import { Picker } from '@react-native-picker/picker';
import Loading from '../../components/Loading';

const Product = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (key, value) => {
    setSelectedProduct((prev) => ({
      ...prev,
      [key]: key === 'rating' && value === '' ? 0 : value,
    }));
  };

  const handleVariationChange = (index, key, value, subIndex = null, subKey = null) => {
    const updatedVariations = selectedProduct.variations.map((variation, i) => {
      if (i !== index) return variation;

      if (subIndex !== null && subKey) {
        return {
          ...variation,
          [key]: variation[key].map((item, idx) =>
            idx === subIndex ? { ...item, [subKey]: value } : item
          ),
        };
      }

      return {
        ...variation,
        [key]: (key === 'price' || key === 'stockQuantity') && value === '' ? 0 : value,
      };
    });

    setSelectedProduct((prev) => ({
      ...prev,
      variations: updatedVariations,
    }));
  };

  const handleUpdateProduct = async () => {
    const updatedProduct = {
      ...selectedProduct,
      variations: selectedProduct.variations.map((variation) => ({
        ...variation,
        price: parseFloat(variation.price) || 0,
        stockQuantity: parseInt(variation.stockQuantity) || 0,
      })),
    };

    try {
      await updateProduct(updatedProduct); // Cập nhật sản phẩm qua API
      console.log(updateProduct)
      Alert.alert('Thành công', 'Đã cập nhật sản phẩm thành công!');
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      Alert.alert('Thất bại', 'Không thể cập nhật sản phẩm!');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerSection}>
            <Text style={styles.header}>Products</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("CreateProduct") }} style={styles.button}>
              <AntDesign name="plus" size={17} color="white" />
              <Text style={{ fontSize: 16, fontWeight: '500', color: "white" }}>Add Product</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productSection}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.spu}
                style={styles.card}
                onPress={() => handleEditProduct(product)}
              >
                <Image source={{ uri: product.images[0] }} style={styles.cardImage} />
                <View style={{ width: 180 }}>
                  <Text style={styles.cardTitle}>{product.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Modal chỉnh sửa sản phẩm */}
          {selectedProduct && (
            <Modal visible={isModalVisible} animationType="slide" onRequestClose={handleCloseModal}>
              <ScrollView contentContainerStyle={styles.modalContainer}>
                <Text style={styles.title}>Chỉnh sửa sản phẩm</Text>

                {/* Các trường thông tin cơ bản */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>SPU</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedProduct.spu}
                    editable={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Tên sản phẩm</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedProduct.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mô tả sản phẩm</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedProduct.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Danh mục</Text>
                  <Picker
                    selectedValue={selectedProduct.category}
                    onValueChange={(itemValue) => handleInputChange('category', itemValue)}
                  >
                    {categories.map((category, index) => (
                      <Picker.Item key={index} label={category.name} value={category._id} />
                    ))}
                  </Picker>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Thương hiệu</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedProduct.brand}
                    onChangeText={(text) => handleInputChange('brand', text)}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Đánh giá</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedProduct.rating.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange('rating', text === '' ? '' : parseFloat(text))}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Ảnh sản phẩm</Text>
                  <TextInput
                    style={styles.input}
                    value={selectedProduct.images[0]}
                    onChangeText={(text) => handleInputChange('images', [text])}
                  />
                </View>

                {/* Các biến thể */}
                {selectedProduct.variations.map((variation, index) => (
                  <View key={index} style={styles.variation}>
                    <Text style={styles.subtitle}>Biến thể {index + 1}</Text>
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>SKU</Text>
                      <TextInput
                        style={styles.input}
                        value={variation.sku}
                        onChangeText={(text) => handleVariationChange(index, 'sku', text)}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Giá</Text>
                      <TextInput
                        style={styles.input}
                        value={variation.price.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) => handleVariationChange(index, 'price', text === '' ? '' : parseFloat(text))}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Số lượng tồn kho</Text>
                      <TextInput
                        style={styles.input}
                        value={variation.stockQuantity.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) => handleVariationChange(index, 'stockQuantity', text === '' ? '' : parseInt(text))}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Ảnh biến thể</Text>
                      <TextInput
                        style={styles.input}
                        value={variation.images[0]}
                        onChangeText={(text) => handleVariationChange(index, 'images', [text])}
                      />
                    </View>

                    {variation.attributes.map((attribute, attrIndex) => (
                      <View key={attrIndex}>
                        <View style={styles.inputGroup}>
                          <Text style={styles.label}>Tên thuộc tính</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Tên thuộc tính"
                            value={attribute.attributeName}
                            onChangeText={(text) =>
                              handleVariationChange(index, 'attributes', text, attrIndex, 'attributeName')
                            }
                          />
                        </View>

                        <View style={styles.inputGroup}>
                          <Text style={styles.label}>Giá trị thuộc tính</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Giá trị thuộc tính"
                            value={attribute.values[0]}
                            onChangeText={(text) =>
                              handleVariationChange(index, 'attributes', [text], attrIndex, 'values')
                            }
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                ))}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleUpdateProduct} style={[styles.button, styles.submitButton]}>
                    <Text style={styles.buttonText}>Cập nhật</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCloseModal} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Modal>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Product;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#8c5ff8",
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 10
  },
  card: {
    backgroundColor: "white",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    gap: 20,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: "justify"
  },
  productSection: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    elavation: 4
  },
  modalContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  lockedField: {
    color: '#ff4d4d', // Màu đỏ để làm nổi bật
  },
  lockedInput: {
    backgroundColor: '#f5f5f5', // Màu nền nhạt cho các trường không thể sửa
    borderColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    marginBottom: 15,
  },
  variationContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
    elevation: 1,
    borderWidth: 1,
    borderRadius: 8,
  },
  variationLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  variationAttribute: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#8c5ff8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: '500',
  },
  subtitle: {
    fontWeight: "500",
    fontSize: 16,
    color: "red",
    marginVertical: 10
  }
});