import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
    // not sending on request body so empty obj {body} 
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authtoken: authtoken,
        }
    })
}