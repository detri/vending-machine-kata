import React from 'react';
import ReactDOM from 'react-dom';
import VendingMachine from '../VendingMachine';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VendingMachine />, div);
  ReactDOM.unmountComponentAtNode(div);
});
