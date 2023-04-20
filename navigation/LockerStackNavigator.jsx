import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LockerScreen from "../screens/LockerScreen";
import LockerDetailScreen from "../screens/LockerDetailScreen";
import AuthScreen from "../screens/AuthScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfilScreen from "../screens/ProfilScreen";
const LockerStack = createNativeStackNavigator();

const LockerStackNavigator = () => {
    return (
    <LockerStack.Navigator>
      <LockerStack.Screen name="Authentification" component={AuthScreen} />
      <LockerStack.Screen name="Inscription" component={SignUpScreen} />
      <LockerStack.Screen name="Sélectionnez votre casier" component={LockerScreen} />
      <LockerStack.Screen name="Profil" component={ProfilScreen} />
    </LockerStack.Navigator>
    );
};

export default LockerStackNavigator;