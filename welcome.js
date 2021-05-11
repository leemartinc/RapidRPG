import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableHighlight, Alert, TextInput, Dimensions, Platform} from 'react-native';


export default class Setup extends Component{
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
                          //style={styles.cancelButton} 
                          //nPress={this.editUser}
                          title="Start"
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
  