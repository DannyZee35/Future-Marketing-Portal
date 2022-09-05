import { Container, IconButton, Box, Typography, Button } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { db } from "../Authentication/firebaseConfig";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    setDoc
} from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Outlet, useNavigate } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const drawerWidth = 240;




export const SpeedyDashboard = () => {
    const navigate = useNavigate()
    const [selects, setSelects] = useState('')
    const [data, setData] = useState([]);
    useEffect(() => {

        const unsub = onSnapshot(
            collection(db, "files"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete?")) {
                await deleteDoc(doc(db, "files", id));
                alert("Done");
            }

        } catch (err) {
            console.log(err);
        }
    };


    const columns = [
        { field: 'customId', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Client name', width: 250 },
        {
            field: 'status', headerName: 'Status', width: 250,
            type: "singleSelect",


            renderCell: (cellValues) => {

                return (
                    <>
                        <div style={{
                            padding:'10px',
                            borderRadius:'10px',
                             backgroundColor:((cellValues.value === "Accepted-All docs returned" && 'green')||
                            (cellValues.value === "Accepted-Esign Sent" && 'green')||
                            (cellValues.value === "Accepted-Clawback Replacement" && 'green')||
                            (cellValues.value === "Accepted-Backend Basis" && 'green')||
                            (cellValues.value === "Rejected-Issues with Quantum" && 'red')||
                            (cellValues.value === "Rejected-Others" && 'red')||
                            (cellValues.value === "Call Completed-In Review" && 'yellow')||
                            (cellValues.value === "Pending" && 'yellow')||
                            (cellValues.value === "Client on LTK" && 'yellow')
                        
                            )
                            
                        }}>
                      
                            {cellValues.value}
                    </div>

                    </>
                );
            },

        },


{
    field: "action",
        headerName: "Action",
            width: 350,
                renderCell: (params) => {

                    return (
                        <>
                            <IconButton aria-label="delete" size="large" color="primary"
                                onClick={() => navigate(`${params.row.id}`)}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" sx={{ color: 'red' }} onClick={() => handleDelete(params.row.id)}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </>
                    );
                },
        }
    ];

const updateUser = async (id, status) => {

    const userDoc = doc(db, "files", id)
    await setDoc(userDoc, { status: "abc" }, { merge: true }).then(() => {
        alert("saved");
    }).catch((error) => {
        alert(error);
    })


}


return (
    <>
        <Container maxWidth={"xl"} sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >

            <h1>SA Cases</h1>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid

                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>



        </Container>



    </>
)
}