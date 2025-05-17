import axios from "axios";
import { toast } from "sonner";

export default async function DeletePost(postid: number) {
  try {
    await axios.delete(`/api/post`, {
      data: { postId: postid },
    });
  } catch (error) {
    toast.error("Error while deleting post!");
    throw error;
  }
}
