import { View, Text, Image , StyleSheet } from 'react-native'
import React from 'react'



const styles = StyleSheet.create({

  container:{
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
    height: '100%'
  },

  detail:{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor: '#202020',
    marginHorizontal: 15,
    minHeight: '90%',
    minWidth: '90%',
    borderColor: '#e62429',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid'
  },

  mainImage: {
  width: 250,
  height: 250,
  },
  
  nameText:{
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    // marginBottom: 10
  },
  descriptionText:{
    color: 'white',
    paddingHorizontal: 20,
  }

})

export default function Information({ image, name, description }) {

  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.nameText} >{name}</Text>
        <Image style={styles.mainImage} source={{uri: image}}/>
        <Text style={styles.descriptionText} >{description || 'No Description Available'}</Text>
      </View>
    </View>
  )
}