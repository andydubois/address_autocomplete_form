import React, { Component } from "react";

//Components
import AddressSuggest from "../AddressSuggest/AddressSuggest";
import AddressInput from "../AddressInput/AddressInput";

class AddressForm extends Component {
  constructor(props) {
    super(props);

    const address = this.getEmptyAddress();
    this.state = {
      address: address,
      query: "",
      locationId: ""
    };

    this.onQuery = this.onQuery.bind(this);
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
          app_id: APP_ID_HERE,
          app_code: APP_CODE_HERE,
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
      <div className='container'>
        <AddressSuggest />
        query="4168 S" />
        <AddressInput
          street='4168 Shattuck Ave'
          city='Berkeley'
          state='CA'
          code='94704'
          country='USA'
        />
        <br />
        <button type='submit' className='btn btn-primary'>
          Check
        </button>
        <button type='submit' className='btn btn-outline-secondary'>
          Clear
        </button>
      </div>
    );
  }
}

export default AddressForm;
