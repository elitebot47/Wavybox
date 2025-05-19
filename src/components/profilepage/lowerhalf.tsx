import PostArea from "../feed/postarea";

export default function LowerProfile({ initialData }: { initialData: {} }) {
  const username = initialData.username;

  return (
    <div>
      <div className="flex border-b mt-6 px-4 overflow-auto">
        {["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"].map(
          (tab) => (
            <button
              key={tab}
              className="py-2 px-2 text-gray-600 hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-blue-500 font-medium"
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div>
        <PostArea
          initialposts={initialData.posts}
          username={username}
          queryKey={["user-posts", username]}
          queryParams={{ username }}
        />
      </div>
    </div>
  );
}
