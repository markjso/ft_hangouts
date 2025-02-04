import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Messages = ({route, navigation}) => {
  const { firstName, name, nickname, phone, email, title } = route.params || {};
  return (
    <View style={ styles.container }>
      <Text style={styles.h5}>Messages Screen</Text>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#36454F',
    paddingTop: 20,
    paddingLeft: 40,
  },
  h5: {
    fontSize: 18,
    color: '#ddd',
    marginLeft: 10, 
  },  
});

export default Messages;