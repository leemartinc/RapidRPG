import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, TextInput, Platform} from 'react-native';
import { TouchableOpacity as AndroidTouch } from 'react-native-gesture-handler';
import { GameEngine } from 'react-native-game-engine';
import Constants from './src/Constants';
import Monster from './src/Monster'
import Character from './src/Character'
import Global from './src/Global'
import Wall from './src/Wall'
import Prize from './src/Prize'
import Vertical_Wall from './src/Vertical_Wall'
import Horizontal_Wall from './src/Horizontal_Wall'
import Grass_Texture from './src/img/Grass_Texture'
import { GameLoop } from './src/Gameloop'
import Matter from 'matter-js';
import Physics from './src/Physics'
import PerfTimer from './src/Pref_Timer'



export default class rapidRPG extends Component{
  constructor(props){
    super(props);

    this.state = {
      

    };

  }

  


render(){

    return (
      <View style={styles.container}>
        
            
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
