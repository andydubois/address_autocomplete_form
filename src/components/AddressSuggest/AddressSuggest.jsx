import React, { Component } from "react";

//Components
import AddressItem from "../AddressItem/AddressItem"

class AddressSuggest extends Component {
  render() {
    return (
      <AddressItem
        label='Address'
        value={this.props.query}
        placeholder='start typing'
      />
    );
  }
}

export default AddressSuggest;
