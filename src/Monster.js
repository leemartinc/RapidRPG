import React, {Component} from 'react';
import { View } from 'react-native';

export default class Monster extends Component { 
    

    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x;
        const y = this.props.body.position.y ;


        return(
            <View style={{
                width: width,
                height: height,
                backgroundColor: 'red',
                position: 'absolute',
                left: x * this.props.size[0],
                top: y * this.props.size[1],
            }}
            />
        )
    }
}
