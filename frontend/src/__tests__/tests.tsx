import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UVIndex from '../components/UVIndex/UVIndex';

describe('Unit tests', () => {
  test('UV Index component express correct intensity', () => {
    render(<UVIndex uvindex={6}/>)
    expect(screen.getByText('High')).toBeVisible();
  });
});

/*
This test needs to mock the request data in order to pass

describe('Integration test', () => {
  test('Check temperature display', async () => {
    render(<App/>);

    await waitFor(() => expect(screen.getByText('Alora')).toBeInTheDocument());

    expect(screen.getByRole('generic')).toHaveTextContent('Mainly clear');
  })
});
*/
