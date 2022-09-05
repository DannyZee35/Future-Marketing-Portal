import {Container} from "@mui/material"
import { DrawerComponent } from "./Drawer"
import { Outlet } from "react-router-dom"
export const SAscreen = () =>{

    return(
        <>
        <Container maxWidth={"sm"}>

      
            <DrawerComponent text={"Dashboard"} text2={"Add New Case"} to="dashboard" to2="sacase"     heading="SA Portal"/>
       
        </Container>
        <Outlet/>
        
        </>
    )
}