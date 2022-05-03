import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
} from 'react-native'
import React, { useState } from 'react'


import { MaterialIcons } from '@expo/vector-icons';
import PriceAlert from '../Components/PriceAlert';

import { SafeAreaView } from 'react-native-safe-area-context';

//For Graph
import {
    VictoryScatter,
    VictoryLine,
    VictoryChart,
    VictoryAxis
} from "victory-native";

import VictoryCustomTheme from '../styles/VictoryCustomTheme';

import HeaderBar from '../Components/HeaderBar'
import CurrencyLabel from '../Components/CurrencyLabel'

import { dummyData, FONTS, COLORS, SIZES, icons } from '../constants'
import TextButton from '../Components/TextButton';

export default function CryptoDetails({ route, navigation }) {

    const [chartOption, setChartOption] = useState(dummyData.chartOptions);
    const [selectedOption, setSelectedOption] = useState(chartOption[0]);

    const scrollX = new Animated.Value(0);
    const numberOfCharts = [1, 2, 3];

    const { currency } = route.params;

    const optionHandler = (option) => {
        setSelectedOption(option);
    }

    const renderDots = () => {
        const dotposition = Animated.divide(scrollX, SIZES.width);
        return (
            <View
                style={{
                    height: 30,
                    marginTop: 15,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {numberOfCharts.map((item, index) => {
                        const opacity = dotposition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotsize = dotposition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [6.5, 10, 6.5],
                            extrapolate: "clamp"
                        })
                        const dotcolor = dotposition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: ["gray", COLORS.primary, "gray"],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={index}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotsize,
                                    height: dotsize,
                                    backgroundColor: dotcolor,
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    const renderBuy = () => {
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
                <View

                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: SIZES.radius,
                        justifyContent: "space-between",

                        width: "100%",
                    }}
                >
                    <View>
                        <CurrencyLabel icon={currency?.image} currency={currency.currency} code={currency.code} />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",

                    }}>
                        <View>
                            <Text style={{ ...FONTS.h3 }}>${currency.wallet.value}</Text>
                            <Text style={{ color: "gray", textAlign: "right", ...FONTS.body4 }}>{`${currency.wallet.crypto}${currency.code}`}</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
                    </View>


                </View>
                <View style={{
                    marginBottom: SIZES.radius,
                }}><TextButton label={"Buy"} onPress={() => navigation.navigate("Transaction", { currency: currency })} /></View>


            </View>
        )
    }

    const renderAbout = () => {
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
                    marginVertical: SIZES.radius,
                    justifyContent: "space-between",

                    width: "100%",
                }}>
                    <Text style={{paddingBottom: 8, ...FONTS.h3}}>About {currency.currency}</Text>
                    <Text style={{...FONTS.body3}}>{currency.description}</Text>
                </View>
            </View>
        )
    }

    const renderChart = () => {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.radius,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: "white",
                ...styles.shadow,
            }}>

                {/* Header  */}
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <CurrencyLabel icon={currency?.image} currency={currency.currency} code={currency.code} />
                    </View>
                    <View>
                        <Text
                            style={{
                                ...FONTS.h3,
                            }}
                        >${currency.amount}</Text>
                        <Text
                            style={{
                                color: currency.type === "I" ? COLORS.green : COLORS.red, ...FONTS.body3,
                            }}
                        >{currency.changes}</Text>
                    </View>

                </View>

                {/* Chart  */}

                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    snapToInterval={SIZES.width - 40}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }

                    ], { useNativeDriver: false })}
                >
                    {numberOfCharts.map((item, index) => {
                        return (
                            <View
                                style={{
                                    marginLeft: index === 0 ? SIZES.base : 0,
                                }}
                                key={index}
                            >
                                <View
                                    style={{
                                        marginTop: -25,
                                    }}
                                >
                                    <VictoryChart
                                        theme={VictoryCustomTheme}
                                        height={220}
                                        width={SIZES.width - 40}
                                    >
                                        <VictoryLine
                                            style={{
                                                data: {
                                                    stroke: COLORS.secondary,
                                                },
                                                parent: {
                                                    border: "1px solid #ccc"
                                                },
                                            }}
                                            data={currency.chartData}
                                            categories={{
                                                x: ["15min", "30min", "45min", "1hr"],
                                                y: ["15", "30", "45"],
                                            }}
                                        />
                                        <VictoryScatter
                                            data={currency.chartData}
                                            size={5}
                                            style={{
                                                data: {
                                                    fill: COLORS.secondary,
                                                }
                                            }}
                                        />
                                        <VictoryAxis
                                            style={{
                                                grid: {
                                                    stroke: "transparent",
                                                }
                                            }}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            style={{
                                                axis: {
                                                    stroke: "transparent",
                                                },
                                                grid: {
                                                    stroke: "gray",
                                                }
                                            }}
                                        />
                                    </VictoryChart>

                                </View>
                            </View>
                        )
                    })}

                </Animated.ScrollView>

                {/* Option  */}
                <View
                    style={{
                        width: "100%",
                        paddingHorizontal: SIZES.padding,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {chartOption.map((option) => {
                        return (
                            <TextButton
                                key={option.id}
                                label={option.label}
                                customContainerStyle={{
                                    borderRadius: 15,
                                    height: 30,
                                    width: 60,
                                    backgroundColor: selectedOption.id === option.id ? COLORS.primary : "lightgray",
                                }}
                                customLabelStyle={{
                                    color: selectedOption.id === option.id ? "white" : "gray",
                                    ...FONTS.body5,
                                }}
                                onPress={() => optionHandler(option)}
                            />
                        )
                    })}
                </View>

                {/* DOTS  */}
                {renderDots()}

            </View>
        )
    }

    return (
        <SafeAreaView style={{
            marginBottom: SIZES.padding * 1.7,
        }}>
            <HeaderBar right={true} />
            <ScrollView>
                <View style={{
                    flex: 1,
                    paddingBottom: SIZES.padding,
                }}>
                    {renderChart()}
                    {renderBuy()}
                    {renderAbout()}
                    <PriceAlert customContainerStyle={{marginHorizontal: SIZES.radius}}/>
                </View>
            </ScrollView>
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