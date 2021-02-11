import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, TextInput} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './src/Constants';
import Monster from './src/Monster'
import Character from './src/Character'
import Global from './src/Global'
import Prize from './src/Prize'
import Vertical_Wall from './src/Vertical_Wall'
import Horizontal_Wall from './src/Horizontal_Wall'
import Grass_Texture from './src/img/Grass_Texture'
import { GameLoop } from './src/Gameloop'




export default class rapidRPG extends Component{
  constructor(props){
    super(props);

    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true,
      pos_x: 0,
      pos_y: 0,
    };

    //this.setState({ pos_x: Global.CHAR_POS_X, pos_y: Global.CHAR_POS_Y })


    console.log(Constants.MAX_WIDTH);
    console.log(Constants.MAX_HEIGHT);
    console.log(Constants.CELL_SIZE);
  }


  onEvent = (e) => {
    if(e.type === 'game-over'){
      Alert.alert("Game Over");
      this.setState({
        running: false
      })
    }
    else if(e.type === 'constant_update'){
      this.setState({ pos_x: Global.CHAR_POS_X, pos_y: Global.CHAR_POS_Y })
    }
  }

  
render(){
    return (
      <View style={styles.container}>
        <View pointerEvents="none">
          <TextInput style= {styles.charPos} value={ '[' + this.state.pos_x + ', ' + this.state.pos_y + ']' } editable={false} />
        </View>
        <GameEngine
            ref={(ref) => {this.engine = ref}}
            style={{ width: this.boardSize, height:this.boardSize, flex: null, backgroundColor: '#fff'}}
            entities = {{
              Background : { position: [0, 0], renderer: <Grass_Texture /> },
              Character : { position: [2, 37], xspeed: 0, yspeed: 0, updateFrequency: Constants.CELL_SIZE-4, nextMove: Constants.CELL_SIZE-4, size: Constants.CELL_SIZE, renderer: <Character /> },
              Mon1 : { position: Constants.MON1_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon2 : { position: Constants.MON2_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon3 : { position: Constants.MON3_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon4 : { position: Constants.MON4_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon5 : { position: Constants.MON5_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon6 : { position: Constants.MON6_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon7 : { position: Constants.MON7_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon8 : { position: Constants.MON8_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Mon9 : { position: Constants.MON8_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              Monw : { position: Constants.MONW_POS, size: Constants.CELL_SIZE, renderer: <Monster /> },
              win : { position: Constants.WIN_POS, size: Constants.CELL_SIZE, renderer: <Prize /> },

              Top_Wall : { position: [0,0] , size_width: Constants.CELL_SIZE * 40, size_height: Constants.CELL_SIZE , renderer: <Vertical_Wall /> },
              Bottom_Wall : { position: [0,39] , size_width: Constants.CELL_SIZE * 40, size_height: Constants.CELL_SIZE , renderer: <Vertical_Wall /> },
              Left_Wall : { position: [0,0] , size_width: Constants.CELL_SIZE, size_height: Constants.CELL_SIZE * 40, renderer: <Horizontal_Wall /> },
              Right_Wall : { position: [39,0] , size_width: Constants.CELL_SIZE, size_height: Constants.CELL_SIZE * 40, renderer: <Horizontal_Wall /> },

              wall: { position: [0,4] , size_width: Constants.CELL_SIZE, size_height: Constants.CELL_SIZE * 40, renderer: <Horizontal_Wall /> },


            }}
            systems = {[ GameLoop ]}
            onEvent = {this.onEvent}
            running = {this.state.running}
            >
              <StatusBar hidden={true} />
      
              </GameEngine>
            <View style= {styles.controls}>
              <View style= {styles.controlRow}>
              
              <TouchableHighlight>
                <View style= {styles.control} onTouchStart={ () => {this.engine.dispatch( {type: "move-up-start"})} } onTouchEnd= { () =>  {this.engine.dispatch( {type: "move-up-stop"})} }/>
                </TouchableHighlight>
              </View>
              <View style= {styles.controlRow}>
                <TouchableHighlight >
                <View style= {styles.control} onTouchStart={ () => {this.engine.dispatch( {type: "move-left-start"})} } onTouchEnd= { () =>  {this.engine.dispatch( {type: "move-left-stop"})} }/>
                </TouchableHighlight>
                <View style= {[styles.control, { backgroundColor: null }]} />
                <TouchableHighlight >
                <View style= {styles.control} onTouchStart={ () => {this.engine.dispatch( {type: "move-right-start"})} } onTouchEnd= { () =>  {this.engine.dispatch( {type: "move-right-stop"})} }/>
                </TouchableHighlight>
              </View>
              <View style= {styles.controlRow}>
              <TouchableHighlight >
                <View style= {styles.control} onTouchStart={ () => {this.engine.dispatch( {type: "move-down-start"})} } onTouchEnd= { () =>  {this.engine.dispatch( {type: "move-down-stop"})} }/>
                </TouchableHighlight>
              </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls:{
    width: Math.round(Constants.CELL_SIZE * 10) * 3,
    height: Math.round(Constants.CELL_SIZE * 10) * 3,
    flexDirection: 'column'
  },
  controlRow: {
    width: Math.round(Constants.CELL_SIZE * 10) * 3,
    height: Math.round(Constants.CELL_SIZE * 10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  control: {
    width: Math.round(Constants.CELL_SIZE * 10),
    height: Math.round(Constants.CELL_SIZE * 10),
    backgroundColor: 'blue'
  },
  charPos: {
    color: 'white',
  }
});
