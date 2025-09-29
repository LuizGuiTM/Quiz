import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  obtemTodosTemas,
  adicionaPergunta,
  adicionaAlternativa,
  obtemAlternativasPorPergunta,
  obtemPerguntaPorId,
  atualizaPergunta,
  atualizaAlternativas,
  removePergunta
} from '../../services/dbservice';
import styles from './styles';
import theme from '../../theme';

export default function CadastroPergunta({ navigation, route }) {
  const [temas, setTemas] = useState([]);
  const [temaId, setTemaId] = useState('');
  const [textoPergunta, setTextoPergunta] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '']);
  const [correta, setCorreta] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [perguntaId, setPerguntaId] = useState(null);

  useEffect(() => {
    async function carregarTemasEEdicao() {
      try {
        const listaTemas = await obtemTodosTemas();
        setTemas(listaTemas);

        // Se veio perguntaId, carregar para edição
        if (route?.params?.perguntaId) {
          const p = await obtemPerguntaPorId(route.params.perguntaId);
          if (!p) return;
          setModoEdicao(true);
          setPerguntaId(p.id);
          setTemaId(String(p.tema_id));
          setTextoPergunta(p.texto);
          const alts = await obtemAlternativasPorPergunta(p.id);
          setAlternativas(alts.map(a => a.texto));
          const idxCorreta = alts.findIndex(a => a.correta === 1);
          setCorreta(idxCorreta >= 0 ? idxCorreta : null);
        }
      } catch (e) {
        Alert.alert('Erro', 'Falha ao carregar pergunta para edição.');
      }
    }

    carregarTemasEEdicao();
  }, [route?.params?.perguntaId]);

  const handleAlternativaChange = (index, value) => {
    const novas = [...alternativas];
    novas[index] = value;
    setAlternativas(novas);
  };

  const salvarPergunta = async () => {
    if (!temaId) { Alert.alert('Erro', 'Selecione um tema.'); return; }
    if (!textoPergunta.trim()) { Alert.alert('Erro', 'Informe o texto da pergunta.'); return; }
    if (alternativas.some(a => !a.trim())) { Alert.alert('Erro', 'Preencha todas as alternativas.'); return; }
    if (correta === null) { Alert.alert('Erro', 'Selecione a alternativa correta.'); return; }

    try {
      if (modoEdicao) {
        await atualizaPergunta(perguntaId, textoPergunta.trim(), parseInt(temaId));
        await atualizaAlternativas(
          perguntaId,
          alternativas.map((t, i) => ({ texto: t.trim(), correta: i === correta }))
        );
        Alert.alert('Sucesso', 'Pergunta atualizada com sucesso!');
      } else {
        const novaPerguntaId = await adicionaPergunta(textoPergunta.trim(), parseInt(temaId));
        for (let i = 0; i < 4; i++) {
          await adicionaAlternativa(alternativas[i].trim(), i === correta, novaPerguntaId);
        }
        Alert.alert('Sucesso', 'Pergunta cadastrada com sucesso!');
        setTextoPergunta('');
        setAlternativas(['', '', '', '']);
        setCorreta(null);
      }
    } catch (e) {
      Alert.alert('Erro', `Não foi possível salvar a pergunta.\n${e?.message || e}`);
    }
  };

  const confirmarRemocao = () => {
    if (!modoEdicao) return;
    Alert.alert('Confirmação', 'Deseja realmente excluir esta pergunta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: removerPerguntaAtual }
    ]);
  };

  const removerPerguntaAtual = async () => {
    try {
      const ok = await removePergunta(perguntaId);
      if (ok) {
        Alert.alert('Sucesso', 'Pergunta removida.');
        navigation.goBack();
      } else {
        Alert.alert('Aviso', 'Pergunta não encontrada para remover.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Falha ao remover a pergunta.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{modoEdicao ? 'Editar Pergunta' : 'Nova Pergunta'}</Text>

        <Text style={styles.label}>Tema</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={temaId}
            onValueChange={setTemaId}
            style={{ color: theme.colors.text.primary }}
          >
            <Picker.Item label="Selecione um tema" value="" color={theme.colors.text.disabled} />
            {temas.map(t => (
              <Picker.Item key={t.id} label={t.nome} value={String(t.id)} color={theme.colors.text.primary} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Pergunta</Text>
        <TextInput
          style={styles.input}
          value={textoPergunta}
          onChangeText={setTextoPergunta}
          placeholder="Digite a pergunta"
          placeholderTextColor={theme.colors.text.disabled}
          multiline
        />

        <Text style={styles.label}>Alternativas</Text>
        {alternativas.map((alt, idx) => (
          <View key={idx} style={styles.altContainer}>
            <TextInput
              style={styles.altInput}
              value={alt}
              onChangeText={v => handleAlternativaChange(idx, v)}
              placeholder={`Alternativa ${idx + 1}`}
              placeholderTextColor={theme.colors.text.disabled}
            />
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[styles.radio, correta === idx && styles.radioSelected]}
                onPress={() => setCorreta(idx)}
              >
                <Text style={{ color: correta === idx ? theme.colors.text.onPrimary : 'transparent' }}>✓</Text>
              </TouchableOpacity>
              <Text style={styles.radioLabel}>Correta</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={salvarPergunta}>
          <Text style={styles.buttonText}>{modoEdicao ? 'Salvar Alterações' : 'Salvar Pergunta'}</Text>
        </TouchableOpacity>

        {modoEdicao && (
          <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: '#922' }]} onPress={confirmarRemocao}>
            <Text style={styles.secondaryButtonText}>Excluir Pergunta</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Menu' }] })}
        >
          <Text style={styles.secondaryButtonText}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
