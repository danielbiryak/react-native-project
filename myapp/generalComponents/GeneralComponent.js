import { NavigationContainer } from "@react-navigation/native";
import { LoginPage } from "../components/LoginPage";
import { RegistrationPage } from "../components/RegistrationPage";
import { MainPage } from "../components/MainPage";
import { SearchUsersPage } from '../components/SearchUsersPage'
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PostPage } from "../components/PostPage";
import { Button } from "react-native";
import { AddPostPage } from "../components/AddPostPage";
import { SetUpPage } from "../components/SetUpPage";


export default function GeneralComponent({ setIp, setPort, ip, port }) {
    const ButtonLogout = () => {
        return (
            <Button
                title="Log out"
                color='#fff'
                onPress={() => {
                    setUserId(0);
                }} />
        )
    }

    const [userId, setUserId] = useState(0)
    const [isMainPage, setIsMainPage] = useState(true)
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            {userId == 0 ?
                <Stack.Navigator>
                    <Stack.Screen name='SocialNet Project'>
                        {
                            props => <LoginPage
                                {...props}
                                setUserId={setUserId}
                            />
                        }
                    </Stack.Screen>

                    <Stack.Screen name='Set up'>
                        {
                            props => <SetUpPage
                                {...props}
                                setIp={setIp}
                                setPort={setPort} 
                                ip={ip}
                                port={port} />
                        }
                    </Stack.Screen>

                    <Stack.Screen name='Registration'>
                        {
                            props => <RegistrationPage
                                {...props}
                                setUserId={setUserId}
                            />
                        }
                    </Stack.Screen>

                </Stack.Navigator>
                :
                <Stack.Navigator>


                    <Stack.Screen name='Main'
                        options={{ headerRight: () => (ButtonLogout()) }}>

                        {props => <MainPage {...props}
                            userId={userId}
                        />}
                    </Stack.Screen>


                    <Stack.Screen name='Post'>
                        {props => <PostPage {...props}
                            userId={userId}
                        />}
                    </Stack.Screen>

                    <Stack.Screen name='Search users'>
                        {props => <SearchUsersPage {...props}

                        />}
                    </Stack.Screen>
                    <Stack.Screen name='Add post'>
                        {props => <AddPostPage {...props}

                        />}
                    </Stack.Screen>


                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}