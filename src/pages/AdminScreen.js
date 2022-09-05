import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography,Container } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth";

const drawerWidth = 240;
export const AdminScreen = () => {
    const navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/');
            console.log("Sign-out successful");
        }).catch((error) => {
           alert(error)
        });
    }
    return (
        <>      <Container maxWidth={"sm"}>
            <Drawer sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: "#0c2ad4",
                    color: 'white'

                },
            }}
                variant="permanent"
                anchor="left"
            >
                <Typography variant="h5" align="center" padding={5}>
                  Admin Portal
                </Typography>

                <List>
                    <ListItem component={Link} to={"admindashboard"} style={{ color: "white", textDecoration: "none" }}>
                        <ListItemButton>

                            <ListItemText primary={"Dashboard"} />

                        </ListItemButton>
                    </ListItem>
                    <ListItem component={Link} to={"admin"} style={{ color: "white", textDecoration: "none" }}>
                        <ListItemButton >
                            <ListItemText primary={"Add New Case"} />

                        </ListItemButton>
                    </ListItem>
                    <ListItem component={Link} to={"admincases"} style={{ color: "white", textDecoration: "none" }}>
                        <ListItemButton >
                            <ListItemText primary={"Admin Cases"} />

                        </ListItemButton>
                    </ListItem>
                    <ListItem >
                        <ListItemButton onClick={handleSubmit} >
                            <ListItemText primary={"Logout"} />

                        </ListItemButton>
                    </ListItem>
                
                 
                  
                </List>
            </Drawer>
            </Container>
        
        <Outlet/>


        </>
    )
}