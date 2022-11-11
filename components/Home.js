import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import apiParams from '../config.js'
import axios from 'axios'


const styles = StyleSheet.create({

})

export default function Home() {
    const [search, setSearch] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { ts, apikey, hash, baseURL } = apiParams;

    // hago la request a la Api y me traigo los characters

    useEffect(() => {
        axios.get(`${baseURL}/v1/public/characters`, {
            params: {
            ts,
            apikey,
            hash
            }
        })
            .then(response => setData(response.data.data.results))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
        }, []);

        return (
        <View style={{alignItems:'center', backgroundColor: "#151515" , height: '100%', justifyContent: 'center' }}>
            {isLoading 
            ? <ActivityIndicator size={'large'} color="#e62429"/>
            : (
                <FlatList
                data={data}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <CharacterCard
                    id={item.id} 
                    image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`} 
                    name={item.name} />
                )}
                />
            )
            }
        </View>
        );
    }