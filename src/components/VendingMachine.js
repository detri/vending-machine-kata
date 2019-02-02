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
    if (display === 'THANK YOU' || display === 'SOLD OUT' || display.startsWith('PRICE')) {
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
      if (productSelected.amt === 0) {
        return this.setState({
          display: 'SOLD OUT'
        });
      }
      if (currentValue >= productSelected.price) {

        productSelected.amt -= 1;
        let coinsToReturn = [];
        if (currentValue > productSelected.price) {
          coinsToReturn = this.returnUnused(productSelected.price, this.state.currentCoins);
        }
        currentValue = 0;
        return this.setState({
          stock: {
            ...this.state.stock,
            [product]: productSelected
          },
          currentValue,
          totalCoins: [...this.state.totalCoins, ...this.state.currentCoins],
          coinReturn: [...this.state.coinReturn, ...coinsToReturn],
          display: 'THANK YOU'
        });
      }
      return this.setState({
        display: `PRICE $${productSelected.price.toFixed(2)}`
      });
    }
    return null;
  }

  determineValue(coinArray) {
    return coinArray.reduce((prev, cur) => prev.value + cur.value);
  }

  returnUnused(value, coinArray) {
    let unusedCoins = [];
    let curValue = 0;
    const coinArrayDesc = coinArray.sort((a, b) => b.value - a.value);
    for (let coin of coinArrayDesc) {
      if (curValue === value) {
        unusedCoins = [...unusedCoins, coin];
      }
      if (curValue + coin.value < value || curValue + coin.value === value) {
        curValue += coin.value;
      }
    }
    return unusedCoins;
  }

  returnCoins() {
    this.setState({
      currentCoins: [],
      coinReturn: [...this.state.coinReturn, ...this.state.currentCoins]
    });
  }

  render() {
    return (
      <div>hello</div>
    );
  }
}
