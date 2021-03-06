import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Keyboard } from "react-native";
import React, {useState} from "react";
import firebase from "../database/firebaseDB";


const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  function login (){
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("Signed in!")
        navigation.navigate("Chat", {email});
      })
      .catch((error) => {
        console.log("Error!");
        console.log(error.message);
        setErrorText(error.message);
      });
  }
return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={login} style={styles.loginButton}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 24,
    },
    fieldTitle: {
      fontSize: 18,
      marginBottom: 12,
    },
    input: {
      borderColor: "#999",
      borderWidth: 1,
      marginBottom: 24,
      padding: 4,
      height: 36,
      fontSize: 18,
      backgroundColor: "white",
    },
    loginButton: {
      backgroundColor: "blue",
      width: 120,
      alignItems: "center",
      padding: 18,
      marginTop: 12,
      marginBottom: 36,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
    },
    errorText: {
      color: "red",
      marginVertical: 20,
      height: 40,
    },
});
