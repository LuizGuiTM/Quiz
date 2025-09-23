import {
    Text, View, StyleSheet
} from 'react-native';

export default function Usuario({ usuario }) {
    return (
        <View style={styles.usuario} >
            <Text style={styles.listaCodigo}>Código: {usuario.codigo}</Text>
            <Text style={styles.listaNome}>Nome: {usuario.nome}</Text>
            <Text style={styles.listaEmail}>Email: {usuario.email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    usuario: {
        backgroundColor: '#f5e9b4',
        margin: 10,
        borderRadius: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    listaCodigo: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    listaNome: {
        fontSize: 16,
    },
    listaEmail: {
        fontSize: 16,
        color: '#333',
    },
});
