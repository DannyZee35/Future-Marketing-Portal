import { Box, Button, Container, TextField, Stack, CircularProgress, Typography } from "@mui/material"
import { storage } from "../Authentication/firebaseConfig";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useRef, useEffect } from "react";
import { async } from "@firebase/util";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Authentication/firebaseConfig";
import { v4 as uuidv4 } from "uuid"
import { auth } from "../Authentication/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const drawerWidth = 240;




export const Admin = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [loading, setLoading] = useState(false);
    //const [name, setName] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        images: {},
        fileName: '',
        customId: '',
    })

    const {
        name,
        images,
        fileName,
        customId,
    } = formData


    //..................
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid })
                } else {
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    //..............
    const handleSubmit = async (e) => {
        e.preventDefault();


        //................storage.............
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const filename = `${auth.currentUser.uid}-${image.name}
                -${uuidv4()}`

                const storageRef = ref(storage, `images/${image.name}`)

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }

                        setLoading(true)

                    },
                    (error) => {
                        reject(error)
                        switch (error.code) {
                            case 'storage/unauthorized':
                                break;
                            case 'storage/canceled':
                                break;

                            // ...

                            case 'storage/unknown':
                                break;
                        }

                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            })
        }

        //..............for alll ..............

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch((error) => {
            alert(error);
            return
        })
        console.log(imgUrls)

        const formDataCopy = {
            ...formData,
            imgUrls,



        }


        delete formDataCopy.images
        await addDoc(collection(db, 'adminCases'), formDataCopy)
        setLoading(false)

        alert("Saved");



        //...........................................


    }
    const onMutate = (e) => {
        let boolean = null

        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }

        // Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }))
        }

        // Text/Booleans/Numbers
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
    }

    return (
        <>

            <Container maxWidth={"xl"} sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>

                <Box onSubmit={handleSubmit} component="form">
                    <Box

                        sx={{
                            height: "700px", marginTop: '50px',
                            borderRadius: "10px", marginRight: '600px',

                            boxShadow: '1px 2px 9px #6c8bf9',


                        }}>
                    <Stack direction="column" alignItems="start" spacing={5} sx={{
                        paddingTop: "150px", paddingLeft: "30px"
                    }}>
                        <Typography variant="h3" >

                            Add New Case
                        </Typography>


                        <TextField label="ID" id='customId'
                            variant="outlined" value={customId} type="text" onChange={onMutate} />
                        <TextField label="File Name" id='fileName'
                            variant="outlined" value={fileName} type="text" onChange={onMutate} />
                        <TextField label="Client Name" id='name'
                            variant="outlined" value={name} type="text" onChange={onMutate} />
                        <Button variant="contained" component="label">

                            <input multiple id='images'
                                type="file" onChange={onMutate}
                            />
                        </Button>

                        {loading ? <CircularProgress /> : <Button type='submit' variant="contained" size="large" sx={{ textTransform: "none" }}>
                            Submit
                        </Button>}

                    </Stack>
                </Box>
            </Box>


        </Container>



        </>
    )
}