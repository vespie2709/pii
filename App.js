import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
//import firebase from 'firebase/app';
//import 'firebase/firestore';
//import 'firebase/auth';
import { getDocs } from "firebase/firestore";
import {utilisateurCollection} from 'firebase';
//import {casiercollection} from 'firebase';

export default function App() {
  const [utilisateur, setUsers] = useState([]);

  const fetchUsers = async () => {
    const userList = []; // je créer une liste vide
    const querySnapshot = await getDocs(utilisateurCollection);
    querySnapshot.forEach((doc) => { // chaque élément est ajouté à la liste
      userList.push({ id: doc.id, ...doc.data() });
    });
    setUsers(userList); // je stocke ma liste dans l'état de l'application
  };
  useEffect(() => {
    fetchUsers();
  }, []);
}
{userList.map((user) => (
  <Text key={user.id}>
    id: {user.id} - name: {user.name} - email: {user.email},
  </Text>
))}

/*export default function App() {
  return (
    <View style={styles.container}>
      <FlatList>
        data={utilisateur}
        renderItem={({ item }) => <Text style={styles.row}>{item}</Text>}
        keyExtractor={(item) => item}
      </FlatList>
      <StatusBar style="auto" />
    </View>
  );
} */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
