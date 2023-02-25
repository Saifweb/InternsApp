import Api from '../../globalVariable/variable'

export const login = async (email, password) => {
    const link = Api + "/" + "login"
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data)
    if (response.status == "200") {
        localStorage.setItem('AccessToken', data.AccessToken);
        localStorage.setItem('RefreshToken', data.RefreshToken);
        window.location.href = '/InternsApp/Dashboard/';
        return true
    }
    else {
        return false
    }
};
export const logout = async () => {
    console.log("hello??")
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    window.location.href = '/';
}

export const forgetPassword = async (email) => {
    const link = Api + "/" + "forgetPassword"
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log(data)
    if (response.status == "200") {
        return true
    }
    else {
        return false
    }
}
export const resetPassword = async (email, key, password) => {
    const link = Api + "/" + "resetPassword"
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "key": key,
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
}

