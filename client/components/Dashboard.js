import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './Home';
import Settings from './Settings';
import Resolution from './Resolution';
import Colors from '../constants/colors';

let Theme = Colors.default;

export default function Dashboard(props) {

  const [ chosenRes, setChosenRes ] = useState('Running');

  return (
    <View style={styles.dashboard}>
      {
        props.screen === 'home' ?
          <Home
            screenChange={props.screenChange}
            goResolution={props.goResolution}
            chooseRes={res => setChosenRes(res)}
            user={props.user}
            resolutions={props.resolutions}
          />
        : props.screen === 'notifications' ?
          <Text>Notifications</Text>
        : props.screen === 'progress' ? 
          <Text>Progress</Text>
        : props.screen === 'profile' ? 
          <Text>Profile</Text>
        : props.screen === 'settings' ? 
          <Settings screenChange={props.screenChange}/>
        : props.screen === 'resolution' ? 
          <Resolution
            user={props.user}
            resolutions={props.resolutions}
            setUser={props.setUser}
            screen={props.screen}
            screenChange={props.screenChange}
            chosenRes={chosenRes}
          />
        : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: Theme.bg,
    borderRadius: 25,
    elevation: 5,
    paddingBottom: 60,
  }
})
