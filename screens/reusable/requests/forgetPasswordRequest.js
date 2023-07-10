import React from 'react';

const forgetPasswordRequest = async (email) => {



    const res = await fetch('http://192.168.1.101:3000/api/v1/forget_passwords', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });



    // const res = await fetch('http://192.168.31.101:3000/api/v1/forget_passwords', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    // });

    return res.json();
};

export default forgetPasswordRequest;
