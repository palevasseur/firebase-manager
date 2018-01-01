import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios"

const httpDataHeures = 'https://project-3010963349219589577.firebaseio.com/.json';
const httpDataNotes = 'https://notes-6f837.firebaseio.com/.json';

class FirebaseBackup extends Component {

  constructor() {
    super();

    this.state = {
      dataHeures: '',
      dataNotes: ''
    };

    this.handleBackup = this.handleBackup.bind(this);
  }

  handleBackup(e) {
    const self = this;

    axios.get(httpDataHeures)
      .then(function (response) {
        self.setState({
          dataHeures: JSON.stringify(response.data, null, 2)
        });
      })
      .catch(function (error) {
      self.setState({
        dataNotes: JSON.stringify(error.response.data)
      });
    });

    axios.get(httpDataNotes)
      .then(function (response) {
        self.setState({
          dataNotes: JSON.stringify(response.data, null, 2)
        });
      })
      .catch(function (error) {
        self.setState({
          dataNotes: JSON.stringify(error.response.data)
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Projects</h3>
        <div>Heures = {httpDataHeures}</div>
        <pre style={{height:'150px', overflowY: 'auto'}}>{this.state.dataHeures}</pre>
        <br/>
        <div>Notes = {httpDataNotes}</div>
        <pre style={{height:'150px', overflowY: 'auto'}}>{this.state.dataNotes}</pre>
        <br/>
        <button type="button" className="btn btn-outline-dark" onClick={this.handleBackup}>Backup all projects</button>
      </div>
    );
  }
}

export default FirebaseBackup;
