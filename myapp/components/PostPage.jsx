import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import { Icon, Badge, Button } from "react-native-elements";
import { GET_USERS_LIKE_STATE } from "../query/getUsersLikeState";
import { LIKE_POST_METHOD } from "../query/likePostMethod";
import { GET_POST_LIKES_COUNT } from "../query/getPostLikesCount";
import { DELETE_USER_POST } from "../query/deleteUserPost";

const styles = StyleSheet.create({
  main_container: {
    marginHorizontal: 10,
  },
  modal: {
    backgroundColor: "#00000099",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  modal_button: {
    // height: 50,
    marginHorizontal: 25,
    width: "30%",
  },
  text_title: {
    fontSize: 27,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 15,
  },
  text_content: {
    fontSize: 20,
  },
  like_container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 20,
  },
  badge_element: {
    position: "absolute",
    top: 5,
    left: 50,
    zIndex: 2,
    elevation: 2,
  },
  scroll_view_container: {
    borderWidth: 3,
    borderRadius: 30,
    height: "75%",
    paddingHorizontal: 20,
  },
});

function PostPage({ route, userId, navigation }) {
  const item = route.params.item;
  const title = item.title;
  const text_content = item.text_content;
  const post_id = Number(item.id);

  const setIsChangedLike = route.params.setIsChangedLike;
  const isChangedLike = route.params.isChangedLike;

  const [likesCount, setLikesCount] = useState(Number(item.likes_count));
  const [liked, setLiked] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const [likeStateMutation] = useMutation(GET_USERS_LIKE_STATE);
  const [likePostMethodMutation] = useMutation(LIKE_POST_METHOD);
  const [getPostLikesCountMutation] = useMutation(GET_POST_LIKES_COUNT);
  const [deleteUserPostMutation] = useMutation(DELETE_USER_POST);

  const likeAction = () => {
    likePostMethodMutation({
      variables: {
        post_id: post_id,
        user_id: Number(userId),
      },
    })
      .then((res) => {
        // console.log("DATA FROM LIKE_POST_METHOD: ", JSON.stringify(res));
        setIsChangedLike(!isChangedLike);
        setLiked(Boolean(res.data.likePostMethod));
      })
      .catch((err) => console.log(err));
  };

  const getLikesCount = () => {
    getPostLikesCountMutation({ variables: { post_id: post_id } })
      .then((res) => setLikesCount(Number(res.data.getPostLikesCount)))
      .catch((err) => console.log(err));
  };
  const getUserLikeState = () => {
    likeStateMutation({
      variables: { post_id: post_id, user_id: Number(userId) },
    })
      .then((res) => {
        setLiked(Boolean(res.data.getUsersLikeState));
      })
      .catch((err) => console.log(err));
  };
  const deletePost = () => {
    deleteUserPostMutation({ variables: {post_id} })
      .then((res) => {
        console.log("User post have been deleted successfully. Res: ", res);
        setIsChangedLike(!isChangedLike)

        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserLikeState();
    getLikesCount();
  }, [liked]);

  return (
    <View style={styles.main_container}>
      <Modal visible={visibleModal} transparent>
        <View style={styles.modal}>
          <Text
            style={{
              position: "absolute",
              top: "40%",
              fontWeight: "bold",
              fontSize: 21,
            }}
          >
            Do you want to delete this post?
          </Text>
          <Button
            containerStyle={styles.modal_button}
            title="Yes"
            onPress={() => deletePost()}
          />
          <Button
            containerStyle={styles.modal_button}
            title="No"
            onPress={() => setVisibleModal(false)}
          />
        </View>
      </Modal>

      <Text style={styles.text_title}>Title: {title} </Text>

      <View style={styles.scroll_view_container}>
        <ScrollView showsVerticalScrollIndicator={false} style>
          <Text style={styles.text_content}>{text_content}</Text>
        </ScrollView>
      </View>
      <View>
        <View style={styles.like_container}>
          <Badge
            value={likesCount}
            status="error"
            containerStyle={styles.badge_element}
          />
          {liked ? (
            <Icon
              raised
              size={30}
              name="favorite"
              type="material"
              onPress={() => {
                likeAction();
              }}
            />
          ) : (
            <Icon
              raised
              size={30}
              name="favorite-border"
              type="material"
              onPress={() => {
                likeAction();
              }}
            />
          )}
        </View>

        <View style={{ alignSelf: "flex-end", marginRight: 15 }}>
          <Icon
            size={40}
            name="delete"
            type="material"
            onPress={() => setVisibleModal(true)}
          />
        </View>
      </View>
    </View>
  );
}

export { PostPage };
