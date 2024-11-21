import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const AddDocumentForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("http://3.93.236.20:5001/documents", values);
      console.log("Document added successfully:", response.data);
      resetForm(); // Reset form after submission
      alert("Document added successfully!");
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to add document. Please try again.");
    }
  };
  


  const initialValues = {
    _id: "", // Docket Number
    citation: "",
    date: "",
    location: "",
    judge: {
      name: "",
    },
    parties: {
      applicants: [{ name: "" }],
      respondents: [""],
    },
    case_type: "",
    summary: {
      introduction: "",
      key_points: [
        {
          section: "",
          content: "",
        },
      ],
    },
    legal_arguments: [
      {
        issue: "",
        arguments: [""],
        court_findings: [
          {
            finding: "",
            justification: "",
          },
        ],
      },
    ],
    metadata: {
      docket_number: "",
      hearing_date: "",
      filing_details: {
        applicants_attorney: "",
        respondents_attorney: "",
      },
      related_cases: [
        {
          citation: "",
          related_docket: "",
          relation: "",
        },
      ],
    },
    decision: {
      outcome: "",
      date: "",
      orders: [""],
      appeal_status: "",
      judge_signature: "",
    },
  };

  const validationSchema = yup.object().shape({
    _id: yup.string().required("Docket number is required"),
    citation: yup.string().required("Citation is required"),
    date: yup.string().required("Date is required"),
    location: yup.string().required("Location is required"),
    judge: yup.object().shape({
      name: yup.string().required("Judge name is required"),
    }),
    parties: yup.object().shape({
      applicants: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required("Applicant name is required"),
          })
        )
        .min(1, "At least one applicant is required"),
      respondents: yup
        .array()
        .of(yup.string().required("Respondent name is required"))
        .min(1, "At least one respondent is required"),
    }),
    case_type: yup.string().required("Case type is required"),
    summary: yup.object().shape({
      introduction: yup.string().required("Introduction is required"),
      key_points: yup
        .array()
        .of(
          yup.object().shape({
            section: yup.string().required("Section is required"),
            content: yup.string().required("Content is required"),
          })
        )
        .min(1, "At least one key point is required"),
    }),
    legal_arguments: yup.array().of(
      yup.object().shape({
        issue: yup.string().required("Issue is required"),
        arguments: yup
          .array()
          .of(yup.string().required("Argument is required"))
          .min(1, "At least one argument is required"),
        court_findings: yup.array().of(
          yup.object().shape({
            finding: yup.string().required("Finding is required"),
            justification: yup.string().required("Justification is required"),
          })
        ),
      })
    ),
    metadata: yup.object().shape({
      docket_number: yup.string().required("Docket number is required"),
      hearing_date: yup.string().required("Hearing date is required"),
      filing_details: yup.object().shape({
        applicants_attorney: yup.string().required("Applicants' attorney is required"),
        respondents_attorney: yup.string().required("Respondents' attorney is required"),
      }),
      related_cases: yup.array().of(
        yup.object().shape({
          citation: yup.string().required("Citation is required"),
          related_docket: yup.string().required("Related docket is required"),
          relation: yup.string().required("Relation is required"),
        })
      ),
    }),
    decision: yup.object().shape({
      outcome: yup.string().required("Outcome is required"),
      date: yup.string().required("Decision date is required"),
      orders: yup.array().of(yup.string().required("Order is required")),
      appeal_status: yup.string(),
      judge_signature: yup.string().required("Judge signature is required"),
    }),
  });

  return (
    <Box m="20px">
      <Header title="ADD LEGAL DOCUMENT" subtitle="Create a New Legal Document Entry" />

      <Box
        sx={{
          maxHeight: "80vh", // Maximum height for the form container
          overflow: "auto", // Enables scrolling for overflow content
          border: "1px solid #1F2A40", // Optional border for clarity
          padding: "20px", // Padding inside the scrollable area
          borderRadius: "8px",
          backgroundColor: "#101624", // Background color for the form area
        }}
      >

      <Formik
        initialValues={initialValues}
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
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >


  {/* ID Field */}
  <TextField
    fullWidth
    variant="filled"
    label="ID (Docket Number)"
    name="_id" // Ensure this matches your Formik values structure
    value={values._id}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched._id && !!errors._id}
    helperText={touched._id && errors._id}
  />

  {/* Citation Field */}
  <TextField
    fullWidth
    variant="filled"
    label="Citation"
    name="citation" // Ensure this matches your Formik values structure
    value={values.citation}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched.citation && !!errors.citation}
    helperText={touched.citation && errors.citation}
  />

