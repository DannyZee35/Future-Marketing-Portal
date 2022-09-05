import {Container} from "@mui/material"
import { DrawerComponent } from "../components/Drawer"
import { Outlet } from "react-router-dom"

export const SpeedyScreen = () =>{

    return(
        <>
        <Container maxWidth={"sm"}>

      
            <DrawerComponent text={"Speedy Housing Dashboard"} text2={"Admin Cases"}   
            to="speedydashboard" to2="speedy"  heading="Speedy Housing Portal"/>
        </Container>
        
        <Outlet/>

        </>
    )
}