import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Colors, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import { PrimaryScreenProps } from "src/navigation";

const NewsScreen: FC<PrimaryScreenProps<"news">> = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>News</Text>
    </View>
  );
};

export default NewsScreen;

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
