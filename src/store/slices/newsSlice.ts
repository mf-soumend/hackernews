import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "src/api";
import { fetchNewNews } from "src/service";

export interface Story {
  id: number;
  isLoaded: boolean;
  topic: string;
  title?: string;
  text?: string;
  by?: string;
  time?: number;
  url?: string;
}
interface NewsState {
  newNews: Story[];
  topNews: Story[];
  lastUpdatedNew: number;
  lastUpdatedTop: number;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  newNews: [],
  topNews: [],
  lastUpdatedNew: new Date("01/01/1900").getTime(),
  lastUpdatedTop: new Date("01/01/1900").getTime(),
  isAuthenticated: false,
  loading: false,
  error: null,
};

interface FetchNewsPayload {
  topic: "new" | "top";
  data: number[];
}

// async thunk for fetching news
export const fetchNewsThunk = createAsyncThunk<FetchNewsPayload, "new" | "top">(
  endPoints.news.newNews,
  async (topic: "new" | "top", { rejectWithValue }) => {
    try {
      const response = await fetchNewNews(topic);
      return { topic, data: response };
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsThunk.fulfilled, (state, action) => {
        const { topic, data } = action.payload;
        if (topic === "new") {
          state.newNews = data.map((item: number) => ({
            id: item,
            isLoaded: false,
            topic: "new",
          }));
          state.lastUpdatedNew = Date.now();
        } else {
          state.topNews = data.map((item: number) => ({
            id: item,
            isLoaded: false,
            topic: "top",
          }));
          state.lastUpdatedTop = Date.now();
        }
        state.loading = false;
      })
      .addCase(fetchNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setStoryData } = newsSlice.actions;
export const selectNewNews = (state: any) => state.news.newNews;
export const selectTopNews = (state: any) => state.news.topNews;
export const selectLastUpdatedNew = (state: any) => state.news.lastUpdatedNew;
export const selectLastUpdatedTop = (state: any) => state.news.lastUpdatedTop;
export const selectLoading = (state: any) => state.news.loading;
export const selectError = (state: any) => state.news.error;

export default newsSlice.reducer;
