import React from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

const DocumentDetailsDialog = ({ open, onClose, document, onDelete }) => {


  // Handle the delete operation
  const handleDelete = () => {
    const _host = `3.93.236.20:5001/documents`
    //console.log(document._id)
    if (document && document._id) {
      axios
        .delete(`http://3.93.236.20:5001/documents/${encodeURIComponent(document._id)}`)
        .then(() => {
          console.log("Document deleted successfully");
          onDelete(); // Refresh or update parent state
          onClose(); // Close the dialog
        })
        .catch((error) => {
          console.error("Error deleting document:", error);
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Document Details</DialogTitle>
      <DialogContent>
        {document ? (
          <Box>
            {/* Metadata Section */}
            <Typography variant="h6" gutterBottom>Metadata</Typography>
            <Typography><strong>Docket Number:</strong> {document.metadata?.docket_number}</Typography>
            <Typography><strong>Hearing Date:</strong> {document.metadata?.hearing_date}</Typography>
            <Typography><strong>Applicants' Attorney:</strong> {document.metadata?.filing_details?.applicants_attorney}</Typography>
            <Typography><strong>Respondents' Attorney:</strong> {document.metadata?.filing_details?.respondents_attorney}</Typography>
            <Typography><strong>Related Cases:</strong></Typography>
            {document.metadata?.related_cases?.map((caseItem, index) => (
              <Box key={index} ml={2} mb={1}>
                <Typography><strong>Citation:</strong> {caseItem.citation}</Typography>
                <Typography><strong>Related Docket:</strong> {caseItem.related_docket}</Typography>
                <Typography><strong>Relation:</strong> {caseItem.relation}</Typography>
              </Box>
            ))}

            {/* Decision Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Decision</Typography>
            <Typography><strong>Outcome:</strong> {document.decision?.outcome}</Typography>
            <Typography><strong>Date:</strong> {document.decision?.date}</Typography>
            <Typography><strong>Judge Signature:</strong> {document.decision?.judge_signature}</Typography>
            <Typography><strong>Appeal Status:</strong> {document.decision?.appeal_status}</Typography>
            <Typography><strong>Orders:</strong></Typography>
            <ul>
              {document.decision?.orders?.map((order, index) => (
                <li key={index}>{order}</li>
              ))}
            </ul>

            {/* Case Details Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Case Details</Typography>
            <Typography><strong>Case Type:</strong> {document.case_type}</Typography>
            <Typography><strong>Date:</strong> {document.date}</Typography>
            <Typography><strong>Location:</strong> {document.location}</Typography>
            <Typography><strong>Judge:</strong> {document.judge?.name}</Typography>
            <Typography><strong>Citation:</strong> {document.citation}</Typography>

            {/* Summary Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Summary</Typography>
            <Typography><strong>Introduction:</strong> {document.summary?.introduction}</Typography>
            <Typography><strong>Key Points:</strong></Typography>
            {document.summary?.key_points?.map((point, index) => (
              <Box key={index} ml={2} mb={1}>
                <Typography><strong>Section:</strong> {point.section}</Typography>
                <Typography><strong>Content:</strong> {point.content}</Typography>
              </Box>
            ))}

            {/* Parties Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Parties</Typography>
            <Typography><strong>Applicants:</strong></Typography>
            <ul>
              {document.parties?.applicants?.map((applicant, index) => (
                <li key={index}>{applicant.name}</li>
              ))}
            </ul>
            <Typography><strong>Respondents:</strong></Typography>
            <ul>
              {document.parties?.respondents?.map((respondent, index) => (
                <li key={index}>{respondent}</li>
              ))}
            </ul>

            {/* Legal Arguments Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Legal Arguments</Typography>
            {document.legal_arguments?.map((argument, index) => (
              <Box key={index} style={{ marginBottom: '10px' }} ml={2}>
                <Typography><strong>Issue:</strong> {argument.issue}</Typography>
                <Typography><strong>Arguments:</strong></Typography>
                <ul>
                  {argument.arguments?.map((arg, i) => (
                    <li key={i}>{arg}</li>
                  ))}
                </ul>
                <Typography><strong>Court Findings:</strong></Typography>
                {argument.court_findings?.map((finding, i) => (
                  <Box key={i} ml={2} mb={1}>
                    <Typography><strong>Finding:</strong> {finding.finding}</Typography>
                    <Typography><strong>Justification:</strong> {finding.justification}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentDetailsDialog;
