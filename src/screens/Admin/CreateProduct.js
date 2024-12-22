import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../../constants/theme';
import { createProduct } from '../../services/axios/actions/ProductAction';
import { getCategories } from '../../services/axios/actions/Categories';
import { useNavigation } from '@react-navigation/native';
import { goBack } from 'expo-router/build/global-state/routing';

const CreateProduct = () => {

  const navigation = useNavigation()
  const [product, setProduct] = useState({
    spu: '',
    spu: '',
    name: '',
    description: '',
    category: '',
    brand: '',
    rating: 0,
    images: [''],
    variations: [
      {
        sku: '',
        price: 0,
        stockQuantity: 0,
        images: [""],
        attributes: [{ attributeName: '', values: [''] }],
      },
    ],
  });

  
  const [categories, setCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories()
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleVariationChange = (index, key, value) => {
    const updatedVariations = product.variations.map((variation, i) =>
      i === index
        ? {
            ...variation,
            [key]:
              key === 'price' || key === 'stockQuantity'
                ? value === '' || isNaN(value)
                  ? 0
                  : parseFloat(value)
                : value,
          }
        : variation
    );
    setProduct((prev) => ({
      ...prev,
      variations: updatedVariations,
    }));
  };

  const handleNestedChange = (key, variationIndex, itemIndex, field, value) => {
    const updatedVariations = product.variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            [key]: variation[key].map((item, j) =>
              j === itemIndex ? { ...item, [field]: value } : item
            ),
          }
        : variation
    );
    setProduct((prev) => ({ ...prev, variations: updatedVariations }));
  };

  const handleImageChange = (variationIndex, imgIndex, value) => {
    const updatedVariations = product.variations.map((variation, i) =>
      i === variationIndex
        ? {
            ...variation,
            images: variation.images.map((img, j) => (j === imgIndex ? value : img)),
          }
        : variation
    );
    setProduct((prev) => ({ ...prev, variations: updatedVariations }));
  };

  const handleAddImage = (variationIndex) => {
    const updatedVariations = product.variations.map((variation, i) =>
      i === variationIndex
        ? { ...variation, images: [...variation.images, ''] }
        : variation
    );
    setProduct((prev) => ({ ...prev, variations: updatedVariations }));
  };

  const handleAddVariation = () => {
    setProduct((prev) => ({
      ...prev,
      variations: [
        ...prev.variations,
        {
          sku: '',
          price: 0,
          stockQuantity: 0,
          attributes: [{ attributeName: '', values: [''] }],
        },
      ],
    }));
  };

  const handleInputChange = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      [key]: key === 'rating' && value === '' ? 0 : value, // Đặt giá trị mặc định là 0 nếu trống
    }));
  };


  const handleVariationChange = (index, key, value) => {
    const updatedVariations = product.variations.map((variation, i) =>
      i === index
        ? {
          ...variation,
          [key]: (key === 'price' || key === 'stockQuantity') && value === ''
            ? 0 // Đặt giá trị mặc định là 0 nếu trống
            : value,
        }
        : variation
    );
    setProduct((prev) => ({
      ...prev,
      variations: updatedVariations,
    }));
  };


  const handleSubmit = async () => {
    // Alert.alert('Product Submitted', JSON.stringify(product, null, 2));

    try {
      // const response = await createProduct(product)
      const response = await createProduct(sample)
      console.log("createProduct:", response);
    }
    catch (error) {
      console.error("Lỗi mẹ ồi: ", error)
    }


  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Thêm Sản Phẩm</Text>

        {/* Basic Fields */}
        <View style={styles.field}>
          <Text style={styles.label}>Tên sản phẩm:</Text>
          <TextInput
            style={styles.input}
            value={product.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.label}>Mô tả:</Text>
          <TextInput
            style={styles.input}
            value={product.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
        </View>

        {/* Category */}
        <View style={styles.field}>
          <Text style={styles.label}>Danh mục:</Text>
          <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6 }}>
            <Picker
              selectedValue={product.category}
              onValueChange={(itemValue) => handleInputChange('category', itemValue)}
            >
              <Picker.Item label="Chọn danh mục" value="" />
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category.name} value={category._id} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Brand */}
        <View style={styles.field}>
          <Text style={styles.label}>Thương hiệu:</Text>
          <TextInput
            style={styles.input}
            value={product.brand}
            onChangeText={(text) => handleInputChange('brand', text)}
          />
        </View>

        {/* Rating */}
        <View style={styles.field}>
          <Text style={styles.label}>Đánh giá:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={product.rating.toString()}
            onChangeText={(text) => handleInputChange('rating', parseFloat(text))}
          />
        </View>

        {/* Images */}
        <View style={styles.field}>
          <Text style={styles.label}>Link ảnh sản phẩm:</Text>
          <TextInput
            style={styles.input}
            value={product.images[0]}
            onChangeText={(text) =>
              setProduct((prev) => ({
                ...prev,
                images: [text],
              }))
            }
          />
        </View>

        {/* Variations */}
        {product.variations.map((variation, index) => (
          <View key={index} style={styles.variation}>
            <Text style={styles.subtitle}>Biến thể {index + 1}</Text>

            {/* SKU */}
            <View style={styles.field}>
              <Text style={styles.label}>Mã SKU:</Text>
              <TextInput
                style={styles.input}
                value={variation.sku}
                onChangeText={(text) => handleVariationChange(index, 'sku', text)}
              />
            </View>

            {/* Giá */}
            <View style={styles.field}>
              <Text style={styles.label}>Giá:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={variation.price.toString()}
                onChangeText={(text) => handleVariationChange(index, 'price', parseFloat(text))}
              />
            </View>

            {/* Số lượng kho */}
            <View style={styles.field}>
              <Text style={styles.label}>Số lượng kho:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={variation.stockQuantity.toString()}
                onChangeText={(text) =>
                  handleVariationChange(index, 'stockQuantity', parseInt(text))
                }
              />
            </View>
          </View>
        ))}


        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddVariation} style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>Thêm Biến Thể</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
            <Text style={styles.buttonText}>Tạo Sản Phẩm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  variation: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '45%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'grey',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateProduct;
