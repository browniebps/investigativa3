/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
import axios from "axios";

function Tables() {
  const { columns, rows: initialRows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [rows, setRows] = useState(initialRows); // Estado para manejar los pedidos
  const [open, setOpen] = useState(false); // Estado para el modal
  const [clients, setClients] = useState([])
  const [newClient, setNewClient] = useState([])
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

  const getClients = async () => {
    try {
      const response = await axios.get("https://breiner-back-production.up.railway.app/api/clients/sales");
      console.log(response.data, "respuesta clients");
      setRows(response.data)
      setClients(response.data); // Guardar los usuarios en el estado
    } catch (err) {
      console.log("error", err);
      //setError("Error al obtener los usuarios"); // Manejar errores
    } finally {
      //setLoading(false); // Ocultar el estado de carga
    }
  };

  useEffect(() => {
    getClients()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
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
    const updatedProducts = [...rows, newRow];

    setRows([...rows, newRow]);
    console.log(updatedProducts, "updataed_PRid");
    //localStorage.setItem("products", JSON.stringify(updatedProducts));

    handleClose(); // Cerrar el modal después de agregar el pedido
  };

  const saveClient = async () => {
    console.log(newClient, "=??")

    try {
      const response = await axios.post('https://breiner-back-production.up.railway.app/api/clients', { client: newClient });
      alert('Cliente agregado: ' + response.data.message);
      setRows([...rows, newClient]);

      handleClose()
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Error al agregar el producto');
    }
  }
  const handleAddClient = async () => {// Obtiene la fecha en formato YYYY-MM-DD
    let updatedOrder = "";

    setRows([...rows, newClient]);

    const respuesta = await saveClient()
    console.log(respuesta, "respuesta api")

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
    const updatedProducts = [...rows, newRow];

    setNewClient([])

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
              >
                <MDTypography variant="h6" color="white">
                  Lista de Clientes
                </MDTypography>
                <Button variant="contained" color="black" onClick={handleOpen}>
                  Nuevo Cliente
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: rows }}
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
            Crear Nuevo Cliente
          </MDTypography>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={newClient.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="last_name"
            value={newClient.last_name}
            onChange={handleInputChange}
            margin="normal"
          />

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={saveClient} color="primary" variant="contained" sx={{ ml: 2 }}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
