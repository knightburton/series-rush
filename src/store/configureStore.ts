import { configureStore } from '@reduxjs/toolkit';
import localStorage from '../sideEffects/localStorage';
import { reducer as app } from './app';
import { reducer as auth } from './auth';

const isDevelopment = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: { app, auth },
  devTools: isDevelopment,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument: { localStorage } },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
