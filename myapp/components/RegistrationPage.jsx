import {Button, Input, Text} from 'react-native-elements'
import React, {useState} from 'react'
import {Modal, StyleSheet, View} from 'react-native'
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_USER} from '../query/getUsers'


function RegistrationPage({navigation, setUserId}) {
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
            fontSize: 34,
            alignSelf: "center"
        },
        modal_failed_bot_text: {
            fontSize: 25,
            paddingTop: 100
        }
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [failed, setFailed] = useState(false)
    const [age, setAge] = useState(0)
    const [create_user] = useMutation(CREATE_USER)


    const printFunc = () => {
        console.log(`Username: ${username}\nPassword: ${password}\nAge: ${age}`)
    }

    const registration = () => {
        if (age > 14 && age < 200 && password && username) {
            create_user({variables: {username, password, age}})
                .then(res => {
                    const data = res.data.createUser
                    if (data)
                        setUserId(data.id)
                    else
                        setFailed(true)
                })
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={failed}
                transparent
            >
                <View
                    style={styles.modal_failed}
                    onTouchEnd={() => setFailed(false)}
                >
                    <Text style={styles.modal_failed_top_text}>Failed to register</Text>
                    <Text style={styles.modal_failed_bot_text}>Tap on screen</Text>
                </View>
            </Modal>
            <Input
                onChangeText={value => setUsername(value)}
                placeholder="Username"
            />
            <Input
                onChangeText={value => setAge(parseInt(value))}
                placeholder="Age"
                keyboardType="numeric"
            />
            <Input
                onChangeText={value => setPassword(value)}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Button
                title='Register'
                onPress={() => {
                    // setUserId(25)
                    registration()
                    // navigation.push('Main')
                }}
                buttonStyle={{
                    backgroundColor: '#147900'
                }}
                containerStyle={{
                    width: 220,
                    marginVertical: 28,
                    alignSelf: "center"
                }}
            />
        </View>
    )
}

export {RegistrationPage}