import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import { fetchNewNews } from "src/service";
import { DrawerProps } from "src/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLastUpdatedNew,
  selectLastUpdatedTop,
  selectNewNews,
  selectTopNews,
  setNewNews,
  setTopNews,
} from "src/store";
import NewsScrollingScreen from "./NewsScrollingScreen";
import { needToReload } from "src/utils";

const NewsTopicScreen = ({ route }: DrawerProps<"new" | "top">) => {
  const { params } = route;
  const topic = params.topic;
  const dispatch = useDispatch();
  const savedNews = useSelector(
    topic === "new" ? selectNewNews : selectTopNews
  );
  const lastUpdated = useSelector(
    topic === "new" ? selectLastUpdatedNew : selectLastUpdatedTop
  );
  const itemPerPage = 15;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const getNewNews = () => {
    fetchNewNews(topic)
      .then((res) => {
        dispatch(topic === "new" ? setNewNews(res) : setTopNews(res));
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
        setPage(1);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getNewNews();
  };

  useEffect(() => {
    if (savedNews?.length === 0 || needToReload(lastUpdated)) {
      setLoading(true);
      getNewNews();
    } else {
      setLoading(false);
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
