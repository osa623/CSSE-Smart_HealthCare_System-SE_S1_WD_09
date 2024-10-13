import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddedReportsPage = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/medicalReport");
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    // Define columns for the table
    const columns = React.useMemo(
        () => [
            {
                Header: "Report ID",
                accessor: (row, index) => `R${String(index + 1).padStart(3, '0')}`, // Format ID as R001, R002, etc.
            },
            {
                Header: "Sugar Level (mg/dL)",
                accessor: "sugarLevel",
            },
            {
                Header: "Blood Pressure (mmHg)",
                accessor: "bloodPressure",
            },
            {
                Header: "Heart Rate (bpm)",
                accessor: "heartRate",
            },
            {
                Header: "Follow-Up Date",
                accessor: "followUpDate",
                Cell: ({ value }) => new Date(value).toLocaleDateString(), // Formatting date
            },
            {
                Header: "Actions",
                accessor: (row) => (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/report/${row._id}`)} // Use navigate to go to report details page
                    >
                        More
                    </Button>
                ),
            },
        ],
        [navigate] // Include navigate in dependencies
    );

    // Use the table hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: reports });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <Typography variant="h4" component="h1" gutterBottom className="text-blue-700">
                Medical Reports Overview
            </Typography>
            <TableContainer component={Paper} className="max-w-4xl">
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps()} className="font-bold">
                                        {column.render("Header")}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AddedReportsPage;
