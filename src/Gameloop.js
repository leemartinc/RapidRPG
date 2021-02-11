//import Character from './Character';
import Constants from './Constants'
import Global from './Global'

const GameLoop = (entities, {touches, dispatch, events }) => {
    let Character = entities.Character;
    Global.CHAR_POS_X = Character.position[0];
    Global.CHAR_POS_Y = Character.position[1];

    //constantCheckorUpdate
    dispatch({
        type: 'constant_update',
    })


    //console.log('x: ' + Character.position[0])
    //console.log('y: ' + Character.position[1])
    //Character.position[1] = Global.CHAR_POS_Y;

    //Character.position[0] += Character.xspeed;

    //move conditions
   // Character.position[0] < 0 ||
   // Character.position[0] >= Constants.GRID_SIZE ||
   // Character.position[1] < 0 ||
    // Character.position[1] >= Constants.GRID_SIZE

    if (events.length){
        for(let i=0; i<events.length; i++){
            if(events[i].type === "move-up-start" && Character.position[1] > 1){
                Character.yspeed = -1;


            }else if(events[i].type === "move-up-stop"){
                Character.yspeed = 0;

            }else if(events[i].type === "move-down-start" && Character.position[1] < Constants.GRID_SIZE-1){
                Character.yspeed = 1;

            }else if(events[i].type === "move-down-stop"){
                Character.yspeed = 0;

            }else if(events[i].type === "move-left-start" && Character.position[0] > 1){
                Character.xspeed = -1;

            }else if(events[i].type === "move-left-stop"){
                Character.xspeed = 0;

            }else if(events[i].type === "move-right-start" && Character.position[0] < Constants.GRID_SIZE-1){
                Character.xspeed = 1;

            }else if(events[i].type === "move-right-stop"){
                Character.xspeed = 0;
            }
        }
    }
    
    dispatch({
        //type: 'game-over',
    })
    



    Character.nextMove -= 1;
    if(Character.nextMove === 0){
        Character.nextMove = Character.updateFrequency;


        if(
            Character.position[0] + Character.xspeed < 1 ||
            Character.position[0] + Character.xspeed >= Constants.GRID_SIZE-1||
            Character.position[1] + Character.yspeed < 1 ||
            Character.position[1] + Character.yspeed >= Constants.GRID_SIZE-1
            
        ){
            //not allowed
        }else{
            Character.position[0] += Character.xspeed;
            Character.position[1] += Character.yspeed;
        }
        

    }






//console.log ("tick");
//60 fps?
    return entities;
    
}

export { GameLoop };