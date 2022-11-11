import React, { useEffect, useState } from "react";
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Information from './Information'
import Comics from './Comics'
import apiParams from "../config.js";
import axios from 'axios';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({


})

const  Detail = ({route})=> {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { ts, apikey, hash, baseURL } = apiParams;

    console.log(data)

    useEffect(() => {
        axios.get(`${baseURL}/v1/public/characters/${route.params.id}`, {
            params: {
            ts,
            apikey,
            hash
            }
        })
            .then(response => setData(response.data.data.results[0]))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
        }, []);

    return(
        <Tab.Navigator screenOptions={{headerShown: false , tabBarInactiveBackgroundColor: "#151515" , tabBarActiveBackgroundColor: "#202020"}} initialRouteName="Information">

            <Tab.Screen name="Information"
            options={
                {tabBarIcon:()=>(<Ionicons name="information-circle" size={25} color={"#e62429"} />), tabBarActiveTintColor: '#e62429'} 
            }
            > 
                {() => 
                    (isLoading
                        ? ( <View style={{alignItems:'center', backgroundColor: "#151515" , height: '100%', justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#e62429" />
                            </View>
                            ) 
                        : <Information 
                            image={`${data?.thumbnail?.path}.${data.thumbnail.extension}`}
                            name={data.name}
                            description={data.description} 
                        />
                    )
                }

            </Tab.Screen>

            <Tab.Screen name="Comics"
            options={
                {tabBarIcon:()=>(<Ionicons name="book" size={25} color={"#e62429"} />), tabBarActiveTintColor: '#e62429'}
            }
            > 
                {() => 
                    (isLoading
                    ? ( <View style={{alignItems:'center', backgroundColor: "#151515" , height: '100%', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#e62429" />
                    </View>
                    ) 
                    : <Comics
                        listComics={data?.comics?.items} 
                    />
                    )
                }

            </Tab.Screen>

        </Tab.Navigator>
    )
}

export default Detail