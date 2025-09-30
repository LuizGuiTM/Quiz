import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from './styles';
import { obtemTodosTemas, removeTema } from '../../services/dbservice';
import theme from '../../theme';

export default function ListarTemas({ navigation }) {
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarTemas = async () => {
    setLoading(true);
    try {
      const lista = await obtemTodosTemas();
      setTemas(lista);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar temas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarTemas();
    });
    return unsubscribe;
  }, [navigation]);

  const confirmarRemocao = (id) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir este tema? Todas as perguntas relacionadas também serão excluídas.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removerTemaAtual(id) }
    ]);
  };

  const removerTemaAtual = async (id) => {
    try {
      await removeTema(id);
      carregarTemas();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao remover o tema.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.listTitle}>{item.nome}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CadastroTema', { temaId: item.id })}
        >
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#922' }]}
          onPress={() => confirmarRemocao(item.id)}
        >
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: theme.colors.background }}>
      <Text style={{ ...theme.typography.h2, textAlign: 'center', marginBottom: 16 }}>
        Gerenciar Temas
      </Text>
      {temas.length === 0 && !loading && (
        <Text style={styles.emptyText}>Nenhum tema cadastrado.</Text>
      )}
      <FlatList
        data={temas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <TouchableOpacity
        style={[styles.actionButton, { marginTop: 16, alignSelf: 'center', backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('CadastroTema')}
      >
        <Text style={styles.actionText}>+ Novo Tema</Text>
      </TouchableOpacity>
    </View>
  );
}