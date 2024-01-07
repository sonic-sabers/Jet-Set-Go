//Third party imports
import { Alert, Animated, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Colors from '../../constants/Colors';
import { AIR_INDIA_LOGO } from '../../constants';
import { BlurView } from "@react-native-community/blur";

// Local imporst
import { HStack, VStack } from '../../components';
import { RenderDivider } from '../../components/airlineCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { customnTransition } from '../../components/transition';
import { getTimeInHours } from '../../helpers';

const PriceBreakUp = ({ leftParam = '', rightParam = '', isFree = false, isFinal = false }) => {
  return (
    <HStack justifyContent='space-between' style={{ marginBottom: 12 }} >
      <Text
        style={[styles.leftParam, isFinal && styles.finalText]}>
        {leftParam}
      </Text>
      <HStack alignItems='baseline' >
        <Text
          style={[styles.rightParam, !!isFree && { textDecorationLine: 'line-through' }, isFinal && { fontSize: 17, fontWeight: '700', }]}>
          {rightParam}
        </Text>
        {!!isFree && <Text
          style={styles.freeText}>
          Free
        </Text>}
      </HStack>
    </HStack>
  )
}

// generates random array for seatinf in flight
const generateSeats = () => {
  let numRow = 18;
  let numColumn = 4;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const HeaderTitle = ({ title = 'Title here' }) => {
  return (
    <Text
      style={styles.headerTitle}>
      {title}
    </Text>
  )
}

export default function SeatBooking({ navigation, route }) {
  const { item } = route.params
  const scrollViewRef = useRef();

  const [twoDSeatArray, setTwoDSeatArray] = useState(generateSeats());

  const handleViewPrice = () => {
    if (scrollViewRef) {
      scrollViewRef.current.scrollToEnd();
    }
  }
  const selectSeat = (index, subindex, num) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let temp = [...twoDSeatArray];

      // Clear all previously selected seats
      temp.forEach(row => row.forEach(seat => (seat.selected = false)));

      // Set the selected seat
      temp[index][subindex].selected = true;

      setTwoDSeatArray(temp);
    }
  };

  const showAlert2 = () => {
    Alert.alert(
      'In Next screen you have to enter details',
      'To naviagte soon',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }
  return (
    <Animated.View style={styles.flexOne}
    >
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, }}>
        <View style={styles.container}>

          <BlurView
            style={styles.absolute}
            blurType="xlight"
            blurAmount={70}
            reducedTransparencyFallbackColor="white"
          />
          <View style={{ backgroundColor: "red", overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16, width: '100%', height: 40, paddingLeft: 20, paddingTop: 8 }}>
            <HStack alignItems='center'>
              <Text
                style={styles.flightText}>
                {item.displayData?.airlines[0].airlineName}

              </Text>
              <Text
                style={styles.flightNumber}>
                {item.displayData?.airlines[0].flightNumber}
              </Text>
              <Animated.View
                sharedTransitionStyle={customnTransition}
                sharedTransitionTag={`_container`}
                style={{ alignItems: 'flex-end', flex: 1, }}>
                <Animated.Image
                  source={{ uri: AIR_INDIA_LOGO }}
                  style={styles.flightImage}
                />
              </Animated.View>
            </HStack>
          </View>
          <HStack justifyContent='space-between' alignItems='center' style={{ padding: 12 }}>
            <View style={{ maxWidth: '40%' }}>
              <Text
                style={styles.flightDate}>
                Date:12 Jan
              </Text>
              <HStack alignItems='center'>
                <Text
                  style={styles.flightSourceAddress}>
                  {item.displayData?.source.airport.cityCode},
                </Text>
                <Text
                  style={styles.flightSourceTime}>
                  {getTimeInHours(item.displayData?.source.depTime)}
                </Text>
              </HStack>
              <Text
                style={styles.airportName}>
                {/* Airport Name airport.cityName */}
                {item.displayData?.source.airport.airportName}
              </Text>
              <Text
                style={styles.airportTerminal}>
                terminal {item.displayData?.source.airport.terminal}
              </Text>
            </View>

            <View style={{ marginHorizontal: 8, alignItems: 'center' }}>
              <Animated.Text
                sharedTransitionTag={`_totalDuartion`}
                style={styles.totalDuration}>
                {/* {item.displayData.totalDuration} */}
                {item.displayData.totalDuration}
              </Animated.Text>
              <RenderDivider info={item.displayData?.stopInfo} />
              <Text
                style={styles.stopInfo}>
                {item.displayData?.stopInfo}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end', maxWidth: '40%' }}>
              <Text
                style={styles.flightDate}>
                Date:12 Jan
              </Text>
              <HStack alignItems='center' justifyContent='flex-end'>
                <Text
                  style={styles.flightSourceAddress}>
                  {item.displayData?.destination.airport.cityCode},
                </Text>
                <Text
                  style={styles.flightSourceTime}>
                  {getTimeInHours(item.displayData?.destination.depTime)}
                </Text>
              </HStack>
              <Text
                style={[styles.airportName, { textAlign: 'right' }]}>
                {/* Airport Name airport.cityName */}
                {item.displayData?.destination.airport.airportName}
              </Text>
              <Text
                style={styles.airportTerminal}>
                terminal {item.displayData?.destination.airport.terminal}
              </Text>
            </View>
          </HStack>
        </View>

        <View>
          <View style={styles.seatContainer}>
            <View style={styles.containerGap20}>
              {twoDSeatArray?.map((item, index) => {
                return (
                  <View key={index} style={styles.seatRow}>
                    {item?.map((subitem, subindex) => {
                      return (
                        <TouchableOpacity
                          key={subitem.number}
                          onPress={() => {
                            selectSeat(index, subindex, subitem.number);
                          }}>
                          <MaterialCommunityIcons name='seat' size={30}
                            style={[
                              styles.seatIcon,
                              subitem.taken ? { color: Colors.grey.dark1 } : {},
                              subitem.selected ? { color: Colors.alertAndStatus.Orange2 } : {},
                            ]} />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16, paddingHorizontal: 12 }}>
          <HeaderTitle title='Price Breakup' />
          <PriceBreakUp leftParam='Base Fare' rightParam={`₹${item.fare}`} />
          <PriceBreakUp leftParam='Taxes' rightParam='₹100' />
          <PriceBreakUp isFree leftParam='Medical' rightParam='₹110' />
          <View style={styles.priceDivider} />
          <PriceBreakUp leftParam='Total' rightParam={`₹${item.fare + 100}`} isFinal />
        </View>
      </ScrollView>
      <View style={{ height: 60, paddingHorizontal: 12, padding: 8, backgroundColor: "white", width: '100%', alignItems: 'center' }}>
        <HStack justifyContent='space-between'>
          <VStack>
            <Animated.View
              sharedTransitionStyle={customnTransition}
              sharedTransitionTag={'_fare'}>
              <Text
                style={styles.totalPrice}>
                ₹{item.fare + 100}
              </Text>
            </Animated.View>
            <Pressable onPress={handleViewPrice}>
              <Text
                style={styles.viewBreakup}>
                View breakup
              </Text>
            </Pressable>
          </VStack>
          <TouchableOpacity
            onPress={showAlert2}
            style={styles.continueBottonContainer}>
            <Text
              style={styles.continueButton}>
              Continue
            </Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </Animated.View>
  )
}


