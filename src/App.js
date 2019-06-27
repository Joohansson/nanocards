import React, { Component } from 'react';
import { Dropdown, DropdownButton, Button, Form, Row, Col } from 'react-bootstrap';
import './App.css';
import './print.css';
import { Card, Themes } from './card';
import { saveAs } from 'file-saver';
import { Wallet } from 'rai-wallet';
import domtoimage from 'dom-to-image';
import $ from 'jquery';

import logo from './img/logo.png';
import donation from './img/donation.png';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      validated: false,
      seed: '',
      account: '',
      activeTheme: Themes[0],
      paperWalletImageData: '',
      valueMin: '0.1',
      valueMax: '1.0',
      activeThemeId: 0,
      valueMaxLength: 10,
      donationPath: donation,
      qrSize: 200,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.print = this.print.bind(this);
    this.showDonateModal = this.showDonateModal.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);

    this.cardText = ['A ninja took your computer and cracked your wallet', 'Global bear depression', 'Mobile crashed and the seed was not saved']
  }

  componentDidMount() {
    this.generateNewWallet(null, false);

    /* Define share link modal jquery function */
    $.fn.psendmodal = function() {
      var modal_structure = '<div class="modal_overlay"></div>'+
                  '<div class="modal_psend">'+
                    '<div class="modal_title">'+
                      '<span>&nbsp;</span>'+
                      '<a href="#" class="modal_close">&times;</a>'+
                    '</div>'+
                    '<div class="modal_content"></div>'+
                  '</div>';

      $('body').append(modal_structure);
      show_modal();

      function show_modal() {
        $('.modal_overlay').stop(true, true).fadeIn();
        $('.modal_psend').stop(true, true).fadeIn();
      }

      window.remove_modal = function() {
        $('.modal_overlay').stop(true, true).fadeOut(500, function() { $(this).remove(); });
        $('.modal_psend').stop(true, true).fadeOut(500, function() { $(this).remove(); });
        return false;
      }

      $(".modal_close").click(function(e) {
        e.preventDefault();
        window.remove_modal();
      });

      $(".modal_overlay").click(function(e) {
        e.preventDefault();
        window.remove_modal();
      });

      $(document).keyup(function(e) {
        if (e.keyCode === 27) { // Esc
          window.remove_modal();
        }
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    this.setState({ validated: true })
    this.generateNewWallet(event,false)
  }

  /* Show donate modal */
  showDonateModal() {
    $(document).psendmodal();
    var account = 'nano_1gur37mt5cawjg5844bmpg8upo4hbgnbbuwcerdobqoeny4ewoqshowfakfo';

    var content =  '<div class="public_link_modal">'+
              '<strong>Scan the QR, <a href="xrb:nano_1gur37mt5cawjg5844bmpg8upo4hbgnbbuwcerdobqoeny4ewoqshowfakfo">open in wallet</a><br/> or click the donation address to copy</strong><br/>'+
              '<img class="donation-qr" id="donation" src="#" alt="QR Image"/>'+
              '<div class="form-group">'+
                '<textarea id="shareArea" class="input-large public_link_copy form-control" rows="2" readonly>' + account + '</textarea>'+
              '</div>'+
              '<div class="copied">Succesfully copied to clipboard</div>'+
              '<div class="copied_not">Content could not be copied to clipboard</div>'+
            '</div>';
    var title 	= 'DONATE DEVELOPER';
    $('.modal_title span').html(title);
    $('.modal_content').html(content);
    document.getElementById("donation").src = this.state.donationPath;

    /* Auto select text */
    var textBox = document.getElementById("shareArea");
    textBox.onfocus = function() {
      textBox.select();

      if (document.execCommand("copy")) {
        /* Inform user about copy */
        document.getElementsByClassName("copied")[0].style.display = "block";
      }
      else {
        document.getElementsByClassName("copied_not")[0].style.display = "block";
      }

      // Work around Chrome's little problem
      textBox.onmouseup = function() {
          // Prevent further mouseup intervention
          textBox.onmouseup = null;
          return false;
      };
    };
    return false;
  }

  /* Show donate modal */
  showOwnerModal() {
    $(document).psendmodal();
    var content =  '<div class="public_link_modal">'+
              '<strong>Who is hosting this service?</strong><br/>'+
              'A community manager for the Nano Foundation, moderator of <a href="https://www.reddit.com/r/nanocurrency">/r/nanocurrency</a> / <a href="https://chat.nano.org/">nano discord</a> and creator of some other services like <a href="https://nanolinks.info">Nano Links</a> and <a href="https://github.com/Joohansson/NanoNodeGraphics">Nano Node Graphics</a>.<br/>'+
              '<br/>If you find any bugs or have feedback, please don\'t hesitate to contact me at reddit or discord! You find me under alias Joohansson or Json.';
    var title 	= 'ABOUT OWNER';
    $('.modal_title span').html(title);
    $('.modal_content').html(content);

    return false;
  }

  selectTheme(eventKey, event) {
    this.setState({ activeThemeId: eventKey });
    this.setState({ activeTheme: Themes[eventKey] });
  }

  /* Generate wallet account and seed, update QR */
  generateNewWallet(event, seed=false) {
    try {
      const wallet = new Wallet();
      wallet.createWallet(seed);
      var account = wallet.getAccounts().pop()['account']
      //replace xrb_ with nano_
      account = account.replace("xrb","nano");
      this.setState({
        seed: wallet.getSeed(),
        account: account
      });
    }
    catch (error) {
      this.setState({
        seed: 'Invalid Seed',
        account: 'Invalid Account'
      });
    }
  }

  /* Update seed (not used) */
  handleSeedChange(event) {
    this.generateNewWallet(event, event.target.value);
  }

  /* Print card */
  print(event) {
    var node = document.getElementsByClassName('card-area')[0];
    var width =  document.body.clientWidth;
    domtoimage.toPng(node, {
      width: 6408,
      height: 4528,
      style: {
        'transform': 'scale(8)',
        'transform-origin': Math.round((width-800)/14)+'px 0', //The 14 is purely trial and error
      }
    }).then(function (dataUrl) {
          var sprite = new Image();
          sprite.onload = function () {
            this.setState({ paperWalletImageData: dataUrl });
            window.print();
          }.bind(this);
          sprite.src = dataUrl;
      }.bind(this))
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
  }

  /* Download card */
  download(event) {
    var node = document.getElementsByClassName('card-area')[0];
    var width =  document.body.clientWidth;
    console.log(width)
    domtoimage.toPng(node, {
      width: 6408,
      height: 4528,
      style: {
        'transform': 'scale(8)',
        'transform-origin': Math.round((width-800)/14)+'px 0', //The 14 is purely trial and error
      }
    }).then(function (dataUrl) {
        //var link = document.createElement('a');
        //link.download = 'nanogift.png';
        //link.href = dataUrl;
        //link.click();
        /* Filesaver has better cross browser support */
        saveAs(dataUrl, "nanogift.png");
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
  }

  /* Show/hide how to section */
  collapse() {
    var content = document.getElementsByClassName("collapse-content")[0];
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  render() {
    const { validated } = this.state;
    return (
      <div className="App">
        <header className="App-header noprint">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div className="noprint remove">
          <Button variant="primary" onClick={this.collapse} className="first-btn">How to use</Button>
          <div className="collapse-content">
              <strong>The seed is not stored but for increased security you can download <a href="https://github.com/Joohansson/nano-giftcard/raw/master/nano-paper-wallet.zip">this zip</a>, disconnect your internet connection, extract the zip and open index.html in an safe OS environment. <br /></strong>
              <br />
              <ol>
                  <li>Press "Generate new Seed".</li>
                  <li>Send funds to the displayed address with any <a href="https://nanolinks.info/#wallets">Nano Wallet</a>. Scan QR, click QR to copy or click the deep link.</li>
                  <li>Optional: Provide a name and message for the recipient and choose a theme.</li>
                  <li>Print, Download, Share or snapshot the screen. Zoom page 200% for best quality.</li>
                  <li>If making a small card, make sure QR are readable before giving it away!</li>
                  <li>Check the account status: Transaction arrived and unpocketed and later redeemed with 0 balance left.</li>
              </ol>
            <br />
          </div>

          <div className="style-group">
            <Form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}>
              <Row>
                <Form.Group as={Col} md="4" controlId="validation1">
                  <Form.Control placeholder="Min payment [Nano]" type="text" defaultValue={this.state.valueMin} required/>
                  <Form.Control.Feedback type="invalid">Not a valid number!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validation2">
                  <Form.Control placeholder="Max payment [Nano]" type="text" defaultValue={this.state.valueMax} required/>
                  <Form.Control.Feedback type="invalid">Not a valid number!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Button variant="primary" type="submit">
                    Generate Cards
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        </div>

        <div className="nano-paper-wallet noprint">
          <div className="card-area">
            <div className="card-dummy"></div>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[0]}/>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[1]}/>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[2]}/>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[0]}/>
            <div className="card-dummy"></div>
            <div className="card-dummy"></div>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[0]}/>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[0]}/>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[0]}/>
            <Card theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.cardText[0]}/>
            <div className="card-dummy"></div>
          </div>
        </div>
        <img className="nano-paper-wallet-img hidden print" src={this.state.paperWalletImageData} alt="paper wallet" />

        <div className="noprint print-group remove">
          <Button onClick={this.print} variant="primary" className="print-btn">Print</Button>
          <Button onClick={this.download} variant="primary" className="download-btn">Download</Button>
          <Button onClick={this.showShareModal} variant="primary" className="share-btn">Share</Button>
        </div>

        <div className="extra"></div>

        <footer className="App-footer noprint">
          <span className="link-span" onClick={this.showOwnerModal}>About Owner</span> | <a href="https://github.com/Joohansson/nanogift">Github</a> | <a href="https://nano.org">Nano Home</a> | <a href="https://nanolinks.info">Nano Guide</a> | <span className="link-span" onClick={this.showDonateModal}>Donate me a Cookie</span>
        </footer>
      </div>
    );
  }
}

export default App;
