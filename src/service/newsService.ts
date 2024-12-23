import { api, endPoints } from "src/api";

export const fetchNewNews = async (topic: string) => {
  return api.get(
    topic === "new" ? endPoints.news.newNews : endPoints.news.topNews
  );
};

export const fetchNewsDetails = async (id: string) => {
  return api.get(endPoints.news.newsDetails + "/" + id + ".json");
};
