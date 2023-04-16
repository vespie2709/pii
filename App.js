import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LockerStackNavigator from "./navigation/LockerStackNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <LockerStackNavigator />
    </NavigationContainer>
  );
};

export default App;
