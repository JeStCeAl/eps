import { View, Text } from 'react-native';
import BottonComponent from '../../Components/BotonComponent';

export default function ListarCitaScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Pantalla de Listar Citas</Text>
            <BottonComponent
                title="Ir a Registro"
                onPress={() => navigation.navigate("Registro")}
            />
        </View>
    );
}