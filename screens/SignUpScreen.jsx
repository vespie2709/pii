import "firebase/database";
import "firebase/firestore";
import firestore from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';
import styles from "../theme/styles";
import Input from "../components/Input";
import { getDocs,updateDoc,addDoc } from "firebase/firestore";
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
      if (nom === "" || prenom === "" || email === "" || mdp === "") {
        Alert.alert("Tous les champs doivent être remplis !");
        return;
      }
      else {
      const docRef = await addDoc(utilisateurCollection,
      {
        nom: nom,
        prenom: prenom,
        email: email,
        mdp:mdp
      });
      Alert.alert("Succès", "Utilisateur ajouté avec succès");
      navigation.navigate("Authentification")
      // Réinitialiser les champs
      setNom("");
      setPrenom("");
      setEmail("");
      setMdp("");}
    } catch (error) {
      console.error("Error adding user:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'ajout de l'utilisateur");
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
