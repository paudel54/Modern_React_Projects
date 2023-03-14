import axios from 'axios';
//sending to backend endpoint
export const createOrUpdateUser = async (authtoken) => {
    // not sending on request body so empty obj {body} 
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authtoken: authtoken,
        }
    })
}

export const currentUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers: {
                authtoken: authtoken,
            }
        }


    );
};

export const currentAdmin = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-admin`,
        {},
        {
            headers: {
                authtoken,
            }
        }
    );
}