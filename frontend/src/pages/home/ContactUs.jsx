import React, { useState } from 'react'
import axios from 'axios';

import "./home.css";

export default function ContactUs() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [massege, setMassege] = useState("");
    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    const submitMassege = () => {

        if (!validateEmail(email)) {
            alert('Invalid email');
            return;
        } 
        const obj = {
            name: name,
            email: email,
            subject: subject,
            massege: massege
        }
        axios.post(process.env.REACT_APP_API_URL+"/contactus/savemasseges", obj).then((res) => {
            console.log(res);
            if (res.data.status == 1) {
                alert("your massege saved");
            } else {
                alert("your massege is not saved");
            }
        });
    }

    return (
        <>
            <div className='form'>
                <h2 className="--text-center">Contact Us</h2>
                <input type="text" placeholder="Full Name" name="user_name" required value={name} onChange={(e) => { setName(e.target.value); }} />
                <input type="email" placeholder="Email" name="user_email" required value={email} onChange={(e) => { setEmail(e.target.value); }} />
                <input type="text" placeholder="Subject" name="subject" required value={subject} onChange={(e) => { setSubject(e.target.value); }} />
                <textarea name="message" cols="30" rows="10" value={massege} onChange={(e) => { setMassege(e.target.value); }}></textarea>
                <button type="button" className="--btn --btn-primary" onClick={submitMassege}>
                    Send
                </button>
            </div>
        </>
    )
}
