import React, {Component} from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import Constants from './Constants'

export default class Horizontal_Wall extends Component { 
    

    render() {
        const width = this.props.size[0]*Constants.CELL_SIZE;
        const height = this.props.size[1]*Constants.CELL_SIZE;
        const x = this.props.body.position.x;
        const y = this.props.body.position.y;


        return(
            <View style={{
                width: width,
                height: height,
                backgroundColor: '#6b6b6b',
                position: 'absolute',
                left: (x * Constants.CELL_SIZE) - (width/2) + Constants.CELL_SIZE/2,
                top: y * Constants.CELL_SIZE,
            }}
            >
                
                </View>
        )
    }
}
