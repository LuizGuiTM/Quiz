
import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import Usuario from './componentes/Usuario';
import * as DbService from './services/dbservice';


export default function App() {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);


  // Carregar tabela e dados
  useEffect(() => {
    async function init() {
      try {
        await DbService.createTable();
        await carregaDados();
      } catch (e) {
        console.log(e);
      }
    }
    init();
  }, []);

  async function carregaDados() {
    try {
      let usuarios = await DbService.obtemTodosUsuarios();
      setUsuarios(usuarios);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function validarEmail(email) {
    // Regex simples para validar email
    return /^\S+@\S+\.\S+$/.test(email);
  }

  function validarSenha(senha) {
    // Pelo menos 1 maiúsculo, 1 número, mínimo 5 dígitos
    return /[A-Z]/.test(senha) && /[0-9]/.test(senha) && senha.length >= 5;
  }

  async function salvaDados() {
    // Validações
    if (!codigo || isNaN(codigo) || parseInt(codigo) <= 0) {
      Alert.alert('Código deve ser maior que 0.');
      return;
    }
    if (!nome || nome.trim() === "") {
      Alert.alert('Nome é obrigatório.');
      return;
    }
    if (!validarEmail(email)) {
      Alert.alert('E-mail inválido.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Senha e confirmação de senha devem ser iguais.');
      return;
    }
    if (!validarSenha(senha)) {
      Alert.alert('Senha deve possuir ao menos 1 caractere maiúsculo, 1 número e ter ao menos 5 dígitos.');
      return;
    }
    let obj = {
      codigo: parseInt(codigo),
      nome: nome,
      email: email,
      senha: senha
    };
    try {
      let resposta = false;
      resposta = await DbService.adicionaUsuario(obj);
      if (resposta)
        Alert.alert('Sucesso!');
      else
        Alert.alert('Falha!');
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function limparCampos() {
    setCodigo("");
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    Keyboard.dismiss();
  }

  async function efetivaExclusao() {
    try {
      await DbService.excluiTodosUsuarios();
      await carregaDados();
    } catch (e) {
      Alert.alert(e);
    }
  }

  function apagarTudo() {
    Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os usuários?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            efetivaExclusao();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]);
  }

  function removerElemento(codigo) {
    Alert.alert('Atenção', 'Confirma a remoção do usuário?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverUsuario(codigo),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverUsuario(codigo) {
    try {
      await DbService.excluiUsuario(codigo);
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
      Alert.alert('Usuário apagado com sucesso!');
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloAgenda}>Cadastro de Usuários</Text>
      <Text />
      <View style={{ width: '90%' }}>
        <Text>Código</Text>
        <TextInput style={styles.caixaTexto}
          keyboardType="numeric"
          onChangeText={setCodigo}
          value={codigo}
        />
        <Text>Nome</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={setNome}
          value={nome}
        />
        <Text>Email</Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text>Senha</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={setSenha}
              value={senha}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text>Confirmar senha</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={setConfirmarSenha}
              value={confirmarSenha}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <TouchableOpacity style={styles.botao} onPress={salvaDados}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={carregaDados}>
            <Text style={styles.textoBotao}>Carregar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity style={[styles.botao, { width: '50%', backgroundColor: '#b0c4de' }]} onPress={limparCampos}>
            <Text style={styles.textoBotao}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ width: '90%', marginTop: 20 }}>
        {usuarios.map((usuario, index) => (
          <Usuario usuario={usuario} key={index.toString()} />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

