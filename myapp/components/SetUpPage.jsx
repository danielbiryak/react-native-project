import { Button, Input, Text } from "react-native-elements";
import { View, StyleSheet } from 'react-native'
import { useState } from "react";

const styles = StyleSheet.create({
    main_container: {
        margin: 20
    }
})

function SetUpPage({navigation, setIp, setPort, ip, port}) {

    const [_ip, _setIp] = useState('')
    const [_port,_setPort] = useState('')

    const confrim_changes = () => {
        if(_ip != '')
            setIp(_ip)
        if(_port != '')
            setPort(_port)
        
        navigation.goBack()
    }

    return (
        <View style={styles.main_container}>
            <Text>Ip: </Text>
            <Input placeholder={ip} onChangeText={(value) => _setIp(value)}/>
            <Text>Port: </Text>
            <Input placeholder={port} onChangeText={(value) => _setPort(value)}/>
            <Button title='Apply' onPress={() => confrim_changes()}/>
        </View>
    )
}

export { SetUpPage }