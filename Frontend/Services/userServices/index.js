
import Api from '../../globalVariable/variable'

//each password can update his password
export const updatePassword = async (password) => {
    console.log(password)
    const link = Api + "/" + "user/password"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`

        },
        body: JSON.stringify({
            "password": password
        }),
    });
    const data = await response.json();
    console.log(data)
    if (response.status == "200") {
        return true
    }
    else {
        return false
    }
};

// each user can update his name and his email 
export const updateUserInfo = async (email, name) => {
    const link = Api + "/" + "user"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`

        },
        body: JSON.stringify({
            "email": email,
            "name": name
        }),
    });
    const data = await response.json();
    console.log(data)
    if (response.status == "200") {
        return true
    }
    else {
        return false
    }
};
export const createUser = async (email, name, role, block) => {
    const link = Api + "/" + "user"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
            "role": role,
            "block": block
        }),
    });
    const data = await response.json();
    console.log(data)
    if (response.status == "200") {
        return true
    }
    else {
        return false
    }
};
export const getMyProfil = async () => {
    const Accesstoken = localStorage.getItem('AccessToken')
    const link = Api + "/" + "me"
    const response = await fetch(link, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
    });
    return response;
};

export const getAllUsers = async () => {
    const Accesstoken = localStorage.getItem('AccessToken')
    const link = Api + "/" + "users"
    const response = await fetch(link, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
    });
    const users = await response.json();
    // console.log(users)
    if (response.status == "200") {
        return users
    }
    else {
        return false
    }
};

