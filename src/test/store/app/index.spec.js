import * as app from '../../../store/app';
import mockStore from '../../mock-store';

const utils = require('../../../utils');

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
  lastUpdate: mockTimestamp - 5,
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
const rawConfiguration = {
  images: {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: [
      'w300',
      'w780',
      'w1280',
      'original',
    ],
    logo_sizes: [
      'w45',
      'w92',
      'w154',
      'w185',
      'w300',
      'w500',
      'original',
    ],
    poster_sizes: [
      'w92',
      'w154',
      'w185',
      'w342',
      'w500',
      'w780',
      'original',
    ],
    profile_sizes: [
      'w45',
      'w185',
      'h632',
      'original',
    ],
    still_sizes: [
      'w92',
      'w185',
      'w300',
      'original',
    ],
  },
  change_keys: [
    'adult',
    'air_date',
    'also_known_as',
    'alternative_titles',
    'biography',
    'birthday',
    'budget',
    'cast',
    'certifications',
    'character_names',
    'created_by',
    'crew',
    'deathday',
    'episode',
    'episode_number',
    'episode_run_time',
    'freebase_id',
    'freebase_mid',
    'general',
    'genres',
    'guest_stars',
    'homepage',
    'images',
    'imdb_id',
    'languages',
    'name',
    'network',
    'origin_country',
    'original_name',
    'original_title',
    'overview',
    'parts',
    'place_of_birth',
    'plot_keywords',
    'production_code',
    'production_companies',
    'production_countries',
    'releases',
    'revenue',
    'runtime',
    'season',
    'season_number',
    'season_regular',
    'spoken_languages',
    'status',
    'tagline',
    'title',
    'translations',
    'tvdb_id',
    'tvrage_id',
    'type',
    'video',
    'videos',
  ],
};
const mockError = new Error('There is an API error.');

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

// Reducer unit tests
describe('App reducer', () => {
  let state = app.initialState;

  beforeAll(() => {
    utils.getTimestamp = jest.fn(() => mockTimestamp);
  });

  beforeEach(() => {
    state = app.initialState;
  });

  afterAll(() => {
    jest.unmock('../../../utils');
  });

  test('Initial State', () => {
    expect(state).toEqual(app.initialState);
  });

  test(`${app.ADD_ALERT} (full version)`, () => {
    const expected = expect(
      app.reducer(state, {
        type: app.ADD_ALERT,
        payload: {
          message: mockAlert.message,
          variant: mockAlert.variant,
        },
      })
    );
    expected.toHaveProperty('alerts', [mockAlert]);
  });

  test(`${app.ADD_ALERT} (only message -> variant = 'info')`, () => {
    const expected = expect(
      app.reducer(state, {
        type: app.ADD_ALERT,
        payload: {
          message: mockAlert.message,
        },
      })
    );
    expected.toHaveProperty('alerts', [{
      ...mockAlert,
      variant: 'info',
    }]);
  });

  test(`${app.REMOVE_ALERT} (with valid key)`, () => {
    const expected = expect(
      app.reducer(mockState, {
        type: app.REMOVE_ALERT,
        payload: mockAlert.key,
      })
    );
    expected.toHaveProperty('alerts', []);
  });

  test(`${app.REMOVE_ALERT} (with invalid key)`, () => {
    const expected = expect(
      app.reducer(mockState, {
        type: app.REMOVE_ALERT,
        payload: mockAlert.key + 1,
      })
    );
    expected.toHaveProperty('alerts', [mockAlert]);
  });

  test(`${app.SET_APP_WAITING} (0 -> 1)`, () => {
    const expected = expect(
      app.reducer(state, {
        type: app.SET_APP_WAITING,
        payload: true,
      })
    );
    expected.toHaveProperty('waiting', 1);
  });

  test(`${app.SET_APP_WAITING} (1 -> 2)`, () => {
    const localState = {
      ...state,
      waiting: 1,
    };
    const expected = expect(
      app.reducer(localState, {
        type: app.SET_APP_WAITING,
        payload: true,
      })
    );
    expected.toHaveProperty('waiting', 2);
  });

  test(`${app.SET_APP_WAITING} (1 -> 0)`, () => {
    const localState = {
      ...state,
      waiting: 1,
    };
    const expected = expect(
      app.reducer(localState, {
        type: app.SET_APP_WAITING,
        payload: false,
      })
    );
    expected.toHaveProperty('waiting', 0);
  });

  test(`${app.SET_APP_WAITING} (0 -> -1)`, () => {
    const expected = expect(
      app.reducer(state, {
        type: app.SET_APP_WAITING,
        payload: false,
      })
    );
    expected.toHaveProperty('waiting', -1);
  });

  test(`${app.TOGGLE_MOBILE_DRAWER} (false -> true)`, () => {
    const expected = expect(
      app.reducer(state, {
        type: app.TOGGLE_MOBILE_DRAWER,
      })
    );
    expected.toHaveProperty('isMobileDrawerOpened', true);
  });

  test(`${app.TOGGLE_MOBILE_DRAWER} (true -> false)`, () => {
    const localState = {
      ...state,
      isMobileDrawerOpened: true,
    };
    const expected = expect(
      app.reducer(localState, {
        type: app.TOGGLE_MOBILE_DRAWER,
      })
    );
    expected.toHaveProperty('isMobileDrawerOpened', false);
  });

  test(`${app.TMDB_CONFIGURATON_FINISH} ({})`, () => {
    const expected = expect(
      app.reducer(mockState, {
        type: app.TMDB_CONFIGURATON_FINISH,
        payload: {},
      })
    );
    expected.toHaveProperty('tmdbConfiguration', {});
  });

  test(`${app.TMDB_CONFIGURATON_FINISH} (null)`, () => {
    const expected = expect(
      app.reducer(mockState, {
        type: app.TMDB_CONFIGURATON_FINISH,
        payload: null,
      })
    );
    expected.toHaveProperty('tmdbConfiguration', null);
  });

  test(`${app.TMDB_CONFIGURATON_FINISH} (valid data)`, () => {
    const expected = expect(
      app.reducer(mockState, {
        type: app.TMDB_CONFIGURATON_FINISH,
        payload: mockTmdbConfiguration,
      })
    );
    expected.toHaveProperty('tmdbConfiguration', mockTmdbConfiguration);
  });
});

