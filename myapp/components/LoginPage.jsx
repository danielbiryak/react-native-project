import {Button, Input} from 'react-native-elements'
import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 210,
        width: 360,
        paddingHorizontal: 60,
        alignSelf: "center",
        backgroundColor: "#395159"
    }
})

function LoginPage({navigation, changeState}) {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const printFunc = () => {
        console.log(`Username: ${username}\nPassword: ${password}`)
    }

    return (
            <View style={styles.container}>
                <Input
                    onChangeText={value => setUsername(value)}
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
                        printFunc()
                        changeState(true)
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
                    onPress={() => navigation.navigate('Registration')}
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