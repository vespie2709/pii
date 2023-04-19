import React from "react";
import styles from "../theme/styles";
import { StyleSheet, View, Image, TextInput, Text } from "react-native";

const Input = ({ placeholder, imageUrl, hideCharacters, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <Image
        style={styles.inputIcon}
        source={{
          uri: imageUrl,
        }}
      />
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry={hideCharacters}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;