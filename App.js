

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './componentes/Menu';
import CadastroTema from './componentes/CadastroTema';
import CadastroPergunta from './componentes/CadastroPergunta';
import InicioQuiz from './componentes/InicioQuiz';
import Quiz from './componentes/Quiz';
import { useEffect } from 'react';
import { createTables } from './services/dbservice';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    async function init() {
      await createTables();
    }
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu Principal' }} />
        <Stack.Screen name="CadastroTema" component={CadastroTema} options={{ title: 'Cadastro de Temas' }} />
        <Stack.Screen name="CadastroPergunta" component={CadastroPergunta} options={{ title: 'Cadastro de Perguntas' }} />
        <Stack.Screen name="InicioQuiz" component={InicioQuiz} options={{ title: 'Iniciar Quiz' }} />
        <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Quiz' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

