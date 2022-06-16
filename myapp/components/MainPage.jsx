import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import { useMutation } from "@apollo/client";
import { UserPostElement } from "./main_page/UserPostElement";
import { GET_USERS_POSTS } from "../query/getUsersPosts";

const URL = "192.168.0.157";
const PORT = "3000";
const FULL_URL = URL + ":" + PORT;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#333",
    // alignItems: "stretch",
    // justifyContent: "flex-start",
    padding: 20,
  },
  text: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
});

function MainPage({ navigation, userId }) {
  // const [users, setUsers] = useState()
  const [getUsersPosts] = useMutation(GET_USERS_POSTS);
  const [data, setData] = useState(null);
  const [isChangedLike, setIsChangedLike] = useState(false);

  useEffect(() => {
    getUsersPosts({ variables: { id: Number(userId) } })
      .then((res) => {
        setData(res.data.getUsersPosts);
      })
      .catch((err) => console.log("ERROR: ", err));
  }, [isChangedLike]);

  return (
    <View style={styles.container}>
      {data ? (
        <FlatList
        showsVerticalScrollIndicator={false}
          style={{ height: "94%" }}
          data={data}
          renderItem={({ item }) => (
            <UserPostElement
              item={item}
              navigation={navigation}
              setIsChangedLike={setIsChangedLike}
              isChangedLike={isChangedLike}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No posts</Text>
      )}

      <View
        style={{ flexDirection: "row", width: "100%", alignItems: "flex-end" }}
      >
        <Button
          title="Search users"
          onPress={() => {
            navigation.navigate("Search users");
          }}
          style={{
            // flex: 1,
            height: 100,
          }}
          titleStyle={{
            fontSize: 15
          }}
          containerStyle={{ width: "33%" }}
        />
        <Button
          title="Main page"
          disabled={true}
          style={{
            // flex: 1,
            height: 100,
          }}
          containerStyle={{ width: "33%" }}
        />
        <Button
          title="Add post"
          style={{
            // flex: 1,
            height: 100,
          }}
          onPress={() => {
            navigation.navigate("Add post",{
              userId: userId,
              isChangedLike, 
              setIsChangedLike
            });
          }}
          containerStyle={{ width: "33%" }}
        />
      </View>
    </View>
  );
}

export { MainPage };
