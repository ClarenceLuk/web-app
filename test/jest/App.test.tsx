
import { render, screen } from '@testing-library/react';
import App from '../../src/App';
import React from 'react';

describe('Base Test', () => {
  it('Basic Test', () => {
    render(
      <App />
    )

    screen.debug()
  })
})
