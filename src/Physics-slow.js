import Matter from 'matter-js';
import Character from './Character';
import Constants from './Constants';

var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;

//set speed based on screen size for fairness
var SpeedEQ = Constants.SCALE;

//console.log(SpeedEQ);

const Physics = (entities, {touches, dispatch, events, time }) => {
    let engine = entities.physics.engine;
    let character = entities.character.body;
    //let worldMap = entities.WorldMap.body;
    Global.CHAR_POS_X = Math.round(character.position.x);
    Global.CHAR_POS_Y = Math.round(character.position.y);

    //constantCheckorUpdate
    dispatch({
        type: 'constant_update',
    })
    

    Matter.Engine.update(engine, time.delta);

    //console.log(time.delta);

    //Matter.Body.translate(entities["Background"].body, {x:0,y:2});
    //Matter.Body.applyForce(character, character.position, {x:0,y:0});

    //Matter.Body.translate(entities["character"].body, {x:0,y:-2});


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

    if(moveUp == true && character.position.y > 0){
        Matter.Body.translate(entities["character"].body, {x:0,y:(-.3*SpeedEQ)});
        //console.log(.35*SpeedEQ)
        //Matter.Composite.translate(entities["character"].Composite, {x:0,y:-2});
        //console.log('movin');
    }else if(moveUp == false){
        Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }
    if(moveDown == true && character.position.y < Constants.GRID_SIZE * Constants.CELL_SIZE - Constants.CELL_SIZE){
        Matter.Body.translate(entities["character"].body, {x:0,y:.3*SpeedEQ});
        //console.log('movin');
    }else if(moveDown == false){
        Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }

    if(moveLeft == true && character.position.x > 0){
        Matter.Body.translate(entities["character"].body, {x:-.3*SpeedEQ,y:0});
        //console.log('movin');
    }else if(moveLeft == false){
        Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }

    if(moveRight == true && character.position.x < Constants.GRID_SIZE * Constants.CELL_SIZE - Constants.CELL_SIZE){
        Matter.Body.translate(entities["character"].body, {x:.3*SpeedEQ,y:0});
        //console.log('movin');
    }else if(moveRight == false){
        Matter.Body.translate(entities["character"].body, {x:0,y:0});
    }

    return entities;
}

export default Physics