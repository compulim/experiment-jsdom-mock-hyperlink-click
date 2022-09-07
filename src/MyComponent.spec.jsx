/* @jest-environment jsdom */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

function mockCreateElement(onClick) {
  return {
    ...React,
    createElement: (tagOrComponent, props, ...children) => {
      if (tagOrComponent === 'a') {
        return React.createElement(
          tagOrComponent,
          {
            ...props,
            onClick
          },
          ...children
        );
      } else {
        return React.createElement(tagOrComponent, props, ...children);
      }
    }
  };
}

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
