import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LockerStackNavigator from "./navigation/LockerStackNavigator";
import AuthScreen from "./screens/AuthScreen";

const App = () => {
  /*const [loggedUser, setLoggedUser] = useState();

  // Create either authentication form or module list component,
  // depending on the presence of a logged user
  const authForm = !loggedUser ? (
    <AuthScreen onLoginSuccessful={(user) => setLoggedUser(user)} />
  ) : null;*/
  return (
    <NavigationContainer>
      <LockerStackNavigator />
    </NavigationContainer>
  );
};

export default App;
