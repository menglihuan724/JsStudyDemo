import React from 'react';
import ReactDOM from 'react-dom';
import Web from './Web';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Web />, div);
  ReactDOM.unmountComponentAtNode(div);
});
