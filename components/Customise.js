import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ColorContext from '../context/ColorContext';
import { Colors } from './Style/Color';
import LanguageContext from '../context/LanguageContext';
import en from '../language/en.json';
import fr from '../language/fr.json';

const Customise = () => {
  const { color, setColor } = useContext(ColorContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const locale = language === "fr" ? en : fr;

  return (
    <View style={styles.container}>
      <Text style={styles.h4}>{locale.Customise.title}</Text>
      <View style={styles.colorsContainer}>
        {Object.entries(Colors.choices).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.colorBox,
              { backgroundColor: value },
              value === color && styles.selectedBorder,
            ]}
            onPress={() => setColor(value)}></TouchableOpacity>
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
    justifyContent: 'flex-start',
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
