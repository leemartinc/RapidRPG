import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, TextInput, Dimensions, Platform} from 'react-native';
import { TouchableOpacity as AndroidTouch } from 'react-native-gesture-handler';
import { GameEngine } from 'react-native-game-engine';
import Constants from './src/Constants'
import Monster from './src/Monster'
import WorldMap from './src/games-files/map_world'
import Character from './src/Character'
import Global from './src/Global'
import TextFixedWidth from './src/Components/TextFixedWidth'
import Wall from './src/Wall'
import Prize from './src/Prize'
import Vertical_Wall from './src/Vertical_Wall'
import Horizontal_Wall from './src/Horizontal_Wall'
import Grass_Texture from './src/img/Grass_Texture'
import { GameLoop } from './src/Gameloop'
import Matter from 'matter-js';
import Physics from './src/Physics'
import PerfTimer from './src/Pref_Timer'



var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;
var UpdateCheck = false;
var room = [[],[]];
var STUFF = {};
const windowHeight = Dimensions.get('window').height;





//Global.CURRENT_WORLD = WorldMap;

STUFF.empty = '·';
STUFF.wall_x = '=';
STUFF.wall_y = '|';

//console.log(Global.PLAYER_NAME)





function setCharAt(str,idx,newChr){ 
  return str.substring(0,idx)+newChr+str.substring(idx+1);
}

const scene_builder = (tmp_map) => {

    const character = Global.PLAYER_NAME[0];
    //console.log(Global.PLAYER_NAME[0])

    var room_height = 0;
    var init_col_counter= 0;
    var room_width = 0;

//count columns and rows in world
    for (var i = 0; i < tmp_map.length; i++) {
        //room.push( [] );
        init_col_counter++;
        if(tmp_map.charAt(i) == '\n'){
            room_height++;
            room_width = init_col_counter;
            init_col_counter = 0;
        }
    }
    //console.log(room_height + " " + room_width)

  
    //create 1d array room
    room = new Array(room_width)

    //make 1d room array 2d room array(array in array) of world
    for (var i = 0; i < room.length; i++) { 
      room[i] = new Array(room_height); 
  } 

  //emplty room array


  Global.WORLD_HEIGHT = room_height;
  Global.WORLD_WIDTH = room_width;

  var line_counter = 0;
  var col_counter= 0;


  for (var i = 0; i < tmp_map.length; i++) {
    
        if (tmp_map.charAt(i) == '0'){
            tmp_map =  setCharAt(tmp_map, i, character);
        }
        if(tmp_map.charAt(i) == '*'){
          tmp_map =  setCharAt(tmp_map, i, mon_char);
        }
        //game win condition
        if (tmp_map.charAt(i) == 'Ж'){
            if(Global.GAME_WIN){
              tmp_map =  setCharAt(tmp_map, i, '.');
            }
        }

        //populate room 2d array 
        room[line_counter][col_counter] = tmp_map.charAt(i);
        col_counter++;

        //move to next line in map
        if(tmp_map.charAt(i) == '\n'){
            line_counter++;
            col_counter = 0;
        }
        //console.log(line_counter)
  }
}





const up = (map, inst_replace, inst_player, pressed) => {
  if (pressed == true){
    //while(pressed == true){
      //console.log('logged')
      if(map[Global.CHAR_POS[0] - 1][Global.CHAR_POS[1]] != STUFF.wall_x && map[Global.CHAR_POS[0] - 1][Global.CHAR_POS[1]] != STUFF.wall_y) {
        map[Global.CHAR_POS[0]][Global.CHAR_POS[1]] = inst_replace;
        map[Global.CHAR_POS[0] - 1][Global.CHAR_POS[1]] = inst_player;
        updater()
        //screenUpdater();
      //}
    }
    
    
  }else if (pressed == false){
    //nothing
  }
}

const down = (map, inst_replace, inst_player, pressed) => {
    
  if (pressed == true){
  if(map[Global.CHAR_POS[0] + 1][Global.CHAR_POS[1]] != STUFF.wall_x && map[Global.CHAR_POS[0] + 1][Global.CHAR_POS[1]] != STUFF.wall_y) {
        map[Global.CHAR_POS[0]][Global.CHAR_POS[1]] = inst_replace;
        map[Global.CHAR_POS[0] + 1][Global.CHAR_POS[1]] = inst_player;
        updater()
    }
  }
}

