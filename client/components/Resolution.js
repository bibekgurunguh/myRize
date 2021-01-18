import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View,
  Animated, Image, TouchableOpacity
} from 'react-native';

import CollapsibleStep from './CollapsibleStep';
import Colors from '../constants/colors';
let Theme = Colors.default;

// const resolutions = require('../resolutions.json').resolutions;

const Icons = {
  running: require('../assets/icons/runningIcon.png'),
  reading: require('../assets/icons/readingIcon.png'),
  quitSmoking: require('../assets/icons/quitSmokingIcon.png'),
  swimming: require('../assets/icons/swimmingIcon.png'),
  quitDrinkingAlcohol: require('../assets/icons/quitDrinkingAlcoholIcon.png'),
  overcomeFearOfPublicSpeaking: require('../assets/icons/overcomeFearOfPublicSpeakingIcon.png'),
  startHealthyDiet: require('../assets/icons/startHealthyDietIcon.png'),
  improveCreativeThinking: require('../assets/icons/improveCreativeThinkingIcon.png'),
  sleepBetter: require('../assets/icons/sleepBetterIcon.png'),
  overcomeAddiction: require('../assets/icons/overcomeAddictionIcon.png'),
  improveSocialSkills: require('../assets/icons/improveSocialSkillsIcon.png'),
  improveQuickLearning: require('../assets/icons/improveQuickLearningIcon.png'),
  becomeVegan: require('../assets/icons/becomeVeganIcon.png'),
  saveMoney: require('../assets/icons/saveMoneyIcon.png'),
  organizeYourLife: require('../assets/icons/organizeYourLifeIcon.png'),
  gainFlexibility: require('../assets/icons/gainFlexibilityIcon.png'),
  liveGoodFamilyLife: require('../assets/icons/liveGoodFamilyLifeIcon.png'),
  reviseEfficiently: require('../assets/icons/reviseEfficientlyIcon.png'),
  improveSkinHealth: require('../assets/icons/improveSkinHealthIcon.png'),
  singing: require('../assets/icons/singingIcon.png'),
  stayLookingCleanAllDay: require('../assets/icons/stayLookingCleanAllDayIcon.png'),
  bePhysicallyFit: require('../assets/icons/bePhysicallyFitIcon.png'),
  dancing: require('../assets/icons/dancingIcon.png'),
  conquerYourFear: require('../assets/icons/conquerYourFearIcon.png'),
  giveBackToCommunity: require('../assets/icons/giveBackToCommunityIcon.png'),
  rememberImportantThings: require('../assets/icons/rememberImportantThingsIcon.png'),
  stopProcrastinating: require('../assets/icons/stopProcrastinatingIcon.png'),
  tryNewLook: require('../assets/icons/tryNewLookIcon.png'),
  beMentallyAndEmotionallyStrong: require('../assets/icons/beMentallyAndEmotionallyStrongIcon.png'),
  practiceYogaDaily: require('../assets/icons/practiceYogaDailyIcon.png'),
}
const Backdrops = {
  running: require('../assets/backdrops/runningBackdrop.jpg'),
  reading: require('../assets/backdrops/readingBackdrop.jpg'),
  quitSmoking: require('../assets/backdrops/quitSmokingBackdrop.jpg'),
  swimming: require('../assets/backdrops/swimmingBackdrop.jpg'),
  quitDrinkingAlcohol: require('../assets/backdrops/quitDrinkingAlcoholBackdrop.jpg'),
  overcomeFearOfPublicSpeaking: require('../assets/backdrops/overcomeFearOfPublicSpeakingBackdrop.jpg'),
  startHealthyDiet: require('../assets/backdrops/startHealthyDietBackdrop.jpg'),
  improveCreativeThinking: require('../assets/backdrops/improveCreativeThinkingBackdrop.jpg'),
  sleepBetter: require('../assets/backdrops/sleepBetterBackdrop.jpg'),
  overcomeAddiction: require('../assets/backdrops/overcomeAddictionBackdrop.jpg'),
  improveSocialSkills: require('../assets/backdrops/improveSocialSkillsBackdrop.jpg'),
  improveQuickLearning: require('../assets/backdrops/improveQuickLearningBackdrop.jpg'),
  becomeVegan: require('../assets/backdrops/becomeVeganBackdrop.jpg'),
  saveMoney: require('../assets/backdrops/saveMoneyBackdrop.jpg'),
  organizeYourLife: require('../assets/backdrops/organizeYourLifeBackdrop.jpg'),
  gainFlexibility: require('../assets/backdrops/gainFlexibilityBackdrop.jpg'),
  liveGoodFamilyLife: require('../assets/backdrops/liveGoodFamilyLifeBackdrop.jpg'),
  reviseEfficiently: require('../assets/backdrops/reviseEfficientlyBackdrop.jpg'),
  improveSkinHealth: require('../assets/backdrops/improveSkinHealthBackdrop.jpg'),
  singing: require('../assets/backdrops/singingBackdrop.jpg'),
  stayLookingCleanAllDay: require('../assets/backdrops/stayLookingCleanAllDayBackdrop.jpg'),
  bePhysicallyFit: require('../assets/backdrops/bePhysicallyFitBackdrop.jpg'),
  dancing: require('../assets/backdrops/dancingBackdrop.jpg'),
  conquerYourFear: require('../assets/backdrops/conquerYourFearBackdrop.jpg'),
  giveBackToCommunity: require('../assets/backdrops/giveBackToCommunityBackdrop.jpg'),
  rememberImportantThings: require('../assets/backdrops/rememberImportantThingsBackdrop.jpg'),
  stopProcrastinating: require('../assets/backdrops/stopProcrastinatingBackdrop.jpg'),
  tryNewLook: require('../assets/backdrops/tryNewLookBackdrop.jpg'),
  beMentallyAndEmotionallyStrong: require('../assets/backdrops/beMentallyAndEmotionallyStrongBackdrop.jpg'),
  practiceYogaDaily: require('../assets/backdrops/practiceYogaDailyBackdrop.jpg'),
}

