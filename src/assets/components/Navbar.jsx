import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, List, ListItem, Toolbar } from '@mui/material'

const Navbar = () => {
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
            </Toolbar>
        </AppBar>
    )
}

export default Navbar