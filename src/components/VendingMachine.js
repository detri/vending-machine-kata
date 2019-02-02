import React, { Component } from 'react';
import { Coin } from '../utils/enums';
import {
  MachineHousing
} from './Styling';

export default class VendingMachine extends Component {
  state = {
    display: 'EXACT CHANGE ONLY',

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
        : this.canMakeChange() ?
          'INSERT COIN'
          : 'EXACT CHANGE ONLY';
      this.setState({
        display: newDisplay
      });
    }
    return display;
  }

  // detect coin type based on weight and size
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
        if (currentValue > productSelected.price) {
          this.setState({
            totalCoins: [...this.state.totalCoins, ...this.state.currentCoins]
          }, () => {
            const change = this.makeChange(this.state.totalCoins, productSelected.price, currentValue);
            if (change) {
              this.setState({
                totalCoins: change[0],
                coinReturn: [...this.state.coinReturn, ...change[1]]
              });
            }
          });
        } else {
          this.setState({
            totalCoins: [...this.state.totalCoins, ...this.state.currentCoins]
          });
        }
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

  determineValue(coinArray) {
    return coinArray.reduce((prev, cur) => prev.value + cur.value);
  }

  // make change for a specific price
  // returns [newTotalCoins, unusedCoins]
  // or false if it can't make change
  makeChange(coins, price, amtInserted) {
    // check to see if we have coins
    if (!coins.length) {
      return false;
    }
    // set up coins to return
    let coinsToReturn = [];
    // this is how much change we need to make
    let amtToMatch = amtInserted - price;
    // try to make change
    let curAmt = 0;
    for (let coin of coins) {
      if (curAmt + coin.value < amtToMatch || curAmt + coin.value === amtToMatch) {
        curAmt += coin.value;
        coinsToReturn = [...coinsToReturn, coin];
        coins.splice(coins.indexOf(coin), 1);
      }
      if (curAmt === amtToMatch) {
        break;
      }
    }
    if (curAmt !== amtToMatch) {
      return false;
    }
    return [coins, coinsToReturn];
  }

  // see if we can make change for any of our products
  canMakeChange() {
    const stock = this.state.stock;
    let canMakeChange = false;
    for (let product in stock) {
      let change = this.makeChange(this.state.totalCoins, stock[product].price, 1);
      if (change) {
        canMakeChange = true;
      }
    }
    return canMakeChange;
  }

  // return all inserted coins
  returnCoins() {
    this.setState({
      currentCoins: [],
      coinReturn: [...this.state.coinReturn, ...this.state.currentCoins]
    });
  }

  render() {
    return (
      <MachineHousing>
        test
      </MachineHousing>
    );
  }
}
