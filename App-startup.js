import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, TouchableHighlight, Alert, TextInput, Platform} from 'react-native';




export default class rapidRPG extends Component{
  constructor(props){
    super(props);

    this.state = {
      

    };

  }


render(){

    return (
      <View style={styles.container}>

            <Text >
              RapidRPG
            </Text>
            <Button
                        style={styles.cancelButton} 
                        onPress={this.editUser}
                        title="Register"
                        color="#343434"
                        accessibilityLabel="Register a User."/>
            
                
          </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
