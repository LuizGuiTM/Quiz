import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './componentes/Menu';
import CadastroTema from './componentes/CadastroTema';
import CadastroPergunta from './componentes/CadastroPergunta';
import InicioQuiz from './componentes/InicioQuiz';
import Quiz from './componentes/Quiz';
import ListarPerguntas from './componentes/ListarPerguntas';
import { createTables } from './services/dbservice';
import theme from './theme';

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
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            ...theme.typography.h3,
            color: theme.colors.text.onPrimary,
          },
          headerTintColor: theme.colors.text.onPrimary,
          cardStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: 'Menu Principal',
            headerLeft: null, // Desabilita o botão de voltar no Menu
            gestureEnabled: false // Desabilita o gesto de voltar no iOS
          }}
        />
        <Stack.Screen
          name="CadastroTema"
          component={CadastroTema}
          options={{ title: 'Cadastro de Temas' }}
        />
        <Stack.Screen
          name="ListarPerguntas"
          component={ListarPerguntas}
          options={{ title: 'Gerenciar Perguntas' }}
        />
        <Stack.Screen
          name="CadastroPergunta"
          component={CadastroPergunta}
          options={{ title: 'Cadastro de Perguntas' }}
        />
        <Stack.Screen
          name="InicioQuiz"
          component={InicioQuiz}
          options={{ title: 'Iniciar Quiz' }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ title: 'Quiz' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
