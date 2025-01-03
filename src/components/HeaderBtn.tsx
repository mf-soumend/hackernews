import { TouchableOpacity } from "react-native";
import React, { FC } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface HeaderBtnProps {
  icon: string;
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
      <FontAwesome6 name={icon} size={20} color={color} />
    </TouchableOpacity>
  );
};

export default HeaderBtn;
