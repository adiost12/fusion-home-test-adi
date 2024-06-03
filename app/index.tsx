import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView} from "react-native";
import { Button, Checkbox, TextField } from "react-native-ui-lib";
import { Picker } from "@react-native-picker/picker";
export default function Index() {

  //TODO create a custom hook for all hooks
  const [accountType, setAccountType] = useState('Advanced')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [serverAddress, setServerAddress] = useState('')
  const [serverPath, setServerPath] = useState('')
  const [port, setPort] = useState('')
  const [isSSL, setIsSSL] = useState(false)

  //TODO validation in utils
  const validateUserName = (value: string) => {
    return value.length > 0
  }

  const validatePassword = (value: string) => {
    return value.length > 12
  }

  const validateServerPath = (value: string) => {
    if(value.length > 0) {
      return value.match(/^[a-z0-9]+$/i)
    }
    return true
  }

  const validatePort = (value: string) => {
    return !isNaN(parseInt(value))
  }

  const handleSubmit = useCallback(() => {
  if (accountType === 'manual') {
    if (validateUserName(userName) && validatePassword(password)) {
      console.log({
        accountType,
        userName,
        password,
        serverAddress
      })
    } else {
      console.log('information not correct')
    }
  } else {
    if (validateUserName(userName) && validatePassword(password) && validatePort(port) && validateServerPath(serverPath)) {
      console.log({
        accountType,
        userName,
        password,
        serverAddress,
        serverPath,
        port,
        isSSL
      })
    } else {
      console.log('information not correct')
    }
  }
  }, [userName, password, serverAddress, serverPath, port, isSSL, accountType])

//TODO finish styling, find better looking picker
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 20
      }}
    >
      <Text>Account Type:</Text>
      <Picker
        selectedValue={accountType}
        onValueChange={setAccountType}
        mode='dropdown'
      >
        <Picker.Item label="Manual" value="manual"/>
        <Picker.Item label="Advanced" value="advanced"/>

      </Picker>
      <ScrollView>
      

      <View style={styles.form}>
        <Text>User Name: </Text>
        <TextField
          placeholder="name@example.com"
          onChangeText={setUserName}
          enableErrors
          validate={['required', 'email']}
          validationMessage={['Email is invalid']}
          validateOnChange
          />
      </View>
      <View>
        
      </View>
      <View style={styles.form}>
        <Text>Password: </Text>
        <TextField
          placeholder="Required"
          onChangeText={setPassword}
          enableErrors
          validate={[() => (value: string) => value.length >= 12]}
          secureTextEntry
          />
        </View>
        <View style={styles.form}>

          <Text>Server Address: </Text>
          <TextField
          placeholder="example.com"
          onChangeText={setServerAddress}
          enableErrors
          validate={['required']}
          validationMessage={['Please provide server address']}
          validateOnChange
          />
        </View>
 
        {accountType === 'advanced' ? <View style={{flex: 1}}>
        <View style={styles.form}>
          <Text>Server Path: </Text>
          <TextField
          placeholder="/calendars/user/"
          onChangeText={setServerPath}
          enableErrors
          validate={['required', (value: string) => value.match(/^[a-z0-9]+$/i)]}
          validationMessage={['Please provide server Path']}
          validateOnChange
          />
        </View>
        <View style={styles.form}>
          <Text>Port: </Text>
          <TextField
          onChangeText={setPort}
          enableErrors
          validate={['required']}
          validationMessage={['Please provide port']}
          validateOnChange
          />
        </View>
        <Checkbox label="Use SSL" onValueChange={setIsSSL} value={isSSL}></Checkbox>
        </View> : null}
        </ScrollView>
       
        
        <Button label='Submit' onPress={handleSubmit}></Button>
    </View>
  );
}


const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between'
  }
})