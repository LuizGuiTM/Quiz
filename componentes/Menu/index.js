import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

export default function Menu({ navigation }) {
  const MenuButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <Image 
        source={require('../../assets/quiz.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <MenuButton 
          title="Gerenciar Temas" 
          onPress={() => navigation.navigate('ListarTemas')} 
        />
        <MenuButton 
          title="Gerenciar Perguntas" 
          onPress={() => navigation.navigate('ListarPerguntas')} 
        />
        <MenuButton 
          title="Iniciar Quiz" 
          onPress={() => navigation.navigate('InicioQuiz')} 
        />
      </View>
    </View>
  );
}
