import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { COLORS, FONTS, SIZES } from '../constants'

export default function TextButton({ label, customContainerStyle, customLabelStyle, onPress }) {
    return (
        <TouchableOpacity
            style={{
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.green,
                ...customContainerStyle,
            }}
            onPress={onPress}
        >
            <Text
                style={{
                    color: "white",
                    ...FONTS.h3,
                    ...customLabelStyle,
                }}
            >{label}</Text>
        </TouchableOpacity>
    )
}