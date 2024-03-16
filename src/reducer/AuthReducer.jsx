export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                user: null,
                role: null,
                token: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                role: null,
                token: null,
            }
        case 'UPDATE_USER':
            const updatedUser = {
                ...state.user,
                name: action.payload.name,
                email: action.payload.email,
                photo: action.payload.photo || state.user.photo,
                gender: action.payload.gender,
                bloodType: action.payload.bloodType || state.user.bloodType,
            }
            return {
                ...state,
                user: updatedUser,
            }
        default:
            return state;
    }
};
