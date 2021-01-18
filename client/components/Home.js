import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Animated,
  Text, View, Image,
  ScrollView, TouchableOpacity,
  LayoutAnimation, UIManager,
} from 'react-native';

import Colors from '../constants/colors';
import CircularProgress from '../components/CircularProgress';

let Theme = Colors.default;
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

export default function Home(props) {

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext({
    duration: 400,
    // create: { type: 'linear', property: 'opacity' },
    update: { type: 'spring', springDamping: 1.5 },
    // delete: { type: 'linear', property: 'opacity' }
  });

  const BASE_URL = 'http://192.168.0.57:3001';

  const [ USER, setUSER ] = useState(props.user);
  const [ anim, setAnim ] = useState(600);
  const resolutions = props.resolutions;

  useEffect(() => {
    if (USER._id) getUser();
    setAnim(0);
  }, []);

  async function getUser() {
    await fetch(`${BASE_URL}/getuser/${props.user._id}`)
      .then(res => res.json())
      .then(data => setUSER(data));
  }

  return (
    <ScrollView style={{...styles.container, top: anim}}>
      {
        (USER.my_resolutions && USER.my_resolutions.length>0) &&
        <View style={styles.card}>
          <Text style={styles.label}>My Resolutions</Text>
          <View style={styles.contents}>
            {
              resolutions.filter(el => USER.my_resolutions.map(el => el.resolution).includes(el.image_ref)).map((el, index) => {
                let progressCalculated = Math.ceil(USER.my_resolutions.filter(item=>item.resolution===el.image_ref)[0].completedSteps.length*100/el.steps.length);
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => {
                      props.chooseRes(el.image_ref);
                      props.goResolution();
                    }}
                  >
                    <View style={{...styles.activeIcon, borderColor: el.color}}>
                      <Image
                        style={styles.icon}
                        source={Icons[el.image_ref]}
                        tintColor={el.color}
                      />
                      <View style={styles.circularProgress}>
                        <CircularProgress
                          color={el.color}
                          progress={progressCalculated}
                          screenChange={props.screenChange}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      }
      
      <View style={[styles.card, {marginBottom: 25}]}>
        <Text style={styles.label}>Explore</Text>
        <View style={styles.contents}>
          {
            resolutions.filter(el =>
              (USER.my_resolutions && USER.my_resolutions.length>0) ?
              !USER.my_resolutions.map(el=>el.resolution).includes(el.image_ref) : true)
              .map((el, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => {
                    props.chooseRes(el.image_ref);
                    props.goResolution();
                  }}
                >
                  <Image
                    style={styles.icon}
                    source={Icons[el.image_ref]}
                    tintColor={Colors.default.accent}
                    // tintColor={el.color}
                  />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: Theme.light,
    padding: 10,
    margin: 25,
    marginBottom: 0,
    borderRadius: 20,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.dark,
    paddingLeft: 20,
    paddingTop: 10,
  },
  contents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 6,
  },
  icon: {
    margin: 15,
  },
  circularProgress: {
    position: "absolute",
    top: 0,
    left: 0
  },
  activeIcon: {
  }
})
