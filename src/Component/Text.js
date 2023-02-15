import React, { Component } from 'react';
import { Text, } from 'react-native';

export default class TextX extends Component {

    getFontName(type) {
        let fontName = 'RSU'
        switch (type) {
            case 'bd': fontName = 'RSU-Bold'; break;
            case 'light': fontName = 'RSU-Light'; break;
            default: 'RSU';
        }
        return fontName
    }

    render() {
        const { type, style } = this.props
        return (
            <Text
                style={[{
                    color: '#fff',
                    fontSize: 20,
                    fontFamily: this.getFontName(type),
                }, style]}>
                {this.props.children}
            </Text>
        );
    }
}