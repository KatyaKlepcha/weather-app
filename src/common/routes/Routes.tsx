import { createBrowserRouter } from 'react-router-dom'
import App from '../../app/App'
import Weather from '../../features/weather/Weather'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Weather />,
      },
    ],
  },
])
