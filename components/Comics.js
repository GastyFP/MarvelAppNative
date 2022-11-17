import React, { useState, useEffect } from 'react';
import { View,StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import apiParams from '../config.js';
import axios from 'axios';
import ComicCard from './ComicCard'

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#151515',
    height: '100%'
  },
  comicList:{
    height: 100,
  }
})

export default function Comics({listComics}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;

  useEffect(() => {

    const promisesArray = listComics.map(c => (
      axios.get(c.resourceURI, {
        params: {
          ts,
          apikey,
          hash
        }      
      })
    ));
    
    Promise.all(promisesArray)
      .then(responses => setData(responses.map(r => (
        r?.data?.data?.results[0]
      ))))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

  }, []);


  return (
    <View style={styles.container}>
      {
        isLoading ? 
        ( 
        <View style={{alignItems:'center', backgroundColor: "#151515" , height: '100%', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#e62429" />
        </View>
        ) 
        :
        <FlatList pagingEnabled style={styles.comicList}
              contentContainerStyle={{alignItems: 'center'}}
              data={data}
              keyExtractor={({ id }) => id.toString()}
              horizontal
              renderItem={({ item }) => (
                <ComicCard 
                  key={item.id}
                  name={item.title} 
                  image={`${item?.thumbnail?.path}.${item.thumbnail.extension}`}  
                />
          )}
        />
      }
    </View>
  )
}