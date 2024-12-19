import React, { FC } from "react";
import { TabScreenProps } from "src/navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NewNews from "../newNews";
import PastNews from "../pastNews";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import Header from "src/components/Header";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import { Platform, StyleSheet } from "react-native";

export type DrawerParamList = {
  new: undefined;
  past: undefined;
};
const Drawer = createDrawerNavigator<DrawerParamList>();

const NewsScreen: FC<TabScreenProps<"news">> = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <>
      <Drawer.Navigator
        initialRouteName="new"
        screenOptions={{
          headerShadowVisible: false,
          header: ({ navigation, options }) => {
            return (
              <Header
                headerText={options.title}
                headerLeftIcon={faBarsStaggered}
                showHeaderRight={false}
                onPressLeft={navigation.openDrawer}
              />
            );
          },
          drawerStyle: styles.drawerContainer,
        }}
      >
        <Drawer.Screen
          name="new"
          component={NewNews}
          options={{ title: "New news" }}
        />
        <Drawer.Screen
          name="past"
          component={PastNews}
          options={{ title: "Past news" }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default NewsScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    drawerContainer: {
      backgroundColor: colors.backgroundSecondary,
      borderEndEndRadius: 0,
      borderEndStartRadius: 0,
      width: Platform.OS === "android" || Platform.OS === "ios" ? "60%" : 300,
    },
  });
