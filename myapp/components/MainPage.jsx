import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Button, ButtonGroup } from "react-native-elements";
import { useMutation } from "@apollo/client";
import { UserPost } from "./main_page/UserPost";
import { GET_USERS_POSTS } from "../query/getUsersPosts";

const URL = "192.168.0.157";
const PORT = "3000";
const FULL_URL = URL + ":" + PORT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 20,
  },
  text: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
});

function MainPage({ navigation, setUserId, userId }) {
  const ButtonLogout = () => {
    return (
      <Button
        title="Log out"
        onPress={() => {
          setUserId(0);
        }}
        buttonStyle={{
          width: 148,
        }}
      />
    );
  };

  const ButtonMainPage = () => {
    return (
      <Button
        title="Main page"
        disabled={true}
        buttonStyle={{
          width: 148,
        }}
      />
    );
  };

  // const [users, setUsers] = useState()
  const [getUsersPosts] = useMutation(GET_USERS_POSTS);
  const [data, setData] = useState(null);

  let [info, setInfo] = useState(null);

  let infoFromServer;
  const getInfoFromServer = async () => {
    fetch(`http://${FULL_URL}`)
      .then((value) => {
        // console.log('VALUE:' + JSON.stringify(value))
        return value.json();
      })
      .then((data) => {
        setInfo(data.some_text);
        infoFromServer = data.some_text;
        console.log("DATA:" + JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getLocation();
  // }, []);
  useEffect(() => {
    getInfoFromServer();
  }, []);
  useEffect(() => {
    getUsersPosts({ variables: { id: Number(userId) } })
      .then((res) => {
        setData(res.data.getUsersPosts);
      })
      .catch((err) => console.log("ERROR: ", err));
  }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   var position = location;
  // }

  return (
    <View style={styles.container}>
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <UserPost
              item={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : 
      <Text>No posts</Text>}

      <View>
        {/* <Button
          title="Log out"
          onPress={() => {
            setUserId(0);
          }}
          buttonStyle={{
            
          }}
        /> */}
        <ButtonGroup
          buttons={[{ element: ButtonLogout }, { element: ButtonMainPage }]}
          containerStyle={{
            height: 40,
          }}
          buttonStyle={{}}
        />
      </View>
    </View>
  );
}

export { MainPage };
