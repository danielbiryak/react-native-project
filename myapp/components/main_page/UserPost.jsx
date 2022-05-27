import { View, Text } from "react-native";

function UserPost({ id, title, text_content, likes_count }) {
  return (
    <>
      <Text>Title: {title}</Text>
      <Text>Content: {text_content}</Text>
    </>
  );
}

export { UserPost };
