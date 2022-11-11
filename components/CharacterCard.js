import {Text ,TouchableOpacity, Image , StyleSheet } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'

// puede ser TouchableOpacity , TouchableWithoutFeedback
// puede ser onPress o onLongPress la funcion

const styles = StyleSheet.create({

    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: '#202020',
        borderWidth: 2,
        borderColor: '#e62429',
        borderRadius: 5,
        height: 60,
        paddingHorizontal: 5,
    },

    tinyLogo: {
        width: 50,
        height: 50,
        marginRight: 7,
        borderRadius: 5,
        },
    cardText: {
        color: 'white',
        fontSize: 15 ,
        fontWeight: 'bold',
    }

})




export default function CharacterCard({ image , name , id}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate('Detail',{image , name , id})} >
        <Image style={styles.tinyLogo} source={image} />
        <Text style={styles.cardText} >{name}</Text>
    </TouchableOpacity>
  )
}