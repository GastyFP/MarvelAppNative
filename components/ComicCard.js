import { View, Text, StyleSheet , Image } from 'react-native'
import React from 'react'


const styles = StyleSheet.create({
    detail:{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor: '#202020',
        marginHorizontal: 10,
        // minHeight: '90%',
        // minWidth: '70%',
        height: 400,
        maxHeight:400,
        maxWidth: 240,
        Width: 240,
        borderColor: '#e62429',
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 15
        },
    
        mainImage: {
        width: 200,
        height: 330,
        borderRadius: 5,
        },

        nameText:{
        marginTop: 12,
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
        }
})

export default function ComicCard({name , image}) {
    return (
        <View style={styles.detail}>
        <Image style={styles.mainImage} source={image}/>
            <Text style={styles.nameText}>{name}</Text>
        </View>
    )
    }



