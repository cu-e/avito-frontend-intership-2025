import React from 'react';
import ReactDOM from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles.css';
import './main.css';

import App from './App.tsx';
import { HttpClient } from './core/api/HttpClient.ts';
import { ThemeProvider } from '@gravity-ui/uikit';
import { AdsAPI } from './core/api/ads/ads.ts';
import { statsAPI } from './core/api/statistic/statistic.ts';
import { ModeratorsAPI } from './core/api/moderators/moderators.ts';
import { store } from './core/store/store.ts';
import { Provider } from 'react-redux';

const http = new HttpClient('/api');

export const api = {
  http,
  ads: AdsAPI(http),
  stats: statsAPI(http),
  moderators: ModeratorsAPI(http),
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={'light'}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
