export default function UserProfilePage({ params }) {
  const { username } = params;
  return <div>{username}</div>;
}
