import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const ViewContact = ({route}) => {
  const { phone, email, alias, title } = route.params || {};

  return ( 
    <View style={styles.container}>
      <Pressable style={styles.skillsLink} onPress={() => navigation.navigate('Edit', {user})}>
        <Text style={styles.link}>Edit {'>'}</Text>
      </Pressable>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>alias</Text>
        <Text style={styles.h5}>{alias}</Text>
      </View>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>mobile</Text>
        <Text style={styles.h5}>{phone}</Text>
      </View>
      <View style={styles.phoneBox}>
        <Text style = {styles.h6}>email</Text>
        <Text style={styles.h5}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454F',
    paddingTop: 40,
    paddingLeft: 40,
  },
  h6: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5, 
  },
  h5: {
    fontSize: 18,
    color: '#ddd',
    marginLeft: 10, 
  },
  contactContainer: {
    marginBottom: 20, 
    width: '80%', 
  },
   row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  phoneBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '80%',
    padding: 5, 
    borderWidth: 1, 
    borderColor: '#fff',
    backgroundColor: '#455463',
    borderRadius: 8, 
    marginBottom: 10
  },
  link: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'right',
  },
  skillsLink: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  binIcon: {
     textAlign: 'right',
  },
  plusIcon: {
    position: 'left',
    top: 20,
    right: 20,
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#36454F',
  },
  modalContainer: { 
    width: '80%', 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 8,
  },
});


export default ViewContact;