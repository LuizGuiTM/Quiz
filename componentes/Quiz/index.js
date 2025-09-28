import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { obtemPerguntasPorTema, obtemAlternativasPorPergunta } from '../../services/dbservice';
import styles from './styles';
import theme from '../../theme';

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
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Carregando...</Text>
      </View>
    );
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
        <View style={styles.content}>
          <Text style={styles.title}>Resumo do Quiz</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Porcentagem de acerto</Text>
            <Text style={[styles.scoreValue, percentual >= 70 ? styles.scoreHigh : percentual >= 40 ? styles.scoreMedium : styles.scoreLow]}>
              {percentual}%
            </Text>
            <Text style={styles.scoreDetail}>{acertos} de {perguntas.length} questões</Text>
          </View>

          {resumo.map((r, idx) => (
            <View key={idx} style={styles.resumoItem}>
              <Text style={styles.perguntaResumo}>{idx + 1}. {r.texto}</Text>
              <View style={styles.respostaContainer}>
                <Text style={styles.respostaLabel}>Sua resposta:</Text>
                <Text style={styles.respostaTexto}>{r.respostaUsuario}</Text>
                <Text style={styles.respostaLabel}>Resposta correta:</Text>
                <Text style={styles.respostaTexto}>{r.correta}</Text>
              </View>
              <View style={[styles.statusBadge, r.acertou ? styles.statusAcerto : styles.statusErro]}>
                <Text style={styles.statusText}>{r.acertou ? 'Acertou!' : 'Errou'}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Menu' }] })}
          >
            <Text style={styles.buttonText}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Pergunta atual
  const altAtual = alternativas[indice];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Pergunta {indice + 1} de {perguntas.length}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((indice + 1) / perguntas.length) * 100}%` }]} />
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.pergunta}>{perguntas[indice].texto}</Text>
          
          <View style={styles.alternativasContainer}>
            {altAtual.map((a, idx) => (
              <TouchableOpacity
                key={a.id}
                style={[styles.alternativa, { marginTop: idx === 0 ? 0 : theme.spacing.md }]}
                onPress={() => responder(a.id)}
              >
                <Text style={styles.alternativaLetra}>{String.fromCharCode(65 + idx)}</Text>
                <Text style={styles.alternativaTexto}>{a.texto}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}