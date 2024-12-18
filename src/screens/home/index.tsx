import { StyleSheet, Text, View } from "react-native";
import { FC } from "react";
import { PrimaryScreenProps } from "src/navigation";
import { useTheme } from "@react-navigation/native";
import { Colors, typography } from "src/theme";

const HomeScreen: FC<PrimaryScreenProps<"home">> = (props) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default HomeScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    },
    text: {
      color: colors.text,
      fontFamily: typography.medium,
    },
  });
