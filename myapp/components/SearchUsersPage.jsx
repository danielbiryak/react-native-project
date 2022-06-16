import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { GET_USERS } from "../query/getUsers";
import { SEARCH_USERS_BY_NICKNAME } from "../query/searchUsersByNickname";
import { Input } from "react-native-elements";

const styles = StyleSheet.create({
  search_container: {
    marginHorizontal: 20,
    marginVertical: 0,
    width: "85%",
  },
  users_list: {
    borderBottomColor: "black",
    borderBottomWidth: 4,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

function SearchUsersPage() {
  const [nickname, setNickname] = useState("");
  const [searchUsersByNickname] = useMutation(SEARCH_USERS_BY_NICKNAME);
  const [data, setData] = useState(null);

  useEffect(() => {
    searchUsersByNickname({ variables: { nickname: nickname } })
      .then((res) => {
        setData(res.data.searchUsersByNickname);
      })
      .catch((err) => console.log(err));
  }, [nickname]);

  return (
    <View>
      <Input
        containerStyle={styles.search_container}
        onChangeText={(value) => setNickname(value)}
        placeholder="Nickname"
      />
      {nickname == "" ? (
        <Text style={{ marginHorizontal: 10 }}>Search for users!</Text>
      ) : (
        <FlatList
          // style={{ height: "94%" }}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.users_list}>
              <Text>Name: {item.name}</Text>
              <Text>Nickname: {item.nickname}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

export { SearchUsersPage };
