import React, { FC } from "react";
import { TabScreenProps } from "src/navigation";
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import NewsTopicScreen from "src/screens/newsTopics";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import Header from "src/components/Header";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import { Platform, StyleSheet } from "react-native";

export type DrawerParamList = {
  new: { topic: string };
  top: { topic: string };
};
export type DrawerProps<T extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  T
>;
const Drawer = createDrawerNavigator<DrawerParamList>();

const NewsDrawer: FC<TabScreenProps<"news">> = () => {
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
          component={NewsTopicScreen}
          options={{ title: "New news" }}
          initialParams={{ topic: "new" }}
        />
        <Drawer.Screen
          name="top"
          component={NewsTopicScreen}
          options={{ title: "Top news" }}
          initialParams={{ topic: "top" }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default NewsDrawer;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    drawerContainer: {
      backgroundColor: colors.backgroundSecondary,
      borderEndEndRadius: 0,
      borderEndStartRadius: 0,
      width: Platform.OS === "android" || Platform.OS === "ios" ? "60%" : 300,
    },
  });
