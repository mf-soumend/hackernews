import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationProps } from "./appNavigator";
import HomeScreen from "src/screens/home";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import HeaderRightBtn from "src/components/HeaderRightBtn";
import { spacing } from "src/theme";
import HeaderLeftBtn from "src/components/HeaderLeftBtn";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

export type PrimaryParamList = {
  home: undefined;
};
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  NativeStackScreenProps<PrimaryParamList, T>;
const PrimaryStack = createNativeStackNavigator<PrimaryParamList>();
export const PrimaryNavigator = (props: NavigationProps) => {
  const { colors } = useTheme();
  return (
    <PrimaryStack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.blackOlive,
        headerTitle: "",
        headerRight: () => {
          return <HeaderRightBtn icon={faUser} handlePress={() => {}} />;
        },
        headerLeft: () => {
          return (
            <HeaderLeftBtn icon={faBarsStaggered} handlePress={() => {}} />
          );
        },

        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShadowVisible: false,
      }}
    >
      <PrimaryStack.Screen name="home" component={HomeScreen} />
    </PrimaryStack.Navigator>
  );
};
