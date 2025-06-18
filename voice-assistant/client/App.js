import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, fetchRecipes, setTranscript, nextStep, resetStep } from './store';
import Voice from '@react-native-voice/voice';
import { View, Text, Button } from 'react-native';

const Assistant = () => {
  const dispatch = useDispatch();
  const { recipes, currentStep, transcript } = useSelector(state => state);

  useEffect(() => {
    Voice.onSpeechResults = result => {
      const text = result.value[0];
      dispatch(setTranscript(text));
      handleCommand(text);
    };
    dispatch(fetchRecipes());
  }, []);

  const handleCommand = (text) => {
    const cmd = text.toLowerCase();
    if (cmd.includes("start")) {
      dispatch(resetStep());
    } else if (cmd.includes("next")) {
      dispatch(nextStep());
    } else if (cmd.includes("ingredient")) {
      const ing = recipes[0]?.ingredients?.join(', ') || "No ingredients found.";
      speak(ing);
    } else {
      speak("Sorry, I did not understand that.");
    }
  };

  const startListening = () => {
    Voice.start('en-US');
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Voice Controlled Cooking Assistant</Text>
      <Button title="Start Listening" onPress={startListening} />
      <Text style={{ marginTop: 20 }}>Transcript: {transcript}</Text>
      <Text style={{ marginTop: 10 }}>Step: {recipes[0]?.steps[currentStep] || 'Say "start" to begin'}</Text>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Assistant />
    </Provider>
  );
}
