import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { obtemPerguntasPorTema, obtemAlternativasPorPergunta } from '../services/dbservice';
import { Picker } from '@react-native-picker/picker';

export default function Quiz({ route, navigation }) {
  const { temaId, qtd } = route.params;
  const [perguntas, setPerguntas] = useState([]);
  const [alternativas, setAlternativas] = useState([]); // Array de arrays
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]); // {perguntaId, alternativaId}
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    async function carregarPerguntas() {
      let lista = await obtemPerguntasPorTema(temaId);
      lista = lista.sort(() => Math.random() - 0.5).slice(0, qtd); // Embaralha e pega qtd
      setPerguntas(lista);
      const alternativasPorPergunta = [];
      for (const p of lista) {
        const alts = await obtemAlternativasPorPergunta(p.id);
        alternativasPorPergunta.push(alts);
      }
      setAlternativas(alternativasPorPergunta);
    }
    carregarPerguntas();
  }, [temaId, qtd]);

  const responder = (altId) => {
    const nova = [...respostas];
    nova[indice] = { perguntaId: perguntas[indice].id, alternativaId: altId };
    setRespostas(nova);
    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1);
    } else {
      setFinalizado(true);
    }
  };

  if (!perguntas.length || !alternativas.length) {
    return <Text style={styles.loading}>Carregando...</Text>;
  }

  if (finalizado) {
    // Resumo
    let acertos = 0;
    const resumo = perguntas.map((p, idx) => {
      const alt = alternativas[idx];
      const resposta = respostas[idx]?.alternativaId;
      const correta = alt.find(a => a.correta === 1);
      const acertou = resposta === correta.id;
      if (acertou) acertos++;
      return {
        texto: p.texto,
        respostaUsuario: alt.find(a => a.id === resposta)?.texto || '-',
        correta: correta.texto,
        acertou,
      };
    });
    const percentual = ((acertos / perguntas.length) * 100).toFixed(1);
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Resumo do Quiz</Text>
        <Text style={styles.percentual}>% de acerto: {percentual}%</Text>
        {resumo.map((r, idx) => (
          <View key={idx} style={styles.resumoItem}>
            <Text style={styles.pergunta}>{idx + 1}. {r.texto}</Text>
            <Text>Você respondeu: {r.respostaUsuario}</Text>
            <Text>Alternativa correta: {r.correta}</Text>
            <Text style={{color: r.acertou ? 'green' : 'red'}}>{r.acertou ? 'Acertou' : 'Errou'}</Text>
          </View>
        ))}
        <Button title="Voltar ao Menu" onPress={() => navigation.navigate('Menu')} />
      </ScrollView>
    );
  }

  // Pergunta atual
  const altAtual = alternativas[indice];
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pergunta {indice + 1} de {perguntas.length}</Text>
      <Text style={styles.pergunta}>{perguntas[indice].texto}</Text>
      {altAtual.map(a => (
        <TouchableOpacity
          key={a.id}
          style={styles.alternativa}
          onPress={() => responder(a.id)}
        >
          <Text>{a.texto}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pergunta: {
    fontSize: 18,
    marginBottom: 20,
  },
  alternativa: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  percentual: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resumoItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
});
