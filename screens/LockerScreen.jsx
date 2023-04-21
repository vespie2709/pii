import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Alert, RefreshControl } from "react-native";
import "firebase/database";
import { getDocs,updateDoc,doc, arrayUnion, Timestamp} from "firebase/firestore";
import styles from "../theme/styles";
import { casierCollection, utilisateurCollection } from "../firebase";

const LockersScreen = ({navigation, route}) => {
  const [lockers, setLockers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {user} = route.params;
  
const handleRefresh = async () => {
  setRefreshing(true); // Indique que la page est en cours de réactualisation
  try {
    const listeCasier = [];
    const querySnapshot = await getDocs(casierCollection);
    querySnapshot.forEach((doc) => {
      listeCasier.push({ id: doc.id, ...doc.data() });
    });
    setLockers(listeCasier);
  } catch (error) {
    console.error("Error fetching lockers:", error);
  }
  setRefreshing(false); // Indique que la page a été réactualisée
};

  useEffect(() => {
    const getLockers = async () => {
      try {
        const listeCasier = [];
        const querySnapshot = await getDocs(casierCollection);
        querySnapshot.forEach((doc) => {
          listeCasier.push({ id: doc.id, ...doc.data() });
        });
        setLockers(listeCasier);
      } catch (error) {
        console.error("Error fetching lockers:", error);
      }
    };
    getLockers();
  }, []);

  const filteredLockers = lockers.filter((locker) => locker.dispo);

  const updateNonDispo = async(item) => {
    console.log("Réservation confirmée");
    const casierRef = doc(casierCollection, item.id);
    const userRef = doc(utilisateurCollection, user.id);
    await updateDoc(casierRef, { dispo: false, utilisateur: user.id}); 
    await updateDoc(userRef, {"casiers" : arrayUnion({"id" : item.id, "etat" : true, "heureD" : Timestamp.now(), "heureF" : ''})});
    handleRefresh();
    Alert.alert("Réservation confirmée !");
  };

  const handleReservation = (item) => {
    Alert.alert(
      "Confirmation de réservation",
      "Êtes-vous sûr de vouloir réserver ce casier ?",
      [
        { text: "Annuler", onPress: () => console.log("Réservation annulée") },
        { text: "Réserver", onPress: () => updateNonDispo(item) },
      ],
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity  style={styles.casier} onPress={ () => handleReservation(item)/*navigation.navigate("Réservation du casier", {
        casier: item,
      })*/}>
        <Text style={styles.casierText}>{item.id}°</Text>
        <Text style={styles.casierText}>{item.hauteur}cm</Text>
        <Text style={styles.casierText}>{item.largeur}cm</Text>
        <Text style={styles.casierText}>{item.profondeur}cm</Text>
      </TouchableOpacity >
    );
  };

  return (
    <React.Fragment>
      <Text style = {styles.consigne}>Choisissez un casier parmi les casiers disponibles :</Text>
      <View style={styles.legend}>
        <Text>Numéro</Text>
        <Text>Hauteur</Text>
        <Text>Largeur</Text>
        <Text>Profondeur</Text>
      </View>
      <FlatList
        data={filteredLockers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <TouchableOpacity
        style={styles.casier}
        onPress={() => navigation.navigate("Profil", {
          user : user,})}
        ><Text style={styles.casierText}>Accédez à votre profil</Text>
      </TouchableOpacity>

    </React.Fragment>
  );
};

export default LockersScreen;
