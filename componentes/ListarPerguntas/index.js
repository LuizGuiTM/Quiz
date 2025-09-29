import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { listarPerguntas, removePergunta } from '../../services/dbservice';
import styles from './styles';
import theme from '../../theme';

export default function ListarPerguntas({ navigation }) {
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarPerguntas = async () => {
    setLoading(true);
    try {
      const lista = await listarPerguntas(); 
      setPerguntas(lista);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar perguntas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarPerguntas();
    });
    return unsubscribe;
  }, [navigation]);

  const confirmarRemocao = (id) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir esta pergunta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removerPerguntaAtual(id) }
    ]);
  };

  const removerPerguntaAtual = async (id) => {
    try {
      await removePergunta(id);
      carregarPerguntas();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao remover a pergunta.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.listTitle}>{item.texto}</Text>
        <Text style={styles.listSubtitle}>{item.tema_nome}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CadastroPergunta', { perguntaId: item.id })}
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
        Gerenciar Perguntas
      </Text>
      {perguntas.length === 0 && !loading && (
        <Text style={styles.emptyText}>Nenhuma pergunta cadastrada.</Text>
      )}
      <FlatList
        data={perguntas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <TouchableOpacity
        style={[styles.actionButton, { marginTop: 16, alignSelf: 'center', backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('CadastroPergunta')}
      >
        <Text style={styles.actionText}>+ Nova Pergunta</Text>
      </TouchableOpacity>
    </View>
  );
}
