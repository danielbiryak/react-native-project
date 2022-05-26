import {Button, Input, Text} from 'react-native-elements'
import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {AUTH_USER} from '../query/authUser'
import {useMutation, useQuery} from "@apollo/client";
import {Modal} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 210,
        width: 360,
        paddingHorizontal: 60,
        alignSelf: "center",
        backgroundColor: "#395159"
    },
    modal_failed: {
        backgroundColor: "#00000099",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modal_failed_top_text: {
        fontSize: 55,
        alignSelf: "center"
    },
    modal_failed_bot_text: {
        fontSize: 25,
        paddingTop: 100
    }
})

function LoginPage({navigation, setUserId}) {
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    //const [state, setState] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [authUser] = useMutation(AUTH_USER)

    const printFunc = () => {
        console.log(`Username: ${nickname}\nPassword: ${password}`)
    }

    const authorize = () => {
        authUser({variables: {nickname, password}})
            .then(res => {
                const data = res.data.userAuth
                if (data != null)
                    setUserId(data.id)
                else {
                    setVisibleModal(true)
                }
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={visibleModal}
                transparent
            >
                <View
                    style={styles.modal_failed}
                    onTouchEnd={() => {
                        setVisibleModal(false)
                    }}
                >
                    <Text style={styles.modal_failed_top_text}>Failed to login</Text>
                    <Text style={styles.modal_failed_bot_text}>Tap on the screen</Text>
                </View>
            </Modal>
            <Input
                onChangeText={value => setNickname(value)}
                placeholder="Username"
            />
            <Input
                onChangeText={value => setPassword(value)}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Button
                title='Login'
                onPress={() => {
                    authorize()
                }}
                containerStyle={{
                    width: 250,
                    marginVertical: 28,
                    alignSelf: "center",
                    marginTop: 0
                }}
                buttonStyle={{
                    backgroundColor: '#415cff'
                }}
            />
            <Button
                title='Registration'
                onPress={() => navigation.navigate('Registration') }
                buttonStyle={{
                    backgroundColor: '#147900'
                }}
                containerStyle={{
                    marginTop: 50,
                    width: 200,
                    alignSelf: "center"
                }}
            />
        </View>
    )
}

export {LoginPage}