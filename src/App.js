import React, { Component } from 'react'
import { Dropdown, DropdownButton, Button, Form, Row, Col } from 'react-bootstrap'
import './App.css'
import './print.css'
import { Card, CardTypes } from './card'
import { saveAs } from 'file-saver'
import { Wallet } from 'rai-wallet'
import domtoimage from 'dom-to-image'
import $ from 'jquery'
import bigInt from 'big-integer'
import ReactGA from 'react-ga'

import logo from './img/logo.png'
import donation from './img/donation.png'
import backside_w from './img/backside_w.png'
import backside_b from './img/backside_b.png'

class App extends Component {

  constructor(props) {
    super(props);

    this.themes = ['Dark', 'Light', 'Pro Dark', 'Pro Light']
    this.instructionTxt = 'Instructions'
    this.backTxt = 'Back'
    this.sheets = ['1', '2', '3', '4', '5', '6', '7', this.backTxt, this.instructionTxt]
    this.cardTextsPay = [
      'A ninja cracked your wallet',
      'A bear market making you do strange things',
      'Mobile crashed and the seed was not backed up',
      'You made a purchase from an online dude who ran away',
      'Buy high and sell low is the way to go',
      'A dog ate your hardware wallet and passphrase',
      'You got social engineered by "a friend"',
      'You sent Nano to wrong address',
      'You forgot to lock your wallet after using a public PC',
      'A neighbour with binoculars stole your private key',
      'You were scammed by an evil person',
      'Someone hit you in NanoQuake',
      'You wrote down the wrong seed',
      'You showed your paper wallet at a party and don\'t remember the rest',
      'You did not save the Nano seed before resetting the wallet',
      'You got a call from "Nano Help Desk" and gave them your seed',
      'A friend borrowed your phone and didn\'t give it back',
      'You sent Nano to the wrong address',
      'You bought a cheap hardware wallet and used the passphrase that came with it',
      'A scammy service forced you to pay high fees',
    ]

    this.cardTextsPayData = [
      'Virus targeting your private keys!',
      'Malicious code infecting your password manager!',
      'Email compromised with 2FA deactivated!',
      'Weak password in a public-facing computer!',
      'A downloaded file containing ransomware!',
      'WiFi router hacked by a neighbour!',
      'A cheap webcam streaming your keystrokes!',
      'A keylogger was placed on your USB cable!',
    ]

    this.cardSheets =
    [
      //Manual Dark theme
      [
        [
          this.getCardByName("Payout_b"), this.getCardByName("Pay_data_b"), this.getCardByName("Pay_data_b"), this.getCardByName("Pay_data_b"),
          this.getCardByName("Pay_data_b"), this.getCardByName("Pay_data_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"),
        ],
        [
          this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"),
          this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"),
        ],
        [
          this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"),
          this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Pay_b"),
        ],
        [
          this.getCardByName("Pay_b"), this.getCardByName("Pay_b"), this.getCardByName("Hacker_b"), this.getCardByName("Hacker_b"),
          this.getCardByName("Hacker_b"), this.getCardByName("Hacker_b"), this.getCardByName("Hacker_b"), this.getCardByName("Hacker_b"),
        ],
        [
          this.getCardByName("Hacker_b"), this.getCardByName("Hacker_b"), this.getCardByName("Hacker_b"), this.getCardByName("Firewall_b"),
          this.getCardByName("Firewall_b"), this.getCardByName("Firewall_b"), this.getCardByName("Firewall_b"), this.getCardByName("Firewall_b"),
        ],
        [
          this.getCardByName("Practise_b"), this.getCardByName("Practise_b"), this.getCardByName("Practise_b"), this.getCardByName("Practise_b"),
          this.getCardByName("Practise_b"), this.getCardByName("Double_b"), this.getCardByName("Double_b"), this.getCardByName("Double_b"),
        ],
        [
          this.getCardByName("Double_b"), this.getCardByName("Double_b"), this.getCardByName("Disconnected_b"), this.getCardByName("Disconnected_b"),
          this.getCardByName("Disconnected_b"), this.getCardByName("Disconnected_b"), this.getCardByName("Disconnected_b"), this.getCardByName("Dummy"),
        ]
      ],

      //Manual Light theme
      [
        [
          this.getCardByName("Payout_w"), this.getCardByName("Pay_data_w"), this.getCardByName("Pay_data_w"), this.getCardByName("Pay_data_w"),
          this.getCardByName("Pay_data_w"), this.getCardByName("Pay_data_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"),
        ],
        [
          this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"),
          this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"),
        ],
        [
          this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"),
          this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Pay_w"),
        ],
        [
          this.getCardByName("Pay_w"), this.getCardByName("Pay_w"), this.getCardByName("Hacker_w"), this.getCardByName("Hacker_w"),
          this.getCardByName("Hacker_w"), this.getCardByName("Hacker_w"), this.getCardByName("Hacker_w"), this.getCardByName("Hacker_w"),
        ],
        [
          this.getCardByName("Hacker_w"), this.getCardByName("Hacker_w"), this.getCardByName("Hacker_w"), this.getCardByName("Firewall_w"),
          this.getCardByName("Firewall_w"), this.getCardByName("Firewall_w"), this.getCardByName("Firewall_w"), this.getCardByName("Firewall_w"),
        ],
        [
          this.getCardByName("Practise_w"), this.getCardByName("Practise_w"), this.getCardByName("Practise_w"), this.getCardByName("Practise_w"),
          this.getCardByName("Practise_w"), this.getCardByName("Double_w"), this.getCardByName("Double_w"), this.getCardByName("Double_w"),
        ],
        [
          this.getCardByName("Double_w"), this.getCardByName("Double_w"), this.getCardByName("Disconnected_w"), this.getCardByName("Disconnected_w"),
          this.getCardByName("Disconnected_w"), this.getCardByName("Disconnected_w"), this.getCardByName("Disconnected_w"), this.getCardByName("Dummy"),
        ]
      ],

      //Pro Dark theme
      [
        [
          this.getCardByName("Payout_b_pro"), this.getCardByName("Pay_data_b_pro"), this.getCardByName("Pay_data_b_pro"), this.getCardByName("Pay_data_b_pro"),
          this.getCardByName("Pay_data_b_pro"), this.getCardByName("Pay_data_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"),
        ],
        [
          this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"),
          this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"),
        ],
        [
          this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"),
          this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"),
        ],
        [
          this.getCardByName("Pay_b_pro"), this.getCardByName("Pay_b_pro"), this.getCardByName("Hacker_b_pro"), this.getCardByName("Hacker_b_pro"),
          this.getCardByName("Hacker_b_pro"), this.getCardByName("Hacker_b_pro"), this.getCardByName("Hacker_b_pro"), this.getCardByName("Hacker_b_pro"),
        ],
        [
          this.getCardByName("Hacker_b_pro"), this.getCardByName("Hacker_b_pro"), this.getCardByName("Hacker_b_pro"), this.getCardByName("Firewall_b_pro"),
          this.getCardByName("Firewall_b_pro"), this.getCardByName("Firewall_b_pro"), this.getCardByName("Firewall_b_pro"), this.getCardByName("Firewall_b_pro"),
        ],
        [
          this.getCardByName("Practise_b_pro"), this.getCardByName("Practise_b_pro"), this.getCardByName("Practise_b_pro"), this.getCardByName("Practise_b_pro"),
          this.getCardByName("Practise_b_pro"), this.getCardByName("Double_b_pro"), this.getCardByName("Double_b_pro"), this.getCardByName("Double_b_pro"),
        ],
        [
          this.getCardByName("Double_b_pro"), this.getCardByName("Double_b_pro"), this.getCardByName("Disconnected_b_pro"), this.getCardByName("Disconnected_b_pro"),
          this.getCardByName("Disconnected_b_pro"), this.getCardByName("Disconnected_b_pro"), this.getCardByName("Disconnected_b_pro"), this.getCardByName("Dummy"),
        ]
      ],

      //Pro Light theme
      [
        [
          this.getCardByName("Payout_w_pro"), this.getCardByName("Pay_data_w_pro"), this.getCardByName("Pay_data_w_pro"), this.getCardByName("Pay_data_w_pro"),
          this.getCardByName("Pay_data_w_pro"), this.getCardByName("Pay_data_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"),
        ],
        [
          this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"),
          this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"),
        ],
        [
          this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"),
          this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"),
        ],
        [
          this.getCardByName("Pay_w_pro"), this.getCardByName("Pay_w_pro"), this.getCardByName("Hacker_w_pro"), this.getCardByName("Hacker_w_pro"),
          this.getCardByName("Hacker_w_pro"), this.getCardByName("Hacker_w_pro"), this.getCardByName("Hacker_w_pro"), this.getCardByName("Hacker_w_pro"),
        ],
        [
          this.getCardByName("Hacker_w_pro"), this.getCardByName("Hacker_w_pro"), this.getCardByName("Hacker_w_pro"), this.getCardByName("Firewall_w_pro"),
          this.getCardByName("Firewall_w_pro"), this.getCardByName("Firewall_w_pro"), this.getCardByName("Firewall_w_pro"), this.getCardByName("Firewall_w_pro"),
        ],
        [
          this.getCardByName("Practise_w_pro"), this.getCardByName("Practise_w_pro"), this.getCardByName("Practise_w_pro"), this.getCardByName("Practise_w_pro"),
          this.getCardByName("Practise_w_pro"), this.getCardByName("Double_w_pro"), this.getCardByName("Double_w_pro"), this.getCardByName("Double_w_pro"),
        ],
        [
          this.getCardByName("Double_w_pro"), this.getCardByName("Double_w_pro"), this.getCardByName("Disconnected_w_pro"), this.getCardByName("Disconnected_w_pro"),
          this.getCardByName("Disconnected_w_pro"), this.getCardByName("Disconnected_w_pro"), this.getCardByName("Disconnected_w_pro"), this.getCardByName("Dummy"),
        ]
      ]
    ]

    this.backsides = [
      backside_b,
      backside_w,
      backside_b,
      backside_w
    ]

    this.valueMin = '0.01'
    this.valueMax = '0.1'

    this.randomPayments = this.randomizePayments(this.valueMin,this.valueMax)

    this.state = {
      validated: false,
      seed: '',
      account: '',
      activeTheme: this.themes[0],
      activeThemeId: 0,
      activeCardTypes: this.cardSheets[0][0],
      activeCardTexts: [],
      activeSheet: this.sheets[0],
      activeSheetId: '0',
      activePayments: [0,0,0,0,0,0,0,0],
      cardImageData: '',
      valueMin: this.valueMin,
      valueMax: this.valueMax,
      valueMaxLength: 10,
      donationPath: donation,
      isInstructionVisible: false, //if the instruction sheet is visible
      isBacksideVisible: false, //if the backside sheet is visible
      activeBackside: this.backsides[0], //theme controlled backside sheet
    };

    this.componentDidMount = this.componentDidMount.bind(this)
    this.print = this.print.bind(this)
    this.showDonateModal = this.showDonateModal.bind(this)
    this.selectTheme = this.selectTheme.bind(this)
    this.selectSheet = this.selectSheet.bind(this)
    this.handleSeedChange = this.handleSeedChange.bind(this)
    this.generateNewWallet = this.generateNewWallet.bind(this)
    this.getRandomPayment = this.getRandomPayment.bind(this)
    this.randomizePayments = this.randomizePayments.bind(this)
    this.download = this.download.bind(this)
    this.print = this.print.bind(this)

    this.gameIntro = '<h6><strong>What are Nano Cards and why should I play it?<br /></strong></h6>'+
    '<ul>'+
      '<li>A free printable card game where you pay/win Nano (a feeless cryptocurrency) to/from a unique mutual account</li>'+
      '<li>By choosing clever cards you will make your friends pay</li>'+
      '<li>The winner will receive the full pot in each game</li>'+
      '<li>It\'s a fun and educational alternative to physical money and by using a feeless and fast cryptocurrency it allows you to play with very small or very large amounts. Also with a <a href="https://nanocrawler.cc/">public ledger</a> for full payment history. No more need for pennies!</li>'+
    '</ul>'

    this.cardPrepare = '<h6><strong>Prepare the cards<br /></strong></h6>'+
    '<ol>'+
      '<li>Input a custom min/max Nano penalty (randomized per card for each QR)</li>'+
      '<li>Optionally hit "Generate Cards" to randomize a Nano seed, payment account and penalty amounts</li>'+
      '<li>If you want to print another copy of your deck, you can also paste in a Nano seed</li>'+
      '<li><strong>No keys are ever stored anywhere but if you want optimal safety you can <a href="https://github.com/Joohansson/nanocards/raw/master/nanocards.zip">download this zip</a> and run the site locally (no web server needed). Or just plug the cable before you hit Generate.</strong></li>'+
    '</ol>'+
    '<h6><strong>How to print the cards yourself for free<br /></strong></h6>'+
    '<ol>'+
      '<li>Choose a Theme (not pro)</li>'+
      '<li>Best result: Print A4 landscape, thick glossy paper, small margins. Downloaded images gives correct size at 548 DPI.</li>'+
      '<li>Download images or directly print each of the 7 sheets (plus optional back and instruction sheets)</li>'+
      '<li>Back side: Print all sheets, flip the pages and feed back into the printer and print the back side</li>'+
      '<li>Cut the cards with a razor blade and ruler. Frame first to minimize number of cuts.</li>'+
    '</ol>'+
    '<h6><strong>How to order a professional card deck (no cutting needed)<br /></strong></h6>'+
    '<ol>'+
      '<li>Choose a "Pro" Theme. The cards are safe zone compensated.</li>'+
      '<li>Download all 7 sheets plus the back side</li>'+
      '<li>Download this script for converting the cards. <a href="https://github.com/Joohansson/nanocards/tree/master/scripts/cut.bat">Windows</a> or <a href="https://github.com/Joohansson/nanocards/tree/master/scripts/cut.sh">Linux/Mac</a><br />If not printing from makeplayingcards.com you may want to skip the safe zone by using the <a href="https://github.com/Joohansson/nanocards/tree/master/scripts/">other scripts</a>.</li>'+
      '<li>Install <a href="https://imagemagick.org/script/download.php">Imagemagic</a> for your OS (needed for the script). Ubuntu: "sudo apt install imagemagick"</li>'+
      '<li>Copy the script to the folder where you downloaded the images.<br />Windows: Run the bat file | Linux/Mac: Make the script executable (chmod +x cut.sh) and run it (./cut.sh)</li>'+
      '<li>It will cut out all 56 cards including the back side card.<br /><strong>WARNING:</strong> You may not want to send the Nano seed QR to a third party as they could potentially take all nano you are playing with. As a safe option, a card_1_01_safe.png is also created as an alternative to the PAYOUT card. It\'s suggestion you send this instead and print and glue the original QR on the real card later.</li>'+
      '<li>Go to <a href="https://www.makeplayingcards.com/design/bridge-size-blank-card-4332.html">this card printing service</a></li>'+
      '<li>Default options are fine but more luxury is possible. Choose 72 cards if you want to include all 56 cards.</li>'+
      '<li>Select "Different images" as front</li>'+
      '<li>Upload all 56 pictures at once. Then drag and drop each card in order.</li>'+
      '<li>Skip the text option and do the same for back side but "same image" and upload the "card_back.png".</li>'+
      '<li>You should now have created the full deck! You could make a double deck as well with the same or a different Nano seed.</li>'+
    '</ol>'

    this.playInstructions = '<h6><strong>How to Play<br /></strong></h6>'+
    '<ol>'+
      '<li>A wallet that can both pay and receive Nano by QR is required like <a href="https://natrium.io/">Natrium</a></li>'+
      '<li>If more than 6 players, two (or more) decks of cards are recommended (same or different set)</li>'+
      '<li>Shuffle and give 5 cards to each player face down. Remaining stack on table face down</li>'+
      '<li>Each player (in sequence) will play one card from hand (face up on table) and take new card(s) from the stack</li>'+
      '<li>The next player will pay the QR shown on the card, unless it\'s one of the other cards mentioned below</li>'+
      '<li>The game is over and can reset when the PAYOUT card(s) has been claimed and winner take all Nano!</li>'+
    '</ol>'+
    '<h6><strong>Card Index<br /></strong></h6>'+
    '<ul>'+
      '<li><strong>PAYOUT (Dashed frame):</strong> The owner scan to sweep full amount (Natrium: "Load from paper wallet"). GAME OVER.</li>'+
      '<li><strong>EVENT (Single frame):</strong> The next player send the amount encoded in the QR. Can be blocked with a BEST PRACTISE.</li>'+
      '<li><strong>DATA BREACH (Double frame):</strong> The next player send the amount encoded in the QR. Can be blocked with a FIREWALL.</li>'+
      '<li><strong>HACKER:</strong><br />1. Choose a card to steal from an opponent (who will then take a new card from the stack)<br />2a. Chose an opponent to pay one of your EVENT or DATA BREACH cards (both cards consumed)<br />2b. If the hacker attempt is blocked by a FIREWALL, pay your own card or use another FIREWALL to bounce it back</li>'+
      '<li><strong>FIREWALL:</strong><br />1. Blocks ONE HACKER attempt. If a forced pay: The hacker will now pay that card, if not using another FIREWALL<br />2. Blocks ONE DATA BREACH card that the previous player put on you (both cards destroyed)</li>'+
      '<li><strong>BEST PRACTISE:</strong> Blocks ONE EVENT card that the previous player put on you (both cards destroyed)'+
      '<li><strong>DOUBLE SPEED:<br /></strong> 1. The owner will play two cards of same or different type<br />2. 2x HACKER or DATA BREACH: One FIREWALL is enough. | 2x EVENT: One BEST PRACTISE is enough. <br />3. You can only use ONE DOUBLE SPEED per turn<br />4. Cannot be combined with DISCONNECTED</li>'+
      '<li><strong>DISCONNECTED:</strong> Skips one turn, even if the previous player used double HACKER, EVENT or DATA BREACH on you</li>'+
    '</ul>'+
    '<h6><strong>Extra Rules<br /></strong></h6>'+
    '<ul>'+
      '<li>A card can only be used one time and is always consumed when used.</li>'+
      '<li>PAYOUT can be saved for later to accumulate more Nano, but can also be stolen!</li>'+
      '<li>No player may ever have more than 5 cards on hand. Also no less than 5 if there is still a stack.</li>'+
      '<li>Playing a card that does not have an affect is allowed. Player MUST use at least one card in each turn.</li>'+
      '<li>If the stack is empty: Players will start consume their cards on hand until someone use the PAYOUT.</li>'+
      '<li>If using several decks with different seed & account: All PAYOUTS must be used before reset.</li>'+
    '</ul>'
  }

