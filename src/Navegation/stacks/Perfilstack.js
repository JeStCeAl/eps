import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfilscreen";

const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
