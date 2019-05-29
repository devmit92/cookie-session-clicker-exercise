import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    clickCount: 0,
    username: ''
  }

  componentDidMount() {
    this.getCount();
    this.getUser();
  }

  handleClick = () => {
    axios.post('/add-click')
      .then(() => this.getCount())
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  getCount = () => {
    axios.get('/get-clicks')
      .then(response => {
        this.setState({
          clickCount: response.data.totalClicks,
        });
      })
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  handleChange = (event) => {
    this.setState({
       username: event.target.value 
      });
  }

  getUser = () => {
    axios.get('/get-username')
      .then(response => {
        console.log(response);
        this.setState({
          username: response.data.username,
        });
      })
      .catch(error => {
        console.log('error posting username', error);
      });
  }

  saveUsername = () => {
    const newUser = { username: this.state.username };
    axios.post('/add-username', newUser)
      .then(() => this.getUser())
      .catch(error => {
        console.log('error posting username', error);
      });
    this.setState({
      usernameIsEditable: false,
    });
  }

  render() {
    let inputToShow;
    if (this.state.usernameIsEditable) {
      inputToShow = <input onChange={this.handleChange} type="text" placeholder="Username" value={this.state.username} data-name="username"/>
    } else {
      inputToShow = <div></div>
    }
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <div>
            {this.state.username}
            <br/>
            {inputToShow}

            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {this.state.usernameIsEditable ?
              <button onClick={this.saveUsername}>Save Username</button> :
              <button onClick={this.editUsername}>Edit Username</button>
            }
          </div>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
