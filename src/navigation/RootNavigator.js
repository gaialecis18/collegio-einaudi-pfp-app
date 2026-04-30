import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../data';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.background } }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={AppNavigator} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
}
