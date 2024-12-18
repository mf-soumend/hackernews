import { StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { spacing } from "src/theme";

interface HeaderRightBtnProps {
  icon: IconDefinition;
  handlePress?: () => void;
}

const HeaderRightBtn: FC<HeaderRightBtnProps> = ({ icon, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.btnContainer}>
      <FontAwesomeIcon icon={icon} size={20} />
    </TouchableOpacity>
  );
};

export default HeaderRightBtn;

const styles = StyleSheet.create({
  btnContainer: {
    marginRight: spacing.sm,
  },
});
