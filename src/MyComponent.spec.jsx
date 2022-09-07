/* @jest-environment jsdom */

function mockCreateElement(onClick) {
  const react = jest.requireActual('react');

  return {
    ...react,
    createElement: (tagOrComponent, props, ...children) => {
      if (tagOrComponent === 'a') {
        return react.createElement(
          tagOrComponent,
          {
            ...props,
            onClick
          },
          ...children
        );
      } else {
        return react.createElement(tagOrComponent, props, ...children);
      }
    }
  };
}

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

beforeEach(() => {
  jest.resetModules();
});

test('loads and displays greeting', async () => {
  const onClick = jest.fn(event => event.preventDefault());

  jest.doMock('react', () => mockCreateElement(onClick));

  const { default: MyComponent } = await import('./MyComponent');

  // ARRANGE
  render(<MyComponent />);

  // ACT
  await userEvent.click(screen.getByText('Bing'));

  // ASSERT
  expect(onClick).toHaveBeenCalledTimes(1);
});
