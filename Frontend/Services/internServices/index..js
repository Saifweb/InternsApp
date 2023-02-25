import Api from '../../globalVariable/variable'

export async function getInterns() {
    const link = Api + "/" + "supervisorInterns"
    const Accesstoken = localStorage.getItem('AccessToken')
    const response = await fetch(link, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Accesstoken}`
        },

    });
    const interns = await response.json();
    console.log(interns)
    if (response.status == "200") {
        return interns
    }
    else {
        return false
    }
};
export const getTaskData = async () => {
    try {
        const link = Api + "/" + "NumberOfTasks"
        const Accesstoken = localStorage.getItem('AccessToken')
        const response = await fetch(link, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Accesstoken}`
            },
    
        });
        const data = await response.json();
  
      
  
        if (response.status == "200") {
            // const taskCount = data.totalTasks;
            // const completedTaskCount = data.completedTasks;
            return data
        };
    } catch (error) {
      console.error(error);
    }
  };