<TextField
  fullWidth
  variant="filled"
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
    variant="filled"
    type="date" // Enables the date picker
    label="Judgment Date"
    name="date"
    value={values.date}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched.date && !!errors.date}
    helperText={touched.date && errors.date}
    InputLabelProps={{
      shrink: true, // Ensures the label is not overlapping the date value
    }}
  />

{/* Nested Fields (e.g., Judge, Parties) */}
<TextField
  fullWidth
  variant="filled"
  label="Judge Name"
  name="judge.name"
  value={values.judge.name}
  onBlur={handleBlur}
  onChange={handleChange}
  error={!!touched.judge?.name && !!errors.judge?.name}
  helperText={touched.judge?.name && errors.judge?.name}
  sx={{ gridColumn: "span 1" }}
/>

<FieldArray
  name="parties.applicants"
  render={(arrayHelpers) => (
    <Box>
      {values.parties.applicants.map((applicant, index) => (
        <Box key={index} display="flex" alignItems="center" gap="10px" mb="10px">
          <TextField
            fullWidth
            variant="filled"
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
            color="secondary"
            variant="outlined"
            onClick={() => arrayHelpers.remove(index)} // Remove an applicant
          >
            Remove
          </Button>
        </Box>
      ))}
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => arrayHelpers.push({ name: "" })} // Add a new applicant
      >
        Add Applicant
      </Button>
    </Box>
  )}
/>

<FieldArray
  name="parties.respondents"
  render={(arrayHelpers) => (
    <Box>
      {values.parties.respondents.map((respondent, index) => (
        <Box key={index} display="flex" alignItems="center" gap="10px" mb="10px">
          <TextField
            fullWidth
            variant="filled"
            label={`Respondent ${index + 1}`}
            name={`parties.respondents.${index}`}
            value={respondent}
            onBlur={handleBlur}
            onChange={handleChange}
            error={
              !!touched.parties?.respondents?.[index] &&
              !!errors.parties?.respondents?.[index]
            }
            helperText={
              touched.parties?.respondents?.[index] &&
              errors.parties?.respondents?.[index]
            }
          />
          <Button
            type="button"
            color="secondary"
            variant="outlined"
            onClick={() => arrayHelpers.remove(index)} // Remove a respondent
          >
            Remove
          </Button>
        </Box>
      ))}
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => arrayHelpers.push("")} // Add a new respondent
      >
        Add Respondent
      </Button>
    </Box>
  )}
/>
<Box>

  <TextField
    select
    fullWidth
    variant="filled"
    //label="Select Case Type"
    name="case_type"
    value={values.case_type}
    onChange={handleChange}
    onBlur={handleBlur}
    error={!!touched.case_type && !!errors.case_type}
    helperText={touched.case_type && errors.case_type}
    SelectProps={{
      native: true, // Use native dropdown for simplicity
    }}
  >
    <option value="">Select Case Type</option>
    <option value="Judicial Review">Judicial Review</option>
    <option value="Charter Relief">Charter Relief</option>
    <option value="Appeal Hearing">Appeal Hearing</option>
    <option value="Other">Other</option>
  </TextField>
