import { Delete, Edit, PanoramaFishEye, RemoveRedEye } from '@mui/icons-material'
import { Box, Table, TableBody, TableCell, TableRow, CircularProgress, IconButton } from '@mui/material'
import { collection, deleteDoc, doc, getDoc, getDocs, getDocsFromServer, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'

import EditModal from './Edit'
import ViewModal from './View'

const Manage = () => {

    const [studentsData, setStudentsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpenEdit, setModalOpenEdit] = useState(false)
    const [modalOpenView, setModalOpenView] = useState(false)
    const [editRoll, setEditRoll] = useState()
    const [viewRoll, setViewRoll] = useState()

    const dbref = collection(db, 'students')

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        try {
            const students = await getDocs(dbref)
            if (students.docs) {
                setStudentsData([...students.docs])
                setLoading(false)
                return
            }

        }
        catch (err) {
            console.log(err.message)
            setLoading(false)
        }

    }

    const handleDelete = async (roll) => {
        try {
            setLoading(true)
            deleteDoc(doc(dbref, roll)).then(() => {
                setLoading(false)
                const newStudentData = studentsData.filter((student) => student.data().roll !== roll)
                setStudentsData(newStudentData)
            })

        }
        catch (err) {
            console.log(err.message)
        }

    }
    const handleEdit = (roll) => {
        // if (editRoll !== roll) {
        setEditRoll(roll)
        // }
        setModalOpenEdit(true)

    }
    const handleView = (roll) => {
        // if (editRoll !== roll) {
        setViewRoll(roll)
        // }
        setModalOpenView(true)

    }

    const handleModalCloseEdit = () => {

        setModalOpenEdit(false)
    }
    const handleModalCloseView = () => {
        setModalOpenView(false)
    }

    return (
        <>
            {loading ? <CircularProgress /> : (
                <Table>
                    <TableBody>
                        {
                            studentsData.map((studentRecord) => {
                                let student = studentRecord.data()
                                return (<TableRow key={student.roll} >
                                    <TableCell>{student.roll}</TableCell>
                                    <TableCell>{`${student.first} ${student?.middle} ${student?.last} `}</TableCell>
                                    <TableCell>{student.class}</TableCell>
                                    <TableCell>{student.div}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <IconButton onClick={() => handleView(student.roll)}>
                                                <RemoveRedEye />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(student.roll)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(student.roll)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                                )
                            })

                        }
                    </TableBody>
                </Table >
            )}
            {editRoll ? <EditModal roll={editRoll} open={modalOpenEdit} handleModalClose={handleModalCloseEdit} handleDelete={handleDelete} /> : null}
            {viewRoll ? <ViewModal roll={viewRoll} open={modalOpenView} handleModalClose={handleModalCloseView} handleDelete={handleDelete} /> : null}
        </>
    )

}

export default Manage