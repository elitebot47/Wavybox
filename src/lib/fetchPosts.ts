import axios from "axios";

export async function fetchPosts(queryParams?: {
  username?: string;
  tag?: string;
}) {
  if (queryParams?.username) {
    try {
      const res = await axios.get(`/api/user/${queryParams.username}`);

      return res.data.userPlusPosts.posts || [];
    } catch (error) {
      return [];
    }
  } else {
    try {
      const res = await axios.get("/api/post");
      return res.data.posts || [];
    } catch (error) {
      return [];
    }
  }
}
