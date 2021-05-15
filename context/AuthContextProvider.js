/* eslint-disable prettier/prettier */
import React, { useReducer, createContext } from 'react';

export const AuthContext = createContext();

// state의 초기 값을 설정한다
const initialState = {
    isSignout: false,
    // userToken: null,
    // userType: '유저',
    user: {
      userType: '유저',
    },
};

const AuthContextProvider = ({children}) => {


    const [state, dispatch] = useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                // userToken: action.token,
                user: {
                  userType: action.type,
                }
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                // userToken: action.token,
                user: {
                  userType: action.type,
                }
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                // userToken: null,
                user: {
                  userType: initialState.user.userType,
                }
              };
          }
        },
        initialState
    );

    // // dispatch 간편화하기 위해서 미리 셋팅
    // const authDispatch = useMemo(
    //     () => ({
    //     restoreToken: async userToken => {
    //         dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    //     },
    //     signIn: async data => {

    //         dispatch({ type: 'SIGN_IN', token: 'temp-token' });
    //     },
    //     signUp: async data => {

    //         dispatch({ type: 'SIGN_IN', token: 'temp-token' });
    //     },
    //     signOut: () => dispatch({ type: 'SIGN_OUT' }),
    //     }), 
    //     []
    // );

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
