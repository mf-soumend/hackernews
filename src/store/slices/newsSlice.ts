import { createSlice } from "@reduxjs/toolkit";
interface Story {
  id: number;
  isLoaded: boolean;
  topic: string;
}
interface NewsState {
  newNews: Story[];
  topNews: Story[];
  lastUpdatedNew: number;
  lastUpdatedTop: number;
  isAuthenticated: boolean;
}
const initialState: NewsState = {
  newNews: [],
  topNews: [],
  lastUpdatedNew: new Date("01/01/1900").getTime(),
  lastUpdatedTop: new Date("01/01/1900").getTime(),
  isAuthenticated: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewNews: (state, action) => {
      state.newNews = action.payload.map((item: number) => ({
        id: item,
        isLoaded: false,
        topic: "new",
      }));
      state.lastUpdatedNew = Date.now();
    },
    setTopNews: (state, action) => {
      state.topNews = action.payload.map((item: number) => ({
        id: item,
        isLoaded: false,
        topic: "top",
      }));
      state.lastUpdatedTop = Date.now();
    },
    setStoryData: (state, action) => {
      const { topic, story } = action.payload;

      // Determine the array to update
      const targetNews = topic === "new" ? state.newNews : state.topNews;

      // Find the index of the story to update
      const index = targetNews.findIndex((item) => item.id === story.id);

      // Update the specific story if it exists
      if (index !== -1) {
        targetNews[index] = story;
      }
    },
  },
});

export const { setNewNews, setTopNews, setStoryData } = newsSlice.actions;
export const selectNewNews = (state: any) => state.news.newNews;
export const selectTopNews = (state: any) => state.news.topNews;
export const selectLastUpdatedNew = (state: any) => state.news.lastUpdatedNew;
export const selectLastUpdatedTop = (state: any) => state.news.lastUpdatedTop;

export default newsSlice.reducer;
