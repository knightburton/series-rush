import * as app from '../../../store/app';

// Mock data
const mockTimestamp = 1571841496157;
const mockAlert = {
  key: mockTimestamp,
  message: 'Mock alert message',
  variant: 'warning',
};
const mockAlertTheSecond = {
  key: mockTimestamp + 1,
  message: 'Mock alert message #2',
  variant: 'info',
};
const mockWaiting = true;
const mockTmdbConfiguration = {
  imageBaseURL: '/some/path/to/somewhere',
  posterSizes: ['w100', 'w200'],
  backdropSizes: ['w400', 'w800'],
};
const mockState = {
  alerts: [mockAlert, mockAlertTheSecond],
  waiting: 1,
  isMobileDrawerOpened: true,
  tmdbConfiguration: mockTmdbConfiguration,
};

// Action creator unit tests
describe('App Action Creators', () => {
  test(app.ADD_ALERT, () => {
    expect(app.addAlert(mockAlert.message, mockAlert.variant)).toEqual({
      type: app.ADD_ALERT,
      payload: {
        message: mockAlert.message,
        variant: mockAlert.variant,
      },
    });
  });

  test(app.REMOVE_ALERT, () => {
    expect(app.removeAlert(mockAlert.key)).toEqual({
      type: app.REMOVE_ALERT,
      payload: mockAlert.key,
    });
  });

  test(app.SET_APP_WAITING, () => {
    expect(app.setAppWaiting(mockWaiting)).toEqual({
      type: app.SET_APP_WAITING,
      payload: mockWaiting,
    });
  });

  test(app.TOGGLE_MOBILE_DRAWER, () => {
    expect(app.toggleMobileDrawer()).toEqual({
      type: app.TOGGLE_MOBILE_DRAWER,
    });
  });

  test(app.TMDB_CONFIGURATON_START, () => {
    expect(app.tmdbConfigurationStart()).toEqual({
      type: app.TMDB_CONFIGURATON_START,
    });
  });

  test(app.TMDB_CONFIGURATON_FINISH, () => {
    expect(app.tmdbConfigurationFinish(mockTmdbConfiguration)).toEqual({
      type: app.TMDB_CONFIGURATON_FINISH,
      payload: mockTmdbConfiguration,
    });
  });
});

// Selectors unit tests
describe('App Selectors', () => {
  const state = {
    app: {
      ...mockState,
    },
  };

  test('getAlerts', () => {
    expect(app.getAlerts(state)).toEqual(mockState.alerts);
  });

  test('getLastAlert', () => {
    expect(app.getLastAlert(state)).toEqual(mockAlertTheSecond);
  });

  test('getWaiting', () => {
    expect(app.getWaiting(state)).toEqual(mockState.waiting);
  });

  test('getIsAppWaiting', () => {
    expect(app.getIsAppWaiting(state)).toEqual(mockState.waiting > 0);
  });

  test('getIsMobileDrawerOpened', () => {
    expect(app.getIsMobileDrawerOpened(state)).toEqual(mockState.isMobileDrawerOpened);
  });

  test('getTmdbConfiguration', () => {
    expect(app.getTmdbConfiguration(state)).toEqual(mockState.tmdbConfiguration);
  });
});
