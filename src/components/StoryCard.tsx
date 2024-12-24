import { useDispatch } from "react-redux";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";

import { fetchNewsDetails } from "src/service";
import { Colors, fontSize, typography } from "src/theme";
import { getDateTime } from "utils";
import { setStoryData } from "store";
import { decode } from "html-entities";
import { PrimaryParamList } from "src/navigation";

interface StroyProps {
  item: {
    id: number;
    isLoaded: boolean;
    topic: string;
    title?: string;
    text?: string;
    by?: string;
    time?: number;
    url?: string;
  };
}

const StoryCard: FC<StroyProps> = React.memo(({ item }) => {
  const navigation = useNavigation<NavigationProp<PrimaryParamList>>();
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(!item.isLoaded);
  const [hasError, setHasError] = useState(false);
  const getStoryDetails = () => {
    setLoading(true);
    fetchNewsDetails(item.id.toString())
      .then((res) => {
        dispatch(
          setStoryData({
            topic: item.topic,
            story: { ...item, ...res, ...{ isLoaded: true } },
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!item.isLoaded) {
      getStoryDetails();
    } else {
      setLoading(false);
    }
  }, [item.isLoaded]);
  if (hasError) {
    return (
      <View style={styles.container}>
        <Text>Error while fetching details</Text>
      </View>
    );
  }
  const openWebView = () => {
    if (!loading && !hasError) {
      if (Platform.OS !== "android" && Platform.OS !== "ios") {
        window.open(item?.url, "_blank");
      } else {
        navigation.navigate("newsDetails", { url: item?.url });
      }
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={openWebView}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : (
        <>
          <Text numberOfLines={2} style={styles.title}>
            {item?.title ?? "No data"}
          </Text>
          {item?.text && (
            <Text
              numberOfLines={4}
              accessibilityLanguage="html"
              style={styles.description}
            >
              {decode(item.text)}
            </Text>
          )}
          <View style={styles.user}>
            <FontAwesomeIcon
              icon={faUserTag}
              size={fontSize.body}
              color={colors.freeBlue}
            />
            <Text style={styles.userName}>{item?.by ?? "user"}</Text>
            {item?.time ? (
              <Text style={styles.time}>{getDateTime(item.time)}</Text>
            ) : null}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
});

export default StoryCard;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: 15,
      borderRadius: 10,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: fontSize.h4,
      fontFamily: typography.medium,
      color: colors.black,
    },
    description: {
      fontSize: fontSize.body,
      fontFamily: typography.regular,
      color: colors.blackOlive,
    },
    user: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    userName: {
      color: colors.freeBlue,
      fontSize: fontSize.body,
      fontFamily: typography.regular,
      marginLeft: 5,
    },
    time: {
      color: colors.gray,
      fontSize: fontSize.body1,
      fontFamily: typography.semiBold,
      marginLeft: "auto",
    },
  });
