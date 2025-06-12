import { createStackNavigator } from '@react-navigation/stack';
import CitaStack from './CitaStack';
import PacienteStack from './PacienteStack';
import DoctorStack from './DoctorStack';
import EspecialidadStack from './EspecialidadStack'; 
import ConsultorioStack from './ConsultorioStack';
import { MenuScreen } from '../../../Screen/Menu/MenuScreen'; 


const Stack = createStackNavigator();

export default function MenuInicial() {
    return (
        <Stack.Navigator initialRouteName="MenuPrincipal">
            <Stack.Screen
                name="MenuPrincipal"
                component={MenuScreen}
                options={{ 
                    title: "Inicio",
                    headerShown: false // Oculta el header en esta pantalla
                }}
            />
            <Stack.Screen
                name="PacienteStack"
                component={PacienteStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="CitaStack" 
                component={CitaStack} 
                options={{ headerShown: false}} 
            />
            <Stack.Screen
                name='DoctorStack'
                component={DoctorStack}
                options={{ headerShown: false}}
            />
            <Stack.Screen
                name='EspecialidadStack'
                component={EspecialidadStack} 
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ConsultorioStack'
                component={ConsultorioStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}