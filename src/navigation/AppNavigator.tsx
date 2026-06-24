import React, { useMemo } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Route from './routes';
import { ASBottomTabNavigator } from '@/components';

import NavigationService from './NavigationService';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { color, text } from '@/assets';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '@/screens/Login/Login';
import Dashboard from '@/screens/Dashboard/Dashboard';
import AuthorList from '@/screens/AuthorList/AuthorList';
import BookForm from '@/screens/BookForm/BookForm';
import AuthorForm from '@/screens/AuthorForm/AuthorForm';
import BookDetails from '@/screens/BookDetails/BookDetails';
import AuthorDetails from '@/screens/AuthorDetails/AuthorDetails';
import SignUp from '@/screens/SignUp/SignUp';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export const defaultBackButton = (): JSX.Element => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.backIcon}
      onPress={() => {
        NavigationService.goBack();
      }}
    >
      <Ionicons name='arrow-back' size={24} color={color.brand.primary} />
    </TouchableOpacity>
  );
};

const DefaultTabNavigator = ({ route }: { route: { name: string } }) => {
  const tabs = useMemo(
    () => [
      {
        name: 'Dashboard',
        component: Dashboard,
        title: 'Books',
        icon: 'dashboard',
      },

      {
        name: 'AuthorList',
        component: AuthorList,
        title: 'Authors',
        icon: 'person',
      },
    ],
    [],
  );

  return (
    <ASBottomTabNavigator
      tabs={tabs}
      initialRouteName={route.name}
      tabBarStyle={{ backgroundColor: '#FFF', height: 80, paddingBottom: 10 }}
      activeColor={color.brand.primary}
      inactiveColor={color.text.tertiary}
      tabBarShape={'standard'}
      tabBarShapeBorderRadius={0}
      tabBarShapeBorderTopLeftRadius={0}
      tabBarShapeBorderTopRightRadius={0}
      tabBarShapeBorderBottomLeftRadius={0}
      tabBarShapeBorderBottomRightRadius={0}
      tabBarShapeNotchWidth={72}
      tabBarShapeCurvedDepth={24}
      tabBarShapeCutoutGap={8}
      tabBarShapeNotchSweep={1}
      tabBarShapeCurvedTrough={'round'}
      tabBarStyleVariant={'solid'}
      tabBarBlurIntensity={80}
      tabBarBlurTint={'default'}
      tabBarShowLabels={'always'}
      tabBarIconSize={24}
    />
  );
};

const defaultTab = (name: string) => (
  <Stack.Screen
    name={name}
    options={{ headerShown: false }}
    component={DefaultTabNavigator}
  />
);

/**
 * AppNavigator component for managing navigation.
 * @returns {JSX.Element} - The AppNavigator component.
 */
const AppNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={Route.LOGIN}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerLeft: () => defaultBackButton(),
        headerTitle: '',
        presentation: 'modal',
        header: () => null,
      }}
    >
      <Stack.Screen
        name={Route.LOGIN}
        component={Login}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      {defaultTab(Route.DASHBOARD)}
      {defaultTab(Route.AUTHOR_LIST)}
      <Stack.Screen
        name={Route.BOOK_FORM}
        component={BookForm}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.AUTHOR_FORM}
        component={AuthorForm}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.BOOK_DETAILS}
        component={BookDetails}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.AUTHOR_DETAILS}
        component={AuthorDetails}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
      <Stack.Screen
        name={Route.SIGN_UP}
        component={SignUp}
        options={() => ({
          headerStyle: { backgroundColor: color.surface.default },
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    paddingHorizontal: 24,
  },
});

export default AppNavigator;
