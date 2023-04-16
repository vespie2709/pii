import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View,Button } from "react-native";
import firestore from "@react-native-firebase/firestore";
import "firebase/database";
import { getDocs } from "firebase/firestore";
import { casiercollection } from "firebase/database";
import styles from "../theme/styles";
import { casierCollection } from "../firebase";

const LockerDetailScreen = ({navigation,route }) => {

  const {casier} = route.params;

  return (
    <React.Fragment>
      <View style={styles.casier}>
      <Text style={styles.casierText}>{casier.id}°</Text>
        <Text style={styles.casierText}>{casier.hauteur}cm</Text>
        <Text style={styles.casierText}>{casier.largeur}cm</Text>
        <Text style={styles.casierText}>{casier.profondeur}cm</Text>
      </View>
      <Button title="Réserver ce casier" onPress={() => navigation.goBack()} />
    </React.Fragment>
  );
};

export default LockerDetailScreen;
