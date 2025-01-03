import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, typography } from "src/theme";
import {
  logoutUser,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from "src/store";
import AntDesign from "@expo/vector-icons/AntDesign";

const UserProfile = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <View style={styles.container}>
      <Image src={user?.picture} style={styles.profilePicture} />
      <Text style={styles.welcome}>Welcome, </Text>
      <Text style={styles.name}>{user?.name ?? "User"}</Text>
      <Text style={styles.email}>Email : {user?.email}</Text>
      <Text style={styles.email}>Phone : {user?.phone ?? ""}</Text>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          dispatch(logoutUser());
        }}
      >
        <AntDesign name="logout" size={fontSize.body} color={colors.white} />
        <Text style={styles.logoutTxt}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
      padding: 20,
    },
    profilePicture: {
      height: 120,
      width: 120,
      backgroundColor: colors.white,
      borderRadius: 5,
      marginBottom: 20,
    },
    welcome: {
      fontSize: fontSize.h2,
      color: colors.spanishGray,
      fontFamily: typography.regular,
      marginBottom: -15,
    },
    name: {
      fontSize: fontSize.h1,
      color: colors.freeBlue,
      fontFamily: typography.medium,
      marginBottom: 10,
    },
    email: {
      fontSize: fontSize.body,
      color: colors.text,
      fontFamily: typography.medium,
    },
    text: {
      textAlign: "center",
      color: colors.text,
      fontFamily: typography.medium,
    },
    logoutBtn: {
      flexDirection: "row",
      gap: 10,
      backgroundColor: colors.danger,
      paddingVertical: 7,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginTop: "auto",
    },
    logoutTxt: {
      color: colors.white,
      fontSize: fontSize.body,
      fontFamily: typography.medium,
    },
  });
