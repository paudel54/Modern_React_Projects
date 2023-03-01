export const initialState = {
    user: null,
    playlist: [],
    playing: false,
    item: null,
    token: "BQDbcwNlYZlRiMP9YFLj_a2fYiLUpGYSHxNywnxo7oiJpW5ney_Z3HBdoBwJ3uNPKJNnjMoQVLe3eSDtjt_JQ8IkGQDFJKWTgRl8mYtfiwZ4kW4aqXvUzpaiF6kMgPCAFmnqmAagTgGJ8wwAJiaLfygOR213z07ZIsSVvG0VOE9NblBcljUBrxrE21VsEdVbRAMQxw6xfansYIh74s9YXQ",
}

// action has type and payload: when action is dispatched to data layer action and payload is sent:
// reducer action is to listen the action 
const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                // bring the current state and update the user:
                user: action.user
            }
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}

export default reducer;