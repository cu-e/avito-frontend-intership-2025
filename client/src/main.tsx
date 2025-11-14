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

const http = new HttpClient('/api');

export const api = {
  http,
  ads: AdsAPI(http),
  stats: statsAPI(http),
  moderators: ModeratorsAPI(http),
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={'light'}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
