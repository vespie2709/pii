import "firebase/database";
import "firebase/firestore";
import { useState, useEffect } from 'react';
import styles from "../theme/styles";
import Input from "../components/Input";
import firestore from '@react-native-firebase/firestore'
import { getDocs,updateDoc,doc } from "firebase/firestore";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { utilisateurCollection } from "../firebase";
//import authenticateUser from "../api/authentication";

const SignUpScreen= ({navigation}) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

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
  
  const signIn = () => {
    navigation.navigate("Authentification");
  };

  const signUp = async () => {
    try {
      await utilisateurCollection.doc().set({
        nom,
        prenom,
        email,
        mdp,
      });
      Alert.alert("Inscription réussie", "Vous pouvez maintenant vous connecter");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      Alert.alert("Erreur lors de l'inscription", "Veuillez réessayer plus tard");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Nom"
        hideCharacters={false}
        onChangeText={(text) => setNom(text)}
      />
      <Input
        placeholder="Prénom"
        hideCharacters={false}
        onChangeText={(text) => setPrenom(text)}
      />
      <Input
        placeholder="Email"
        hideCharacters={false}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Mot de passe"
        hideCharacters={true}
        onChangeText={(text) => setMdp(text)}
      />
      <TouchableOpacity
        style={[styles.buttonContainer, styles.signInButton]}
        onPress={signUp}
      >
        <Text style={styles.loginText}>S'inscrire</Text>
      </TouchableOpacity>
      <Text>Vous avez déjà un compte ?</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={signIn}>
        <Text>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
