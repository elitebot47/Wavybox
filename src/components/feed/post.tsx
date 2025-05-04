import { formatDistanceToNow } from "date-fns";

interface Postprops {
  username: string;
  content: string;
  name?: string;
  createdAt: string;
  userId: number;
}

export default function Post({
  username,
  content,
  name,
  createdAt,
  userId,
}: Postprops) {
  const timeago = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  return (
    <div className="flex flex-col " >
      <div>
        <div>{username}</div>
        <div>{timeago}</div>
      </div>
      <div>{content}</div>
    </div>
  );
}
