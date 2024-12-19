import { Platform, StyleSheet } from "react-native";
import React, { FC } from "react";
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import NewsScreen from "src/screens/news";
import ProfileScreen from "src/screens/profile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, lineHeight, spacing, typography } from "src/theme";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { verticalScale as vs } from "src/utils";
import Header from "src/components/Header";
import { PrimaryScreenProps } from "./primaryNavigator";

export type TabParamsList = {
  news: undefined;
  profile: undefined;
};

/**
 * Tab Navigator Instance
 */
const Tab = createBottomTabNavigator<TabParamsList>();

export type TabScreenProps<T extends keyof TabParamsList> =
  BottomTabScreenProps<TabParamsList, T>;

export const TabNavigator: FC<PrimaryScreenProps<"home">> = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const insets = useSafeAreaInsets();

  /**
   * Screen options for tab navigator
   */
  const screenOptions: BottomTabNavigationOptions = {
    animation: "shift",
    tabBarStyle: [
      styles.container,
      styles.tabShadow,
      {
        height:
          Platform.OS !== "ios" && Platform.OS !== "android"
            ? vs(50) + insets.bottom
            : vs(70) + insets.bottom,
      },
    ],
    tabBarLabelStyle: styles.tabLabel,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.tertiary,
    header: ({ options }) => {
      return (
        <Header
          headerText={options.title}
          showHeaderRight={false}
          showHeaderLeft={false}
        />
      );
    },
  };

  /**
   * Generate screen options for tab navigator
   *
   * @param title - string: Title of the screen.
   * @param icon - JSX.Element | IconTypes: Icon element or icon type.
   */
  const generateScreenOptions = ({
    title,
    icon,
  }: {
    title: string;
    icon: IconDefinition;
  }): BottomTabNavigationOptions => ({
    title: title,
    tabBarIcon: ({ color }) => (
      <FontAwesomeIcon icon={icon} size={20} color={color} />
    ),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        detachInactiveScreens
        initialRouteName="news"
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="news"
          component={NewsScreen}
          options={{
            ...generateScreenOptions({
              title: "News",
              icon: faNewspaper,
            }),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={generateScreenOptions({
            title: "Profile",
            icon: faUser,
          })}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

/**
 * Creates styles for the component
 * @param colors - Colors: Color palette.
 */
const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderTopWidth: 0,
      paddingTop: vs(spacing.xs),
      paddingHorizontal: vs(spacing.xl),
    },
    tabShadow: {
      shadowColor: colors.transparent,
    },
    tabLabel: {
      fontSize: fontSize.body,
      lineHeight: lineHeight[fontSize.body],
      fontFamily: typography.medium,
    },
  });
