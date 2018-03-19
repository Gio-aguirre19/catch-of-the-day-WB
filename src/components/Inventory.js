import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

export default class Inventory extends React.Component{
  static propTypes = {
    fish: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  }

  render(){
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
