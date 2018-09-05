/* eslint-disable no-console */

import {
  register
} from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      alert(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    cached() {
      alert('Content has been cached for offline use.')
    },
    updated() {
      alert('New content is available; please refresh.');
      if ('applicationCache' in window) {
        let appCache = window.applicationCache;
        appCache.addEventListener('updateready', () => {
          appCache.swapCache();
          if (confirm("Update now?")) {
            window.location.reload();
          }
        })
      }


    },
    offline() {
      alert('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}