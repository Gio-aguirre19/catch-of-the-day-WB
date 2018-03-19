import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, {firebaseApp} from '../base'
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

export default class Inventory extends React.Component{
  static propTypes = {
    fish: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  }

  state = {
    uid: null,
    owner: null
  }

  authHandler = async (authData) => {
    // Looking for current store in firebase
    const store = await base.fetch(this.props.storeId, { context: this });
    // Claim store owner
    if (!store.owner) {
      // Save as owner
      await base.post(`${this.props.storeID}/owner`, {
        // Gotten from console.log(authData) (Unique Identifier)
        data: authData.user.uid
      })
      // Set state for current user
      this.setState({
        uid: authData.user.uid,
        owner: store.owner || authData.user.uid
      });
    }
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler) ;
  }

  render(){
    return <Login authenticate={this.authenticate} />
    return(
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(this.props.fish).map(key =>
          <EditFishForm key={key} index={key} fish={this.props.fish[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} />)
        }
        {/* Passing prop "addfish" from parent element to form component */}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Fish Samples</button>
      </div>
    )
  }
}
