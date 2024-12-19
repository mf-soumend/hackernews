import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Colors, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import { TabScreenProps } from "src/navigation";

const ProfileScreen: FC<TabScreenProps<"profile">> = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

export default ProfileScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: colors.backgroundSecondary,
    },
    text: {
      textAlign: "center",
      color: colors.text,
      fontFamily: typography.medium,
    },
  });
