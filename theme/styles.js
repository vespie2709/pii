import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  casier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'violet',
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 5,
    borderRadius: 5,
  },
  casierText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  consigne: {
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 10,
    fontSize : 15,
    fontWeight: 'bold'
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalContainer: {
    backgroundColor: "white",
    height: "50%",
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  });

  // Common stack header options
export const screenOptions = {
  headerStyle: {
    backgroundColor: "#2F4F4F",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default styles;