import React, { useState, useEffect, useRef } from 'react';
import { View, Text, AppState, Animated } from 'react-native';

const AppBackgroundTime = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [backgroundTime, setBackgroundTime] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to the foreground
      const now = new Date();
      setBackgroundTime(now.toLocaleTimeString());
      fadeIn();
    } else if (nextAppState.match(/inactive|background/)) {
      // App is going to the background
      const now = new Date();
      setBackgroundTime(now.toLocaleTimeString());
    }

    setAppState(nextAppState);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(fadeOut, 3000); // Fade out after 3 seconds
    });
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {backgroundTime && (
        <Text style={{ fontSize: 20 }}>
          App was last in the background at: {backgroundTime}
        </Text>
      )}
    </Animated.View>
  );
};

export default AppBackgroundTime;
