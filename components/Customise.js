import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ColorContext from '../context/ColorContext';
import { Colors } from './Style/Color';
import { connectToDatabase, updateSingleUserPreference } from '../db/dbCreate';

const Customise = () => {
  const { color, setColor } = useContext(ColorContext);

  const handleColorSelection = async (newColor: string) => {
    const db = await connectToDatabase()
    await updateSingleUserPreference(db, "colorPreference", newColor)
    setColor(newColor)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h4}> Choose your header colour </Text>
      <View style={styles.colorsContainer}>
        {Object.entries(Colors.choices).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.colorBox,
              { backgroundColor: value },
              value === color && styles.selectedBorder,
            ]}
            onPress={() => setColor(value), handleColorSelection(value)}></TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Customise;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#36454F',
    height: '100%',
    padding: 10,
  },
  h4: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#36454F',
    justifyContent: 'left',
    paddingTop: 20,
  },
  colorBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 45,
  },
  selectedBorder: {
    borderWidth: 3,
    borderColor: 'white',
  },
});
