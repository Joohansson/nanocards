
import React, { Component } from 'react';
import QrImageStyle from './qrImageStyle.js';
import './style.css';

export default class card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qrSize: 528,
    };
  }

  render() {
    var bgStyle={
      backgroundImage: 'url(' + this.props.theme.background + ')',
      backgroundSize: '154px 240px'
    };
    return (
      <div className="card-div" style={bgStyle} >
        <QrImageStyle className="card-div--qr" size={this.state.qrSize} content={this.props.payment} style={this.props.theme.pubDisplay}/>
        <QrImageStyle className="card-div--qr" size={this.state.qrSize} content={this.props.seed} style={this.props.theme.seedDisplay}  />
        <div className="card-div--dummy" style={this.props.theme.dummyDisplay}></div>
        <p className="card-div--msg" style={this.props.theme.msgStyle}>
          {(this.props.theme.msg !== "") ? this.props.theme.msg : this.props.msg}
        </p>
      </div>
    );
  }
  }
