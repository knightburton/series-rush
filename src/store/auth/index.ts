import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, User as FirebaseUser } from 'firebase/auth';
import { SignInCredentials } from '../../interfaces';
import type { RootState } from '../configureStore';

export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  refreshToken: string;
  creationTime?: string;
  lastSignInTime?: string;
  uid: string;
}

export interface AuthState {
  isLoading: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  isLoading: false,
  user: null,
};

export const parseFirebaseUser = (user: FirebaseUser): User => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  phoneNumber: user.phoneNumber,
  photoURL: user.photoURL,
  providerId: user.providerId,
  refreshToken: user.refreshToken,
  creationTime: user.metadata.creationTime,
  lastSignInTime: user.metadata.lastSignInTime,
  uid: user.uid,
});

export const signIn = createAsyncThunk<User | null, SignInCredentials, { rejectValue: Error }>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = parseFirebaseUser(response.user);
    return user;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const signOut = createAsyncThunk<null, void, { rejectValue: Error }>('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const auth = getAuth();
    await firebaseSignOut(auth);
    return null;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, { payload: user }) => {
        state.isLoading = false;
        state.user = user;
      })
      .addCase(signIn.rejected, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(signOut.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export const { reducer } = authSlice;

export const getIsLoading = (state: RootState): boolean => state.auth.isLoading;
export const getUser = (state: RootState): User | null => state.auth.user;
export const getIsAuthenticated = createSelector<[typeof getUser], boolean>(getUser, user => !!user);
