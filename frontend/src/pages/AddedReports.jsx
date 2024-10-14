import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    CircularProgress,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Card,
    CardContent,
    useMediaQuery,
    Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AddedReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 639px)"); // Detect mobile devices based on your 'sms' breakpoint

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/medicalReport");
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
                setError("🛑 Failed to fetch reports. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleOpenModal = (report) => {
        setSelectedReport(report);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedReport(null);
    };

    const handleUpdateReport = async () => {
        try {
            await axios.put(`http://localhost:3000/api/medicalReport/${selectedReport._id}`, selectedReport);
            setReports((prevReports) =>
                prevReports.map((report) => (report._id === selectedReport._id ? selectedReport : report))
            );
            handleCloseModal();
        } catch (error) {
            console.error("Error updating report:", error);
            setError("❌ Failed to update report. Please try again.");
        }
    };

    const handleDeleteReport = (report) => {
        setReportToDelete(report);
        setDeleteConfirmationOpen(true);
    };

    const confirmDeleteReport = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/medicalReport/${reportToDelete._id}`);
            setReports(reports.filter((report) => report._id !== reportToDelete._id));
            setReportToDelete(null);
            setDeleteConfirmationOpen(false);
            setError("🗑️ Report deleted successfully!");
        } catch (error) {
            console.error("Error deleting report:", error);
            setError("❌ Failed to delete report. Please try again.");
        }
    };

    const renderReportCard = (report, index) => (
        <Card key={report._id} variant="outlined" style={{ margin: "10px 0", borderRadius: "10px" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    🆔 Report ID: {`R${String(index + 1).padStart(3, "0")}`}
                </Typography>
                <Typography>👤 Patient Name: {report.patientName}</Typography> {/* Add Patient Name */}
                <Typography>🍭 Sugar Level: {report.sugarLevel} mg/dL</Typography>
                <Typography>🩺 Blood Pressure: {report.bloodPressure} mmHg</Typography>
                <Typography>💓 Heart Rate: {report.heartRate} bpm</Typography>
                <Typography>📅 Follow-Up Date: {new Date(report.followUpDate).toLocaleDateString()}</Typography>
                <Box display="flex" justifyContent="space-between" marginTop="10px">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(report)}
                        style={{ borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                    >
                        ✏️ Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteReport(report)}
                        style={{ borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                    >
                        🗑️ Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
    

    return (
        <div className={`flex`}>
            <Sidebar />
            <div className={`w-full min-h-screen bg-gray-100 p-4 ${isMobile ? "ml-0" : "ml-64"}`}>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    component="h1"
                    gutterBottom
                    className="text-blue-700 text-center"
                >
                    🩺 Medical Reports Overview
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {isMobile ? (
                            <Box>
                                {reports.map((report, index) => renderReportCard(report, index))}
                            </Box>
                        ) : (
                            <TableContainer component={Paper} className="max-w-4xl mx-auto">
                                <Table>
                                <TableHead>
    <TableRow>
        <TableCell><strong>🆔 Report ID</strong></TableCell>
        <TableCell><strong>👤 Patient Name</strong></TableCell> {/* Add Patient Name Column */}
        <TableCell><strong>🍭 Sugar Level</strong></TableCell>
        <TableCell><strong>🩺 Blood Pressure</strong></TableCell>
        <TableCell><strong>💓 Heart Rate</strong></TableCell>
        <TableCell><strong>📅 Follow-Up Date</strong></TableCell>
        <TableCell><strong>🔧 Actions</strong></TableCell>
    </TableRow>
</TableHead>

<TableBody>
    {reports.map((report, index) => (
        <TableRow key={report._id}>
            <TableCell>R{String(index + 1).padStart(3, "0")}</TableCell>
            <TableCell>{report.patientName}</TableCell> {/* Display Patient Name */}
            <TableCell>{report.sugarLevel}</TableCell>
            <TableCell>{report.bloodPressure}</TableCell>
            <TableCell>{report.heartRate}</TableCell>
            <TableCell>{new Date(report.followUpDate).toLocaleDateString()}</TableCell>
            <TableCell>
                <Box display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(report)}
                        style={{ borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                    >
                        ✏️ Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteReport(report)}
                        style={{ borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                    >
                        🗑️ Delete
                    </Button>
                </Box>
            </TableCell>
        </TableRow>
    ))}
</TableBody>

                                </Table>
                            </TableContainer>
                        )}
                    </>
                )}
                <Snackbar 
                    open={Boolean(error)} 
                    autoHideDuration={6000} 
                    onClose={() => setError(null)} 
                    message={error} 
                />

<Dialog open={open} onClose={handleCloseModal} fullScreen={isMobile}>
    <DialogTitle>🆕 Update Report</DialogTitle>
    <DialogContent>
        {selectedReport && (
            <>
                <TextField
                    label="🍭 Sugar Level (mg/dL)"
                    type="number"
                    value={selectedReport.sugarLevel}
                    onChange={(e) => setSelectedReport({ ...selectedReport, sugarLevel: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="🩺 Blood Pressure (mmHg)"
                    type="number"
                    value={selectedReport.bloodPressure}
                    onChange={(e) => setSelectedReport({ ...selectedReport, bloodPressure: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="💓 Heart Rate (bpm)"
                    type="number"
                    value={selectedReport.heartRate}
                    onChange={(e) => setSelectedReport({ ...selectedReport, heartRate: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="🍔 Cholesterol Level (mg/dL)"
                    type="number"
                    value={selectedReport.cholesterolLevel}
                    onChange={(e) => setSelectedReport({ ...selectedReport, cholesterolLevel: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="⚖️ Weight (kg)"
                    type="number"
                    value={selectedReport.weight}
                    onChange={(e) => setSelectedReport({ ...selectedReport, weight: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="📏 Height (cm)"
                    type="number"
                    value={selectedReport.height}
                    onChange={(e) => setSelectedReport({ ...selectedReport, height: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="📝 Symptoms"
                    value={selectedReport.symptoms}
                    onChange={(e) => setSelectedReport({ ...selectedReport, symptoms: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="🩺 Diagnosis"
                    value={selectedReport.diagnosis}
                    onChange={(e) => setSelectedReport({ ...selectedReport, diagnosis: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="💊 Treatment"
                    value={selectedReport.treatment}
                    onChange={(e) => setSelectedReport({ ...selectedReport, treatment: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="💊 Prescription"
                    value={selectedReport.prescription}
                    onChange={(e) => setSelectedReport({ ...selectedReport, prescription: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
               
                <TextField
                    label="📝 Notes"
                    value={selectedReport.notes}
                    onChange={(e) => setSelectedReport({ ...selectedReport, notes: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                />
            </>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
            ❌ Cancel
        </Button>
        <Button onClick={handleUpdateReport} color="primary">
            💾 Save Changes
        </Button>
    </DialogActions>
</Dialog>

<Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
    <DialogTitle>🗑️ Confirm Deletion</DialogTitle>
    <DialogContent>
        <Typography>
            ⚠️ Are you sure you want to delete this report? This action cannot be undone.
        </Typography>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
            ❌ Cancel
        </Button>
        <Button onClick={confirmDeleteReport} color="secondary">
            🗑️ Delete
        </Button>
    </DialogActions>
</Dialog>

            </div>
        </div>
    );
};

export default AddedReportsPage;
