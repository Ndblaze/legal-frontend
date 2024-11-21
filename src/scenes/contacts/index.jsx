import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from 'axios';
import DocumentDetailsDialog from './DocumentDetailsDialog';

const Contacts = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null); // State for selected document
  const [openDialog, setOpenDialog] = useState(false); // State for dialog open/close
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch documents from the backend
  useEffect(() => {
    fetchDocuments()
  }, []);

  const fetchDocuments = () =>{
    axios.get('http://3.93.236.20:5001/documents')
      .then((response) => {
        setDocuments(response.data);
        console.log("Data fetched successfully");
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      });
  }

  // Handle row click to fetch and display document details
  const handleRowClick = (params) => {
    const doc_id = params.row.id; // Ensure this matches your table's `_id`
    console.log('Clicked document ID:', doc_id);

    axios
      .get(`http://3.93.236.20:5001/documents/${encodeURIComponent(doc_id)}`)
      .then((response) => {
        setSelectedDocument(response.data); // Set selected document for the dialog
        setOpenDialog(true); // Open the dialog
        console.log('Data fetched successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error.response?.status, error.response?.data);
      });
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDocument(null);
  };

  // Transform the data into rows for the DataGrid
  const rows = documents.map((item) => ({
    id: item._id, // DataGrid requires an `id` field
    citation: item.citation,
    date: item.date,
    location: item.location,
    judge: item.judge.name,
    case_type: item.case_type,
    applicants: item.parties.applicants.map((a) => a.name).join(", "),
    respondents: item.parties.respondents.join(", "),
    decision_outcome: item.decision.outcome,
    decision_date: item.decision.date,
  }));

  console.log(rows);

  const columns = [
    { field: "id", headerName: "Docket Number", flex: 1 },
    { field: "citation", headerName: "Citation", flex: 1 },
    { field: "date", headerName: "Judgment Date", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "judge", headerName: "Judge", flex: 1 },
    { field: "case_type", headerName: "Case Type", flex: 1 },
    { field: "applicants", headerName: "Applicants", flex: 1 },
    { field: "respondents", headerName: "Respondents", flex: 1.5 },
    { field: "decision_outcome", headerName: "Outcome", flex: 1 },
    { field: "decision_date", headerName: "Decision Date", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="ALL DOCUMENTS"
        subtitle="List of All legal documents"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick} // Attach your handler here
        />
      </Box>

      {/* Use the DocumentDetailsDialog Component */}
      <DocumentDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        document={selectedDocument}
        onDelete={fetchDocuments}
      />

    </Box>
  );
};

export default Contacts;
