import axios from "axios";
import { toast } from "sonner";

export default async function DeletePost(postid: number) {
  try {
    await axios.delete(`/api/post/delete`, {
      data: {
        postId: postid,
      },
    });
    toast.success("Your post is deleted");
    return;
  } catch (error) {
    toast.error("Error while deleting post!");
    return;
  }
}
