import Api from '../../globalVariable/variable'

export const getMeetings = async () => {
    const link = Api + "/" + "meetings"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
    });
    const meetings = await response.json();
    console.log(meetings)
    if (response.status == "200") {
        return meetings
    }
    else {
        return false
    }
};

export const updateMeeting = async (id, title, start, end) => {
    console.log(end);
    const link = Api + "/meeting/" + id
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
        body: JSON.stringify({
            "title": title,
            "start": start,
            "end": end
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
export const createMeeting = async (title, start, end, internId) => {
    console.log(end, title, start, internId);
    const link = Api + "/meeting/"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
        body: JSON.stringify({
            "title": title,
            "start": start,
            "end": end,
            "internId": internId
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
export const DeleteMeeting = async (id) => {
    const link = Api + "/meeting/" + id
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },
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