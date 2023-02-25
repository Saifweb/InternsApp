import Api from '../../globalVariable/variable'

//get resumes    
export const getAllResume = async () => {
    const link = Api + "/" + "resumes"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
    });
    const data = await response.json();
    console.log(data)
    if (response.status == "200") {
        return data
    }
    else {
        return false
    }
};

// create resumes 
export const createResume = async (email, position, resume) => {
    const link = Api + "/" + "resume"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
        body: JSON.stringify({
            "email": email,
            "status": position,
            "resume": resume,
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


