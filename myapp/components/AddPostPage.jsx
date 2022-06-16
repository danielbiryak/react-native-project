import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Input, Text, Button } from "react-native-elements";
import { View, TextInput, StyleSheet } from "react-native";
import { CREATE_USER_POST } from "../query/createUserPost";

const styles = StyleSheet.create({
  add_post_textinput: {
    borderWidth: 5,
    borderRadius: 20,
    textAlignVertical: "top",
    height: "70%",
    paddingHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 15,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});

function AddPostPage({ navigation, route }) {
  const userId = Number(route.params.userId);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const setIsChangedLike = route.params.setIsChangedLike;
  const isChangedLike = route.params.isChangedLike;

  const [createUserPost] = useMutation(CREATE_USER_POST);
  const add_post = () => {
    if (postTitle != "" && postContent != "") {
      createUserPost({
        variables: {
          owner_id: userId,
          title: postTitle,
          text_content: postContent,
        },
      })
        .then((res) => {
          console.log("AddPostPage {", res, "}");
          setPostContent("");
          setPostTitle("");
          navigation.goBack();
          setIsChangedLike(!isChangedLike);
        })
        .catch((err) => console.log("AddPostPage {", err, "}"));
    }
  };

  return (
    <View>
      <View>
        <Input
          containerStyle={{ marginLeft: 10, marginTop: 20, width: "93%" }}
          placeholder="Title"
          onChangeText={(value) => setPostTitle(value)}
        />
      </View>

      <TextInput
        style={styles.add_post_textinput}
        placeholder="Write down the post..."
        numberOfLines={10}
        multiline={true}
        onChangeText={(value) => setPostContent(value)}
      />

      <Button
        containerStyle={{
          // position: "absolute",
          width: "90%",
          alignSelf: "center",
        }}
        title="Add post"
        onPress={() => add_post()}
      />
    </View>
  );
}

export { AddPostPage };
