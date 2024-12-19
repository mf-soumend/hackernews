import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import {
  faArrowLeft,
  faArrowRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@react-navigation/native";
import { Colors, typography } from "src/theme";
import HeaderBtn from "./HeaderBtn";
import { verticalScale } from "src/utils";

interface HeaderProps extends ViewProps {
  // text to be desplayed on header
  headerText?: string;
  // on header left icon press
  onPressLeft?: () => void;
  // on header right icon press
  onPressRight?: () => void;
  // overrides the styles on the header container
  style?: StyleProp<ViewStyle>;
  // header title text style
  textStyle?: StyleProp<TextStyle>;
  // header left icon and visibility
  showHeaderLeft?: boolean;
  headerLeftIcon?: IconDefinition;
  // header right icon and visibility
  showHeaderRight?: boolean;
  headerRightIcon?: IconDefinition;
}

const Header: FC<HeaderProps> = ({
  headerText,
  onPressLeft,
  onPressRight,
  style,
  textStyle,
  showHeaderLeft = true,
  showHeaderRight = true,
  headerLeftIcon = faArrowLeft,
  headerRightIcon = faArrowRight,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={[styles.container, style]} {...rest}>
      {showHeaderLeft && (
        <HeaderBtn
          icon={headerLeftIcon}
          color={colors.text}
          handlePress={onPressLeft}
        />
      )}
      {headerText && (
        <Text style={[styles.title, textStyle]}>{headerText}</Text>
      )}
      {showHeaderRight && (
        <HeaderBtn
          icon={headerRightIcon}
          color={colors.text}
          handlePress={onPressRight}
        />
      )}
    </View>
  );
};

export default Header;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.background,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    title: {
      flex: 1,
      fontSize: verticalScale(22),
      fontFamily: typography.medium,
      color: colors.text,
    },
  });
