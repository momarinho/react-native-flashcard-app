import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Flashcard = ({ question, answer, flipCard, isFlipped }) => {
  return (
    <TouchableOpacity onPress={flipCard} style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{isFlipped ? answer : question}</Text>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  const [flashcards, setFlashcards] = useState([
    {
      question: 'Hello there',
      answer: 'General Kenobi',
      isFlipped: false,
    },
    {
      question: 'Why did Dracula kill his sport trainer?',
      answer: 'Because he was trying to whip him into shape!',
      isFlipped: false,
    },
    {
      question: 'Why did Frodo Baggins put his phone on silent?',
      answer: 'He was tired of the ring!',
      isFlipped: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    question: '',
    answer: '',
  });

  const flipCard = (index) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard, i) => {
        if (i === index) {
          return {
            ...flashcard,
            isFlipped: !flashcard.isFlipped,
          };
        }
        return flashcard;
      })
    );
  };

  const addNewCard = () => {
    setFlashcards([
      ...flashcards,
      { question: newCard.question, answer: newCard.answer, isFlipped: false },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView>
        {flashcards.map((flashcard, index) => (
          <Flashcard
            key={index}
            question={flashcard.question}
            answer={flashcard.answer}
            isFlipped={flashcard.isFlipped}
            flipCard={() => flipCard(index)}
          />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newCard.question}
          placeholder="Question"
          onChangeText={(text) =>
            setNewCard((prevCard) => ({ ...prevCard, question: text }))
          }
        />
        <TextInput
          style={styles.input}
          value={newCard.answer}
          placeholder="Answer"
          onChangeText={(text) =>
            setNewCard((prevCard) => ({ ...prevCard, answer: text }))
          }
        />
        <TouchableOpacity style={styles.addButton} onPress={addNewCard}>
          <Text style={styles.addButtonText}>Add new</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 200,
    width: 300,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  card: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    padding: 20,
  },
  inputContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#454545',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
