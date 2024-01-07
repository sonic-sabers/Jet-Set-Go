import React from 'react';
import { StatusBar } from 'react-native';

//Third party imports
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';

//Local imports
import { isDarkThemeSelector } from '../store/theme/selector';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/home';
import SeatBooking from '../screens/seatBooking';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const isDarkTheme = useSelector(isDarkThemeSelector);

  return (
    <>
      <StatusBar backgroundColor={!isDarkTheme ? Colors.white.default : Colors.black.default} barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='HomeScreen'
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            name="SeatBooking"
            component={SeatBooking}
            options={{
              headerShown: false,
              presentation: 'card',
              animationTypeForReplace: 'push',
              animation: 'fade'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
