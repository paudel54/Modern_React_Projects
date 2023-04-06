let initialState = []
//load cart items from local Storage , and update onto redux state so every other componoent can use:
if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'));
        // console.log(initialState);
    } else {
        initialState = [];
    }
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return action.payload;
        default:
            return state;
    }
}