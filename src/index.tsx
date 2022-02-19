import React from 'react';

import ToastAppContainer from 'common/ToastContainer';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import 'assets/css/main.css';
import 'assets/css/custom.css';
import 'assets/css/sidebar.css';
import 'assets/css/navbar.css';
import { RecoilRoot } from 'recoil';

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
  <RecoilRoot>
    <QueryClientProvider client={ queryCache }>
      <BrowserRouter>
        <App />
        <ToastAppContainer />
      </BrowserRouter>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById('root')
);
