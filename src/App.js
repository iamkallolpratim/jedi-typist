import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      secondsElapsed: 30, 
      isOn :false,
      isOver : false,
      paragraph : 'The quick brown fox jumps over the lazy dog',
      typingWords : null,
      correctMarks : 0,
      wrongMarks : 0
    };
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      isOn:true,
      typingWords : e.target.value
    });
    if(!this.state.isOn){
      this.startTimer();
    }
  }

  startTimer = () => {
    this.incrementer = setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed - 1,
      })
    , 1000);
  }

  clearTime = () => {
    this.setState({
      secondsElapsed: 60,
      isOn : false,
      isOver : true
    })
    this.showScore()
  }

  showScore = () => {
  
    let chars = this.state.paragraph.split(' ');
    let typingChars = this.state.typingWords.split(' ')
    console.log(typingChars);

    const wrightWords = typingChars.filter(element => chars.includes(element));
    const wrongWords = typingChars.filter(element => !chars.includes(element));
    this.setState({
      correctMarks : parseInt(wrightWords.length*10),
      wrongMarks : parseInt(wrongWords.length*10)
    })

    
  }



  resetGame = () => {
    window.location.reload();
  }


  

  render() {
    return (
      <React.Fragment>
        <div className="flex-container">
            {
              !this.state.isOver ? 
              <div>
                  <div className="flex-item">
              <h1 style={{textAlign:'center'}}>{this.state.secondsElapsed !== 0 ? <span style={{color:'red'}}>{this.state.secondsElapsed}</span> : this.clearTime()} S</h1>
              <p className="para">
                {this.state.paragraph}
              </p>
              <textarea className="textarea" rows="5" onChange={this.handleChange} placeholder="type the above sentence"></textarea>
            </div>
              </div>
              :
              <div className="flex-item">
                <h2>Total Marks = {this.state.paragraph.split(' ').length*10}</h2>
                <h2>Right Marks = <span style={{color : '#4CAF50'}}>{this.state.correctMarks}</span></h2>
                <h2>Wrong Marks = - <span style={{color : '#E53935'}}>{this.state.wrongMarks}</span></h2>
                <button className="btn" onClick={this.resetGame}>reset</button>
              </div>
            }
        </div>
      </React.Fragment>
    );
  }
}

export default App;