  componentDidMount() {
    //Init Google analytics
    ReactGA.initialize('UA-113887773-7');
    ReactGA.pageview('/homepage');

    this.generateNewWallet();

    //Set initial card texts and payment amounts
    this.shuffle(this.cardTextsPay)
    this.shuffle(this.cardTextsPayData)
    this.setState({
      activeCardTexts: ['',this.cardTextsPayData[0],this.cardTextsPayData[1],this.cardTextsPayData[2],this.cardTextsPayData[3],this.cardTextsPayData[4],this.cardTextsPay[0],this.cardTextsPay[1]],
      activePayments: ['0',this.nanoToRaw(this.valueMax),this.nanoToRaw(this.valueMax),this.nanoToRaw(this.valueMax),
      this.nanoToRaw(this.valueMax),this.nanoToRaw(this.valueMax),this.randomPayments[0],this.randomPayments[1]]
    })

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

   /* Action when generate new cards */
  handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget;

    //Check if valid integer
    if (form.checkValidity() === false) {
      event.stopPropagation()
      return
    }
    let min = form.minVal.value
    let max = form.maxVal.value

    if (isNaN(min) || isNaN(max)) {
      alert("Not valid number")
      event.stopPropagation()
      this.setState({
        validated: false
      })
      return
    }

    if (min > max) {
      alert("Max must be larger than Min")
      event.stopPropagation()
      this.setState({
        validated: false
      })
      return
    }

    if (min < 0.000001) {
      alert("Smallest payment amount 0.000001")
      event.stopPropagation()
      this.setState({
        validated: false
      })
      return
    }

    this.setState({
      validated: true,
      valueMin: form.minVal.value,
      valueMax: form.maxVal.value
     })

    this.generateNewWallet(form.minVal.value, form.maxVal.value, false)
  }