export default function Resolution(props) {

  const BASE_URL = 'http://192.168.0.57:3001';

  const USER = props.user;
  const resolutions = props.resolutions;
  const [ added, setAdded ] = useState(false);

  function addRes () {
    return fetch(`${BASE_URL}/addRes/${USER._id}/${props.chosenRes}`,
    { method: 'PUT' })
    .then(() => {
      USER.my_resolutions.push(props.chosenRes);
      setAdded(true);
    });
  }

  const rollUp = new Animated.Value(400);
  Animated.spring(
    rollUp,
    {toValue: 0,
    useNativeDriver: true}
  ).start();

  const [ rollAnim, setRollAnim ] = useState(rollUp);

  return (
    
    <Animated.ScrollView style={{...styles.container, transform: [{translateY: rollAnim}]}}>
      {
        (USER.my_resolutions) &&
        resolutions.filter(el=>el.image_ref===props.chosenRes).map((el, index)=>{
          return (
            <View key={index}>
              <View style={[styles.topCard, {paddingBottom: el.my_resolutions ? 20 : 0}]}>
                <Image
                  style={styles.backdrop}
                  source={Backdrops[el.image_ref]}
                  resizeMethod="resize"
                />
                <Text style={styles.title}>{el.title}</Text>
                <Text style={styles.overview}>{el.overview}</Text>
                {
                  USER.my_resolutions.includes(el.image_ref) &&
                  el.steps.map(step => {
                    return (
                      <CollapsibleStep
                        key={step.id}
                        stepId={step.id}
                        title={step.label}
                        content={step.description}
                        userId={USER._id}
                        notes={USER.notes}
                        my_resolutions={USER.my_resolutions}
                        screenChange={props.screenChange}
                        chosenRes={props.chosenRes}
                      />
                    )
                  })
                }
              </View>
              {
                (!USER.my_resolutions.includes(el.image_ref) && !added) &&
                <TouchableOpacity style={styles.startBtn} onPress={addRes}>
                  <Text style={styles.startBtnText}>+</Text>
                </TouchableOpacity>
              }
            </View>
          )
        })
      }
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topCard: {
    backgroundColor: Theme.light,
    padding: 0,
    margin: 25,
    borderRadius: 20,
    elevation: 6,
  },
  title: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.dark,
    paddingLeft: 20,
    paddingTop: 10,
    textShadowColor: Theme.light,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.dark,
    paddingLeft: 20,
    padding: 10,
  },
  backdrop: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  overview: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 30,
    color: Theme.dark,
  },
  startBtn: {
    position: 'relative',
    left: '50%',
    transform: [{translateX: -30}, {translateY: -30-25}],
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.accent,
    elevation: 7,
  },
  startBtnText: {
    fontSize: 50,
    color: Theme.light,
  },
  step: {
    flexDirection: 'row',
    padding: 25,
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.light,
  },
  stepDescriptionCard: {
    backgroundColor: Theme.dark,
    borderRadius: 20,
    width: '80%',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  stepDescription: {
    padding: 20,
    color: Theme.light,
  }
})
