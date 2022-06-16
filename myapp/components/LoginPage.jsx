import { Button, Input, Text } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AUTH_USER } from "../query/authUser";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 170,
    paddingHorizontal: 30,
    alignSelf: "stretch",
    backgroundColor: "#191919",
  },
  login_container: {
    borderWidth: 3,
    borderColor: "#2D4263",
    paddingHorizontal: 23,
    paddingVertical: 50,
    borderRadius: 20,
    backgroundColor: "#2D4263",
  },
  modal_failed: {
    backgroundColor: "#00000099",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal_failed_top_text: {
    fontSize: 55,
    alignSelf: "center",
  },
  modal_failed_bot_text: {
    fontSize: 25,
    paddingTop: 100,
  },
  button_self: {
    backgroundColor: "green",
    borderRadius: 20,
  },
  button_container: {
    marginTop: 50,
  },
});

function LoginPage({ navigation, setUserId }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  //const [state, setState] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false);
  const [authUser] = useMutation(AUTH_USER);

  const authorize = () => {
    authUser({ variables: { user: { nickname, password } } })
      .then((res) => {
        const data = res.data.userAuth;
        if (data != null) setUserId(data.id);
        else {
          setVisibleModal(true);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setVisibleModal(true);
      });
  };

  return (
    <View style={styles.container}>
      <Modal visible={visibleModal} transparent>
        <View
          style={styles.modal_failed}
          onTouchEnd={() => {
            setVisibleModal(false);
          }}
        >
          <Text style={styles.modal_failed_top_text}>Failed to login</Text>
          <Text style={styles.modal_failed_bot_text}>Tap on the screen</Text>
        </View>
      </Modal>
      <View style={styles.login_container}>
        <Input
          onChangeText={(value) => setNickname(value)}
          placeholder="Nickname"
        />
        <Input
          onChangeText={(value) => setPassword(value)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          title="Login"
          onPress={() => {
            authorize();
          }}
          containerStyle={{
            alignSelf: "stretch",
            marginVertical: 28,
            paddingHorizontal: 10,
            marginTop: 0,
          }}
          buttonStyle={{
            backgroundColor: "#415cff",
          }}
        />
        <Button
          title="Set up the server"
          onPress={() => {
            navigation.navigate("Set up");
          }}
          buttonStyle={{
            backgroundColor: "#00000033",
          }}
        />
      </View>
      <Button
        title="Registration"
        onPress={() => navigation.navigate("Registration")}
        buttonStyle={styles.button_self}
        containerStyle={styles.button_container}
      />
    </View>
  );
}

export { LoginPage };
