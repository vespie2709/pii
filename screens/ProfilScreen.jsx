import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, RefreshControl } from "react-native";
import styles from "../theme/styles";
import { getDocs,updateDoc,doc, arrayRemove, getDoc } from "firebase/firestore";
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
        const casierRef = doc(casierCollection, item);
        const userRef = doc(utilisateurCollection, user.id);
        await updateDoc(casierRef, { dispo: true, utilisateur: ""});  
        await updateDoc(userRef, {casiers : arrayRemove(item)});
        handleRefresh();
        Alert.alert("Libération confirmée !");
      };

    const renderItem = ({ item }) => {
        return (
          <TouchableOpacity  style={styles.casier} onPress={ () => handleReservation(item)/*navigation.navigate("Réservation du casier", {
            casier: item,
          })*/}>
            <Text style={styles.casierText}>{item}°</Text>
          </TouchableOpacity >
        );
    };
    return (
        <React.Fragment>
          <Text style = {styles.consigne}>Réservation(s) en cours :</Text>
          <FlatList
        data={casiers}
        renderItem={renderItem}
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
