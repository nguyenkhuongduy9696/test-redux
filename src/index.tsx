import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import './assets/css/main.css';
import App from './App';

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: true,
      retry: 2
    }
  }
});

ReactDOM.render(
  <QueryClientProvider client={ queryCache }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root')
);
