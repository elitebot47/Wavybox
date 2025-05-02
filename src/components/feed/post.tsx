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
  return (
    <div className="flex flex-col">
      <div>
        <div>{username}</div>
        <div>{createdAt}</div>
      </div>
      <div>{content}</div>
    </div>
  );
}
