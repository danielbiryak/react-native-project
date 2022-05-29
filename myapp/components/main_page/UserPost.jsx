import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  post_container: {
    borderBottomColor: "black",
    borderBottomWidth: 3,
    padding: 10,
    marginVertical: 10,
  },
  text_title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5,
  },
  text_shadowed: {
    color: "#999999",
  },
});

function UserPost({ item, navigation }) {
  const shortened_text_pt1 = String(item.text_content).split(" ").slice(0,2).join(" ");
  const shortened_text_pt2 =
    " " + String(item.text_content).split(" ").slice(2, 3).join("432432") + "...";

  const open_post = () => {
    navigation.navigate('Post',{item: item})
  }

  return (
    <TouchableOpacity 
      style={styles.post_container}
      onPress={open_post}
    >
      <Text style={styles.text_title}>{item.title}</Text>
      <Text>
        {shortened_text_pt1}
        <Text style={styles.text_shadowed}>{shortened_text_pt2}</Text>
      </Text>
    </TouchableOpacity>
  );
}

export { UserPost };
