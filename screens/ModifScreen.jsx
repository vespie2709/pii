import "firebase/database";
import "firebase/firestore";
import { useState } from 'react';
import styles from "../theme/styles";
import Input from "../components/Input";
import { updateDoc, doc , getDoc} from "firebase/firestore";
import { Text, View, TouchableOpacity, Alert} from "react-native";
import { utilisateurCollection } from "../firebase";

const ModifScreen= ({navigation, route}) => {

  //Récupération de l'utilisateur connecté
  const {user} = route.params;
    
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [email, setEmail] = useState(user.email);
  const [mdp, setMdp] = useState(user.mdp);

  const modifier = async () => {
    try {
      if (nom === "" || prenom === "" || email === "" || mdp === "") {
        Alert.alert("Tous les champs doivent être remplis !");
        return;
      }
      else {
        const userRef = doc(utilisateurCollection, user.id);
        await updateDoc(userRef,{ nom: nom, prenom: prenom, email: email,mdp:mdp});
        const nouveau = await getDoc(userRef);
      Alert.alert("Succès", "Modification effectuée avec succès");
      navigation.navigate("Profil", {user: nouveau.data()});
      // Réinitialisation les champs
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
        defaultValue={user.nom}
        placeholder="Nom"
        hideCharacters={false}
        onChangeText={(text) => setNom(text)}
      />
      <Input
        defaultValue={user.prenom}
        placeholder="Prénom"
        hideCharacters={false}
        onChangeText={(text) => setPrenom(text)}
      />
      <Input
        defaultValue={user.email}
        placeholder="E-mail"
        hideCharacters={false}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        defaultValue={user.mdp}
        placeholder="Mot de passe"
        hideCharacters={true}
        onChangeText={(text) => setMdp(text)}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={modifier}>
        <Text>Enregistrer les modifications</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModifScreen;
