import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionHistory from '../Components/TransactionHistory'
import { dummyData } from '../constants';
import HeaderBar from '../Components/HeaderBar';

import CurrencyLabel from '../Components/CurrencyLabel';
import TextButton from '../Components/TextButton';

import { SIZES, FONTS, } from '../constants';

export default function Transaction({ route, navigation }) {


    const { currency } = route.params;

    const renderCurrencyCard = () => {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: "white",
                ...styles.shadow,
                paddingHorizontal: SIZES.padding,
                paddingLeft: SIZES.padding,

            }}>
                <View style={{
                    marginVertical: SIZES.padding,
                }}>
                    <CurrencyLabel icon={currency?.image} currency={currency.currency} code={currency.code} />
                    <View style={{
                        marginVertical: SIZES.padding,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{ ...FONTS.h1 }}>{`${currency.wallet.crypto} ${currency.code}`}</Text>
                        <Text style={{ ...FONTS.body3, color: "gray", }}>${currency.wallet.value}</Text>
                    </View>
                    <TextButton label={"Trade"} onPress={() => navigation.navigate("Transaction", { currency: currency })} />
                </View>
            </View>
        )
    }

    const renderTransaction = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingBottom: SIZES.padding,
            }}>
                <View style={{
                    marginBottom: SIZES.padding,
                }}>
                    <TransactionHistory customStyledComponent={styles.shadow} tranHistory={currency.transactionHistory} />
                </View>

            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                paddingBottom: SIZES.padding,
            }}>
                <HeaderBar />
                {renderCurrencyCard()}
            </View>
            {renderTransaction()}
        </SafeAreaView>
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