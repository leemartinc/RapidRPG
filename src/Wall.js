import React, {Component} from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import Constants from './Constants'

export default class Wall extends Component { 
    

    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x;
        const y = this.props.body.position.y;


        return(
            <View style={{
                width: width,
                height: height,
                backgroundColor: this.props.color,
                position: 'absolute',
                left: (x * Constants.CELL_SIZE) - (width/2) + Constants.CELL_SIZE/2,
                top: y * Constants.CELL_SIZE,
            }}
            >
                 <ImageBackground
                    source = {require('./img/wall_texture.png')}
                    style = {{height: '100%', width: 'auto'}}
                    imageStyle={{ resizeMode: 'repeat' }} >
                </ImageBackground>
                </View>
        )
    }
}
