import { TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface HeaderBtnProps {
  icon: IconDefinition;
  color?: string;
  handlePress?: () => void;
}

const HeaderBtn: FC<HeaderBtnProps> = ({
  icon,
  handlePress,
  color = "#000",
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <FontAwesomeIcon icon={icon} size={20} color={color} />
    </TouchableOpacity>
  );
};

export default HeaderBtn;
