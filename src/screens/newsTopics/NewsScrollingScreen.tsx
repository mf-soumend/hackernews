import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Colors } from "theme";
import StoryCard from "components/StoryCard";
import Pagination from "components/Pagination";

interface NewsScrollingScreenProps {
  data: [];
  page: number;
  itemPerPage: number;
  refreshing: boolean;
  onRefresh: () => void;
  setPage: Dispatch<SetStateAction<number>>;
}

const NewsScrollingScreen: FC<NewsScrollingScreenProps> = ({
  data,
  page,
  itemPerPage,
  refreshing,
  onRefresh,
  setPage,
}) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0 });
    }
  }, [page]);
  return (
    <>
      <FlatList
        ref={flatListRef}
        data={data.slice((page - 1) * itemPerPage, page * itemPerPage)}
        renderItem={({ item }) => {
          return <StoryCard item={item} />;
        }}
        keyExtractor={(item) => item?.id}
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
  );
};

export default NewsScrollingScreen;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    listWrapper: {
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    listContainer: {
      rowGap: 15,
      marginBottom: 15,
    },
  });
