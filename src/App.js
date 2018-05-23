import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var spadeArray = [];
var diamondArray = [];
var clubsArray = [];
var heartsArray = [];
var positions = {'1': 1,'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'JACK': 11,'QUEEN': 12,'KING': 13,'ACE': 14};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      spades: [],
      hearts: [],
      clubs: [],
      diamonds: []
    }
    this.drawTwo = this.drawTwo.bind(this);
  }

  componentWillMount() {
    axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=0').then(resp => {
      console.log('mounting data', resp.data)
      this.setState({
        data: resp.data
      })
    })
      .catch((err) => {
        console.log(err)
      })
  }

  drawTwo() {

    var timer = setTimeout(this.drawTwo, 500);
    if(this.state.clubs.includes('QUEEN') && this.state.diamonds.includes('QUEEN') && this.state.hearts.includes('QUEEN') && this.state.spades.includes('QUEEN') ) {
      window.alert('Got All The Queens!!!');
      return clearTimeout(timer);
    }
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.data.deck_id}/draw/?count=2`).then(response => {
      console.log('drawing card data', response.data)
      for (var i = 0; i < response.data.cards.length; i++) {
        if (response.data.cards[i].suit === 'SPADES') {
          spadeArray.push(response.data.cards[i].value)
          var sortedSpades = spadeArray.sort(function(a,b){return positions[a] - positions[b]});
          this.setState({
            spades: sortedSpades
          })
        } else if (response.data.cards[i].suit === 'DIAMONDS') {
          diamondArray.push(response.data.cards[i].value)
          var sortedDiamonds = diamondArray.sort(function(a,b){return positions[a] - positions[b]});
          this.setState({
            diamonds: sortedDiamonds
          })
        } else if (response.data.cards[i].suit === 'CLUBS') {
          clubsArray.push(response.data.cards[i].value)
          var sortedClubs = clubsArray.sort(function(a,b){return positions[a] - positions[b]});
          this.setState({
            clubs: sortedClubs
          })
        } else if (response.data.cards[i].suit === 'HEARTS') {
          heartsArray.push(response.data.cards[i].value)
          var sortedHearts = heartsArray.sort(function(a,b){return positions[a] - positions[b]});
          this.setState({
            hearts: sortedHearts
          })
        }
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    if (this.state.data.length !== 0) {
      console.log('state', this.state)
    }
    const listSpades = this.state.spades.map((spadesValue, i) =>
      <div key={i} >{spadesValue},</div>
    )
    const listClubs = this.state.clubs.map((clubsValue, i) =>
      <div key={i} >{clubsValue},</div>
    )
    const listHearts = this.state.hearts.map((heartsValue, i) =>
      <div key={i} >{heartsValue},</div>
    )
    const listDiamonds = this.state.diamonds.map((diamondsValue, i) =>
      <div key={i} >{diamondsValue},</div>
    )
    return (
      <div className="App">
        <h1 className='deck_id' >Deck ID: {this.state.data.deck_id}</h1>
        <button className='button' onClick={this.drawTwo}>Get Cards</button>
        <ul className='ul' >
          <li className='li' ><label className='label' >SPADES: </label>[{listSpades}]</li>
          <li className='li' ><label className='label' >CLUBS: </label>[{listClubs}]</li>
          <li className='li' ><label className='label' >HEARTS: </label>[{listHearts}]</li>
          <li className='li' ><label className='label' >DIAMONDS: </label>[{listDiamonds}]</li>
        </ul>
      </div>
    );
  }
}

export default App;