  /* Shuffle a given array */
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

  /* Calculate random payment [in raw string] based on min and max values */
  getRandomPayment(min,max) {
    let nano = bigInt(Math.floor((Math.random() * (parseFloat(max) - parseFloat(min)) + parseFloat(min))*1000000)) //round to 1 million to get max 6 decimals
    let raw = nano.times('1000000000000000000000000').toString()
    return raw
  }

  /* Return array of randomized values */
  randomizePayments(min,max) {
    return [
      this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),
      this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),
      this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),
      this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),
      this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),this.getRandomPayment(min,max),
    ]
  }

  /* Get raw amount [string] from Mnano */
  nanoToRaw(nano) {
    let mnano = nano*1000000
    return bigInt(parseFloat(mnano)).times('1000000000000000000000000').toString()
  }

  /* Get qr content for nano payment */
  getQrPayment(account,raw) {
    return "nano:" + account + "?amount=" + raw
  }

  /* Get a card type by name */
  getCardByName(name) {
    var card = {}
    $.each(CardTypes, function (index, value) {
      if(value.name === name) {
        card = value
        return false
      }
    });
    return card
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
              'A community manager for the Nano Foundation, moderator of <a href="https://www.reddit.com/r/nanocurrency">/r/nanocurrency</a> / <a href="https://chat.nano.org/">nano discord</a> and creator of some other services like <a href="https://nanolinks.info">Nano Links</a>, <a href="https://nanogift.me/">NanoGift</a> and <a href="https://github.com/Joohansson/NanoNodeGraphics">Nano Node Graphics</a>.<br/>'+
              '<br/>If you find any bugs or have feedback, please don\'t hesitate to contact me at reddit or discord! You find me under alias Joohansson or Json.';
    var title 	= 'ABOUT OWNER';
    $('.modal_title span').html(title);
    $('.modal_content').html(content);

    return false;
  }

  selectTheme(eventKey, event) {
    this.setState({
      activeThemeId: eventKey,
      activeTheme: this.themes[eventKey],
      activeBackside: this.backsides[eventKey]
    })
    //update card theme
    if (this.state.activeSheet !== this.backTxt && this.state.activeSheet !== this.instructionTxt) {
      this.setState({
          activeCardTypes: this.cardSheets[eventKey][this.state.activeSheetId]
      })
    }
  }

  selectSheet(eventKey, event) {
    this.setState({
      activeSheetId: eventKey,
      activeSheet: this.sheets[eventKey],
    })
    //update visibility of instruction content
    if (this.sheets[eventKey] === this.instructionTxt) {
      this.setState({
        isBacksideVisible: false,
        isInstructionVisible: true,
      })
    }
    //update visibility of backside content
    else if (this.sheets[eventKey] === this.backTxt) {
      this.setState({
        isInstructionVisible: false,
        isBacksideVisible: true,
      })
    }
    else {
      this.setState({
        activeCardTypes: this.cardSheets[this.state.activeThemeId][eventKey],
        isInstructionVisible: false,
        isBacksideVisible: false,
      })
      this.updateCardContent(eventKey)
    }
  }

  /* Update the content on the cards */
  updateCardContent(eventKey) {
    switch (eventKey) {
      case '0':
        this.setState({
          activeCardTexts: ['',this.cardTextsPayData[0],this.cardTextsPayData[1],this.cardTextsPayData[2],
          this.cardTextsPayData[3],this.cardTextsPayData[4],this.cardTextsPay[0],this.cardTextsPay[1]],
          activePayments: ['0',this.nanoToRaw(this.valueMax),this.nanoToRaw(this.valueMax),this.nanoToRaw(this.valueMax),
          this.nanoToRaw(this.valueMax),this.nanoToRaw(this.valueMax),this.randomPayments[0],this.randomPayments[1]]
        });
        break
      case '1':
        this.setState({
          activeCardTexts: [this.cardTextsPay[2],this.cardTextsPay[3],this.cardTextsPay[4],this.cardTextsPay[5],
          this.cardTextsPay[6],this.cardTextsPay[7],this.cardTextsPay[8],this.cardTextsPay[9]],
          activePayments: [this.randomPayments[2],this.randomPayments[3],this.randomPayments[4],this.randomPayments[5],
          this.randomPayments[6],this.randomPayments[7],this.randomPayments[8],this.randomPayments[9]]
        });
        break
      case '2':
        this.setState({
          activeCardTexts: [this.cardTextsPay[10],this.cardTextsPay[11],this.cardTextsPay[12],this.cardTextsPay[13],
          this.cardTextsPay[14],this.cardTextsPay[15],this.cardTextsPay[16],this.cardTextsPay[17]],
          activePayments: [this.randomPayments[10],this.randomPayments[11],this.randomPayments[12],this.randomPayments[13],
          this.randomPayments[14],this.randomPayments[15],this.randomPayments[16],this.randomPayments[17]]
        });
        break
      case '3':
        this.setState({
          activeCardTexts: [this.cardTextsPay[18],this.cardTextsPay[19],"","","","","",""],
          activePayments: [this.randomPayments[18],this.randomPayments[19],"","","","","",""]
        });
        break
      case '4':
        this.setState({
          activeCardTexts: ["","","","","","","",""],
          activePayments: ["","","","","","","",""]
        });
        break
      case '5':
        this.setState({
          activeCardTexts: ["","","","","","","",""],
          activePayments: ["","","","","","","",""]
        });
        break
      case '6':
        this.setState({
          activeCardTexts: ["","","","","","","",""],
          activePayments: ["","","","","","","",""]
        });
        break
      default:
        this.setState({
          activeCardTexts: ["","","","","","","",""],
          activePayments: ["","","","","","","",""]
        });
        break
    }
  }

  /* Generate wallet account and seed, update QR */
  generateNewWallet(min=this.valueMin, max=this.valueMax, seed=false) {
    //Update payment content
    this.randomPayments = this.randomizePayments(min,max)
    this.updateCardContent(this.state.activeSheetId)

    //Update seed and account
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
    this.generateNewWallet(this.valueMin, this.valueMax, event.target.value);
  }

  /* Print card */
  print(event) {
    var imageWidth = 5144
    var imageHeight = 4056
    var imageCompensateX = -830
    var imageCompensateY = -15
    var node =  null

    if (this.state.isInstructionVisible) {
      node = document.getElementsByClassName('instruction-area')[0];
    }
    else if (this.state.isBacksideVisible) {
      node = document.getElementsByClassName('backside-area')[0];
      imageCompensateX = 637
      imageCompensateY = -6
    }
    else {
      node = document.getElementsByClassName('card-area')[0];
    }

    var width =  document.body.clientWidth;

    domtoimage.toPng(node, {
      width: imageWidth,
      height: imageHeight,
      style: {
        'transform': 'scale(8)',
        'transform-origin': Math.round((width+imageCompensateX)/14)+'px '+ imageCompensateY +'px', //The 14 is purely trial and error
      }
    }).then(function (dataUrl) {
          var sprite = new Image();
          sprite.onload = function () {
            this.setState({ cardImageData: dataUrl });
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
    var imageWidth = 5144
    var imageHeight = 4056
    var imageCompensateX = -830
    var imageCompensateY = -15
    var node =  null

    if (this.state.isInstructionVisible) {
      node = document.getElementsByClassName('instruction-area')[0];
    }
    else if (this.state.isBacksideVisible) {
      node = document.getElementsByClassName('backside-area')[0];
      imageCompensateX = 637
      imageCompensateY = -6
    }
    else {
      node = document.getElementsByClassName('card-area')[0];
    }

    var width =  document.body.clientWidth;
    domtoimage.toPng(node, {
      width: imageWidth,
      height: imageHeight,
      style: {
        'transform': 'scale(8)',
        'transform-origin': Math.round((width+imageCompensateX)/14)+'px '+ imageCompensateY +'px', //The 14 is purely trial and error
      }
    }).then(function (dataUrl) {
        //var link = document.createElement('a');
        //link.download = 'nanogift.png';
        //link.href = dataUrl;
        //link.click();
        /* Filesaver has better cross browser support */
        saveAs(dataUrl, "nanocard_sheet_" + this.state.activeSheet + ".png");
      }.bind(this))
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

        <div className="noprint">
          <Button variant="primary" onClick={this.collapse} className="first-btn">INTRO & INSTRUCTIONS</Button>
          <div className="collapse-content">
            <div dangerouslySetInnerHTML={{ __html: this.gameIntro }}></div>
            <div className="sectionBreak"></div>
            <div dangerouslySetInnerHTML={{ __html: this.cardPrepare }}></div>
            <div className="sectionBreak"></div>
            <div dangerouslySetInnerHTML={{ __html: this.playInstructions }}></div>
            <br/ >
          </div>

          <div className="style-group">
            <DropdownButton
              title={"Theme - " + this.state.activeTheme}
              key={this.state.activeThemeId}
              id={`dropdown-basic-${this.state.activeThemeId}`}>
              {this.themes.map(function(theme, index){
                return <Dropdown.Item eventKey={index} key={index} onSelect={this.selectTheme}>{theme}</Dropdown.Item>;
              }.bind(this))}
            </DropdownButton>
            <Form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}>
              <Row>
                <Form.Group as={Col} md="4">
                  <Form.Control placeholder="Min pay [Nano]" id="minVal" type="text" defaultValue={this.state.valueMin} title="Min pay [Nano]" required/>
                  <Form.Control.Feedback type="invalid">Please input a number</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Control placeholder="Max pay [Nano]" id="maxVal" type="text" defaultValue={this.state.valueMax} title="Max pay [Nano]" required/>
                  <Form.Control.Feedback type="invalid">Please input a number</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Button variant="primary" type="submit">
                    Generate Cards
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>

          <input type="text" id="seed" className="form-control form-control-sm seed-box" value={this.state.seed} title="Payout Seed - Pasting custom seed allowed" onChange={this.handleSeedChange.bind(this)}/>
        </div>

        <div className="noprint">
          <div className="card-area" style={{display: (this.state.isInstructionVisible || this.state.isBacksideVisible) ? "none":"block"}}>
            <div>
              <Card theme={this.state.activeCardTypes[0]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[0])} msg={this.state.activeCardTexts[0]}/>
              <Card theme={this.state.activeCardTypes[1]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[1])} msg={this.state.activeCardTexts[1]}/>
              <Card theme={this.state.activeCardTypes[2]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[2])} msg={this.state.activeCardTexts[2]}/>
              <Card theme={this.state.activeCardTypes[3]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[3])} msg={this.state.activeCardTexts[3]}/>
            </div>
            <div>
              <Card theme={this.state.activeCardTypes[4]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[4])} msg={this.state.activeCardTexts[4]}/>
              <Card theme={this.state.activeCardTypes[5]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[5])} msg={this.state.activeCardTexts[5]}/>
              <Card theme={this.state.activeCardTypes[6]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[6])} msg={this.state.activeCardTexts[6]}/>
              <Card theme={this.state.activeCardTypes[7]} seed={this.state.seed} payment={this.getQrPayment(this.state.account,this.state.activePayments[7])} msg={this.state.activeCardTexts[7]}/>
              </div>
          </div>
          <div className="instruction-area" style={{display: + this.state.isInstructionVisible ? "block":"none"}}>
            <div dangerouslySetInnerHTML={{ __html: this.playInstructions }}></div>
          </div>
          <div className="backside-area" style={{display: + this.state.isBacksideVisible ? "block":"none"}}>
            <div className="backside-div" style={{
              backgroundImage: 'url(' + this.state.activeBackside + ')',
              backgroundSize: '631px 496px'
            }} ></div>
          </div>
        </div>
        <img className="hidden print" src={this.state.cardImageData} alt="sheet" />

        <div className="noprint">
          <div className="print-group">
            <DropdownButton
              title={"Sheet - " + (this.state.activeSheet)}
              key={this.state.activeSheetId}
              id={`dropdown-basic-${this.state.activeSheetId}`}>
              {this.sheets.map(function(sheet, index){
                return <Dropdown.Item eventKey={index} key={index} onSelect={this.selectSheet}>{sheet}</Dropdown.Item>;
              }.bind(this))}
            </DropdownButton>
            <div className="print-btn-group">
              <Button onClick={this.print} variant="primary" className="print-btn">Print</Button>
              <Button onClick={this.download} variant="primary" className="download-btn">Download</Button>
            </div>
          </div>
        </div>

        <div className="extra"></div>

        <footer className="App-footer noprint">
          <span className="link-span" onClick={this.showOwnerModal}>About Owner</span> | <a href="https://github.com/Joohansson/nanocards">Github</a> | <a href="https://nano.org">Nano Home</a> | <a href="https://nanolinks.info">Nano Guide</a> | <span className="link-span" onClick={this.showDonateModal}>Donate me a Cookie</span>
        </footer>
      </div>
    );
  }
}

export default App;
