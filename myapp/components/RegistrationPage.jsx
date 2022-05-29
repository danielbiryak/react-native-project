import { Button, Input, Text } from "react-native-elements";
import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "../query/getUsers";
import DatePicker from "react-native-datepicker";

function RegistrationPage({ navigation, setUserId }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      paddingHorizontal: 30,
      alignSelf: "stretch",
      backgroundColor: "#191919",
    },
    modal_failed: {
      backgroundColor: "#00000099",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modal_failed_top_text: {
      fontSize: 34,
      alignSelf: "center",
    },
    modal_failed_bot_text: {
      fontSize: 25,
      paddingTop: 100,
    },
    calendar_group: {
      paddingVertical: 20,
      marginLeft: 10,
      borderWidth: 3,
      borderRadius: 50,
      borderColor: "black",
      alignItems: "center",
      width: 250,
    },
    calendar_text: {
      paddingBottom: 10,
      fontSize: 25,
    },
    register_container: {
      borderWidth: 3,
      borderColor: "#2D4263",
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 20,
      backgroundColor: "#2D4263",
    },
  });

  const minimal_age_registration = `${new Date().getFullYear() - 18}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  //const [age, setAge] = useState(0)
  let temp_date = new Date();
  temp_date.setFullYear(temp_date.getFullYear() - 18);
  const [birthday, setBirthday] = useState(temp_date);
  const [create_user] = useMutation(CREATE_USER);

  const printFunc = () => {
    console.log(`Username: ${nickname}\nPassword: ${password}`);
  };

  const registration = () => {
    if (password && nickname && name) {
      create_user({
        variables: {
          user: {
            nickname,
            password,
            birthday_date: String(new Date(birthday).getTime()),
            name,
          },
        },
      })
        .then((res) => {
          const data = res.data.createUser;
          if (data) setUserId(data.id);
          else setFailed(true);
        })
        .catch((err) => {
          console.log(err);
          setFailed(true);
        });
    } else setFailed(true);
  };

  return (
    <View style={styles.container}>
      <Modal visible={failed} transparent>
        <View style={styles.modal_failed} onTouchEnd={() => setFailed(false)}>
          <Text style={styles.modal_failed_top_text}>Failed to register</Text>
          <Text style={styles.modal_failed_bot_text}>Tap on screen</Text>
        </View>
      </Modal>
      <View style={styles.register_container}>
        <Input
          onChangeText={(value) => setNickname(value)}
          placeholder="Nickname"
        />
        <Input
          onChangeText={(value) => setName(value)}
          placeholder="Your actual name"
        />
        <View style={styles.calendar_group}>
          <Text style={styles.calendar_text}>Select your age</Text>
          <DatePicker
            style={{ width: 170 }}
            date={birthday}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            maxDate={minimal_age_registration}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => setBirthday(date)}
          />
        </View>
        <Input
          onChangeText={(value) => setPassword(value)}
          style={{ paddingTop: 20 }}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      <Button
        title="Register"
        onPress={() => {
          registration();
          // navigation.push('Main')
        }}
        buttonStyle={{
          backgroundColor: "#147900",
          borderRadius: 20,
        }}
        containerStyle={{
          width: 220,
          marginVertical: 28,
          alignSelf: "center",
        }}
      />
    </View>
  );
}

export { RegistrationPage };
