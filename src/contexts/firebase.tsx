import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from '../hooks/redux';
import { setUser, parseFirebaseUser } from '../store/auth';
import AppLoading from '../components/layout/AppLoading';

export interface FirebaseProviderProps {
  children?: React.ReactNode;
}

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }: FirebaseProviderProps): JSX.Element | null => {
  const [firstLoading, setFirstLoading] = useState(true);
  const dispatch = useDispatch();

  // Subscribe to auth changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setFirstLoading(false);
      dispatch(setUser(user && parseFirebaseUser(user)));
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (firstLoading) return <AppLoading />;
  return <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>;
};

export default FirebaseContext;
