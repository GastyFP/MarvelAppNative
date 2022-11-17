import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import apiParams from '../config.js'
import axios from 'axios'

const styles = StyleSheet.create({
    searchBar:{
        width: '100%',
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5,
    },
    container:{
        display: 'flex',
        alignItems:'center',
        backgroundColor: "#151515" ,
        minHeight: "100%",
        justifyContent: 'center',
    },

    loaderStyle:{
        marginVertical: 16,
        alignItems:'center'
    }

})


export default function Home() {
    const [search, setSearch] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const { ts, apikey, hash, baseURL } = apiParams;

    const [moreLoading, setMoreLoading]= useState(true)
    const [count , setCount] = useState(0)

    // hago la request a la Api y me traigo los characters
    useEffect(() => {
            getCharacters();
        }, []);

    function getCharacters(){
        setLoading(true)
        axios.get(`${baseURL}/v1/public/characters`, {
            params: {
            ts,
            apikey,
            hash,
            }
        })
            .then(response => {setData(response.data.data.results)})
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }

    const searchCharacter = () => {
        setCount(0)
            if(search) {
                setLoading(true);
                axios.get(`${baseURL}/v1/public/characters`, {
                params: {
                    ts,
                    apikey,
                    hash,
                    nameStartsWith: search
                    }
            })
                .then(response => setData(response.data.data.results))
                .catch(error => console.error(error))
                .finally(() => setLoading(false));
            }else{
                resetCharacters()
            }
        }

    const resetCharacters = () =>{
        setLoading(true);
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
    }

    const renderLoader = () =>{
        return (
            moreLoading ?
                <View style={styles.loaderStyle}>
                <ActivityIndicator size={'small'} color="#e62429"/>
                </View>:null
        )
    }
    const loadMoreItem = () =>{
        setCount((count+20))
        setMoreLoading(true)
        axios.get(`${baseURL}/v1/public/characters`, {
            params: {
                ts,
                apikey,
                hash,
                offset: count
            }
        })
        .then(response => {setNewData(response.data.data.results)})
        .catch(error => console.error(error))
        .finally(() => setMoreLoading(false));
    }
 
        return (
        <View style={styles.container}>
            {isLoading 
            ? <ActivityIndicator size={'large'} color="#e62429"/>
            : (
                <View style={{minHeight:'100%'}}>
                    <View style={styles.searchBar}>
                        <Searchbar
                        placeholder="Search for character..."
                        onChangeText={value => setSearch(value)}
                        value={search}
                        onIconPress={searchCharacter}
                        onSubmitEditing={searchCharacter}
                        />
                    </View>
                    <FlatList
                    data={data}
                    keyExtractor={({ id }) => id.toString()}
                    // ListFooterComponent={renderLoader}
                    // onEndReached={loadMoreItem}
                    // onEndReachedThreshold={0}
                    renderItem={({ item }) => (
                    <CharacterCard
                    id={item.id} 
                    image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`} 
                    name={item.name} />
                    )}
                    />
                </View> 
            )
            }
        </View>
        );
    }