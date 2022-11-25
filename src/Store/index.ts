import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import {
  persistReducer,
  persistStore,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import {
  theme,
  addProtocol,
  session,
  connection,
  device,
  treatment,
  selection,
  appStatus,
  settings,
  channelIntensities,
} from '@/Store/Slices'

const reducers = combineReducers({
  theme,
  addProtocol,
  session,
  connection,
  device,
  treatment,
  selection,
  appStatus,
  settings,
  channelIntensities,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'theme',
    'addProtocol',
    'session',
    'connection',
    'device',
    'treatment',
    'selection',
    'appStatus',
    'settings',
    'channelIntensities',
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   // ignoredPaths: ['addProtocol.initialDate', 'addProtocol.finalDate'],
      // },
      serializableCheck: false,
    })

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default
    //   middlewares.push(createDebugger())
    // }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
