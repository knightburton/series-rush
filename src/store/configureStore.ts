import { configureStore } from '@reduxjs/toolkit';
import localStorage from '../sideEffects/localStorage';
import { reducer as app } from './app';

const isDevelopment = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: { app },
  devTools: isDevelopment,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: { extraArgument: { localStorage } },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
