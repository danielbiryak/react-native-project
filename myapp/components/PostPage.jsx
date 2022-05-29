import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Badge } from "react-native-elements";
import { GET_USERS_LIKE_STATE } from "../query/getUsersLikeState";
import { LIKE_POST_METHOD } from "../query/likePostMethod";
import { GET_POST_LIKES_COUNT } from '../query/getPostLikesCount';

const styles = StyleSheet.create({
  main_container: {
    marginHorizontal: 10,
  },
  text_title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text_content: {
    fontSize: 20,
  },
  like_container: {
    // flex: 1,
    alignItems: "flex-start",
  },
  badge_element: {
    position: "absolute",
    top: 5,
    left: 50,
    zIndex: 2,
    elevation: 2,
  },
});

function PostPage({ route, userId }) {
  const [liked, setLiked] = useState(true);
  const item = route.params.item;
  const title = item.title;
  const text_content = item.text_content;
  const [likesCount, setLikesCount] = useState(Number(item.likes_count)) 
  const post_id = Number(item.id);
  const [likeStateMutation] = useMutation(GET_USERS_LIKE_STATE);
  const [likePostMethodMutation] = useMutation(LIKE_POST_METHOD);
  const [getPostLikesCountMutation] = useMutation(GET_POST_LIKES_COUNT)
  
  const likeAction = () => {
    likePostMethodMutation({
      variables: {
        post_id: post_id,
        user_id: Number(userId),
      },
    })
      .then((res) => {
        console.log("DATA FROM LIKE_POST_METHOD: ", JSON.stringify(res));
        setLiked(Boolean(res.data.likePostMethod));
      })
      .catch((err) => console.log(err));
  };

  const getLikesCount = () => {
    getPostLikesCountMutation({variables: {post_id: post_id}})
    .then(res => setLikesCount(Number(res.data.getPostLikesCount)))
    .catch(err => console.log(err))
  }
  const getUserLikeState = () => {
    likeStateMutation({
      variables: { post_id: post_id, user_id: Number(userId) },
    })
      .then((res) => {
        setLiked(Boolean(res.data.getUsersLikeState));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserLikeState();
    getLikesCount();
  }, [liked]);

  return (
    <View style={styles.main_container}>
      <View>
        <Text style={styles.text_title}>Title: {title} </Text>
        <Text style={styles.text_content}>{text_content}</Text>
        <Text>{JSON.stringify(item)}</Text>
      </View>

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
              likeAction()
            }}
          />
        ) : (
          <Icon
            raised
            size={30}
            name="favorite-border"
            type="material"
            onPress={() => {
              console.log("FDSFDSFDSF");
              likeAction();
            }}
          />
        )}
        <Text>{userId}</Text>
      </View>
    </View>
  );
}

export { PostPage };
