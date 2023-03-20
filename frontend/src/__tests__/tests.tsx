import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UVIndex from '../components/UVIndex/UVIndex';
import App from '../App';

const data = {
  "city":"Alora",
  "apparent_temperature":18.7,
  "max_temp":19.7,
  "min_temp":7.9,
  "precipitation_sum":0,
  "sunrise":"2023-03-20T06:21",
  "sunset":"2023-03-20T18:31",
  "temp":10.3,
  "uv_index_max":6.4,
  "weather_msg":"Mainly clear",
  "weather_code":1,
  "wind_speed":5.4,
  "wind_direction":20,
  "hour_forecast":[],
  "days_forecast":[]
}
const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(ctx.json(data))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Unit tests', () => {
  test('UV Index component express correct intensity', () => {
    render(<UVIndex uvindex={6}/>)
    expect(screen.getByText('High')).toBeVisible();
  });
});

// describe('Integration test', () => {
//   test('Check temperature display', async () => {
//     render(<App/>);
//
//     await waitFor(() => screen.getByRole('heading'));
//
//
//     // expect(screen.getByRole('generic')).toHaveTextContent('Mainly clear');
//   })
// });