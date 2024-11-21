import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

//auth with amplify cognito
import { Amplify } from 'aws-amplify';

import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

// https://legal-doc-domain.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=30dg50n6mfsu6btg9h037k53f4&redirect_uri=http://localhost:5002/all_doc
    

// AZQaxdp/gylnVo9+nA1eptsqDiBqwkhHIuIriLMg (Secret access key)
// AKIAYUQGS2PRB27VVMUF     ( access key)

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}> 
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/all_doc" element={<Contacts />} />
                  <Route path="/modify_doc" element={<Invoices />} />
                  <Route path="/create_doc" element={<Form />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </Authenticator>
  );
}

export default App;