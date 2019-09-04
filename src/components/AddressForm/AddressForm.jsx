import React, { Component } from "react";
import AddressSuggest from "../AddressSuggest/AddressSuggest";
import AddressInput from "../AddressInput/AddressInput";
import axios from "axios";
require("dotenv").config();
//Components

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: address,
      query: "",
      locationId: ""
    };

    // User has entered something in address suggest field
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the check button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
  }

  onQuery(evt) {
    const query = evt.target.value;
    if (!query.length > 0) {
      const address = this.getEmptyAddress();
      return this.setState({
        address: address,
        query: "",
        locationId: ""
      });
    }

    const self = this;
    axios
      .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
        params: {
          app_id: process.env.APP_ID_HERE,
          app_code: process.env.APP_CODE_HERE,
          query: query,
          maxresults: 1
        }
      })
      .then(function(response) {
        const address = response.data.suggestions[0].address;
        const id = response.data.suggestions[0].locationId;
        self.setState({
          address: address,
          query: query,
          locationId: id
        });
      });
  }

  render() {
    return (
      <div class='container'>
        <AddressSuggest query={this.state.query} onChange={this.onQuery} />
        <AddressInput
          street={this.state.address.street}
          city={this.state.address.city}
          state={this.state.address.state}
          postalCode={this.state.address.postalCode}
          country={this.state.address.country}
        />
        <br />
        {/* {result} */}
        <button
          type='submit'
          className='btn btn-primary'
          onClick={this.onCheck}>
          Check
        </button>
        <button
          type='submit'
          className='btn btn-outline-secondary'
          onClick={this.onClear}>
          Clear
        </button>
      </div>
    );
  }
}

export default AddressForm;
