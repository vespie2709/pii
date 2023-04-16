import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LockerScreen from "../screens/LockerScreen";
import LockerDetailScreen from "../screens/LockerDetailScreen";
const LockerStack = createNativeStackNavigator();

const LockerStackNavigator = () => {
    return (
    <LockerStack.Navigator>
      <LockerStack.Screen name="Sélectionnez votre casier" component={LockerScreen} />
      <LockerStack.Screen name="Réservation du casier" component={LockerDetailScreen} />
    </LockerStack.Navigator>
    );
};

export default LockerStackNavigator;