const left = (map, inst_replace, inst_player, pressed) => {
  if (pressed == true){
  if(map[Global.CHAR_POS[0]][Global.CHAR_POS[1] - 1] != STUFF.wall_x && map[Global.CHAR_POS[0]][Global.CHAR_POS[1] - 1] != STUFF.wall_y) {
        map[Global.CHAR_POS[0]][Global.CHAR_POS[1]] = inst_replace;
        map[Global.CHAR_POS[0]][Global.CHAR_POS[1] - 1] = inst_player;
        updater()
    }
  }
}

const right = (map, inst_replace, inst_player, pressed) => {
  if (pressed == true){
    if(map[Global.CHAR_POS[0]][Global.CHAR_POS[1] + 1] != STUFF.wall_x && map[Global.CHAR_POS[0]][Global.CHAR_POS[1] + 1] != STUFF.wall_y) {
        map[Global.CHAR_POS[0]][Global.CHAR_POS[1]] = inst_replace;
        map[Global.CHAR_POS[0]][Global.CHAR_POS[1] + 1] = inst_player;
        updater()
    }
  }
}






const printWorld = () => {
  Global.CURRENT_WORLD = '';
    for (var i = 0; i < Global.WORLD_HEIGHT; i++)
    {
            for (var j = 0; j < Global.WORLD_WIDTH; j++)
            {
                if (room[i][j] == '0') {
                    //pos[0] = i;
                    //pos[1] = j;
                    room[i][j] = Global.PLAYER_NAME[0];
                }
                //console.log(room[i][j]);
                Global.CURRENT_WORLD += room[i][j];

                
            }
    }

    //this.setState({ gameMap: Global.CURRENT_WORLD })
}



const player_pos = () => {

  for (var i = 0; i < Global.WORLD_HEIGHT; i++)
        {
            for (var j = 0; j < Global.WORLD_WIDTH; j++)
            {
                if (room[i][j] == Global.PLAYER_NAME[0]) {
                    Global.CHAR_POS[0] = i;
                    Global.CHAR_POS[1] = j;
                }
            }
        }

}

function updater(){

  //playerName_view.setText(playerName + " the " + userInfo.getString("CLASS", "null"));
  //playerArmor_view.setText("Armor: " + String.valueOf(userInfo.getInt("DEFENSE", 00)));
  //playerHealth_view.setText("Health: " + String.valueOf(userInfo.getInt("HEALTH", 00)));
  //playerPower_view.setText("Power: " + String.valueOf(df2.format(Double.longBitsToDouble(userInfo.getLong("POWER", 0)))));

  //playerSkill1_view.setText("Skill 1 max dmg: " + String.valueOf(userInfo.getInt("SKILL1", 00)));
  //playerSkill2_view.setText("Skill 2 max dmg: " + String.valueOf(userInfo.getInt("SKILL2", 00)));

  printWorld();
  player_pos();
  //checkSpecialPos();

  //if(combatMode){

      //fightClub();
  //}

}

  

//console.log(Global.CHAR_POS);

//scene_builder(WorldMap);
    //printWorld();
    //player_pos();
//updater();  

function start() {
    if(Global.PLAYER_NAME == "0"){
        //STUFF.player = "NULL";
        console.log('error')
    }else {
        STUFF.player = Global.PLAYER_NAME
        //console.log(Global.PLAYER_NAME[0])
    }
    console.log('-----------Game Started--------')
    scene_builder(WorldMap);
    updater(); 
}


export default class RapidRPG extends Component{
  constructor(props){
    super(props);

    this.boardSize_width = (Constants.CELL_SIZE * Constants.GRID_SIZE) - 5;
    this.boardSize_height = (Constants.CELL_SIZE * Constants.GRID_SIZE) + 25;


    this.state = {
      running: true,
      pos_x: 0,
      pos_y: 0,
      gameMap: Global.CURRENT_WORLD,
      playerName: Global.PLAYER_NAME,
      playerClass: Global.PLAYER_CLASS,
      playerArmour: 0,
      playerHealth: 0,
      playerPower: 0,
      playerSkill1: 0,
      playerSkill2: 0,
      //hidden item for combat

      //mon_name




    };

    //console.log(Constants.MAX_WIDTH);

  }


  screenUpdater = () => {
    this.setState({ pos_x: Global.CHAR_POS[0], pos_y: Global.CHAR_POS[1]})
    this.setState({ gameMap: Global.CURRENT_WORLD })
    this.setState({playerName: Global.PLAYER_NAME})
  }

