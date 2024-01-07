import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screen } from '../../components/screenDimensions';
import FastImage from 'react-native-fast-image';
import Colors from '../../constants/Colors';

const IMAGE_CONTAINER_ASPECT_RATIO = 150;
const IMAGE_CONTAINER_WIDTH = IMAGE_CONTAINER_ASPECT_RATIO;
const IMAGE_CONTAINER_HEIGHT = IMAGE_CONTAINER_WIDTH

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white.default} barStyle={'light-content'} />
      <FastImage
        style={{ height: IMAGE_CONTAINER_HEIGHT, width: IMAGE_CONTAINER_WIDTH }}
        source={require('../../assets/images/Flight.png')}
        resizeMode='center' />
      <Text
        style={styles.fontStyle}>
        Jet-Set-Flight🚀
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white.default },
  fontStyle: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Roboto',
    color: '#000'
  }
})