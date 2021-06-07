
//import * as React from 'react';
import React, { Component } from 'react';
import { StyleSheet,Button, Text, View, TouchableOpacity, TouchableHighlight, Alert, TextInput, Dimensions, Platform} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Global from './src/Global'
import RapidRPG from './game'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setStatusBarStyle } from 'expo-status-bar';

var prob = 6 + Math.floor(Math.random() * 9-6) + 1 ;
var mod

//console.log(prob)


var class_props = [
  {label: 'Ninja (Assassin)', value: 'Ninja' },
  {label: 'Warrior (Tank)', value: 'Warrior' },
  {label: 'Knight (Fighter)', value: 'Knight' },
  {label: 'Preist (Support)', value: 'Preist' },
  //{label: 'param2', value: 1 }
];


//TODO: make plauyer name update when map is generated


function setStats(){
  console.log('Stats set')

  switch(Global.PLAYER_CLASS) {
 
    case 'Ninja':
      //this.ONE();
      break;
    
    case 'Warrior':
      Global.PLAYER_DEFENSE = 4;
      Global.PLAYER_SKILL1 = 20;
      mod = prob/10.0;
      Global.PLAYER_SKILL2 = Math.round((Global.PLAYER_SKILL1 + Global.PLAYER_SKILL1) * (mod))
      //player_skill2 = (int)Math.round((player_skill1 + player_skill1) * (mod));
      Global.PLAYER_HEALTH = 100;
      //gameClass = "warrior";
      break;

    case 'Knight':
      //this.THREE();
      break;

    case 'Preist':
      //this.FOUR();
      break;

    }


}



class WelcomeScreen extends Component{
    constructor(props){
      super(props);
  
      this.state = {
        class: 'Ninja',
        name: 0,
      };
    }

    ready = () => {

      if(this.state.class == 0){
        //select class
      }if(this.state.name == 0){
        //enter name
      }else{
        console.log(this.state.class);
        Global.PLAYER_CLASS = this.state.class
        Global.PLAYER_NAME = this.state.name
        Global.GAME_START = true
        setStats()
        this.props.navigation.navigate('Game')
      }
      
    }
  
    render(){

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
          <TextInput 
          style={styles.name_input}
          placeholder = {'Charcacter Name'}
          placeholderTextColor={'#000'}
          underlineColorAndroid = 'transparent'
          //autoCapitalize = 'none'
          autoCorrect={false}
          onChangeText = {(name) => this.setState({name})}
          />
          <Text>*NOTE* The first letter of your character name will be your character icon</Text>
          
          
          <Text>Choose your Class!</Text>
          <Text>There are four classes to choose from. Each of them scale differently and have one uniquie ability</Text>
         
          <View>
        <RadioForm
          animation={true}
          radio_props={class_props}
          initial={0}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={'gray'}
          selectedButtonColor={'dodgerblue'}
          onPress={(value) => {this.setState({class:value})}}
        />
      </View>

      <Button
        title="Start Game"
        onPress={() => this.ready()}
      />
    </View>
  );
}
  }


function GameScreen({ navigation }) {
  return (
    //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <RapidRPG />
    //</View>
  );
}


const Stack = createStackNavigator();

export default class App extends Component{
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  name_input: {
    //width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    paddingRight: 45,
    backgroundColor: '#fff',
    color: '#000',
    marginHorizontal: 25,
},
  
});

