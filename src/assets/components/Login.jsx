import { Button, Snackbar, TextField } from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import app from '../../firebase';


const Login = () => {

    const auth = getAuth(app);
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [popup, setPopup] = useState({
        open: false,
        message: ''
    })

    const handleEmail = (e) => {
        setUser({ ...user, email: e.target.value })
    }
    const handlePass = (e) => {
        setUser({ ...user, password: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await signInWithEmailAndPassword(auth, user.email, user.password)
            if (result) {
                openPopup('User logged in Successfully')
            }

        }
        catch (err) {
            openPopup(err.message)

        }
    }

    const openPopup = (msg) => {
        setPopup({ open: true, message: msg })
    }
    const closePopup = (msg) => {
        setPopup({ ...popup, open: false })
    }

    return (
        <>
            <form>
                <TextField
                    value={user.email}
                    onChange={handleEmail}
                    label='Email'
                    type='text'
                />
                <TextField
                    value={user.password}
                    onChange={handlePass}
                    label='Password'
                    type='password'
                />
                <Button type='submit' onClick={handleSubmit}>Login</Button>

            </form>
            <Snackbar
                open={popup.open}
                onClose={closePopup}
                message={popup.message}
            />
        </>
    )
}

export default Login