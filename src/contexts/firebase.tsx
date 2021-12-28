import { createContext, useMemo, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from '../hooks/redux';
import { setUser, parseFirebaseUser } from '../store/auth';

export interface FirebaseProviderProps {
  children?: React.ReactNode;
}

const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }: FirebaseProviderProps): JSX.Element => {
  const dispatch = useDispatch();
  const value = useMemo(() => ({}), []);

  // Subscribe to auth changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(setUser(user && parseFirebaseUser(user)));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export default FirebaseContext;
