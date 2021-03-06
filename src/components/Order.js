import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

export default class Order extends React.Component{
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  // Loop through each order
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const orderItemAnimation = {
      classNames: "order",
      key: key,
      timeout: {enter: 250, exit: 250}
    }
    if(!fish) return null;
    if (!isAvailable){
      return (
        <CSSTransition {...orderItemAnimation}>
          <li key={key}>
            Sorry {fish ? fish.name : 'this fish'} is not available
          </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...orderItemAnimation}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{enter: 250, exit: 250}}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
          </span>
          <button onClick={() => this.props.removeFromOrder(key)}>X</button>
        </li>
      </CSSTransition>
    )
  }
  render(){
    const orderIDs = Object.keys(this.props.order);
    const total = orderIDs.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if(isAvailable){
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);

    return(
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component='ul' className="order">
          {orderIDs.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">Total: <strong>{formatPrice(total)}</strong></div>
      </div>
    )
  }
}
