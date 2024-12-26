import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import { DrawerProps } from "src/navigation";
import {
  fetchNewsThunk,
  selectError,
  selectLastUpdatedNew,
  selectLastUpdatedTop,
  selectLoading,
  selectNewNews,
  selectTopNews,
  useAppDispatch,
  useAppSelector,
} from "src/store";
import NewsScrollingScreen from "./NewsScrollingScreen";
import { needToReload } from "src/utils";

const NewsTopicScreen = ({ route }: DrawerProps<"new" | "top">) => {
  const itemPerPage = 15;
  const { params } = route;
  const topic = params.topic as "new" | "top";
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const savedNews = useAppSelector(
    topic === "new" ? selectNewNews : selectTopNews
  );
  const lastUpdated = useAppSelector(
    topic === "new" ? selectLastUpdatedNew : selectLastUpdatedTop
  );
  const loading = useAppSelector(selectLoading);
  const hasError = useAppSelector(selectError);
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const fetchNewsList = () => {
    dispatch(fetchNewsThunk(topic)).finally(() => {
      setRefreshing(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNewsList();
  };

  useEffect(() => {
    if (!savedNews?.length || needToReload(lastUpdated)) {
      fetchNewsList();
    }
  }, []);
  if (hasError) {
    return (
      <View style={styles.container}>
        <Text>Error while fetching news..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <NewsScrollingScreen
          refreshing={refreshing}
          data={savedNews}
          itemPerPage={itemPerPage}
          onRefresh={onRefresh}
          page={page}
          setPage={setPage}
        />
      )}
    </View>
  );
};

export default NewsTopicScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundSecondary,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    listWrapper: {
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    listContainer: {
      rowGap: 15,
      marginBottom: 15,
    },
  });
