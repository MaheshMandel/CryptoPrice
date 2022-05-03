import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, SIZES, FONTS, icons } from '../constants'

export default function PriceAlert({ customContainerStyle }) {
    return (
        <TouchableOpacity activeOpacity={0.9} style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.radius,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            backgroundColor: "white",
            borderRadius: SIZES.radius,
            ...customContainerStyle,
            ...styles.shadow,
        }}>

            <MaterialIcons name="notifications-active" size={30} color="orange" />
            <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ ...FONTS.h3 }}>Set Price Alert</Text>
                <Text style={{ ...FONTS.body4 }}>Get Notified When Your Coins Are Moving</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={25} color="gray" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    }
})