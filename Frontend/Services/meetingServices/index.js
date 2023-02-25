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