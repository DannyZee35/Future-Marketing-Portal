import { Container, Typography, CircularProgress, Box, Card, Grid, Stack } from "@mui/material"
import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from "firebase/firestore"
import { auth, db, storage } from "../Authentication/firebaseConfig"
import { getStorage, ref, getDownloadURL} from "firebase/storage";


const drawerWidth = 240;
export const SpeedyAdminfiles = () => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)

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


    
    const storeImage = (url) => {
      
            const httpsReference = ref(storage, url)
            let names= httpsReference.name
    }
    return (

        <>
            <Container maxWidth={"xl"} sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, marginTop: '100px' }}>
                {loading ? <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: "100px" }}>
                    <CircularProgress />
                </Box> : <>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            Client Name:
                        </Typography>
                        <Typography variant="h4">
                            {file.name}
                        </Typography>
                    </Box>
                  
                    <Box sx={{ width: '100%',marginTop:'50px' }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Client Images
                        </Typography>
                        <Stack spacing={2} direction={{ lg: 'row', md: 'col' }}>

                            {file.imgUrls.map((url, index) => (

                                <a href={url} download key={index} > 
                                   {url}
                                </a>
                            ))}

                        </Stack>
                    </Box>
                </>

                }

            </Container>

        </>
    )
}