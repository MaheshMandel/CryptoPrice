import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    StyleSheet,
} from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { Ionicons } from '@expo/vector-icons';

import { COLORS, dummy, dummyData, FONTS, icons, images, index, SIZES, theme } from '../constants'
import React from 'react'
import PriceAlert from '../Components/PriceAlert';
import TransactionHistory from '../Components/TransactionHistory';



import * as SplashScreen from 'expo-splash-screen';

export default function Home({ navigation }) {

    const [transactionHistory, setTransactionHistory] = React.useState(dummyData.transactionHistory);

    const renderHeader = () => {

        return (
            <View style={{
                width: "100%",
                height: 400,
                ...styles.shadow,
            }}>
                <StatusBar />
                <ImageBackground source={images.banner} resizeMode="cover" style={{
                    flex: 1,
                    alignItems: "center",

                }}>

                    {/* HeaderBAr Section */}
                    <View style={{
                        marginTop: SIZES.padding * 2,
                        width: "100%",
                        alignItems: "flex-end",
                        paddingHorizontal: SIZES.padding,

                    }}>
                        <TouchableOpacity activeOpacity={0.8} style={{
                            width: 35,
                            height: 35,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                            onPress={() => console.log("Notification on Pressed")}>

                            <Ionicons name="md-notifications-outline" size={24} color="white" style={{ flex: 1 }} />

                        </TouchableOpacity>

                    </View>

                    {/* Balance Section  */}
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{
                            color: "white",
                            fontFamily: "Roboto-Bold",
                            fontSize: 16,
                            lineHeight: 22,
                        }}>Your Portfolio Balance</Text>
                        <Text style={{
                            marginTop: 8,
                            color: "white",
                            fontFamily: "Roboto-Black",
                            fontSize: 30,
                            lineHeight: 36,
                        }}>${dummyData.portfolio.balance}</Text>
                        <Text style={{
                            color: "white",
                            fontFamily: "Roboto-Regular",
                            fontSize: 12,
                            lineHeight: 22,
                        }}>{dummyData.portfolio.changes} Last 24 hours</Text>
                    </View>

                    {/* Tranding Section  */}
                    <View style={{
                        position: "absolute",
                        bottom: 20,
                    }}>
                        <Text style={{
                            marginLeft: 24,
                            color: "white",
                            fontFamily: "Roboto-Bold",
                            fontSize: 22,
                            lineHeight: 30
                        }}>
                            Trending
                        </Text>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
                            marginTop: SIZES.base,
                        }}>
                            {dummyData.trendingCurrencies.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    style={{
                                        width: 165,
                                        paddingVertical: SIZES.padding,
                                        paddingHorizontal: SIZES.padding,
                                        marginLeft: index === 0 ? SIZES.padding : 0,
                                        marginRight: SIZES.radius,
                                        borderRadius: 10,
                                        backgroundColor: "white",
                                    }}
                                    onPress={() => navigation.navigate("CryptoDetails", { currency: item })}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View>
                                            <Image source={item.image}
                                                resizeMode="cover"
                                                style={{
                                                    marginTop: 5,
                                                    width: 25,
                                                    height: 25,
                                                }} />
                                        </View>
                                        <View style={{ marginLeft: SIZES.font }}>
                                            <Text style={{
                                                ...FONTS.h2
                                            }}>{item.currency}</Text>
                                            <Text style={{
                                                color: "gray", ...FONTS.body3,
                                            }}>{item.code}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        marginTop: 12,
                                    }}>
                                        <Text style={{
                                            ...FONTS.h2
                                        }}>${item.amount}</Text>
                                        <Text style={{
                                            color: item.type === "I" ? COLORS.green : COLORS.red, ...FONTS.h3,
                                        }}>{item.changes}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    const renderAlert = () => {
        return <PriceAlert />
    }

    const renderNotice = () => {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginBottom: SIZES.padding,
                marginHorizontal: SIZES.radius,
                padding: 20,
                backgroundColor: COLORS.secondary,
                borderRadius: 12,
                ...styles.shadow,
            }}>
                <Text style={{
                    color: "white", ...FONTS.h3,
                }}>Investing Safety</Text>
                <Text style={{
                    marginTop: SIZES.base,
                    color: "white",
                    ...FONTS.body4,
                    lineHeight: 18,
                }}>It's Very difficult to time an Investment, especially when the market is volatile. Learn how to dollar cost averaging to your advantage.</Text>
                <TouchableOpacity>
                    <Text style={{
                        textDecorationLine: "underline",
                        marginTop: SIZES.base,
                        color: COLORS.green,
                        ...FONTS.h3,
                    }}>Learn More</Text>
                </TouchableOpacity>

            </View>
        )
    }

    const renderTransactionHistory = () => {
        return <TransactionHistory customStyledComponent={styles.shadow} tranHistory={transactionHistory} />
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, paddingBottom: 130 }}>
                {renderHeader()}
                {renderAlert()}
                {renderNotice()}
                {renderTransactionHistory()}
            </View>
        </ScrollView>
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