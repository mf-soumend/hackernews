import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import { useTheme } from "@react-navigation/native";
import { Colors, fontSize, typography } from "src/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  itemPerPage?: number;
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({
  total,
  page,
  setPage,
  itemPerPage = 20,
}) => {
  const { colors } = useTheme();
  const styles = makeStyle(colors);
  const lastPage = Math.floor(total / itemPerPage);
  return (
    <View style={styles.paginationBox}>
      <TouchableOpacity
        onPress={() => {
          setPage(page > 1 ? page - 1 : page);
        }}
        disabled={page === 1}
      >
        <View
          style={
            page === 1 ? [styles.button, styles.disableButton] : styles.button
          }
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            size={fontSize.h3}
            color={page === 1 ? colors.gray : colors.black}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.pageNo}>{page}</Text>
      <TouchableOpacity
        onPress={() => {
          setPage(page < lastPage ? page + 1 : page);
        }}
        disabled={page === lastPage}
      >
        <View
          style={
            page === lastPage
              ? [styles.button, styles.disableButton]
              : styles.button
          }
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            size={fontSize.h3}
            color={page === lastPage ? colors.gray : colors.black}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const makeStyle = (colors: Colors) =>
  StyleSheet.create({
    paginationBox: {
      boxShadow: "0 -5px 10px " + colors.boxShadow,
      paddingHorizontal: 20,
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 20,
    },
    button: {
      borderColor: colors.blackOlive,
      borderWidth: 1,
      padding: 5,
      borderRadius: 5,
    },
    disableButton: {
      backgroundColor: colors.btnTextSecondary,
      borderColor: colors.btnTextSecondary,
    },
    pageNo: {
      fontFamily: typography.semiBold,
      fontSize: fontSize.h4,
    },
  });
