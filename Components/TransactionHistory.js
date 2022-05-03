import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { COLORS, FONTS, icons, SIZES } from '../constants'

import { MaterialIcons } from '@expo/vector-icons';

export default function transactionHistory({ customStyledComponent, tranHistory }) {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: SIZES.base,
                justifyContent: "space-between",
            }}
            onPress={() => console.log(item)}
        >
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: SIZES.base,
            }}>
                <MaterialIcons name="compare-arrows" size={35} color="black" />
                <View style={{
                    marginLeft: SIZES.radius,
                }}>
                    <Text style={{ ...FONTS.h3 }}>{item.description}</Text>
                    <Text style={{ ...FONTS.body4 }}>{item.date}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                height: "100%",
                alignItems: "center",
            }}>
                <Text style={{
                    color: item.amount > 0 ? COLORS.green : COLORS.red, ...FONTS.h3
                }}>{item.amount}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
            </View>


        </TouchableOpacity>
    )

    return (
        <View>
            <View style={{
                marginHorizontal: SIZES.radius,
                backgroundColor: COLORS.white,
                padding: 20,
                borderRadius: SIZES.radius,
                ...customStyledComponent,
                paddingBottom: 20,
            }}>
                <Text style={{ ...FONTS.h2 }}>Transaction History</Text>
                <FlatList
                    contentContainerStyle={{ marginTop: SIZES.radius }}
                    data={tranHistory}
                    scrollEnabled={false}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: "100%", height: 1, backgroundColor: COLORS.lightGray }} />}
                />
            </View>
        </View>
    )
}