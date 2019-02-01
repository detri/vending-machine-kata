import React, { Component } from 'react';
import { Coin } from '../utils/enums';

export default class VendingMachine extends Component {
  state = {
    display: 'INSERT COIN',

    currentValue: 0,

    currentCoins: [],
    totalCoins: [],

    stock: {
      cola: {
        price: 1.00,
        amt: 3
      },
      chips: {
        price: 0.50,
        amt: 3
      },
      candy: {
        price: 0.65,
        amt: 3
      }
    },

    coinReturn: []
  }

  checkDisplay() {
    const display = this.state.display;
    if (display === 'THANK YOU' || display.startsWith('PRICE')) {
      const newDisplay = this.state.currentValue ?
                        `$${this.state.currentValue.toFixed(2)}`
                        : 'INSERT COIN';
      this.setState({
        display: newDisplay
      });
    }
    return display;
  }

  detectCoin(coin) {
    for (let coinEnum in Coin) {
      if (coin.weight === Coin[coinEnum].weight && coin.size === Coin[coinEnum].size) {
        return Coin[coinEnum];
      }
    }
    return null;
  }

  insertCoin(coin) {
    let detectedCoin = this.detectCoin(coin);

    if (detectedCoin) {
      return this.setState({
        currentValue: this.state.currentValue + detectedCoin.value,
        currentCoins: [...this.state.currentCoins, detectedCoin]
      }, () => {
        this.setState({
          display: `$${this.state.currentValue.toFixed(2)}`
        });
      });
    }
    return this.setState({
      coinReturn: [...this.state.coinReturn, coin]
    });
  }

  selectProduct(product) {
    let productSelected = this.state.stock[product];
    let currentValue = this.state.currentValue;
    if (productSelected) {
      productSelected = { ...productSelected };
      if (currentValue >= productSelected.price) {
        productSelected.amt -= 1;
        currentValue = 0;
        return this.setState({
          stock: {
            ...this.state.stock,
            [product]: productSelected
          },
          currentValue,
          display: 'THANK YOU'
        });
      }
      return this.setState({
        display: `PRICE $${productSelected.price.toFixed(2)}`
      });
    }
    return null;
  }

  render() {
    return (
      <div>hello</div>
    );
  }
}
