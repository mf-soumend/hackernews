export const endPoints = {
  auth: {
    fetchUserDetails: "https://www.googleapis.com/userinfo/v2/me",
  },
  news: {
    // new 500 stories
    newNews: "newstories.json",
    // top 500 stories
    topNews: "topstories.json",
    // single stories details - followed by '/{id}.json'
    newsDetails: "item",
  },
};
