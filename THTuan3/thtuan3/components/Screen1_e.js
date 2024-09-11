import { Text, SafeAreaView, StyleSheet,View,TextInput,Button,TouchableOpacity,Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import {useState,react} from 'react';
export default function Screen1_e() {
  const [value, setValue] = useState('male');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Register
      </Text>
     <View style={styles.form}>
       <TextInput
        placeholder="Email"
         placeholderTextColor="black"
        style={styles.input}     
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
      />
       <TextInput
        placeholder="Email"
         placeholderTextColor="black"
        style={styles.input}     
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
      />
      <TextInput
        placeholder="BirthDay"
        style={styles.input}
      />
      <View style={{
        flexDirection:'row'
      }}>
      <View style={styles.radioContainer}>
        <RadioButton
          value="male"
          status={value === 'male' ? 'checked' : 'unchecked'}
          onPress={() => setValue('male')}
        />
        <Text>Male</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton
          value="female"
          status={value === 'female' ? 'checked' : 'unchecked'}
          onPress={() => setValue('female')}
        />
        <Text>Female</Text>
      </View>
      </View>
     
      <Button
      style={{
        flex:2
      }}
      color='#E53935'
      title="Register"
      ></Button>
       <Text style={{
         textAlign:'center',
         marginTop:10
       }}>When you agree to terms and conditions</Text>
      </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#31AA5230',
    padding: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent:'center',
    textTransform:'uppercase',
    flex:1
  },
  form:{
    flex:9,
    padding:20,
  },
  input:{
    borderColor: 'transparent',
    opacity:0.5,
    outLine:'none',
    backgroundColor:'#C4C4C44D',
    marginBottom:10,
    padding:15,
    fontSize:15,
    fontColor:'black'
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});