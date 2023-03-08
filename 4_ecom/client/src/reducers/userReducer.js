// state is null given as default state : its similar to context api 
// Here initally state => implies user: null:           user with default value as null:
export const userReducer = (state = null, action) => {
    console.log(state);
    switch (action.type) {
        case "LOGGED_IN_USER":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
}

// returns and updates redux state:




