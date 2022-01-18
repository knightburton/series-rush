import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, updateProfile, User as FirebaseUser, AuthError } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, list, deleteObject } from 'firebase/storage';
import { addAlert } from '../app';
import { SignInCredentials } from '../../interfaces';
import type { RootState } from '../configureStore';

export enum LoadingSections {
  PhotoDelete = 'PHOTO_DELETE',
  PhotoUpload = 'PHOTO_UPLOAD',
}
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
  loadingSection: LoadingSections | null;
  user: User | null;
}

export const initialState: AuthState = {
  isLoading: false,
  loadingSection: null,
  user: null,
};

export const getIsLoading = (state: RootState): boolean => state.auth.isLoading;
export const getLoadingSection = (state: RootState): LoadingSections | null => state.auth.loadingSection;
export const getIsSectionLoading = (section: LoadingSections): ((state: RootState) => boolean) =>
  createSelector<[typeof getLoadingSection], boolean>(getLoadingSection, loadingSection => loadingSection === section);
export const getUser = (state: RootState): User | null => state.auth.user;
export const getIsAuthenticated = createSelector<[typeof getUser], boolean>(getUser, user => !!user);
export const getUserId = createSelector<[typeof getUser], string>(getUser, user => user?.uid || '');
export const getUserProfilePhoto = createSelector<[typeof getUser], string>(getUser, user => user?.photoURL || '');
export const getUserDisplayNameFirstCharacter = createSelector<[typeof getUser], string>(getUser, user => (user?.displayName || user?.email || '').charAt(0));

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

const handleError = createAsyncThunk<void, AuthError | Error>('auth/handleError', async (error, { dispatch }) => {
  if ('code' in error) dispatch(addAlert({ message: `error:${error.code}`, messageOptions: { defaultValue: error.message } }));
  else if ('message' in error) dispatch(addAlert({ message: `error:${error.message}`, messageOptions: { defaultValue: error.message } }));
  else dispatch(addAlert({ message: 'error:auth/generic-error' }));
});

export const signIn = createAsyncThunk<User | null, SignInCredentials>('auth/signIn', async ({ email, password }, { dispatch }) => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = parseFirebaseUser(response.user);
    return user;
  } catch (error) {
    dispatch(handleError(error as AuthError));
    return null;
  }
});

export const signOut = createAsyncThunk<void, void, { rejectValue: Error }>('auth/signOut', async (_, { dispatch }) => {
  try {
    const auth = getAuth();
    await firebaseSignOut(auth);
  } catch (error) {
    dispatch(handleError(error as AuthError));
  }
});

export const updateProfilePhoto = createAsyncThunk<void, File>('auth/updateProfilePhoto', async (file, { dispatch }) => {
  try {
    const { currentUser } = getAuth();
    if (!currentUser) throw new Error('error:auth/user-not-found');
    const app = getApp();
    const storage = getStorage(app);
    const fileExtension = file.name.split('.').pop();
    const profilePhotoRef = ref(storage, `users/${currentUser.uid}/${currentUser.uid}.${fileExtension}`);
    const snapshot = await uploadBytes(profilePhotoRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await updateProfile(currentUser, { photoURL: downloadURL });
  } catch (error) {
    dispatch(addAlert(error as Error));
  }
});

export const deleteProfilePhoto = createAsyncThunk('auth/deleteProfilePhoto', async (_, { dispatch }) => {
  try {
    const { currentUser } = getAuth();
    if (!currentUser) throw new Error('error:auth/user-not-found');
    const app = getApp();
    const storage = getStorage(app);
    const userStorageFolderRef = ref(storage, `users/${currentUser.uid}`);
    const files = await list(userStorageFolderRef);
    const profilePhotoRef = files.items.find(item => item.name.startsWith(currentUser.uid));
    if (profilePhotoRef) {
      await updateProfile(currentUser, { photoURL: null });
      await deleteObject(profilePhotoRef);
    }
  } catch (error) {
    dispatch(addAlert(error as Error));
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
      })
      .addCase(updateProfilePhoto.pending, state => {
        state.loadingSection = LoadingSections.PhotoUpload;
      })
      .addCase(updateProfilePhoto.fulfilled, state => {
        state.loadingSection = null;
      })
      .addCase(updateProfilePhoto.rejected, state => {
        state.loadingSection = null;
      })
      .addCase(deleteProfilePhoto.pending, state => {
        state.loadingSection = LoadingSections.PhotoDelete;
      })
      .addCase(deleteProfilePhoto.fulfilled, state => {
        state.loadingSection = null;
      })
      .addCase(deleteProfilePhoto.rejected, state => {
        state.loadingSection = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export const { reducer } = authSlice;
