import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, RefreshControl } from "react-native";
import styles from "../theme/styles";
import { getDocs,updateDoc,doc, arrayRemove, getDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { casierCollection, utilisateurCollection } from "../firebase";
import { db } from "../firebase";

const ProfilScreen= ({navigation, route}) => {

    const [casiers, setCasiers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const {user} = route.params;

    const handleReservation = (item) => {
        Alert.alert(
          "Fin de réservation",
          "Êtes-vous sûr de vouloir libérer ce casier ?",
          [
            { text: "Annuler", onPress: () => console.log("Action annulée") },
            { text: "Libérer", onPress: () => updateDispo(item) },
          ],
        );
      };

      const handleRefresh = async () => {
        setRefreshing(true); // Indique que la page est en cours de réactualisation
        try {
            const docRef = doc(db, "utilisateur", user.id);
            const utilisateur = await getDoc(docRef);
            setCasiers(utilisateur.data().casiers);
        } catch (error) {
          console.error("Error fetching lockers:", error);
        }
        setRefreshing(false); // Indique que la page a été réactualisée
      };     
      
      useEffect(() => {
        const getCasiers = async () => {
          try {
            const docRef = doc(db, "utilisateur", user.id);
            const utilisateur = await getDoc(docRef);
            setCasiers(utilisateur.data().casiers);
          } catch (error) {
            console.error("Error fetching lockers:", error);
          }
        };
        getCasiers();
      }, []);

      const updateDispo = async(item) => {
        console.log("Libération confirmée");
        const casierRef = doc(casierCollection, item.id);
        const userRef = doc(utilisateurCollection, user.id);
        await updateDoc(casierRef, { dispo: true, utilisateur: ""}); 
        console.log(casierRef) 
        const numero = item.id;
        const debut = item.heureD;
        await updateDoc(userRef, {casiers : arrayRemove(item)});
        await updateDoc(userRef, {casiers : arrayUnion({"id" : numero, "etat" : false, "heureD" : debut, "heureF" : Timestamp.now()})});
        handleRefresh();
        Alert.alert("Libération confirmée !");
      };

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity  style={styles.casier} onPress={ () => handleReservation(item)/*navigation.navigate("Réservation du casier", {
            casier: item,
          })*/}>
            <Text style={styles.casierText}>{item.id}°</Text>
          </TouchableOpacity >
        );
    };

    const renderItem2 = ({ item }) => {
      const options = {weekday:'long', year:'numeric', month:'long', day:'numeric'};
      const jour = new Date (item.heureD.toDate()).toLocaleDateString("fr",options);
      return (
        <View  style={styles.casier}>
          <Text style={styles.casierText}>{item.id}°</Text>
          <Text style={styles.casierText}>{jour}</Text>
        </View >
      );
  };

    const casiersEnCours = casiers.filter((item) => item.etat);
    const anciensCasiers = casiers.filter((item) => !item.etat);

    return (
        <React.Fragment>
          <Text style = {styles.consigne}>Informations personnelles :</Text>
          <TouchableOpacity style={styles.casier} onPress={ () => navigation.navigate("Modification du profil", {user: user})}><Text>Modifier</Text></TouchableOpacity>
          <Text style = {styles.consigne}>Nom : {user.nom}</Text>
          <Text style = {styles.consigne}>Prénom : {user.prenom}</Text>
          <Text style = {styles.consigne}>E-mail : {user.email}</Text>
          <Text style = {styles.consigne}>Mot de passe : {user.mdp}</Text>
          <Text style = {styles.consigne}>Réservations en cours :</Text>
          <FlatList
        data={casiersEnCours}
        renderItem={renderItem}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
      />
      <Text style = {styles.consigne}>Réservation(s) passée(s) :</Text>
          <FlatList
        data={anciensCasiers}
        renderItem={renderItem2}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
      />
          <TouchableOpacity
        style={styles.casier}
        onPress={() => navigation.navigate("Authentification")}
        ><Text style={styles.casierText}>Déconnexion</Text>
      </TouchableOpacity>
        </React.Fragment>
      );
    };

export default ProfilScreen;
