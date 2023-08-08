import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const RootContainer = styled("div")({
  padding: "16px",
  maxWidth: "100%",
});

const TableContainerStyled = styled(TableContainer)({
  marginTop: "16px",
  borderRadius: "8px",
  overflow: "hidden",
});

const TableHeaderCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#1976d2",
  color: "#fff",
});

const Navbar = styled(AppBar)({
  backgroundColor: "#1976d2",
  marginBottom: "16px",
});

const Title = styled(Typography)({
  flexGrow: 1,
});

const RightButtonsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const NavbarButton = styled(Button)({
  marginLeft: "16px",
  color: "#fff",
});

const TableRowStyled = styled(TableRow)(({ selected }) => ({
  backgroundColor: selected ? "#00bcd4" : "transparent",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#b3e5fc",
  },
}));
const DeleteButton = styled(Button)({
  backgroundColor: "#ff3d00",
  color: "#fff",
});

const CheckboxCell = styled(TableCell)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const DeleteSelectedButton = styled(Button)({
  backgroundColor: "#ff3d00",
  color: "#fff",
  marginRight: "8px",
});

const AddButton = styled(Button)({
  backgroundColor: "#4caf50",
  color: "#fff",
  marginLeft: "16px",
});

const CustomDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    width: "50%",
    height: "50%",
  },
});
// ... (other styled components)

function App() {
  const [trains, setTrains] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [newRowData, setNewRowData] = useState({
    id: "",
    title: "",
  });
  const [addRowDialogOpen, setAddRowDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setTrains(response.data.slice(0, 13)); // Display only the first 100 rows
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowClick = (rowId) => {
    setSelectedRow((prevSelectedRow) =>
      prevSelectedRow === rowId ? null : rowId
    );
    const data = trains.find((train) => train.id === rowId);
    setSelectedRowData(data);
  };

  const handleDeleteRow = (rowId) => {
    setTrains((prevTrains) => prevTrains.filter((train) => train.id !== rowId));
    setSelectedRow(null);
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedRows(trains.map((train) => train.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => id !== rowId)
      );
    }
  };

  const handleDeleteSelected = () => {
    setTrains((prevTrains) =>
      prevTrains.filter((train) => !selectedRows.includes(train.id))
    );
    setSelectedRows([]);
    setSelectedRow(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddRow = () => {
    const newRow = {
      id: newRowData.id,
      title: newRowData.title,
    };
    setTrains((prevTrains) => [...prevTrains, newRow]);
    setNewRowData({ id: "", title: "" });
    setAddRowDialogOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredTrains = trains.filter((train) =>
    train.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedTrains = filteredTrains.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div>
      <Navbar position="static">
        <Toolbar>
          <Title variant="h6">Train Schedule</Title>
          <RightButtonsContainer>
            <NavbarButton variant="outlined">Login</NavbarButton>
            <NavbarButton variant="contained" color="secondary">
              Contact Us
            </NavbarButton>
            <NavbarButton
              variant="contained"
              color="primary"
              onClick={() => setAddRowDialogOpen(true)}
            >
              Add New Row
            </NavbarButton>
          </RightButtonsContainer>
          <TextField
            label="Search Train Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Toolbar>
      </Navbar>
      <RootContainer>
        <Typography variant="h4" gutterBottom>
          Train Schedule
        </Typography>
        {selectedRows.length > 0 && (
          <div style={{ marginBottom: "16px", display: "flex" }}>
            <DeleteSelectedButton
              variant="contained"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </DeleteSelectedButton>
          </div>
        )}
        <TableContainerStyled component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <CheckboxCell>
                  <Checkbox
                    checked={selectedRows.length === trains.length}
                    onChange={handleSelectAllRows}
                  />
                </CheckboxCell>
                <TableHeaderCell>Train ID</TableHeaderCell>
                <TableHeaderCell>Train Name</TableHeaderCell>
                <TableHeaderCell>Departure Time</TableHeaderCell>
                <TableHeaderCell>Seats Available</TableHeaderCell>
                <TableHeaderCell>Price (AC)</TableHeaderCell>
                <TableHeaderCell>Price (Sleeper)</TableHeaderCell>
                <TableHeaderCell>Click Me</TableHeaderCell>
                <TableHeaderCell>Delete</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedTrains.map((train) => (
                <TableRowStyled
                  key={train.id}
                  selected={selectedRow === train.id}
                  onClick={() => handleRowClick(train.id)}
                >
                  <CheckboxCell>
                    <Checkbox
                      checked={selectedRows.includes(train.id)}
                      onChange={(event) => handleSelectRow(event, train.id)}
                    />
                  </CheckboxCell>
                  <TableCell>{train.id}</TableCell>
                  <TableCell>{train.title}</TableCell>
                  <TableCell>9:00 AM</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell>1000</TableCell>
                  <TableCell>500</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(train.id);
                        handleDialogOpen();
                      }}
                    >
                      Click Me
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DeleteButton
                      variant="contained"
                      onClick={() => handleDeleteRow(train.id)}
                    >
                      Delete
                    </DeleteButton>
                  </TableCell>
                </TableRowStyled>
              ))}
            </TableBody>
          </Table>
        </TableContainerStyled>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous Page
          </Button>
          <Typography variant="body1" style={{ margin: "0 16px" }}>
            Page {currentPage} of {Math.ceil(filteredTrains.length / rowsPerPage)}
          </Typography>
          <Button
            variant="outlined"
            disabled={indexOfLastRow >= filteredTrains.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next Page
          </Button>
        </div>
        <CustomDialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Train Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedRowData ? (
                <div>
                  <p>Train ID: {selectedRowData.id}</p>
                  <p>Train Name: {selectedRowData.title}</p>
                </div>
              ) : (
                "Loading..."
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </CustomDialog>
    
      </RootContainer>
      <CustomDialog
        open={addRowDialogOpen}
        onClose={() => setAddRowDialogOpen(false)}
      >
       <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Train ID"
              name="id"
              value={newRowData.id}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Train Name"
              name="title"
              value={newRowData.title}
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddRowDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRow} color="primary">
            Add
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default App;
