import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationProps } from "./appNavigator";
import { TabNavigator } from "./tabNavigator";

export type PrimaryParamList = {
  home: undefined;
  news: undefined;
  profile: undefined;
};
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  NativeStackScreenProps<PrimaryParamList, T>;
const PrimaryStack = createNativeStackNavigator<PrimaryParamList>();
export const PrimaryNavigator = (props: NavigationProps) => {
  return (
    <PrimaryStack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <PrimaryStack.Screen name="home" component={TabNavigator} />
    </PrimaryStack.Navigator>
  );
};
