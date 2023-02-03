import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom'
import { AppBar, Button, List, ListItem, Toolbar } from '@mui/material'
import { app } from '../../firebase';
import { getAuth } from 'firebase/auth';

const Navbar = () => {
    const auth = getAuth(app);
    const router = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (auth.currentUser === null) {
            navigate('/login')
        }
    }, [router.pathname])
    return (
        <AppBar>
            <Toolbar>
                <ListItem>
                    <Link to='/login'>Login</Link>
                </ListItem>
                <ListItem>
                    <Link to='/add'>Add</Link>
                </ListItem>
                <ListItem>
                    <Link to='/manage'>Manage</Link>
                </ListItem>
                <ListItem>
                    <Link to='/logout'>Logout</Link>
                </ListItem>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar