import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useCallback } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { loginUser, useAppDispatch } from "src/store";
import { Colors, fontSize, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faG } from "@fortawesome/free-solid-svg-icons";
import { fetchUserDetails } from "src/service";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const dispatch = useAppDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_EXPO_GO_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

  const getUserInfo = useCallback(
    async (token: string) => {
      try {
        const { data } = await fetchUserDetails(token);
        dispatch(loginUser({ user: { ...data, token } }));
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      getUserInfo(response.authentication.accessToken);
    }
  }, [response, getUserInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.description}>
          Please sign in to view your profile
        </Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => promptAsync()}
          style={styles.loginBtn}
          disabled={!request}
        >
          <FontAwesomeIcon icon={faG} size={fontSize.h2} color={colors.white} />
          <Text style={styles.btnText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    },
    welcome: {
      flex: 0.6,
      backgroundColor: colors.blue,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    title: {
      fontSize: fontSize.h1,
      color: colors.white,
      fontFamily: typography.medium,
    },
    description: {
      fontSize: fontSize.body,
      color: colors.btnTextSecondary,
      fontFamily: typography.regular,
      textAlign: "center",
    },
    content: {
      flex: 1,
      paddingVertical: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    loginBtn: {
      backgroundColor: colors.blue,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    btnText: {
      color: colors.white,
      fontFamily: typography.medium,
      fontSize: fontSize.body,
    },
  });
