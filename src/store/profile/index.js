export const initialState = {};

export const createProfile = credentials => async (dispatch, getState, { getFirebase }) => {
  try {
    const firebase = getFirebase();
    const { firstName, lastName, email, password } = credentials;

    await firebase.createUser(
      { email, password },
      { firstName, lastName }
    );
    await firebase.updateAuth(
      { displayName: `${firstName} ${lastName}` },
      true // Also update the Profile document
    );
  } catch (error) {
    // TODO: handle the error
  }
};