  componentDidMount(){
    start()
    this.screenUpdater();
    
}


render(){


    return (
      <View style={styles.container}>
            <View style= {styles.Top}>
                    <View pointerEvents="none">
                        <TextInput style= {styles.charPos} value={ '[' + this.state.pos_x + ', ' + this.state.pos_y + ']' } editable={false} onChange={this.screenUpdater}/>
                    </View>
                    <View>
                        <View style= {styles.stage} pointerEvents="none">
                        <TextFixedWidth>

                            { this.state.gameMap }
                        
                        </TextFixedWidth>
                        </View>
                    </View>
            </View>

              
           
            <View style= {styles.Mid}>     
                <View style= {styles.charInfo}>
                    <TextInput style= {{color:'black'}}  value={ this.state.playerName + ' the ' + Global.PLAYER_CLASS + '\n'} editable={false} />
                    <TextInput style= {{color:'black'}}  value={ 'Health: ' + Global.PLAYER_HEALTH + '\n'} editable={false} />
                    <TextInput style= {{color:'black'}}  value={ 'Armour: ' + Global.PLAYER_DEFENSE + '\n'} editable={false} />
                    <TextInput style= {{color:'black'}}  value={ 'Power: ' + Global.PLAYER_POWER + '\n'} editable={false} />
                </View>
            </View>


            <View style= {styles.Bottom}>

                <View style= {styles.controls}>
                <View style= {styles.controlRow}>
                
                <TouchableHighlight>
                    <View style= {styles.control} onTouchStart={ () => {up(room, STUFF.empty, Global.PLAYER_NAME[0], true); this.screenUpdater();}} onTouchEnd= { () =>  {up(room, STUFF.empty, Global.PLAYER_NAME[0], false); this.screenUpdater();} }/>
                    </TouchableHighlight>
                </View>
                <View style= {styles.controlRow}>
                    <TouchableHighlight >
                    <View style= {styles.control} onTouchStart={ () => {left(room, STUFF.empty, Global.PLAYER_NAME[0], true); this.screenUpdater();}} onTouchEnd= { () =>  {left(room, STUFF.empty, Global.PLAYER_NAME[0], false); this.screenUpdater();}  }/>
                    </TouchableHighlight>
                    <View style= {[styles.control, { backgroundColor: null }]} />
                    <TouchableHighlight >
                    <View style= {styles.control} onTouchStart={ () => {right(room, STUFF.empty, Global.PLAYER_NAME[0], true); this.screenUpdater();}} onTouchEnd= { () =>  {right(room, STUFF.empty, Global.PLAYER_NAME[0], false); this.screenUpdater();} }/>
                    </TouchableHighlight>
                </View>
                <View style= {styles.controlRow}>
                <TouchableHighlight >
                    <View style= {styles.control} onTouchStart={ () => {down(room, STUFF.empty, Global.PLAYER_NAME[0], true); this.screenUpdater();}} onTouchEnd= { () =>  {down(room, STUFF.empty, Global.PLAYER_NAME[0], false); this.screenUpdater();} }/>
                    </TouchableHighlight>
                </View>
                </View>
            </View>
            
        </View>
    );
  }










}

const styles = StyleSheet.create({
  container: {
    //marginTop: 20,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    flexDirection: "column",
  },
  Top: {
    flex: 3,
    //backgroundColor: "red",
  },
  Mid: {
    flex: 1,
  },
  Bottom: {
    flex: 2,
    //backgroundColor: "green",
    flexDirection: 'row',
  },
  stage:{
    //fontSize: 20, 
    //height: 23,
    borderRadius: 15,
    backgroundColor: 'white',
    paddingLeft: 14,
    paddingRight: 14,
    shadowColor: "#000",
    //marginBottom: -10,
    flex: null,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,

  

  },
  controls:{
    width: Math.round(Constants.CELL_SIZE * 7) * 3,
    height: Math.round(Constants.CELL_SIZE * 7) * 3,
    flexDirection: 'column'
  },
  controlRow: {
    width: Math.round(Constants.CELL_SIZE * 7) * 3,
    height: Math.round(Constants.CELL_SIZE * 7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  control: {
    width: Math.round(Constants.CELL_SIZE * 7),
    height: Math.round(Constants.CELL_SIZE * 7),
    backgroundColor: 'grey'
  },
  charPos: {
    color: 'black',
    marginBottom: 10,
  },
  gameMap: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  charInfo: {
    alignContent: 'flex-start',
    //flexDirection: 'row',
  }
});
