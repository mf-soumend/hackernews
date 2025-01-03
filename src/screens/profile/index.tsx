import React, { FC } from "react";
import { TabScreenProps } from "src/navigation";
import { selectIsAuthenticated, useAppSelector } from "src/store";
import LoginScreen from "../login";
import UserProfile from "./UserProfile";

const ProfileScreen: FC<TabScreenProps<"profile">> = () => {
  const userIsAuthenticated = useAppSelector(selectIsAuthenticated);

  return userIsAuthenticated ? <UserProfile /> : <LoginScreen />;
};

export default ProfileScreen;
