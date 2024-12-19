import { api, endPoints } from "src/api";

export const fetchNewNews = async () => {
  return api.get(endPoints.news.newNews);
};

export const fetchNewsDetails = async (id: string) => {
  return api.get(endPoints.news.newsDetails + "/" + id + ".json");
};