</Box>
<Box>
  {/* Outcome Field */}
  <TextField
    fullWidth
    variant="filled"
    label="Outcome"
    name="decision.outcome"
    value={values.decision.outcome}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched.decision?.outcome && !!errors.decision?.outcome}
    helperText={touched.decision?.outcome && errors.decision?.outcome}
    sx={{ mb: 2 }}
  />
  </Box>
  <Box>
    <TextField
      fullWidth
      variant="filled"
      type="date"
      label="Decision Date"
      name="decision.date"
      value={values.decision.date}
      onBlur={handleBlur}
      onChange={handleChange}
      error={!!touched.decision?.date && !!errors.decision?.date}
      helperText={touched.decision?.date && errors.decision?.date}
      InputLabelProps={{
        shrink: true, // Ensures the label does not overlap the date input
      }}
      sx={{ mb: 2 }}
    />
  </Box>
  <FieldArray
    name="decision.orders"
    render={(arrayHelpers) => (
      <Box>
        {values.decision.orders.map((order, index) => (
          <Box key={index} display="flex" alignItems="center" gap="10px" mb="10px">
            <TextField
              fullWidth
              variant="filled"
              label={`Order ${index + 1}`}
              name={`decision.orders.${index}`}
              value={order}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.decision?.orders?.[index] && !!errors.decision?.orders?.[index]}
              helperText={touched.decision?.orders?.[index] && errors.decision?.orders?.[index]}
            />
            <Button
              type="button"
              color="secondary"
              variant="outlined"
              onClick={() => arrayHelpers.remove(index)} // Remove an order
            >
              Remove
            </Button>
          </Box>
        ))}
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => arrayHelpers.push("")} // Add a new order
        >
          Add Order
        </Button>
      </Box>
    )}
  />
  {/* Appeal Status Field */}
  <TextField
    fullWidth
    variant="filled"
    label="Appeal Status"
    name="decision.appeal_status"
    value={values.decision.appeal_status}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched.decision?.appeal_status && !!errors.decision?.appeal_status}
    helperText={touched.decision?.appeal_status && errors.decision?.appeal_status}
    sx={{ mt: 0 }}
  />

  {/* Judge Signature Field */}
  <TextField
    fullWidth
    variant="filled"
    label="Judge Signature"
    name="decision.judge_signature"
    value={values.decision.judge_signature}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched.decision?.judge_signature && !!errors.decision?.judge_signature}
    helperText={touched.decision?.judge_signature && errors.decision?.judge_signature}
    sx={{ mt: 0 }}
  />


  {/* Docket Number Field */}
  <TextField
    fullWidth
    variant="filled"
    label="Docket Number"
    name="metadata.docket_number"
    value={values.metadata.docket_number}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched.metadata?.docket_number && !!errors.metadata?.docket_number}
    helperText={touched.metadata?.docket_number && errors.metadata?.docket_number}
  />

  {/* Hearing Date Field */}
  <TextField
    fullWidth
    variant="filled"
    type="date"
    label="Hearing Date"
    name="metadata.hearing_date"
    value={values.metadata.hearing_date}
    onBlur={handleBlur}
    onChange={handleChange}
    error={!!touched.metadata?.hearing_date && !!errors.metadata?.hearing_date}
    helperText={touched.metadata?.hearing_date && errors.metadata?.hearing_date}
    InputLabelProps={{
      shrink: true, // Ensure label doesn't overlap the date input
    }}
  />


  <TextField
    fullWidth
    variant="filled"
    label="Applicants' Attorney"
    name="metadata.filing_details.applicants_attorney"
    value={values.metadata.filing_details.applicants_attorney}
    onBlur={handleBlur}
    onChange={handleChange}
    error={
      !!touched.metadata?.filing_details?.applicants_attorney &&
      !!errors.metadata?.filing_details?.applicants_attorney
    }
    helperText={
      touched.metadata?.filing_details?.applicants_attorney &&
      errors.metadata?.filing_details?.applicants_attorney
    }
  />
  <TextField
    fullWidth
    variant="filled"
    label="Respondents' Attorney"
    name="metadata.filing_details.respondents_attorney"
    value={values.metadata.filing_details.respondents_attorney}
    onBlur={handleBlur}
    onChange={handleChange}
    error={
      !!touched.metadata?.filing_details?.respondents_attorney &&
      !!errors.metadata?.filing_details?.respondents_attorney
    }
    helperText={
      touched.metadata?.filing_details?.respondents_attorney &&
      errors.metadata?.filing_details?.respondents_attorney
    }
  />

  {/* Related Cases (Dynamic List) */}
  <FieldArray
    name="metadata.related_cases"
    render={(arrayHelpers) => (
      <Box>
        {values.metadata.related_cases.map((relatedCase, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column" // Align nested fields vertically
            gap="10px" // Add spacing between nested fields
            mb="20px" // Add margin below each related case block
          >
            <TextField
              fullWidth
              variant="filled"
              label="Related Cases Citation"
              name={`metadata.related_cases.${index}.citation`}
              value={relatedCase.citation}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                !!touched.metadata?.related_cases?.[index]?.citation &&
                !!errors.metadata?.related_cases?.[index]?.citation
              }
              helperText={
                touched.metadata?.related_cases?.[index]?.citation &&
                errors.metadata?.related_cases?.[index]?.citation
              }
            />
            <TextField
              fullWidth
              variant="filled"
              label="Related Docket"
              name={`metadata.related_cases.${index}.related_docket`}
              value={relatedCase.related_docket}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                !!touched.metadata?.related_cases?.[index]?.related_docket &&
                !!errors.metadata?.related_cases?.[index]?.related_docket
              }
              helperText={
                touched.metadata?.related_cases?.[index]?.related_docket &&
                errors.metadata?.related_cases?.[index]?.related_docket
              }
            />
            <TextField
              fullWidth
              variant="filled"
              label="Relation"
              name={`metadata.related_cases.${index}.relation`}
              value={relatedCase.relation}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                !!touched.metadata?.related_cases?.[index]?.relation &&
                !!errors.metadata?.related_cases?.[index]?.relation
              }
              helperText={
                touched.metadata?.related_cases?.[index]?.relation &&
                errors.metadata?.related_cases?.[index]?.relation
              }
            />
            <Button
              type="button"
              color="secondary"
              variant="outlined"
              onClick={() => arrayHelpers.remove(index)} // Remove a related case
            >
              Remove Related Case
            </Button>
          </Box>
        ))}
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() =>
            arrayHelpers.push({ citation: "", related_docket: "", relation: "" })
          } // Add a new related case
        >
          Add Related Case
        </Button>
      </Box>
    )}
  />

