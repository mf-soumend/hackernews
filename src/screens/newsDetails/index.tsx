import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { PrimaryScreenProps } from "src/navigation";
import Header from "src/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize } from "src/theme";
import WebView from "react-native-webview";

const NewsDetails: FC<PrimaryScreenProps<"newsDetails">> = ({
  route,
  navigation,
}) => {
  const { params } = route;
  const url = params.url;
  const { colors } = useTheme();
  const styles = makeStyle(colors);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        headerText={"News Details"}
        showHeaderRight={false}
        showHeaderLeft={true}
        onPressLeft={() => {
          navigation.pop();
        }}
      />
      <View style={styles.webViewContainer}>
        {url ? (
          <WebView
            source={{ uri: url }}
            startInLoadingState
            javaScriptEnabled={true}
            renderLoading={() => (
              <View style={styles.loader}>
                <ActivityIndicator size={"small"} />
              </View>
            )}
          />
        ) : (
          <Text style={styles.errorText}>Broken link</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsDetails;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    webViewContainer: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    },
    loader: {
      flex: 1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      marginTop: 20,
      color: colors.danger,
      fontSize: fontSize.h3,
      textAlign: "center",
    },
  });
