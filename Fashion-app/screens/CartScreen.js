import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Alert, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
                setCartItems(cart);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCartItems();
    }, []);

    const removeFromCart = async (productId) => {
        try {
            let cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== productId);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            setCartItems(cart);
            Alert.alert('Success', 'Product removed from cart');
        } catch (error) {
            console.error(error);
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
                <Text style={styles.cartItemPrice}>${item.price}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style = {{alignItems: 'flex-end'}}>
                    <Image source={require('../assets/remove.png')} style = {styles.removeImage}/>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
         <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
             <Image source={require('../assets/Menu.png')} style={styles.icon} />
            </TouchableOpacity>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
                <Image source={require('../assets/Search.png')} style={styles.icon} />
         </View>
            <Text style={styles.text}>Checkout</Text>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <View style={styles.diamond} />
                <View style={styles.line} />
            </View>
         <ScrollView>
             <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.cartList}
             />
             <View style={styles.totalContainer}>
                <Text style = {styles.text2}>EST. TOTAL</Text>
                <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
             </View>

        </ScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop:30,
        
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 108,
       
    },
    logo:{
        resizeMode:'stretch',
        marginLeft: 12,
            
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 20,
        letterSpacing: 7,
        textAlign: 'center',
        marginBottom: 10,
    },
    text2: {
        fontSize: 20,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 2,
        backgroundColor: 'gray',
        width: 70,
    },
    diamond: {
        width: 10,
        height: 10,
        backgroundColor: 'white',
        transform: [{ rotate: '45deg' }],
        marginHorizontal: 10,
        borderWidth: 3,
        borderColor: 'black',
    },
    cartList: {
        paddingVertical: 20,
        marginTop: 10, 
        paddingRight: 12,
    },
    cartItemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
       
    },
    image: {
        borderRadius: 10,
    
    },

    cartItemDetails: {
        flex: 1,
        marginLeft: 5,
        justifyContent: 'center',

    },
    cartItemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cartItemPrice: {
        fontSize: 18,
        color: '#f00',
        marginVertical: 5,
    },
    productDescription: {
        fontSize: 17,
        color: '#666',
        marginTop: 5,
    },
    removeImage: {
        width: 20,
        height: 20,
        top: 37,
    },
    totalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
       
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'pink',
        
    },
  
});
