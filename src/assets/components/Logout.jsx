import { Button, Snackbar, TextField } from '@mui/material'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { app } from '../../firebase';


const Logout = () => {

    const auth = getAuth(app);


    const [popup, setPopup] = useState({
        open: false,
        message: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (auth.currentUser !== null) {
                const result = await auth.signOut().then(() => {
                    openPopup('User logged out Successfully')
                })
                return
            }
            openPopup('No user is currently logged in')


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
                <Button type='submit' onClick={handleSubmit}>Logout</Button>

            </form>
            <Snackbar
                open={popup.open}
                onClose={closePopup}
                message={popup.message}
            />
        </>
    )
}

export default Logout