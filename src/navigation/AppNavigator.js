import React from 'react';
import { Pressable, StyleSheet, Dimensions, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ActivityStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const { width } = Dimensions.get('window');
const TAB_BAR_WIDTH = Math.min(width * 0.9, 430);

function NotificationButton({ navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('Notifications')}
      hitSlop={10}
      style={styles.headerButton}
    >
      <Ionicons
        name="notifications-outline"
        size={24}
        color={COLORS.black}
      />
    </Pressable>
  );
}

function HeaderBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView
        tint="light"
        intensity={0.5}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[
          'rgba(255,255,255,0)',
          'rgba(255,255,255,0.45)',
          'rgba(255,255,255,0.08)',
          'rgba(255,255,255,0)',
        ]}
        locations={[0, 0.38, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

function TabBarBackground() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.tabBarSurface]}>
      <BlurView
        tint="light"
        intensity={26}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.08)',
          'rgba(255, 255, 255, 0.38)',
          'rgba(255, 255, 255, 0.76)',
          'rgba(255, 255, 255, 0.42)',
        ]}
        locations={[0, 0.34, 0.72, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

function TabBarItem({ children, accessibilityState, style, ...props }) {
  const isFocused = accessibilityState?.selected;

  return (
    <Pressable {...props} style={[styles.tabItemWrapper, style]}>
      <View style={[styles.tabItemInner, isFocused && styles.tabItemActive]}>
        {children}
      </View>
    </Pressable>
  );
}

const nativeHeaderOptions = (navigation) => ({
  headerShown: true,
  headerTitle: '',
  headerTransparent: true,
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerTintColor: COLORS.primary,
  headerBackground: () => <HeaderBackground />,
  headerRight: () => <NotificationButton navigation={navigation} />,
  contentStyle: { backgroundColor: COLORS.background },
});

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={({ navigation }) => ({
          ...nativeHeaderOptions(navigation),
        })}
      />
    </HomeStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchMain"
        component={SearchScreen}
        options={({ navigation }) => ({
          ...nativeHeaderOptions(navigation),
        })}
      />
    </SearchStack.Navigator>
  );
}

function ActivityStackNavigator() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen
        name="ActivityMain"
        component={ActivityScreen}
        options={({ navigation }) => ({
          ...nativeHeaderOptions(navigation),
        })}
      />
    </ActivityStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={({ navigation }) => ({
          ...nativeHeaderOptions(navigation),
        })}
      />
    </ProfileStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#292929',
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <TabBarBackground />,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarHideOnKeyboard: true,
        tabBarButton: (props) => <TabBarItem {...props} />,
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Activity: focused ? 'bar-chart' : 'bar-chart-outline',
            Search: focused ? 'search' : 'search-outline',
            Profile: focused ? 'person' : 'person-outline',
          };

          return <Ionicons name={icons[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStackNavigator}
        options={{ tabBarLabel: 'Activity' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: COLORS.primary,
        headerBackground: () => <HeaderBackground />,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <RootStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackground: () => <HeaderBackground />,
        }}
      />
      <RootStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackground: () => <HeaderBackground />,
        }}
      />
      <RootStack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerBackground: () => <HeaderBackground />,
        }}
      />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 6,
  },

  tabBar: {
    position: 'center',
    width: TAB_BAR_WIDTH,
    alignSelf: 'center',
    bottom: 22,
    height: 74,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.48)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 24,
  },

  tabBarSurface: {
    borderRadius: 999,
    overflow: 'hidden',
  },

  tabItemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabItemInner: {
    minWidth: 62,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabItemActive: {
    backgroundColor: 'rgba(192,39,45,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(192,39,45,0.18)',
  },

  tabBarIconStyle: {
    marginTop: 10,
  },

  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
});
