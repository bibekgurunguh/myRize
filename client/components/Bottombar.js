import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Colors from '../constants/colors';
import HomeLogo from '../assets/home-logo.png';
import NotificationsLogo from '../assets/notifications-logo.png';
import ProgressLogo from '../assets/progress-logo.png';
import ProfileLogo from '../assets/profile-logo.png';

export default function BottomBar(props) {
  return (
    <View style={styles.bottombar}>
      <TouchableOpacity style={styles.buttons} onPress={props.goHome} activeOpacity={0.7}>
        <Image
          style={styles.logos}
          source={HomeLogo}
          tintColor={props.screen === 'home' ? Colors.default.dark : Colors.default.accent}
        />
        <Text style={{color: props.screen === 'home' ? Colors.default.dark : Colors.default.accent}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={props.goNotifications} activeOpacity={0.7}>
        <Image
          style={styles.logos}
          source={NotificationsLogo}
          tintColor={props.screen === 'notifications' ? Colors.default.dark : Colors.default.accent}
        />
        <Text style={{color: props.screen === 'notifications' ? Colors.default.dark : Colors.default.accent}}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={props.goProgress} activeOpacity={0.7}>
        <Image
          style={styles.logos}
          source={ProgressLogo}
          tintColor={props.screen === 'progress' ? Colors.default.dark : Colors.default.accent}
        />
        <Text style={{color: props.screen === 'progress' ? Colors.default.dark : Colors.default.accent}}>Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={props.goProfile} activeOpacity={0.7}>
        <Image
          style={styles.logos}
          source={ProfileLogo}
          tintColor={props.screen === 'profile' ? Colors.default.dark : Colors.default.accent}
        />
        <Text style={{color: props.screen === 'profile' ? Colors.default.dark : Colors.default.accent}}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottombar: {
    flexDirection: 'row',
    backgroundColor: Colors.default.primary,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 15,
  },
  buttons: {
    padding: 10,
    alignItems: 'center',
  },
  logos: {
    width: 40,
    height: 40,
  },
})
