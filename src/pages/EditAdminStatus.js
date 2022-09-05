import { Container, Typography, CircularProgress, Box, Card, Grid, Stack, TextField, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore"
import { auth, db, storage } from "../Authentication/firebaseConfig"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "../App.css"
import { border } from "@mui/system"

const drawerWidth = 240;
export const EditAdminStatus = () => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [status, setSelects] = useState('')
    const [l, setl] = useState(false)
    const [name, setNewName] = useState('')

    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        const fetchFile = async () => {
            const docRef = doc(db, 'adminCases', params.adminfileId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setFile(docSnap.data())
                setLoading(false)

            }
        }
        fetchFile()
    }, [navigate, params.adminfileId])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const docRef = doc(db, 'adminCases', params.adminfileId)

        await setDoc(docRef, { status }, { merge: true })
        setl(true)
        alert("Done");
        setl(false)


    }
    const storeImage = (url) => {

        const httpsReference = ref(storage, url)
        let names = httpsReference.name
    }
    return (

        <>
            <Container maxWidth={"xl"} sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, marginTop: '100px' }}>

                {loading ? <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: "100px" }}>
                    <CircularProgress />
                </Box> : <>
                    <Box component={"form"} onSubmit={handleSubmit}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                            Edit
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                                Client Name:
                            </Typography>

                            {file.name}

                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                                Status:
                            </Typography>
                            <select value={status} onChange={(e) => setSelects(e.target.value)} style={{ border: '1px solid blue', padding: '10px', borderRadius: '2px' }}>
                                <option>
                                    ---------
                                </option>
                                <option>
                                    Call Completed-In Review
                                </option>
                                <option>
                                    Pending
                                </option>
                                <option>
                                    Client on Ltk
                                </option>
                                <option>
                                    Accepted-All docs returned
                                </option>
                                <option>
                                    Accepted-Esign Sent
                                </option>
                                <option>
                                    Accepted-Clawback Replacement
                                </option>
                                <option>
                                    Accepted-Backend Basis
                                </option>
                                <option>
                                    Rejected-Issues with Quantum
                                </option>
                                <option>
                                    Rejected-Others
                                </option>
                            </select>
                        </Box>
                        <Box sx={{ width: '100%', marginTop: '50px' }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Client Images
                            </Typography>
                            <Stack spacing={2} direction={{ lg: 'row', md: 'col' }}>

                                {file.imgUrls.map((url, index) => (

                                    <a href={url} download key={index} >
                                        <img src={url} alt={file.fileName} height={100} width={100} />
                                    </a>

                                ))}

                            </Stack>

                        </Box>
                        {l ? <CircularProgress /> : <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "flex-start", gap: '20px' }}>
                            <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '20px' }}>Edit</Button>
                            <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ marginTop: '20px', backgroundColor: 'red' }}>Back</Button>

                        </Box>}
                    </Box>
                </>

                }

            </Container>

        </>
    )
}