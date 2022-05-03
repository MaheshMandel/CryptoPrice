import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { COLORS, SIZES, FONTS, icons } from '../constants'

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'

export default function HeaderBar({ right }) {

    const navigation = useNavigation()

    return (
        <View
            style={{
                paddingHorizontal: SIZES.padding,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
            }}
        >
            <View>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
                    onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={25} color="gray" />
                    <Text style={{
                        marginLeft: SIZES.base, ...FONTS.h2, color: "gray",
                    }}>Back</Text>
                </TouchableOpacity>
            </View>

            {right && (
                <TouchableOpacity>
                    <AntDesign name="star" size={30} color="gold" />
                </TouchableOpacity>
            )}

        </View>
    )
}