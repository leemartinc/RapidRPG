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

    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    /*this.state = {
      running: true,
      pos_x: 0,
      pos_y: 0,
    };*/
    this.entities = this.setupWorld();


    //this.setState({ pos_x: Global.CHAR_POS_X, pos_y: Global.CHAR_POS_Y })

    this.state = {
      running: true,
      pos_x: 0,
      pos_y: 0,
    };

    console.log(Constants.MAX_WIDTH);
    //console.log(Constants.MAX_HEIGHT);
    //console.log(Constants.CELL_SIZE);
    //console.log(Constants.GRID_SIZE);
    //console.log(Constants.SCALE);
  }

  

  setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    //Matter.Engine.update(engine,1000,1);
    let world = engine.world;
    //Runner.run(runner, engine);

    //engine.timing.timeScale = .5;
    //Matter.Engine.update(engine,1000);
    world.gravity.y = 0;
    //world.setBounds = {min:{x:0,y:0},max:{x:310,y:310}};

    let character = Matter.Bodies.rectangle(2, 38, 1,1 );
    //let WorldMap = Matter.Bodies.rectangle(0, 0, Constants.GRID_SIZE*Constants.CELL_SIZE, Constants.GRID_SIZE*Constants.CELL_SIZE);
    //let verticalBorderLeft = Matter.Bodies.rectangle(1, 40, Constants.CELL_SIZE,Constants.GRID_SIZE*-1);
    //let HorizontalBorder = Matter.Bodies.rectangle(0, 0);
    let BorderWallLeft = Matter.Bodies.rectangle(-1, 20, 1,41, {isStatic: true});
    let BorderWallTop = Matter.Bodies.rectangle(19, -1, 41,1, {isStatic: true});
    let BorderWallBot = Matter.Bodies.rectangle(20, 40, 41,1, {isStatic: true});
    let BorderWallRight = Matter.Bodies.rectangle(40, 19, 1,41, {isStatic: true});

    let Mon1 = Matter.Bodies.rectangle(Constants.MON1_POS[0],Constants.MON1_POS[1] , 1,1, {isStatic: true});
    let Mon2 = Matter.Bodies.rectangle(Constants.MON2_POS[0],Constants.MON2_POS[1] , 1,1, {isStatic: true});
    let Mon3 = Matter.Bodies.rectangle(Constants.MON3_POS[0],Constants.MON3_POS[1] , 1,1, {isStatic: true});
    let Mon4 = Matter.Bodies.rectangle(Constants.MON4_POS[0],Constants.MON4_POS[1] , 1,1, {isStatic: true});
    let Mon5 = Matter.Bodies.rectangle(Constants.MON5_POS[0],Constants.MON5_POS[1] , 1,1, {isStatic: true});
    let Mon6 = Matter.Bodies.rectangle(Constants.MON6_POS[0],Constants.MON6_POS[1] , 1,1, {isStatic: true});
    let Mon7 = Matter.Bodies.rectangle(Constants.MON7_POS[0],Constants.MON7_POS[1] , 1,1, {isStatic: true});
    let Mon8 = Matter.Bodies.rectangle(Constants.MON8_POS[0],Constants.MON8_POS[1] , 1,1, {isStatic: true});
    let Mon9 = Matter.Bodies.rectangle(Constants.MON9_POS[0],Constants.MON9_POS[1] , 1,1, {isStatic: true});
    let Monw = Matter.Bodies.rectangle(Constants.MONW_POS[0],Constants.MONW_POS[1] , 1,1, {isStatic: true});
    let Win = Matter.Bodies.rectangle(Constants.WIN_POS[0],Constants.WIN_POS[1] , 1,1, {isStatic: true});

    let wall1 = Matter.Bodies.rectangle(-1, 20, 1,41, {isStatic: true});

    Matter.World.add(world, [character, 
      BorderWallTop,
      BorderWallLeft,
      BorderWallBot,
      BorderWallRight,
      Mon1,
      Mon2,
      Mon3,
      Mon4,
      Mon5,
      Mon6,
      Mon7,
      Mon8,
      Mon9,
      Monw,
      Win,
    ]);

    /*
    let now = Date.now();
    setInterval(() => {
    Matter.Engine.update(engine, Date.now() - now);
    now = Date.now();
    }, 0);
    */

    return {
      physics: {engine: engine, world: world},
      Background : { position: [0,0], renderer: Grass_Texture },
      character: { body: character, size: [Constants.CELL_SIZE,Constants.CELL_SIZE], color: 'darkgreen', renderer: Character},
      //verticalBorderLeft : { body: verticalBorderLeft, position: [1,40], size: [Constants.CELL_SIZE,Constants.GRID_SIZE], renderer: Vertical_Wall },
      BorderWallLeft : { body: BorderWallLeft, size: [1,41], renderer: Vertical_Wall},
      BorderWallTop : { body: BorderWallTop, size: [41,1], renderer: Horizontal_Wall},
      BorderWallBot : { body: BorderWallBot, size: [41,1], renderer: Horizontal_Wall},
      BorderWallRight : { body: BorderWallRight, size: [1,41], renderer: Vertical_Wall},
      Mon1 : { body: Mon1, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon2 : { body: Mon2, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon3 : { body: Mon3, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon4 : { body: Mon4, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon5 : { body: Mon5, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon6 : { body: Mon6, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon7 : { body: Mon7, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon8 : { body: Mon8, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Mon9 : { body: Mon9, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Monw : { body: Monw, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},
      Win : { body: Win, size: [Constants.CELL_SIZE, Constants.CELL_SIZE], renderer: Monster},

    }

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

  if (Platform.OS == 'ios'){
    return (
      <View style={styles.container}>
        <View pointerEvents="none">
          <TextInput style= {styles.charPos} value={ '[' + this.state.pos_x + ', ' + this.state.pos_y + ']' } editable={false} />
        </View>
        <GameEngine
            ref={(ref) => {this.engine = ref; }}
            //timer={new PerfTimer()}
            style={{ width: this.boardSize, height:this.boardSize, flex: null, backgroundColor: '#fff', marginBottom:10,}}
            entities = {this.entities}
            systems = {[Physics]}
            onEvent = {this.onEvent}
            >
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
    }else if(Platform.OS == 'android'){
      return (
        <View style={styles.container}>
          <View pointerEvents="none">
            <TextInput style= {styles.charPos} value={ '[' + this.state.pos_x + ', ' + this.state.pos_y + ']' } editable={false} />
          </View>
          <GameEngine
              ref={(ref) => {this.engine = ref; }}
              //timer={new PerfTimer()}
              style={{ width: this.boardSize, height:this.boardSize, flex: null, backgroundColor: '#fff', marginBottom:10,}}
              entities = {this.entities}
              systems = {[Physics]}
              onEvent = {this.onEvent}
              
              >
                </GameEngine>
  
                <View style= {styles.controls}>
              <View style= {styles.controlRow}>
              
              
                <AndroidTouch style= {styles.control} onPressIn={ () => {this.engine.dispatch( {type: "move-up-start"})} } onPressOut= { () =>  {this.engine.dispatch( {type: "move-up-stop"})} }/>
               
              </View>
              <View style= {styles.controlRow}>
                
                <AndroidTouch style= {styles.control} onPressIn={ () => {this.engine.dispatch( {type: "move-left-start"})} } onPressOut= { () =>  {this.engine.dispatch( {type: "move-left-stop"})} }/>
                
                <View style= {[styles.control, { backgroundColor: null }]} />
                
                <AndroidTouch style= {styles.control} onPressIn={ () => {this.engine.dispatch( {type: "move-right-start"})} } onPressOut= { () =>  {this.engine.dispatch( {type: "move-right-stop"})} }/>
               
              </View>
              <View style= {styles.controlRow}>
              
                <AndroidTouch style= {styles.control} onPressIn={ () => {this.engine.dispatch( {type: "move-down-start"})} } onPressOut= { () =>  {this.engine.dispatch( {type: "move-down-stop"})} }/>
               
              </View>
            </View>

              
        </View>
      );
    }
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
    marginBottom: 10,
  }
});