<FieldArray
  name="legal_arguments"
  render={(arrayHelpers) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Legal Arguments
      </Typography>
      {values.legal_arguments.map((argument, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="column"
          gap="20px"
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#101624",
            marginBottom: "20px",
          }}
        >
          {/* Issue Field */}
          <TextField
            fullWidth
            variant="filled"
            label="Issue"
            name={`legal_arguments.${index}.issue`}
            value={argument.issue}
            onBlur={handleBlur}
            onChange={handleChange}
            error={
              !!touched.legal_arguments?.[index]?.issue &&
              !!errors.legal_arguments?.[index]?.issue
            }
            helperText={
              touched.legal_arguments?.[index]?.issue &&
              errors.legal_arguments?.[index]?.issue
            }
          />

          <Box display="flex" flexDirection="column" gap="20px">
            {/* Arguments Section */}
            <FieldArray
              name={`legal_arguments.${index}.arguments`}
              render={(argArrayHelpers) => (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Arguments
                  </Typography>
                  {argument.arguments.map((arg, argIndex) => (
                    <Box
                      key={argIndex}
                      display="flex"
                      alignItems="center"
                      gap="10px"
                      mb="10px"
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        label={`Argument ${argIndex + 1}`}
                        name={`legal_arguments.${index}.arguments.${argIndex}`}
                        value={arg}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.legal_arguments?.[index]?.arguments?.[argIndex] &&
                          !!errors.legal_arguments?.[index]?.arguments?.[argIndex]
                        }
                        helperText={
                          touched.legal_arguments?.[index]?.arguments?.[argIndex] &&
                          errors.legal_arguments?.[index]?.arguments?.[argIndex]
                        }
                      />
                      <Button
                        type="button"
                        color="secondary"
                        variant="outlined"
                        onClick={() => argArrayHelpers.remove(argIndex)}
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => argArrayHelpers.push("")}
                  >
                    Add Argument
                  </Button>
                </Box>
              )}
            />

            {/* Court Findings Section */}
            <FieldArray
              name={`legal_arguments.${index}.court_findings`}
              render={(findArrayHelpers) => (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Court Findings
                  </Typography>
                  {argument.court_findings.map((finding, findIndex) => (
                    <Box
                      key={findIndex}
                      display="flex"
                      flexDirection="column"
                      gap="10px"
                      mb="10px"
                    >
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Finding"
                        name={`legal_arguments.${index}.court_findings.${findIndex}.finding`}
                        value={finding.finding}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.legal_arguments?.[index]?.court_findings?.[findIndex]?.finding &&
                          !!errors.legal_arguments?.[index]?.court_findings?.[findIndex]?.finding
                        }
                        helperText={
                          touched.legal_arguments?.[index]?.court_findings?.[findIndex]?.finding &&
                          errors.legal_arguments?.[index]?.court_findings?.[findIndex]?.finding
                        }
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        label="Justification"
                        name={`legal_arguments.${index}.court_findings.${findIndex}.justification`}
                        value={finding.justification}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          !!touched.legal_arguments?.[index]?.court_findings?.[findIndex]?.justification &&
                          !!errors.legal_arguments?.[index]?.court_findings?.[findIndex]?.justification
                        }
                        helperText={
                          touched.legal_arguments?.[index]?.court_findings?.[findIndex]?.justification &&
                          errors.legal_arguments?.[index]?.court_findings?.[findIndex]?.justification
                        }
                      />
                      <Button
                        type="button"
                        color="secondary"
                        variant="outlined"
                        onClick={() => findArrayHelpers.remove(findIndex)}
                      >
                        Remove Finding
                      </Button>
                    </Box>
                  ))}
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      findArrayHelpers.push({ finding: "", justification: "" })
                    }
                  >
                    Add Finding
                  </Button>
                </Box>
              )}
            />
          </Box>

          {/* Remove Legal Argument Button */}
          <Button
            type="button"
            color="secondary"
            variant="outlined"
            onClick={() => arrayHelpers.remove(index)}
          >
            Remove Legal Argument
          </Button>
        </Box>
      ))}
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() =>
          arrayHelpers.push({
            issue: "",
            arguments: [""],
            court_findings: [{ finding: "", justification: "" }],
          })
        }
      >
        Add Legal Argument
      </Button>
    </Box>
  )}
