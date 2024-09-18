import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  CheckBox,
  TouchableOpacity,
} from "react-native";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState("12");
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

  const generatePassword = () => {
    const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    const numbersCharset = "0123456789";
    const specialCharset = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charset = "";
    if (includeLowercase) charset += lowercaseCharset;
    if (includeUppercase) charset += uppercaseCharset;
    if (includeNumbers) charset += numbersCharset;
    if (includeSpecialChars) charset += specialCharset;

    let newPassword = "";
    const length = parseInt(passwordLength, 10) || 12;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>GENERATE PASSWORD</Text>

        <TextInput
          style={styles.passwordDisplay}
          value={password}
          placeholder=""
          editable={false}
        />

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Password length</Text>
          <TextInput
            style={styles.shortInput}
            value={passwordLength}
            onChangeText={setPasswordLength}
            placeholder="Length"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Include lowercase letters</Text>
          <CheckBox
            value={includeLowercase}
            onValueChange={setIncludeLowercase}
            style={styles.checkbox}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Include upcase letters</Text>
          <CheckBox
            value={includeUppercase}
            onValueChange={setIncludeUppercase}
            style={styles.checkbox}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Include numbers</Text>
          <CheckBox
            value={includeNumbers}
            onValueChange={setIncludeNumbers}
            style={styles.checkbox}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Include special symbol</Text>
          <CheckBox
            value={includeSpecialChars}
            onValueChange={setIncludeSpecialChars}
            style={styles.checkbox}
          />
        </View>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={generatePassword}
        >
          <Text style={styles.buttonText}>GENERATE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
     background: 'radial-gradient(145% 145% at 50% 50%, #3B3B98 26.56%, rgba(196, 196, 196, 0) 87.36%)',
  },
  container: {
    flex: 1,
    backgroundColor: "#23235B",
    padding: 20,
    justifyContent: "center",
    margin: 30, 
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  passwordDisplay: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#151537",
    color: "#fff",
  },
  shortInput: {
    height: 40,
    width: 100, 
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
  },
  checkbox: {
    borderRadius: 5, 
  },
  generateButton: {
    backgroundColor: "#3B3B98",
    paddingVertical: 15,    
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;