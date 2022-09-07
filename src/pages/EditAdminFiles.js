import { Container, Typography, CircularProgress, Box, Card, Grid, Stack, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc, setDoc } from "firebase/firestore"
import { auth, db, storage } from "../Authentication/firebaseConfig"
import { getStorage, ref, getDownloadURL, getMetadata } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"


const drawerWidth = 240;
export const EditAdminFiles = () => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [name, setNewName] = useState('')
    const navigate = useNavigate()
    const params = useParams()


    useEffect(() => {
        const fetchFile = async () => {
            const forestRef = ref(storage, 'images/');
            getMetadata(forestRef)
                .then((metadata) => {
                    console.log(metadata)
                })
                .catch((error) => {
                    console.log(metadata)
                });
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

        await setDoc(docRef, { name }, { merge: true })

        alert("Done");



    }

    return (

        <>
            <Container maxWidth={"xl"} sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, marginTop: '100px' }}>
                {loading ? <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: "100px" }}>
                    <CircularProgress />
                </Box> : <>
                    <Box component={"form"} onSubmit={handleSubmit}>

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Client Name:
                            </Typography>
                            <Typography variant="h5">
                                <input variant="h5" value={name} onChange={(e) => setNewName(e.target.value)} style={{ border: '1px solid blue', padding: '10px', borderRadius: '2px' }} />
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Status:
                            </Typography>
                            <Typography variant="h5">
                                {file.status}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '100%', marginTop: '50px' }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Client Files:

                            </Typography>
                            <Stack spacing={2} direction={{ lg: 'row', md: 'row' }}>

                                {file.imgUrls.map((url, index) => (
                                
                                        <a href={url} download key={index} >
                                            <img src={url} alt={file.fileName} height={100} width={100} />
                                        </a>
                              

                                ))}

                            </Stack>

                        </Box>
                        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "flex-start", gap: '20px' }}>
                            <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '20px' }}>Edit</Button>
                            <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ marginTop: '20px', backgroundColor: 'red' }}>Back</Button>

                        </Box>
                    </Box>

                </>

                }

            </Container>

        </>
    )
}