// Thunk action unit tests
describe('App Thunk Actions', () => {
  afterAll(() => {
    jest.unmock('../../../utils');
  });

  it('Retrive the tmdb configuration from local storage (last update was less then 3 days ago)', async done => {
    utils.getDayDifferenceLessThan = jest.fn(() => true);
    const storage = {
      get: jest.fn(() => mockTmdbConfiguration),
    };
    const store = mockStore(mockState, { storage });
    await store.dispatch(app.requestTmdbConfiguration());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()).toEqual([
      { type: app.TMDB_CONFIGURATON_START },
      {
        type: app.TMDB_CONFIGURATON_FINISH,
        payload: mockTmdbConfiguration,
      },
    ]);
    expect(storage.get).toHaveBeenCalledWith('TMDB_CONFIGURATION');
    done();
  });

  it('Retrive the tmdb configuration from tmdb api (last update was more then 3 days ago)', async done => {
    utils.getDayDifferenceLessThan = jest.fn(() => false);
    utils.parseTmdbConfiguration = jest.fn(() => mockTmdbConfiguration);
    utils.getTimestamp = jest.fn(() => mockTimestamp - 5);
    const storage = {
      get: jest.fn(() => mockTmdbConfiguration),
      set: jest.fn(),
    };
    const tmdbApi = {
      getConfiguration: jest.fn(() => rawConfiguration),
    };
    const store = mockStore(mockState, { storage, tmdbApi });
    await store.dispatch(app.requestTmdbConfiguration());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()).toEqual([
      { type: app.TMDB_CONFIGURATON_START },
      {
        type: app.TMDB_CONFIGURATON_FINISH,
        payload: mockTmdbConfiguration,
      },
    ]);
    expect(tmdbApi.getConfiguration).toHaveBeenCalled();
    expect(utils.parseTmdbConfiguration).toHaveBeenCalledWith(rawConfiguration);
    expect(storage.get).toHaveBeenCalledWith('TMDB_CONFIGURATION');
    expect(storage.set).toHaveBeenCalledWith('TMDB_CONFIGURATION', mockTmdbConfiguration);
    done();
  });

  it('Retrive the tmdb configuration from tmdb api (there is no stored configuration in storage)', async done => {
    utils.parseTmdbConfiguration = jest.fn(() => mockTmdbConfiguration);
    utils.getTimestamp = jest.fn(() => mockTimestamp - 5);
    const storage = {
      get: jest.fn(() => undefined),
      set: jest.fn(),
    };
    const tmdbApi = {
      getConfiguration: jest.fn(() => rawConfiguration),
    };
    const store = mockStore(mockState, { storage, tmdbApi });
    await store.dispatch(app.requestTmdbConfiguration());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()).toEqual([
      { type: app.TMDB_CONFIGURATON_START },
      {
        type: app.TMDB_CONFIGURATON_FINISH,
        payload: mockTmdbConfiguration,
      },
    ]);
    expect(tmdbApi.getConfiguration).toHaveBeenCalled();
    expect(utils.parseTmdbConfiguration).toHaveBeenCalledWith(rawConfiguration);
    expect(storage.get).toHaveBeenCalledWith('TMDB_CONFIGURATION');
    expect(storage.set).toHaveBeenCalledWith('TMDB_CONFIGURATION', mockTmdbConfiguration);
    done();
  });

  it('Throw error from tmdb get configuration api (there is no stored configuration in storage)', async done => {
    utils.parseTmdbConfiguration = jest.fn(() => mockTmdbConfiguration);
    utils.getTimestamp = jest.fn(() => mockTimestamp - 5);
    const storage = {
      get: jest.fn(() => undefined),
      set: jest.fn(),
    };
    const tmdbApi = {
      getConfiguration: jest.fn(() => {
        throw mockError;
      }),
    };
    const store = mockStore(mockState, { storage, tmdbApi });
    await store.dispatch(app.requestTmdbConfiguration());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()).toEqual([
      { type: app.TMDB_CONFIGURATON_START },
      {
        type: app.TMDB_CONFIGURATON_FINISH,
        payload: null,
      },
    ]);
    expect(tmdbApi.getConfiguration).toHaveBeenCalled();
    expect(utils.parseTmdbConfiguration).not.toHaveBeenCalledWith(rawConfiguration);
    expect(storage.get).toHaveBeenCalledWith('TMDB_CONFIGURATION');
    expect(storage.set).not.toHaveBeenCalled();
    done();
  });
});
