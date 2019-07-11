import React from 'react';
import QrCode from './qr-code.js';

export default class QrImageStyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        image: null,
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if(nextProps.content && nextProps.size) {
      const qr = document.createElement('canvas');
      
      QrCode.render({
        text: nextProps.content,
        radius: 0.5, // 0.0 to 0.5
        ecLevel: 'L', // L, M, Q, H
        fill: {
          type: 'radial-gradient', // or 'linear-gradient'
          position: [ 0.5,0.5,0, 0.5,0.5,0.75 ], //xPos,yPos,radius of inner and outer circle where position is 0-1 of full dimension
          colorStops: [
              [ 0, '#376ab4' ], //from 0 to 100% (0-1)
              [ 1, '#000034' ],
          ]
        }, // foreground color
        background: null, // color or null for transparent
        size: nextProps.size // in pixels
      }, qr);
      
      this.setState({image: qr.toDataURL('image/png')});
  
    } else {
        this.props.setState({image: null});
    }
  }

  render() {
    return <img { ...this.props }src={this.state.image} alt="QR"/>;
  }
}