/>

<FieldArray
  name="summary.key_points"
  render={(arrayHelpers) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>

      {/* Introduction Field */}
      <TextField
        fullWidth
        variant="filled"
        label="Introduction"
        name="summary.introduction"
        value={values.summary.introduction}
        onBlur={handleBlur}
        onChange={handleChange}
        error={!!touched.summary?.introduction && !!errors.summary?.introduction}
        helperText={touched.summary?.introduction && errors.summary?.introduction}
        sx={{ mb: 2 }}
      />

      {/* Key Points Section */}
      <Typography variant="subtitle1" gutterBottom>
        Key Points
      </Typography>
      {values.summary.key_points.map((keyPoint, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="column"
          gap="10px"
          sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#101624",
            mb: "20px",
          }}
        >
          {/* Section Field */}
          <TextField
            fullWidth
            variant="filled"
            label="Section"
            name={`summary.key_points.${index}.section`}
            value={keyPoint.section}
            onBlur={handleBlur}
            onChange={handleChange}
            error={
              !!touched.summary?.key_points?.[index]?.section &&
              !!errors.summary?.key_points?.[index]?.section
            }
            helperText={
              touched.summary?.key_points?.[index]?.section &&
              errors.summary?.key_points?.[index]?.section
            }
          />

          {/* Content Field */}
          <TextField
            fullWidth
            variant="filled"
            label="Content"
            name={`summary.key_points.${index}.content`}
            value={keyPoint.content}
            onBlur={handleBlur}
            onChange={handleChange}
            error={
              !!touched.summary?.key_points?.[index]?.content &&
              !!errors.summary?.key_points?.[index]?.content
            }
            helperText={
              touched.summary?.key_points?.[index]?.content &&
              errors.summary?.key_points?.[index]?.content
            }
          />

          {/* Remove Key Point Button */}
          <Button
            type="button"
            color="secondary"
            variant="outlined"
            onClick={() => arrayHelpers.remove(index)}
          >
            Remove Key Point
          </Button>
        </Box>
      ))}

      {/* Add Key Point Button */}
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() =>
          arrayHelpers.push({ section: "", content: "" })
        }
      >
        Add Key Point
      </Button>
    </Box>
  )}
/>


              {/* Additional Dynamic Fields */}
              {/* Add respondents, key points, legal arguments, orders, etc. in a similar pattern */}
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Add Document
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
  </Box>
);
};

export default AddDocumentForm;
