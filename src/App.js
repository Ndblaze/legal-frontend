import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Invoices from "./scenes/updateDocuments";
import Contacts from "./scenes/retrieveDocuments";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

//auth with amplify cognito
import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasRedirected, setHasRedirected] = useState(false); // New state to control redirect


  useEffect(() => {
    if (user && !hasRedirected) {
      setHasRedirected(true); // Prevent future redirects
      navigate("/all_doc");
    }
  }, [user, navigate, hasRedirected]);

  return (
    <Authenticator>
      {({ signOut, user: signedInUser }) => {
        // Set the signed-in user
        if (signedInUser && !user) {
          setUser(signedInUser);
        }

        return (
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/all_doc" element={<Contacts />} />
                    <Route path="/modify_doc" element={<Invoices />} />
                    <Route path="/create_doc" element={<Form />} />
                    <Route path="/calendar" element={<Calendar />} />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        );
      }}
    </Authenticator>
  );
}

export default App;