import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

const drawerWidth = 240;
export const DrawerComponent = ({ text, text2, to, to2, heading }) => {
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
        <>
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
                    {heading}
                </Typography>

                <List>
                    <ListItem component={Link} to={to} style={{ color: "white", textDecoration: "none" }}>
                        <ListItemButton>

                            <ListItemText primary={text} />

                        </ListItemButton>
                    </ListItem>
                    <ListItem component={Link} to={to2} style={{ color: "white", textDecoration: "none" }}>
                        <ListItemButton >
                            <ListItemText primary={text2} />

                        </ListItemButton>
                    </ListItem>
                    <ListItem >
                        <ListItemButton onClick={handleSubmit} >
                            <ListItemText primary={"Logout"} />

                        </ListItemButton>
                    </ListItem>
                  
                 
                  
                </List>
            </Drawer>



        </>
    )
}