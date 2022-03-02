import React, {useState} from 'react'
import {LoginPage} from "./components/LoginPage"
import {MainPage} from "./components/MainPage"
import {RegistrationPage} from "./components/RegistrationPage"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from "@react-navigation/native";
import {
    ApolloProvider,
    InMemoryCache,
    ApolloClient, gql, useQuery
} from "@apollo/client"
import GeneralComponent from "./generalComponents/GeneralComponent";

const client = new ApolloClient({
    uri: `http://192.168.0.157:3000/graphql`,
    cache: new InMemoryCache()
})
const GET_USERS = gql`
    query{
        getAllUsers{
    id, username, age
  }
}
`


export default function App() {

    // const [localhost, setLocalhost] = useState('')
    client.query({
        query: GET_USERS
    })
        .then(res => console.log(res))

    return (
        <ApolloProvider client={client}>
            <GeneralComponent/>
        </ApolloProvider>
    )
}