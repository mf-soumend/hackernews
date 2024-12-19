import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { fetchNewsDetails } from "src/service";
import { Colors, fontSize, typography } from "src/theme";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";
import { getDateTime } from "src/utils";

interface StroyProps {
  id: string;
}

const StoryCard: FC<StroyProps> = ({ id }) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const [story, setStory] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const getStoryDetails = async () => {
    setLoading(true);
    fetchNewsDetails(id).then((res) => {
      setStory(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    getStoryDetails();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : (
        <>
          <Text numberOfLines={2} style={styles.title}>
            {story?.title ?? "No data"}
          </Text>
          <View style={styles.user}>
            <FontAwesomeIcon
              icon={faUserTag}
              size={fontSize.body}
              color={colors.freeBlue}
            />
            <Text style={styles.userName}>{story?.by ?? "user"}</Text>
            {story?.time ? (
              <Text style={styles.time}>{getDateTime(story.time)}</Text>
            ) : null}
          </View>
        </>
      )}
    </View>
  );
};

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
