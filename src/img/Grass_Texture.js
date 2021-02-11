import React, {Component} from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';

export default class Grass_Texture extends Component { 
    constructor(props){
        super(props);
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];


        return(

            <View>
                    <ImageBackground
                    source = {require('../img/grass_texture.jpg')}
                    style = {{height: '100%', width: 'auto'}} >
                    </ImageBackground>

                </View>
            
        )
    }
}