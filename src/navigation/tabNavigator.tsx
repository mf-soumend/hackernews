import { StyleSheet } from "react-native";
import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import NewsScreen from "src/screens/news";
import ProfileScreen from "src/screens/profile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faNewspaper, faUser } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, lineHeight, spacing, typography } from "src/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { verticalScale as vs } from "src/utils";
import HeaderRightBtn from "src/components/HeaderRightBtn";
import HeaderLeftBtn from "src/components/HeaderLeftBtn";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

export type TabParamsList = {
  news: undefined;
  profile: undefined;
};

/**
 * Tab Navigator Instance
 */
const Tab = createBottomTabNavigator<TabParamsList>();

export const TabNavigator = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const insets = useSafeAreaInsets();

  /**
   * Screen options for tab navigator
   */
  const screenOptions: BottomTabNavigationOptions = {
    tabBarStyle: [
      styles.container,
      styles.tabShadow,
      {
        height: vs(70) + insets.bottom,
      },
    ],
    tabBarLabelStyle: styles.tabLabel,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.tertiary,
    headerShown: true,
    headerShadowVisible: false,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerLeft: () => {
      return <HeaderLeftBtn icon={faBarsStaggered} handlePress={() => {}} />;
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
    <Tab.Navigator initialRouteName="news" screenOptions={screenOptions}>
      <Tab.Screen
        name="news"
        component={NewsScreen}
        options={generateScreenOptions({
          title: "News",
          icon: faNewspaper,
        })}
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
    header: {
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: vs(22),
      fontFamily: typography.medium,
      color: colors.text,
      marginLeft: 15,
    },
  });
