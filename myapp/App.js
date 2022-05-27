import React from 'react'
import {
    ApolloProvider,
    InMemoryCache,
    ApolloClient, gql
} from "@apollo/client"
import GeneralComponent from "./generalComponents/GeneralComponent";

const client = new ApolloClient({
    uri: `http://192.168.0.157:3000/graphql`,
    cache: new InMemoryCache()
})
const GET_USERS = gql`
    query{
        getAllUsers{
    id, nickname, password
  }
}
`


export default function App() {

    // const [localhost, setLocalhost] = useState('')
    // client.query({
    //     query: GET_USERS
    // })
    //     .then(res => console.log(res))

    return (
        <ApolloProvider client={client}>
            <GeneralComponent/>
        </ApolloProvider>
    )
}