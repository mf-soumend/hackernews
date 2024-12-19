import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "src/theme";
import { useTheme } from "@react-navigation/native";

const PastNews = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>PastNews</Text>
    </View>
  );
};

export default PastNews;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundSecondary,
    },
  });
