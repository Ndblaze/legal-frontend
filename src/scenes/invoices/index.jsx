import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import axios from "axios";

const UpdateDocumentForm = () => {
  const [documentData, setDocumentData] = useState(null);
  const [docID, setDocID] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDocument = (docketNumber) => {
    const doc_id = docketNumber;
    console.log('Clicked  ID:', doc_id);

    axios.get(`http://3.93.236.20:5001/documents/${encodeURIComponent(doc_id)}`)
    .then((response) => {
      setDocumentData(response.data);
    }).catch((error) => {
      console.error("Error fetching document:", error);
      alert("Failed to fetch document. Please check the Docket Number.");
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(`http://3.93.236.20:5001/documents/${values._id}`, values);
      console.log("Document updated successfully:", response.data);
      alert("Document updated successfully.");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to update document.");
    }
  };

  const validationSchema = yup.object().shape({
    _id: yup.string().required("Docket number is required"),
    citation: yup.string().required("Citation is required"),
    date: yup.string().required("Date is required"),
    location: yup.string().required("Location is required"),
    judge: yup.object().shape({
      name: yup.string().required("Judge name is required"),
    }),
    case_type: yup.string().required("Case type is required"),
  });

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Update Legal Document
      </Typography>

      {/* Fetch Document Section */}
      <Box display="flex" gap="10px" mb="20px">
        <TextField
          fullWidth
          label="Enter Docket Number"
          variant="outlined"
          onBlur={(e) => setDocID(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => fetchDocument(docID)}>
          Fetch Document
        </Button>
      </Box>

      {loading && <Typography>Loading...</Typography>}

      {/* Update Document Form */}
      {documentData && (
        <Formik
          initialValues={documentData}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="20px" gridTemplateColumns="repeat(2, 1fr)">
                {/* General Fields */}
                <TextField
                  fullWidth
                  label="Docket Number"
                  name="_id"
                  value={values._id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched._id && !!errors._id}
                  helperText={touched._id && errors._id}
                />
                <TextField
                  fullWidth
                  label="Citation"
                  name="citation"
                  value={values.citation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.citation && !!errors.citation}
                  helperText={touched.citation && errors.citation}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Judgment Date"
                  name="date"
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={values.location}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                />
                <TextField
                  fullWidth
                  label="Judge Name"
                  name="judge.name"
                  value={values.judge.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.judge?.name && !!errors.judge?.name}
                  helperText={touched.judge?.name && errors.judge?.name}
                />
                <TextField
                  fullWidth
                  label="Case Type"
                  name="case_type"
                  value={values.case_type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.case_type && !!errors.case_type}
                  helperText={touched.case_type && errors.case_type}
                />
              </Box>

              {/* Parties Section */}
              <Typography variant="h6" mt="20px">
                Parties
              </Typography>
              <FieldArray
                name="parties.applicants"
                render={(arrayHelpers) => (
                  <Box>
                    {values.parties.applicants.map((applicant, index) => (
                      <Box key={index} display="flex" gap="10px" mb="10px">
                        <TextField
                          fullWidth
                          label={`Applicant ${index + 1}`}
                          name={`parties.applicants.${index}.name`}
                          value={applicant.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            !!touched.parties?.applicants?.[index]?.name &&
                            !!errors.parties?.applicants?.[index]?.name
                          }
                          helperText={
                            touched.parties?.applicants?.[index]?.name &&
                            errors.parties?.applicants?.[index]?.name
                          }
                        />
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => arrayHelpers.push({ name: "" })}
                    >
                      Add Applicant
                    </Button>
                  </Box>
                )}
              />

              {/* Submit Button */}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" variant="contained" color="primary">
                  Update Document
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default UpdateDocumentForm;
