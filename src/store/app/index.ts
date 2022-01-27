import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentTimestamp } from '../../utils';
import type { RootState } from '../configureStore';

export interface Alert {
  key?: number;
  message: string;
  messageOptions?: Record<string, unknown>;
  severity?: 'error' | 'info' | 'success' | 'warning';
}

export interface AppState {
  waiting: number;
  alerts: Alert[];
}

export const initialState: AppState = {
  waiting: 0,
  alerts: [],
};

export const getWaiting = (state: RootState): number => state.app.waiting;
export const getIsAppWaiting = createSelector<[typeof getWaiting], boolean>(getWaiting, waiting => waiting > 0);
export const getAlerts = (state: RootState): Alert[] => state.app.alerts;
export const getAlertByKey = (key: number) => createSelector<[typeof getAlerts], Alert | undefined>(getAlerts, alerts => alerts.find(alert => alert.key === key));
export const getMostRecentAlert = createSelector<[typeof getAlerts], Alert | undefined>(getAlerts, alerts => alerts[alerts.length - 1]);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppWaiting: (state: AppState, { payload: waiting }: PayloadAction<boolean>) => {
      state.waiting = waiting ? state.waiting + 1 : state.waiting - 1;
    },
    addAlert: (state: AppState, { payload: { key, message, messageOptions, severity } }: PayloadAction<Alert>) => {
      state.alerts.push({
        key: key || getCurrentTimestamp(),
        message,
        messageOptions,
        severity: severity || 'error',
      });
    },
    removeAlert: (state: AppState, { payload: key }: PayloadAction<number>) => {
      state.alerts = state.alerts.filter(alert => alert.key !== key);
    },
    clearAlerts: (state: AppState) => {
      state.alerts = initialState.alerts;
    },
  },
});

export const { setAppWaiting, addAlert, removeAlert, clearAlerts } = appSlice.actions;
export const { reducer } = appSlice;
