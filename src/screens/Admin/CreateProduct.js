import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; //
import { COLORS } from '../../constants/theme';
import { createProduct } from '../../services/axios/actions/ProductAction';
import { getCategories } from '../../services/axios/actions/Categories';

const CreateProduct = () => {
  const [product, setProduct] = useState({
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
        images: ["no_thing"],
        attributes: [{ attributeName: '', values: [''] }],
        features: [{ featureName: '', description: '' }],
        specifications: [{ specName: '', specValue: '' }],
      },
    ],
  });

  const sample = {
    spu: "CLO-001@",
    name: "Áo sơ mi nam CoolWear",
    description: "Áo sơ mi nam CoolWear với chất liệu cotton cao cấp, kiểu dáng hiện đại, phù hợp cho mọi dịp.",
    category: "67591ec2661c9d22b4bdeaa4",
    brand: "CoolWear",
    rating: 4.7,
    images: ["https://example.com/images/ao-so-mi.jpg"],
    variations: [
      {
        sku: "CLO-001@-BLACK-M",
        attributes: [
          {
            attributeName: "Màu sắc",
            values: ["Đen"]
          },
          {
            attributeName: "Kích thước",
            values: ["M"]
          }
        ],
        price: 450000,
        stockQuantity: 100,
        images: ["https://example.com/images/ao-so-mi-black-m.jpg"],
        features: [
          {
            featureName: "Chất liệu",
            description: "Chất liệu cotton 100%, thoáng mát, mềm mại."
          },
          {
            featureName: "Kiểu dáng",
            description: "Kiểu dáng ôm vừa vặn, phù hợp với phong cách trẻ trung."
          }
        ],
        specifications: [
          {
            specName: "Màu sắc",
            specValue: "Đen"
          },
          {
            specName: "Chất liệu",
            specValue: "Cotton"
          }
        ]
      },
      {
        sku: "CLO-001@-WHITE-L",
        attributes: [
          {
            attributeName: "Màu sắc",
            values: ["Trắng"]
          },
          {
            attributeName: "Kích thước",
            values: ["L"]
          }
        ],
        price: 460000,
        stockQuantity: 80,
        images: ["https://example.com/images/ao-so-mi-white-l.jpg"],
        features: [
          {
            featureName: "Chất liệu",
            description: "Chất liệu cotton 100%, thoáng mát, mềm mại."
          },
          {
            featureName: "Kiểu dáng",
            description: "Kiểu dáng ôm vừa vặn, phù hợp với phong cách trẻ trung."
          }
        ],
        specifications: [
          {
            specName: "Màu sắc",
            specValue: "Trắng"
          },
          {
            specName: "Chất liệu",
            specValue: "Cotton"
          }
        ]
      }
    ]
  };


  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories()
        // console.log(response)
        setCategories(response);
      }
      catch (error) {
        console.log("Error: ", error)
      }
    };

    fetchCategories();
  }, []);

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
          features: [{ featureName: '', description: '' }],
          specifications: [{ specName: '', specValue: '' }],
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
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

        <View style={styles.field}>
          <Text style={styles.label}>Mô tả:</Text>
          <TextInput
            style={styles.input}
            value={product.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Danh mục:</Text>
          <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6 }}>
            <Picker
              selectedValue={product.category}
              onValueChange={(itemValue) => handleInputChange('category', itemValue)}
            // style={styles.picker}
            >
              <Picker.Item label="Chọn danh mục" value="" />
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category.name} value={category._id} />
              ))}
            </Picker>

          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Thương hiệu:</Text>
          <TextInput
            style={styles.input}
            value={product.brand}
            onChangeText={(text) => handleInputChange('brand', text)}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Đánh giá:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={product.rating.toString()}
            onChangeText={(text) => handleInputChange('rating', text === '' ? '' : parseFloat(text))}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Link ảnh:</Text>
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
            <View style={styles.field}>
              <Text style={styles.label}>Mã SKU:</Text>
              <TextInput
                style={styles.input}
                value={variation.sku}
                onChangeText={(text) => handleVariationChange(index, 'sku', text)}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Giá:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={variation.price.toString()}
                onChangeText={(text) =>
                  handleVariationChange(index, 'price', text === '' ? '' : parseFloat(text))
                }
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Số lượng kho:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={variation.stockQuantity.toString()}
                onChangeText={(text) =>
                  handleVariationChange(index, 'stockQuantity', text === '' ? '' : parseInt(text))
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
  picker: {
    borderWidth: 10,
    borderColor: "red"
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
    backgroundColor: "grey",
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
