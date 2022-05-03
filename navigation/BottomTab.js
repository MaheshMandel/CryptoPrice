import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

//Vector Icons
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Home from "../Screens/Home";
import Portfolio from "../Screens/Portfolio";
import Transaction from "../Screens/Transaction";
import Prices from "../Screens/Prices";
import Settings from "../Screens/Settings";
import Trans from "../Screens/Trans";

import { COLORS, FONTS, SIZES } from "../constants";

const Tab = createBottomTabNavigator()

export default function BottomTab() {
    const TabBarCustomButton = ({ children, onPress }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} style={{
                top: -30,
                justifyContent: "center",
                alignItems: "center",
            }} onPress={onPress}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]} style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                    }}>
                    {children}
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: "white",
                    borderTopColor: "transparent",
                    height: 80,
                },
            }}
            initialRouteName={"Home"}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center", justifyContent: "center", }}>
                            <Entypo name="home" size={30} resizeMode="contain" color={focused ? COLORS.primary : COLORS.black} />
                            <Text style={{
                                color: focused ? COLORS.primary : COLORS.black,
                                fontSize: SIZES.body5,
                            }}>HOME</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="Portfolio" component={Portfolio} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center", }}>
                        <AntDesign name="piechart" size={30} color={focused ? COLORS.primary : COLORS.black} />
                        <Text style={{
                            color: focused ? COLORS.primary : COLORS.black,
                            fontSize: SIZES.body5,
                        }}>PORTFOLIO</Text>
                    </View>
                )
            }}
            />
            <Tab.Screen
                name="Trans"
                component={Trans}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="compare-arrows" size={45} color="white" />
                    ),
                    tabBarButton: props => (<TabBarCustomButton {...props} />),

                }}
            />
            <Tab.Screen name="Prices" component={Prices} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center", }}>
                        <Entypo name="line-graph" size={30} color={focused ? COLORS.primary : COLORS.black} />
                        <Text style={{
                            color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5,
                        }}>PRICES</Text>
                    </View>
                )
            }}
            />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center", }}>
                        <Ionicons name="settings-sharp" size={30} color={focused ? COLORS.primary : COLORS.black} />
                        <Text style={{
                            color: focused ? COLORS.primary : COLORS.black,
                            fontSize: SIZES.body5,
                        }}>SETTINGS</Text>
                    </View>
                )
            }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})