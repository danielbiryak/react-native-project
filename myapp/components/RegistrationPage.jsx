import {Button, Input} from 'react-native-elements'
import {useState} from 'react'
import {StyleSheet, View} from 'react-native'


function RegistrationPage({navigation}) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 250,
            width: 360,
            paddingHorizontal: 60,
            alignSelf: "center",
            backgroundColor: "#395159"
        }
    })

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

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
                onChangeText={value => setUsername(value)}
                placeholder="Username"
            />
            <Input
                onChangeText={value => setUsername(value)}
                placeholder="Username"
            />
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
                onPress={() => navigation.push('Main')}
                containerStyle={{
                    width: 200,
                    marginVertical: 28,
                    alignSelf: "center"
                }}
            />
        </View>
    )
}

export {RegistrationPage}