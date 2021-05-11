import React, {Component} from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import Constants from './Constants'

export default class Horizontal_Wall extends Component { 
    

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return(
            <View style={{
                width: this.props.size,
                height: this.props.size,
                backgroundColor: '#6b6b6b',
                position: 'absolute',
                left: x * this.props.size,
                top: y * this.props.size,
            }}
            >
                
                </View>
        )
    }
}
