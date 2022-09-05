
import { SAscreen } from "./components/SAscreen"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SAdashboard } from "./pages/SAdashboard";
import { SAcase } from "./pages/SAnewCase";
import { Login } from "./Authentication/login";
import PrivateRoute from "./Authentication/PrivateRoute";
import { SAfiles } from "./pages/SAfiles";
import { Admin } from "./pages/Admin";
import { AdminScreen } from "./pages/AdminScreen";
import { AdminDashboard } from "./pages/AdminDashboard";
import { SpeedyDashboard } from "./pages/SpeedyDashboard";
import { SpeedyScreen } from "./pages/SpeedyScreen";
import { Speedy } from "./pages/Speedy";
import { SpeedyAdminfiles } from "./pages/SpeedyAdminfiles";
import { EditStatus } from "./pages/EditStatus";
import { EditAdminStatus } from "./pages/EditAdminStatus";
import { AdminFile } from "./pages/AdminFile";
import { AdminCases } from "./pages/AdminCases";
import { createTheme, ThemeProvider } from "@mui/material";
import { EditAdminFiles } from "./pages/EditAdminFiles";

function App() {

 

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Trebuchet MS',
        "sans-serif"
      ].join(",")
    }
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>


          <Routes>

            <Route path="sascreen" element={<SAscreen />} >
              <Route path="dashboard" element={<SAdashboard />} />
              <Route path="sacase" element={<SAcase />} />

              <Route path="dashboard/:fileId" element={<SAfiles />} />
            </Route>

            <Route path="adminscreen" element={<AdminScreen />} >
              <Route path="admindashboard" element={<AdminDashboard />} />

              <Route path="admin" element={<Admin />} />
              <Route path="admincases" element={<AdminCases />} />
              <Route path="admincases/:adminfileId" element={<EditAdminFiles />} />

              <Route path="admindashboard/:fileId" element={<AdminFile />} />

            </Route>


            <Route path="speedyhousing" element={<SpeedyScreen />} >
              <Route path="speedydashboard" element={<SpeedyDashboard />} />

              <Route path="speedy" element={<Speedy />} />
              <Route path="speedydashboard/:fileId" element={<EditStatus />} />
              <Route path="speedy/:adminfileId" element={<EditAdminStatus />} />




            </Route>


            <Route path="/" element={<Login />} />



          </Routes>
        </BrowserRouter>,
      </ThemeProvider>
    </>
  );
}

export default App;
