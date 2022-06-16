import React, { useState } from 'react'
import {
    ApolloProvider,
    InMemoryCache,
    ApolloClient
} from "@apollo/client"
import GeneralComponent from "./generalComponents/GeneralComponent";

export default function App() {

    const [ip, setIp] = useState('192.168.0.157')
    const [port, setPort] = useState('3000')

    const client = new ApolloClient({
        uri: `http://${ip}:${port}/graphql`,
        cache: new InMemoryCache()
    })

    return (
        <ApolloProvider client={client}>
            <GeneralComponent setIp={setIp} setPort={setPort} ip={ip} port={port} />
        </ApolloProvider>
    )
}