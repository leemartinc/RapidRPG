import { Dimensions, Platform} from 'react-native';

var offset = 0;
if (Platform.OS == "android"){
    offset = 180;
}

export default Constants = {
    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    //GRID_SIZE: Math.floor(Dimensions.get('screen').width / 10.1),
    CELL_SIZE: Math.ceil(Dimensions.get('screen').width / 48),
    GRID_SIZE: 40,
    //CELL_SIZE: 10,
    NEUTRAL_CONTROL_WIDTH: 400,
    SCALE: 1,
    CHAR_POS_X: 0,
    CHAR_POS_Y: 0,
    MON1_POS: [18,36],
    MON2_POS: [10,26],
    MON3_POS: [3,19],
    MON4_POS: [28,10],
    MON5_POS: [25,38],
    MON6_POS: [2,2],
    MON7_POS: [10,2],
    MON8_POS: [19,13],
    MON9_POS: [25,2],
    MONW_POS: [38,13],
    WIN_POS: [37,37],



}

//console.log(MAX_WIDTH);
//console.log(MAX_HEIGHT);

//40 x 71