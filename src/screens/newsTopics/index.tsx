import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors } from "src/theme";
import { fetchNewNews } from "src/service";
import StoryCard from "src/components/StoryCard";
import Pagination from "src/components/Pagination";
import { DrawerProps } from "../news";

const NewsTopicScreen = ({ route }: DrawerProps<"new" | "top">) => {
  const { params } = route;
  const topic = params.topic;
  const itemPerPage = 15;
  const flatListRef = useRef<FlatList<any>>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any>();
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const getNewNews = () => {
    fetchNewNews(topic).then((res) => {
      setData(res);
      setPage(1);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getNewNews();
  };

  useEffect(() => {
    setLoading(true);
    getNewNews();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  }, [page]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={data.slice((page - 1) * itemPerPage, page * itemPerPage)}
            renderItem={({ item }) => {
              return <StoryCard id={item} />;
            }}
            keyExtractor={(item) => item}
            style={styles.listWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <Pagination
            total={data?.length ?? 0}
            page={page}
            setPage={setPage}
            itemPerPage={itemPerPage}
          />
        </>
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
