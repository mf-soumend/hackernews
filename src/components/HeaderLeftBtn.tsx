import { StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { spacing } from "src/theme";

interface HeaderLeftBtnProps {
  icon: IconDefinition;
  handlePress?: () => void;
}

const HeaderLeftBtn: FC<HeaderLeftBtnProps> = ({ icon, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.btnContainer}>
      <FontAwesomeIcon icon={icon} size={20} />
    </TouchableOpacity>
  );
};

export default HeaderLeftBtn;

const styles = StyleSheet.create({
  btnContainer: {
    marginLeft: spacing.sm,
  },
});
