/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Header from '../../components/layout/Header';
import { COLORS, FONTS2, SIZES } from '../../constants';
import { LineChart } from 'react-native-chart-kit';

const SalesStatus = () => {

    const [xOffset] = useState(new Animated.Value(0));

    const graphStyle = ['Linear', 'Linear'];

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [0, 50, 35, 90, 25, 35],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 3, // optional
          },
        ],
        // legend: ['그래프 상단에 쓸말'], // optional
    };

    const data2 = {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: [40, 30, 35, 20, 25, 35],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 3, // optional
          },
        ],
        // legend: ['그래프 상단에 쓸말'], // optional
    };


    const renderDots = () => {
        const dotPosition = Animated.divide(xOffset, SIZES.width);
        return (
            <View style={{height: 30, paddingVertical: 30}}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding,
                    }}
                >
                    {/* interpolate를 이용하여 animated되는 사이에 추가적인 효과가 가능 */}
                    {graphStyle.map((item, index) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3 , 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: 'clamp',
                        });

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, 'purple', COLORS.darkgray],
                            extrapolate: 'clamp',
                        });


                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor,
                                }}
                            />
                        );
                    })}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header title="매출 현황" small="true" />

            {/* Body */}
            <View style={{flex: 1, alignItems: 'center'}}>
                {/* 매출 텍스트 */}
                <View style={{height: SIZES.height * 0.08, position: 'absolute', left: SIZES.width * 0.05, top: SIZES.height * 0.08}}>
                    <Text style={{...FONTS2.h2}}>이번달 총 매출</Text>
                    <Text style={{...FONTS2.body2}}>1,725,000원</Text>
                </View>


                {/* 그래프 박스 */}
                <View style={{flex:1, marginVertical: SIZES.height * 0.2, width: SIZES.width, height: SIZES.height * 0.5}}>
                    <View style={{position:'absolute', borderWidth: 2, borderColor: COLORS.secondary, width: SIZES.width * 0.88, height: 2, zIndex: 1, alignSelf: 'center', borderRadius: 10}}>
                    </View>
                    <View style={{position:'absolute', borderWidth: 1, borderColor: COLORS.secondary, width: SIZES.width * 0.88, height: 2, zIndex: 1, alignSelf: 'center', borderRadius: 10, bottom: 0}}>
                    </View>
                    <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}

                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                                { useNativeDriver: false },
                            )
                        }
                    >
                    {graphStyle.map( (item, index) =>
                        <LineChart
                            key={index}
                            data={index === 0 ? data : data2}
                            width={SIZES.width}
                            height={SIZES.height * 0.3}
                            chartConfig={{
                                backgroundColor: 'white',
                                backgroundGradientFrom: 'white',
                                backgroundGradientTo: 'white',
                                decimalPlaces: 0, // 소수점 어디까지
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: '#ffa726',
                                },
                            }}
                            bezier
                            style={{
                                marginTop: SIZES.height * 0.035,
                                marginRight: SIZES.width * 0.1,
                            }}
                        />
                    )}
                    </Animated.ScrollView>
                    {renderDots()}
                    
                </View>


                {/* graphBox */}
                {/* <View style={{backgroundColor: 'red',width: SIZES.width, borderRadius: 10  ,borderWidth: 2, borderColor: COLORS.secondary}}> */}



                

                    {/* <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}

                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: xOffset } } }],
                                { useNativeDriver: false },
                            )
                        }
                    >
                    {graphStyle.map( (item, index) =>
                        <LineChart
                            key={index}
                            data={data}
                            width={SIZES.width}
                            height={SIZES.height * 0.3}
                            chartConfig={{
                                backgroundColor: 'white',
                                backgroundGradientFrom: 'white',
                                backgroundGradientTo: 'white',
                                decimalPlaces: 0, // 소수점 어디까지
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: '#ffa726',
                                },
                            }}
                        />
                    )}
                    </Animated.ScrollView> */}
    
                
                {/* {renderDots()} */}
                {/* </View> */}

                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default SalesStatus;
