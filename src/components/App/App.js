import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import AddressForm from "../AddressForm/AddressForm"

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddressForm />
      </div>
    );
  }
}

export default App;
