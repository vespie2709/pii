import "firebase/database";
import { useState, useEffect } from 'react';
import styles from "../theme/styles";
import Input from "../components/Input";
import { getDocs,updateDoc,doc } from "firebase/firestore";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { utilisateurCollection } from "../firebase";
//import authenticateUser from "../api/authentication";

const AuthScreen= ({navigation}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const listeUtilisateurs = [];
        const querySnapshot = await getDocs(utilisateurCollection);
        querySnapshot.forEach((doc) => {
          listeUtilisateurs.push({ id: doc.id, ...doc.data() });
        });
        setUsers(listeUtilisateurs);
      } catch (error) {
        console.error("Error fetching lockers:", error);
      }
    };
    getUsers();
  }, []);
  
  // Return null or the authenticated user if login is successful
  const authenticateUser = (email, mdp) => {
      return (
        // Search for the first user matching login and password
        users.find((u) => u.email === email && u.mdp === mdp) || null
      );
    };

  const signIn = () => {
    const user = authenticateUser(login, password);
    let msg = user !== null ? "Connexion réussie" : "Erreur de connexion";
    msg += ` avec les identifiants : ${login + "/" + password}`;
    if (user !== null) navigation.navigate("Sélectionnez votre casier", {
      user : user,})
    else Alert.alert("Action sélectionnée", msg);
    ;
  };

  const resetPassword = () => {
    Alert.alert("Action sélectionnée", "Mise à jour du mot de passe");
  };

  const signUp = () => {
    navigation.navigate("Inscription");
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        hideCharacters={false}
        onChangeText={(text) => setLogin(text)}
      />
      <Input
        placeholder="Mot de passe"
        hideCharacters={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={signIn}
      >
        <Text style={styles.loginText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={resetPassword}>
        <Text>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={signUp}>
        <Text>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
