/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  const { columns, rows: initialRows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [rows, setRows] = useState(initialRows); // Estado para manejar los pedidos
  const [open, setOpen] = useState(false); // Estado para el modal
  const [newOrder, setNewOrder] = useState({
    name: "",
    function: "",
    status: "",
    employed: "",
    product: "", // Producto seleccionado
  }); // Estado para manejar los datos del nuevo pedido

  const Author = ({ image, name, quantity }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{quantity}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, lastname }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{lastname}</MDTypography>
    </MDBox>
  );

  Author.propTypes = {
    image: PropTypes.string.isRequired, // image es requerido y debe ser un string
    name: PropTypes.string.isRequired, // name es requerido y debe ser un string
    email: PropTypes.string.isRequired, // email es requerido y debe ser un string
  };

  Job.propTypes = {
    title: PropTypes.string.isRequired, // image es requerido y debe ser un string
    description: PropTypes.string.isRequired, // name es requerido y debe ser un string
    email: PropTypes.string.isRequired, // email es requerido y debe ser un string
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };
  const handleProductChange = (event) => {
    setNewOrder({ ...newOrder, author: event.target.value });
  };
  const handleAddOrder = () => {
    console.log(newOrder, "Nueva orden");
    const array = {
      author: <Author name={newOrder.author} quantity={`X${newOrder.quantity}`} />,
      function: <Job title={newOrder.name} lastname={newOrder.lastname} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={newOrder.status}
            color={newOrder.status == "PENDIENTE" ? "warning" : "success"}
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      total: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          ${newOrder.total}
        </MDTypography>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          23/04/18
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    };
    const newRow = {
      ...array,
      action: (
        <Button variant="contained" color="info" size="small">
          Editar
        </Button>
      ),
    };

    setRows([...rows, newRow]);
    handleClose(); // Cerrar el modal después de agregar el pedido
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Lista de Pedidos
                </MDTypography>
                <Button variant="contained" color="black" onClick={handleOpen}>
                  Nuevo Pedido
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Lista de Clientes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />

      {/* Modal para crear nuevo pedido */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <MDTypography variant="h6" mb={2}>
            Crear Nuevo Pedido
          </MDTypography>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={newOrder.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="lastaname"
            value={newOrder.lastname}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Estado"
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cantidad"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Total"
            name="total"
            value={newOrder.total}
            onChange={handleInputChange}
            margin="normal"
          />
          {/* Select para productos de tecnología */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Producto de Tecnología</InputLabel>
            <Select
              fullWidth
              value={newOrder.author}
              onChange={handleProductChange}
              label="Producto de Tecnología"
              name="author"
            >
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Smartphone">Smartphone</MenuItem>
              <MenuItem value="Tablet">Tablet</MenuItem>
              <MenuItem value="Monitor">Monitor</MenuItem>
              <MenuItem value="Teclado Mecánico">Teclado Mecánico</MenuItem>
            </Select>
          </FormControl>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleAddOrder} color="primary" variant="contained" sx={{ ml: 2 }}>
              Agregar Pedido
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
