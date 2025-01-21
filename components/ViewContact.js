import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';

const ViewContact = ({navigation, route}) => {

  return <Text> is {route.params.name} profile</Text>;
};


export default ViewContact;