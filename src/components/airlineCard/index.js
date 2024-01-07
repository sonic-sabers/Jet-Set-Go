import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeInDown, FadeOut, FadeOutUp } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';

import { AIR_INDIA_LOGO, SPICE_JET_LOGO } from '../../constants'
import { getTimeInHours } from '../../helpers'
import HStack from '../moleclues/HStack'
import { styles } from './styles'
import VStack from '../moleclues/VStack'
import Colors from '../../constants/Colors'
import { customnTransition } from '../transition';

const GetAirLineLogo = ({ data }) => {
  return (
    <Animated.View
      sharedTransitionStyle={customnTransition}
      style={{ alignItems: 'center' }}>
      <Animated.Image
        sharedTransitionTag={`_container`}
        source={{ uri: data?.airlines[0].airlineCode === 'CD' ? AIR_INDIA_LOGO : SPICE_JET_LOGO }}
        style={styles.imageContainer} resizeMode='cover' />
      <Animated.Text
        sharedTransitionTag={`_airlineName`}
        style={styles.airlineName}>
        {data?.airlines[0].airlineName}
      </Animated.Text>
      <Animated.Text
        sharedTransitionTag={`_airlineNumber`}
        style={styles.airlineNumber}>
        {data?.airlines[0].flightNumber}
      </Animated.Text>
    </Animated.View>
  )
}


export const RenderDivider = ({ info }) => {
  return (
    <HStack>
      <View
        style={[styles.dividerContainer, info?.charAt(0) == 1 ? { borderColor: Colors.alertAndStatus.warning } : null]} />
      {info?.charAt(0) == 1 ?
        <View style={styles.dividerBadge} >
          <View style={styles.innderDivider} />
        </View>
        : null}
    </HStack>
  )
}

const CityAndTime = ({ data, source }) => {
  const originSource = source ? data.source : data.destination
  return (
    <VStack alignItems='center' justifyContent='center' >
      <Animated.Text
        sharedTransitionTag={`_airportCity`}

        style={styles.cityName}>
        {originSource.airport.cityName}
      </Animated.Text>
      <Animated.Text
        sharedTransitionTag={`_depTime`}
        style={styles.flightTime}>
        {getTimeInHours(originSource.depTime)}
      </Animated.Text>
    </VStack>
  )
}

export default function AirlineCard(data) {
  const { item } = data.data
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('SeatBooking', { item })}
      key={item.id}
      style={styles.container}>

      <HStack alignItems='center' justifyContent="space-between">
        <GetAirLineLogo data={item.displayData} />

        <HStack alignItems='center' >

          <CityAndTime data={item.displayData} source={true} />
          <View style={{ marginHorizontal: 8, alignItems: 'center' }}>
            <Animated.Text
              sharedTransitionTag={`_totalDuartion`}
              style={styles.totalDuration}>
              {item.displayData.totalDuration}
            </Animated.Text>
            <RenderDivider info={item.displayData?.stopInfo} />
            <Text
              style={styles.stopInfo}>
              {item.displayData?.stopInfo}
            </Text>
          </View>

          <CityAndTime data={item.displayData} />

        </HStack>

        <View>
          <Animated.View
            sharedTransitionStyle={customnTransition}

            sharedTransitionTag={'_fare'}>
            <Text
              style={styles.flightFare}>
              ₹ {item.fare}
            </Text>
          </Animated.View>
        </View>

      </HStack>

    </Pressable >

  )
}
