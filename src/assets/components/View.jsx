import { Box, Button, CircularProgress, FormControl, Input, InputLabel, MenuItem, Modal, Select, Snackbar, TextField } from '@mui/material'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';

const DB_URL = 'https://resolve-ai-assign-default-rtdb.asia-southeast1.firebasedatabase.app/students'


const ViewModal = ({ roll, open, handleModalClose, handleDelete }) => {

    const [loading, setLoading] = useState(true)

    const dbref = collection(db, 'students')


    const [user, setUser] = useState({
        first: '',
        middle: '',
        last: '',
        class: '',
        div: '',
        roll: '',
        address1: '',
        address2: '',
        landmark: '',
        city: '',
        pin: '',
        profile: '',
    })

    useEffect(() => {
        (async () => {
            console.log(roll)
            setLoading(true)
            try {
                const student = await getDoc(doc(dbref, roll))
                if (student.exists()) {
                    setUser({ ...student.data() })
                    setLoading(false)
                    return
                }

            }
            catch (err) {
                console.log(err.message)
                setLoading(false)
            }

        })()
    }, [roll])

    const [popup, setPopup] = useState({
        open: false,
        message: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleModalClose()

    }


    const openPopup = (msg) => {
        setPopup({ open: true, message: msg })
    }
    const closePopup = (msg) => {
        setPopup({ ...popup, open: false })
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{ backgroundColor: 'white', padding: '1rem' }}
                >
                    {loading ? <CircularProgress /> :
                        <form>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                                <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>

                                    <TextField
                                        value={user.first}
                                        onChange={(e) => setUser({ ...user, first: e.target.value })}
                                        label='First Name'
                                        type='text'
                                        contentEditable={false}
                                    />
                                    <TextField
                                        value={user.middle}
                                        onChange={(e) => setUser({ ...user, middle: e.target.value })}
                                        label='Middle Name'
                                        type='text'
                                        contentEditable={false}

                                    />
                                    <TextField
                                        value={user.last}
                                        onChange={(e) => setUser({ ...user, last: e.target.value })}
                                        label='Last Name'
                                        type='text'
                                        contentEditable={false}

                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                        <Select labelId="demo-simple-select-label" label='Class'
                                            value={user.class}
                                            onChange={(e) => setUser({ ...user, class: e.target.value })}
                                            contentEditable={false}

                                        >
                                            <MenuItem value='1'>1</MenuItem>
                                            <MenuItem value='2'>2</MenuItem>
                                            <MenuItem value='3'>3</MenuItem>
                                            <MenuItem value='4'>4</MenuItem>
                                            <MenuItem value='5'>5</MenuItem>
                                            <MenuItem value='6'>6</MenuItem>
                                            <MenuItem value='7'>7</MenuItem>
                                            <MenuItem value='8'>8</MenuItem>
                                            <MenuItem value='9'>9</MenuItem>
                                            <MenuItem value='10'>10</MenuItem>
                                            <MenuItem value='12'>12</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Division</InputLabel>
                                        <Select labelId="demo-simple-select-label" label='Division'
                                            value={user.div}
                                            onChange={(e) => setUser({ ...user, div: e.target.value })}
                                            contentEditable={false}

                                        >
                                            <MenuItem value='A'>A</MenuItem>
                                            <MenuItem value='B'>B</MenuItem>
                                            <MenuItem value='C'>C</MenuItem>
                                            <MenuItem value='D'>D</MenuItem>
                                            <MenuItem value='E'>E</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        value={user.roll}
                                        onChange={(e) => setUser({ ...user, roll: e.target.value })}
                                        label='Roll Number'
                                        type='text'
                                        contentEditable={false}

                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>

                                        <TextField
                                            value={user.address1}
                                            onChange={(e) => setUser({ ...user, address1: e.target.value })}
                                            label='Address Line 1'
                                            type='text'
                                            contentEditable={false}

                                            fullWidth
                                        />
                                        <TextField
                                            value={user.address2}
                                            onChange={(e) => setUser({ ...user, address2: e.target.value })}
                                            label='Address Line 2'
                                            type='text'
                                            contentEditable={false}

                                            fullWidth
                                        />

                                    </Box>
                                    <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>

                                        <TextField
                                            value={user.landmark}
                                            onChange={(e) => setUser({ ...user, landmark: e.target.value })}
                                            label='Landmark'
                                            type='text'
                                            contentEditable={false}

                                            fullWidth
                                        />
                                        <TextField
                                            value={user.city}
                                            onChange={(e) => setUser({ ...user, city: e.target.value })}
                                            label='City'
                                            type='text'
                                            contentEditable={false}

                                            fullWidth
                                        />
                                        <TextField
                                            value={user.pin}
                                            onChange={(e) => setUser({ ...user, pin: e.target.value })}
                                            label='Pincode'
                                            type='text'
                                            contentEditable={false}

                                            fullWidth
                                        />

                                    </Box>
                                </Box>
                                <Button type='submit' variant='outlined' onClick={handleSubmit}
                                    sx={{
                                        width: '30%'
                                    }}
                                >
                                    Close {loading ? <CircularProgress size='1rem' /> : null}
                                </Button>

                            </Box>
                        </form>
                    }
                </Box>
            </Modal>
            <Snackbar
                open={popup.open}
                onClose={closePopup}
                message={popup.message}
                autoHideDuration={2000}
            />
        </>
    )
}

export default ViewModal