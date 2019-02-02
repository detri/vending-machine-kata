import React from 'react';
import TestRenderer from 'react-test-renderer';
import VendingMachine from '../VendingMachine';
import { Size, Weight, Coin } from '../../utils/enums';

describe('Accept Coins', () => {
  const testRenderer = TestRenderer.create(<VendingMachine />);
  const vendingMachine = testRenderer.getInstance();
  
  const invalidCoin = {
    size: Size.XSMALL,
    weight: Weight.HEAVY
  };

  it('Should display INSERT COIN', () => {
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it('Should detect valid coins', () => {
    const result = vendingMachine.detectCoin({
      size: Size.XSMALL,
      weight: Weight.LIGHT
    });
    expect(result).toHaveProperty('value');
    expect(result.value).toBe(.10);
  });

  it('Should not detect invalid coins', () => {
    const result = vendingMachine.detectCoin(invalidCoin);
    expect(result).toBe(null);
  });

  it('Should accept valid coins', () => {
    vendingMachine.insertCoin(Coin.QUARTER);
    expect(vendingMachine.state.currentValue).toBe(Coin.QUARTER.value);
    expect(vendingMachine.checkDisplay()).toBe('$0.25');
  });

  it('Should reject invalid coins', () => {
    vendingMachine.insertCoin(invalidCoin);
    expect(vendingMachine.state.coinReturn).toHaveLength(1);
    expect(vendingMachine.state.coinReturn[0]).toBe(invalidCoin);
  });
});

describe('Select Product', () => {
  const testRenderer = TestRenderer.create(<VendingMachine />);
  const vendingMachine = testRenderer.getInstance();

  it('Should dispense cola with a dollar inserted', () => {
    for (let i = 0; i < 4; i++) {
      vendingMachine.insertCoin(Coin.QUARTER);
    }
    expect(vendingMachine.checkDisplay()).toBe('$1.00');
    vendingMachine.selectProduct('cola');
    expect(vendingMachine.state.stock.cola.amt).toBe(2);
    expect(vendingMachine.checkDisplay()).toBe('THANK YOU');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it('Should show the price if not enough is inserted', () => {
    for (let i = 0; i < 3; i++) {
      vendingMachine.insertCoin(Coin.QUARTER);
    }
    expect(vendingMachine.checkDisplay()).toBe('$0.75');
    vendingMachine.selectProduct('cola');
    expect(vendingMachine.state.stock.cola.amt).toBe(2);
    expect(vendingMachine.checkDisplay()).toBe('PRICE $1.00');
    expect(vendingMachine.checkDisplay()).toBe('$0.75');
  });
});

describe('Make Change', () => {
  const testRenderer = TestRenderer.create(<VendingMachine />);
  const vendingMachine = testRenderer.getInstance();

  it('Should return unused coins', () => {
    for (let i = 0; i < 5; i++) {
      vendingMachine.insertCoin(Coin.QUARTER);
    }
    expect(vendingMachine.checkDisplay()).toBe('$1.25');
    vendingMachine.selectProduct('cola');
    expect(vendingMachine.state.stock.cola.amt).toBe(2);
    expect(vendingMachine.state.coinReturn).toHaveLength(1);
  });
});

describe('Return Coins', () => {
  const testRenderer = TestRenderer.create(<VendingMachine />);
  const vendingMachine = testRenderer.getInstance();

  it('Should return any coins put in the machine', () => {
    vendingMachine.insertCoin(Coin.NICKEL);
    vendingMachine.insertCoin(Coin.DIME);
    vendingMachine.insertCoin(Coin.QUARTER);
    vendingMachine.returnCoins();
    expect(vendingMachine.state.coinReturn).toHaveLength(3);
  });
});

describe('Sold Out', () => {
  const testRenderer = TestRenderer.create(<VendingMachine />);
  const vendingMachine = testRenderer.getInstance();

  it('Should properly sell out of items', () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        vendingMachine.insertCoin(Coin.QUARTER);
      }
      vendingMachine.selectProduct('cola');
    }
    expect(vendingMachine.checkDisplay()).toBe('SOLD OUT');
    expect(vendingMachine.checkDisplay()).toBe('$1.00');
  });
});