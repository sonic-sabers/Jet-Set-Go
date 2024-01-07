import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../Intro';
import App from '../App';

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});