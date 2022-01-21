import { createContext, useEffect, useState } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
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
    const unsubscribeIdToken = onIdTokenChanged(auth, user => {
      dispatch(setUser(user && parseFirebaseUser(user)));
      setFirstLoading(false);
    });
    return () => {
      unsubscribeIdToken();
    };
  }, [dispatch]);

  if (firstLoading) return <AppLoading />;
  return <FirebaseContext.Provider value={null}>{children}</FirebaseContext.Provider>;
};

export default FirebaseContext;
