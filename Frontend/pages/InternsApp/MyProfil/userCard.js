import React from 'react';

const userCard = (props) => {
    return (
        <div className="card p-fluid">
            <div className="text-center mb-5">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Image" height="100" width="100" className="mb-3 rouneded" />
                <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                <hr />
                <p className="text-600 font-medium">{props.email}</p>
                <hr />
                <p className="text-600 font-medium">{props.block}</p>
                <hr />
                <p className="text-900 font-medium">{props.role}</p>
            </div>
        </div>
    )
}

export default userCard;
