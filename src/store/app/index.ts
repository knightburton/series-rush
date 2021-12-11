import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../interfaces/store';
import { RootState } from '../configureStore';

export const initialState: AppState = {
  waiting: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppWaiting: (state, action: PayloadAction<boolean>) => {
      state.waiting = action.payload ? state.waiting + 1 : state.waiting - 1;
    },
  },
});

export const { setAppWaiting } = appSlice.actions;
export const { reducer } = appSlice;

export const getWaiting = (state: RootState): number => state.app.waiting;
export const getIsAppWaiting = createSelector(getWaiting, waiting => waiting > 0);
