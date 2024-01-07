

import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Animated, {
  SharedTransition,
  withSpring,
  SharedTransitionType,
} from 'react-native-reanimated';

export const customnTransition = SharedTransition.duration(400)
  .custom((values) => {
    'worklet';
    return {
      width: withSpring(values.targetWidth, {
        mass: 1,
        damping: 100,
        stiffness: 100,

      }),
      height: withSpring(values.targetHeight, {
        mass: 1,
        damping: 100,
        stiffness: 100,

      }),
      originX: withSpring(values.targetOriginX, {
        mass: 1,
        damping: 100,
        stiffness: 100,

      }),
      originY: withSpring(values.targetOriginY, {
        mass: 1,
        damping: 100,
        stiffness: 100,

      }),
    };
  })
  .progressAnimation((values, progress) => {
    'worklet';
    const getValue = (
      progress,
      target,
      current
    ) => {
      return progress * 2 * (target - current) + current;
    };
    return {
      width: getValue(progress, values.targetWidth, values.currentWidth),
      height: getValue(progress, values.targetHeight, values.currentHeight),
      originX: getValue(progress, values.targetOriginX, values.currentOriginX),
      originY: getValue(progress, values.targetOriginY, values.currentOriginY),
    };
  })
  .defaultTransitionType(SharedTransitionType.ANIMATION);