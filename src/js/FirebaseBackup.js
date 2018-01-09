import React, { Component } from "react";

class FirebaseBackup extends Component {

  constructor(params) {
    super();

    this.dbConfig = params.config;
    this.dbName = params.name;
    this.state = {
      data: '',
      result: 'Not launched'
    };

    this.handleBackup = this.handleBackup.bind(this);
  }

  handleBackup(e) {
    var app = firebase.initializeApp(this.dbConfig);
    var auth = firebase.auth();
    var self = this;
    auth.onAuthStateChanged(function (state) {
      console.log('state=', state);
      if(state) {
        self.setState({result: 'Reading data...'});
        let fileName = (new Date()).toISOString().split('T')[0] + ' - sav project ' + self.dbName + '.json';

        // get root data ref
        var rootRef = firebase.database().ref();

        // get root value
        rootRef.off(); // ensure no listener
        rootRef.on('value', function(data) {
          console.log('data=', data.val());
          self.setState({result: 'Saving backup...'});
          self.setState({data: JSON.stringify(data.val(), null, 2)});

          // save backup file (will overwrite if same name exist)
          var storageRef = firebase.storage().ref();
          var testRef = storageRef.child(fileName);
          testRef.putString(JSON.stringify(data.val(), null, 2)).then(function(snapshot) {
            if(snapshot.state === 'success') {
              self.setState({result: 'Created new backup "' + fileName + '"'});
            }
            else {
              self.setState({result: 'Backup failed !'});
            }

            // disconnect db
            app.delete()
              .then(function() {
                console.log("App deleted successfully");
              })
              .catch(function(error) {
                console.log("Error deleting app:", error);
              });
          });
        });
      }
      else {
        self.setState({result: 'Not logged, logging...'});
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
    });

  }

  render() {
    return (
      <div>
        <h4>{this.dbName}</h4>
        <button type="button" className="btn btn-outline-dark" onClick={this.handleBackup}>Backup data</button>
        <br/>
        Status: {this.state.result}
        <pre style={{height:'150px', overflowY: 'auto'}}>{this.state.data}</pre>
      </div>
    );
  }
}

export default FirebaseBackup;
