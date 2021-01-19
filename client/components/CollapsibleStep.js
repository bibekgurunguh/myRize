import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,
  TouchableOpacity, Button, TextInput,
  LayoutAnimation, UIManager}
from 'react-native';
import moment from 'moment';

import Colors from '../constants/colors';
const Theme = Colors.default;

export default function CollapsibleStep(props) {

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [ USER, setUSER ] = useState(props.user);
  const [ step, setStep] = useState('initial');
  const [ anim, setAnim ] = useState(0);
  const [ descNumber, setDescNumber ] = useState(1);
  const [ elev, setElev ] = useState(0);
  const [ noteEntry, setNoteEntry ] = useState('');
  const [ noteNav, setNoteNav ] = useState(false);
  const [ notes, setNotes ] = useState(props.notes);
  const [ stepAdded, setStepAdded ] = useState(false);

  let initiallyAdded;
  
  if (USER.my_resolutions.filter(el=>el.resolution===props.chosenRes)[0]
    .completedSteps.includes(props.stepId)) initiallyAdded = true;
  else initiallyAdded = false;

  let initialNextStep;
  
  if (props.stepId <= USER.my_resolutions.filter(el=>el.resolution===props.chosenRes)[0]
  .completedSteps.length + 1) initialNextStep = true;
  else initialNextStep = false;
  
  const BASE_URL = 'http://192.168.0.57:3001';

  useEffect(() => {
    getNotes();
    getUser();
  }, []);

  async function getUser() {
    await fetch(`${BASE_URL}/getuser/${props.user._id}`)
      .then(res => res.json())
      .then(data => setUSER(data));
  }

  async function getNotes () {
    await fetch(`${BASE_URL}/getnotes/${props.userId}`)
    .then(res => res.json())
    .then(res => setNotes(res.notes))
  }

  function addNote () { 
    const newNote = {
      resolution: props.chosenRes,
      stepId: props.stepId,
      image: '',
      note: noteEntry,
      date: new Date(Date.now()),
    }
    return fetch(`${BASE_URL}/addnote`,
    { method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...newNote, userId: props.userId})})
    .then(() => {
      getNotes();
    });
  }

  function completeStep () {
    return fetch(`${BASE_URL}/completestep`,
    { method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stepId: props.stepId,
        resolution: props.chosenRes,
        userId: props.userId})
    })
    .then(() => {
      setStepAdded(true);
      props.setNextStep(props.nextStep+1);
    })
  }

  function handleAddNote () {
    if (noteEntry === '') {
      alert('Note cannot be empty field!')
    } else {
      addNote();
      setNoteEntry('');
    }
  }

  function toggleStep () {
    if (props.stepId <= props.nextStep || initialNextStep) {
      if (step === 'initial' || step === 'collapsed') {
        setStep('expanded');
        setAnim('auto');
        setElev(5);
      }
      else {
        setStep('collapsed');
        setAnim(0);
        setElev(0);
        setNoteNav(false);
      }
    }
  }

  LayoutAnimation.configureNext({
    duration: 700,
    // create: { type: 'linear', property: 'opacity' },
    update: { type: 'spring', springDamping: 10 },
    // delete: { type: 'linear', property: 'opacity' }
  });

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={[styles.title, {opacity: (props.stepId<=props.nextStep || initialNextStep) ? 1 : 0.6}]}>
        <View style={[styles.numberView, {backgroundColor: (initiallyAdded || stepAdded) ? 'lime' : Theme.primary}]}>
          <Text style={styles.number}>{props.stepId}</Text>
        </View>
        <TouchableOpacity onPress={toggleStep} activeOpacity={0.7}>
          <Text style={styles.label}>{props.title}</Text>
        </TouchableOpacity>
      </View>

      {/* Step */}
      <View style={[styles.descriptionView, {height: anim}]}>
        <Text style={styles.description}>{props.content[descNumber-1]}</Text>
        <View style={styles.descriptionNav}>
          <TouchableOpacity onPress={() => descNumber>1 && setDescNumber(descNumber-1)}>
            <Text style={[styles.description, {padding: 0, width: 50, textAlign: 'center'}]}>&#10094;</Text>
          </TouchableOpacity>
          <Text style={styles.descriptionNumber}>{descNumber}/{props.content.length}</Text>
          <TouchableOpacity onPress={() => descNumber<props.content.length && setDescNumber(descNumber+1)}>
            <Text style={[styles.description, {padding: 0, width: 50, textAlign: 'center'}]}>&#10095;</Text>
          </TouchableOpacity>
        </View>
        {/* Notes */}
        {
          notes
            .filter(note=>note.stepId===props.stepId && note.resolution===props.chosenRes)
            .map(note => {
            return (
              <View key={note._id} style={[styles.noteView, {elevation: elev}]}>
                <Text style={styles.note}>{note.note}</Text>
                <Text style={styles.noteTimeStamp}>
                  {moment(new Date(note.date)).format('ddd, D MMM YY')}
                </Text>
              </View>
            )
          })
        }
        {/* AddNote */}
        {
          step === 'expanded' && (
            <View style={[noteNav ? styles.noteView : styles.noteSymbol, {elevation: elev, padding: 10, paddingTop: 0}]}>
              <TouchableOpacity activeOpacity={0.5}
                style={noteNav ? styles.noteMinus : styles.notePlus}
                onPress={()=>setNoteNav(!noteNav)}
              >
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {!noteNav ? '➕' : '➖'}
                </Text>
              </TouchableOpacity>
              {noteNav &&
                <>
                  <View style={styles.noteEntry}>
                    <TextInput
                      onChangeText={text => setNoteEntry(text)}
                      placeholder="Add a note..."
                      defaultValue={noteEntry}
                      multiline={true}
                    />
                  </View>
                  <View style={styles.noteNav}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity activeOpacity={0.5}>
                        <Image
                          style={styles.noteNavBtn}
                          source={require('../assets/buttons/imageBtn.png')}
                          tintColor={Colors.default.primary}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.5}>
                        <Image
                          style={styles.noteNavBtn}
                          source={require('../assets/buttons/cameraBtn.png')}
                          tintColor={Colors.default.primary}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.5}>
                        <Image
                          style={{...styles.noteNavBtn, marginLeft: 0}}
                          source={require('../assets/buttons/locationBtn.png')}
                          tintColor={Colors.default.primary}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleAddNote}>
                      <Image
                        style={styles.noteNavBtn}
                        source={require('../assets/buttons/sendBtn.png')}
                        tintColor={Colors.default.accent}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              }
            </View>
          )
        }
      </View>
      {/* Mark as completed */}
      {
        step === 'expanded' && !stepAdded && !initiallyAdded &&
        <View style={styles.markCompleted}>
          <Button
            title='Mark as completed'
            color={Theme.accent}
            onPress={completeStep}
          />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 15,
  },
  numberView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  label: {
    fontSize: 18,
    color: Theme.accent,
    padding: 10,
    fontWeight: 'bold',
  },
  descriptionView: {
    backgroundColor: Theme.primary,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  description: {
    flexShrink: 1,
    color: Theme.dark,
    padding: 15,
  },
  descriptionNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    opacity: 0.5,
  },
  descriptionNumber: {
    paddingHorizontal: 20,
    flexShrink: 1,
  },
  noteSymbol: {
    position: 'absolute',
    bottom: -10,
    right: -3,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.bg,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  notePlus: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 8,
  },
  noteMinus: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  noteView: {
    backgroundColor: Theme.bg,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  note: {
    flexShrink: 1,
    color: Theme.dark,
    padding: 15,
  },
  noteTimeStamp: {
    flexShrink: 1,
    color: Theme.dark,
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.8,
    paddingBottom: 15,
  },
  noteEntry: {
    flexShrink: 1,
    borderBottomWidth: 1,
    borderColor: Theme.dark,
  },
  noteNav: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteNavBtn: {
    flexShrink: 1,
    marginTop: 5,
    marginLeft: 5,
  },
  markCompleted: {
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 30,
    // width: 300,
  }
})
