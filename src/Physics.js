import Matter from 'matter-js';
import Character from './Character';
import Constants from './Constants';
import WorldMap from './games-files/map_world'
import Global from './Global';





//console.log(STUFF.player + "lol");




/*
 STUFF.put("wall_x", "=");
        STUFF.put("wall_y", "|");
        if(playerName == "no name"){
            STUFF.put("player", "0");
        }else {
            STUFF.put("player", playerName);
        }



player_pos = () => {
    for i in range(1,len(room)+1):
    	if stuff['player'] in room[i]:
    		x_axis = i
    		y_axis = room[i].index(stuff['player'])
    		global pos
    		del pos[:]
    		pos.append(x_axis)
            pos.append(y_axis)
            
}

*/


/*
right = () => {

}

*/


//set speed based on screen size for fairness
//var SpeedEQ = Constants.SCALE;

//console.log(SpeedEQ);

const Physics = (entities, {touches, dispatch, events, time }) => {
    let engine = entities.physics.engine;

    
    //Global.CHAR_POS_X = Math.round(character.position.x);
    //Global.CHAR_POS_Y = Math.round(character.position.y);

    //constantCheckorUpdate
    dispatch({
        type: 'constant_update',
    })
    

    Matter.Engine.update(engine, time.delta);

    




    
    if (events.length){
        for(let i=0; i < events.length; i++){
            if(events[i].type == "move-up-start"){
                    moveUp = true;

            }else if(events[i].type === "move-up-stop"){
                    moveUp = false;

            }else if(events[i].type === "move-down-start"){
                moveDown = true;

            }else if(events[i].type === "move-down-stop"){
                moveDown = false;

            }else if(events[i].type === "move-left-start"){
                moveLeft = true;

            }else if(events[i].type === "move-left-stop"){
                moveLeft = false;

            }else if(events[i].type === "move-right-start"){
                moveRight = true;

            }else if(events[i].type === "move-right-stop"){
                moveRight = false;
            }
        }
    }

    /*

    if(moveUp == true && character.position.y > 0){
        //Matter.Body.translate(entities["character"].body, {x:0,y:(-.3*SpeedEQ)});
        //console.log(.35*SpeedEQ)
        //Matter.Composite.translate(entities["character"].Composite, {x:0,y:-2});
        //console.log('movin');
    }else if(moveUp == false){
        //Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }
    if(moveDown == true && character.position.y < Constants.GRID_SIZE * Constants.CELL_SIZE - Constants.CELL_SIZE){
        Matter.Body.translate(entities["character"].body, {x:0,y:.3*SpeedEQ});
        //console.log('movin');
    }else if(moveDown == false){
        //Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }

    if(moveLeft == true && character.position.x > 0){
        //Matter.Body.translate(entities["character"].body, {x:-.3*SpeedEQ,y:0});
        //console.log('movin');
    }else if(moveLeft == false){
        //Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }

    if(moveRight == true && character.position.x < Constants.GRID_SIZE * Constants.CELL_SIZE - Constants.CELL_SIZE){
        //Matter.Body.translate(entities["character"].body, {x:.3*SpeedEQ,y:0});
        //console.log('movin');
    }else if(moveRight == false){
        //Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }

    */


    

    return entities;
}

export default Physics