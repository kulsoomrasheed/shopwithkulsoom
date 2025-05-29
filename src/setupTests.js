// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { act } from 'react';
import { configure } from '@testing-library/react';

// Configure Testing Library to use React's act
configure({ asyncUtilTimeout: 5000 });

// Override the act export from react-dom/test-utils
jest.mock('react-dom/test-utils', () => ({
  ...jest.requireActual('react-dom/test-utils'),
  act: jest.requireActual('react').act,
}));
