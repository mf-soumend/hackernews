import React, { Dispatch, FC, SetStateAction, useMemo } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { Colors } from "theme";
import StoryCard from "components/StoryCard";
import { Story } from "src/store";

interface NewsScrollingScreenProps {
  data: Story[];
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
  const { colors } = useTheme();
  const styles = makeStyle(colors);

  // Memoized data for current page
  const paginatedData = useMemo(
    () => data.slice(0, page * itemPerPage),
    [data, page, itemPerPage]
  );

  // Memorized data length

  const dataLength = useMemo(() => {
    return data.length;
  }, [data]);

  // Load more data when reaching the end
  const loadMore = () => {
    if (page * itemPerPage < dataLength) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <>
      <FlatList
        data={paginatedData}
        renderItem={({ item }) => {
          return <StoryCard key={item.id} item={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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
