import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

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
  like_container: {
    alignSelf: "flex-start",
  },
  likes_count_container: {
    margin: 200,
  },
});

function UserPostElement({
  item,
  navigation,
  setIsChangedLike,
  isChangedLike,
}) {
  const shortened_text_pt1 = String(item.text_content)
    .split(/\\r|\\n|\s/)
    .filter((value) => value != "")
    .slice(0, 2)
    .join(" ");
  const shortened_text_pt2 =
    " " +
    String(item.text_content).split(" ").slice(2, 3) +
    "...";

  const open_post = () => {
    navigation.navigate("Post", {
      item,
      setIsChangedLike,
      isChangedLike,
    });
  };

  return (
    <TouchableOpacity style={styles.post_container} onPress={open_post}>
      <Text style={styles.text_title}>{item.title}</Text>
      <Text>
        {shortened_text_pt1}
        <Text style={styles.text_shadowed}>{shortened_text_pt2}</Text>
      </Text>
      {/* <Text>{item.likes_count}</Text> */}
      <Text>
        <Icon
          size={20}
          name="favorite"
          type="material"
          onPress={() => {
            likeAction();
          }}
          containerStyle={styles.like_container}
        />
        <Text containerStyle={{ margin: 25 }} style={{ fontSize: 25 }}>
          {" "}
          {item.likes_count}
        </Text>
      </Text>
    </TouchableOpacity>
  );
}

export { UserPostElement };
