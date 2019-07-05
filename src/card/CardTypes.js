import pay_w from './bg/pay_w.png'
import pay_b from './bg/pay_b.png'
import disconnected_w from './bg/disconnected_w.png'
import disconnected_b from './bg/disconnected_b.png'
import double_w from './bg/double_w.png'
import double_b from './bg/double_b.png'
import firewall_w from './bg/firewall_w.png'
import firewall_b from './bg/firewall_b.png'
import hacker_w from './bg/hacker_w.png'
import hacker_b from './bg/hacker_b.png'
import pay_data_w from './bg/pay_data_w.png'
import pay_data_b from './bg/pay_data_b.png'
import payout_w from './bg/payout_w.png'
import payout_b from './bg/payout_b.png'

export default [
    {name: 'Pay_w',
      background: pay_w,
      pubDisplay: {display: 'block'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'none'},
      msg: '',
      msgStyle: {color: '#000034', 'fontSize': '10px', 'lineHeight': '10px'}
    },
    {name: 'Pay_b',
      background: pay_b,
      pubDisplay: {display: 'block'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'none'},
      msg: '',
      msgStyle: {color: '#FFFFFF', 'fontSize': '10px', 'lineHeight': '10px'}
    },
    {name: 'Pay_data_w',
      background: pay_data_w,
      pubDisplay: {display: 'block'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'none'},
      msg: '',
      msgStyle: {color: '#000034', 'fontSize': '10px', 'lineHeight': '10px'}
    },
    {name: 'Pay_data_b',
      background: pay_data_b,
      pubDisplay: {display: 'block'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'none'},
      msg: '',
      msgStyle: {color: '#FFFFFF', 'fontSize': '10px', 'lineHeight': '10px'}
    },
    {name: 'Disconnected_w',
      background: disconnected_w,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'DISCONNECTED',
      msgStyle: {color: '#000034', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Disconneted_b',
      background: disconnected_b,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'DISCONNECTED',
      msgStyle: {color: '#FFFFFF', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Double_w',
      background: double_w,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'DOUBLE SPEED',
      msgStyle: {color: '#000034', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Double_b',
      background: double_b,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'DOUBLE SPEED',
      msgStyle: {color: '#FFFFFF', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Firewall_w',
      background: firewall_w,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'FIREWALL ACTIVATED',
      msgStyle: {color: '#000034', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Firewall_b',
      background: firewall_b,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'FIREWALL ACTIVATED',
      msgStyle: {color: '#FFFFFF', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Hacker_w',
      background: hacker_w,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'HACKER CONFIRMED',
      msgStyle: {color: '#000034', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Hacker_b',
      background: hacker_b,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'none'},
      dummyDisplay: {display: 'block'},
      msg: 'HACKER CONFIRMED',
      msgStyle: {color: '#FFFFFF', 'fontSize': '11px', 'lineHeight': '11px'}
    },
    {name: 'Payout_w',
      background: payout_w,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'block'},
      dummyDisplay: {display: 'none'},
      msg: 'PAYOUT',
      msgStyle: {color: '#000034', 'fontSize': '25px', 'lineHeight': '25px', 'top': '-25px'}
    },
    {name: 'Payout_b',
      background: payout_b,
      pubDisplay: {display: 'none'},
      seedDisplay: {display: 'block'},
      dummyDisplay: {display: 'none'},
      msg: 'PAYOUT',
      msgStyle: {color: '#FFFFFF', 'fontSize': '25px', 'lineHeight': '25px', 'top': '-25px'}
    },
];
