/* @jest-environment jsdom */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

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
  expect(onClick.mock.calls[0][0]).toHaveProperty('target.href', 'https://bing.com/');
});
