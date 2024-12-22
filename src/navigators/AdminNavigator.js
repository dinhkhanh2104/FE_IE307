import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import Order from '../screens/Admin/Order';
import Product from '../screens/Admin/Product';
import User from '../screens/Admin/User';
import Voucher from '../screens/Admin/Voucher';
import { StatusBar, Image } from 'react-native';
import { COLORS } from '../constants/theme';

const Drawer = createDrawerNavigator();

const AdminNavigator = () => {
  

  return (
    <>
      <Drawer.Navigator
        initialRouteName="Product"
        screenOptions={{
          title: '',
          headerShown: true,
          headerStyle: {
            height: StatusBar.currentHeight + 50,
            backgroundColor: 'white',
            borderBottomWidth: 0.3,
            borderBottomColor: "#333",
            elevation: 0,
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/logo_home.png')}
              style={{ width: 100, height: 50 }}
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-around", gap: 10, paddingRight: 20 }}>
              <TouchableOpacity  style={{width: 28, height: 28, backgroundColor: COLORS.lightGray, borderRadius: 999, justifyContent: "center", alignItems: "center"}}>
                <Icon name="bell" type="feather" size={18} color="white" />
              </TouchableOpacity>
              <Image
                source={require("../../assets/images/admin-avatar.jpg")} 
                style = {{width: 40, height: 40, borderRadius: 999, }}
              />
            </View>
          ),
        }}
      >
        <Drawer.Screen
          name="Product"
          component={Product}
        />
        <Drawer.Screen
          name="Order"
          component={Order}
        />
        <Drawer.Screen
          name="User"
          component={User}
        />
        <Drawer.Screen
          name="Voucher"
          component={Voucher}
        />
      </Drawer.Navigator>

      
    </>
  );
};

const styles = StyleSheet.create({
 
});

export default AdminNavigator;