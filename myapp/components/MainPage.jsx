import React, {useState, useEffect} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'
import * as Location from 'expo-location';

const URL = '192.168.0.157'
const PORT = '3000'
const FULL_URL = URL + ':' + PORT

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 20
    },
    text: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    }
})

function MainPage({navigation, changeState,}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let [info, setInfo] = useState(null)

    const getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync() //Getting status of permission request
        if (status !== 'granted') { //If status not granted this function ends
            setErrorMsg('Permission to access location was denied')
            return
        }
        //Else by async function getting current position
        setLocation(await Location.getCurrentPositionAsync({}))
    }

    let infoFromServer
    const getInfoFromServer = async () => {
        fetch(`http://${FULL_URL}`)
            .then(value => {
                // console.log('VALUE:' + JSON.stringify(value))
                return value.json()
            })
            .then(data => {
                setInfo(data.some_text)
                infoFromServer = data.some_text
                console.log('DATA:' + JSON.stringify(data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        (getLocation)()
    }, [])
    useEffect(() => {
        (getInfoFromServer)()
    }, [])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        var position = location
    }

    return (
        <View style={styles.container}>
            {position ?
                <Text>
                    {'\n\n\n\n\n\n\n'}
                    <Text style={styles.text}>Latitude: {position.coords.latitude}  </Text>
                    {'\n'}
                    <Text style={styles.text}>Longitude: {position.coords.longitude} </Text>
                    {'\n'}
                    <Text style={styles.text}>Text: {info}</Text>
                </Text>
                :
                <Text style={styles.text}>{'\n\n\n\n\n\n\n'}{text}</Text>
            }
            { changeState ?
                <Button title='To login page' onPress={() => changeState(false)}/>
                :
                <Text style={styles.text}>It's alright</Text>
            }
        </View>
    )
}

export {MainPage}