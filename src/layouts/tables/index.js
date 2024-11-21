/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
  const [openEdit, setOpenEdit] = useState(false); // Estado para el modal
  const [newOrder, setNewOrder] = useState({
    quantity_sold: 0, // Producto seleccionado
    client_id: null,
    product_id: null
  }); // Estado para manejar los datos del nuevo pedido
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState([])

  const getSales = async () => {
    try {
      const response = await axios.get("https://breiner-back-production.up.railway.app/api/sales");
      console.log(response.data, "respuesta setSales");
      const transformedArray = (response.data).map((newOrder) => ({
        author: <Author name={newOrder.product_name} quantity={`X${newOrder.quantity_sold}`} />,
        function: <Job title={newOrder.client_name} lastname={newOrder.last_name} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={newOrder.status}
              color={newOrder.status === "pending" ? "warning" : "success"}
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
          <Button variant="contained" color="info" onClick={() => getSaleById(newOrder.id)} size="small">
            Editar
          </Button>
        ),
      }));
      console.log(transformedArray, "transformed")
      setSales(transformedArray); // Guardar los usuarios en el estado
      setRows(transformedArray); // Guardar los usuarios en el estado
    } catch (err) {
      console.log("error", err);
      //setError("Error al obtener los usuarios"); // Manejar errores
    } finally {
      //setLoading(false); // Ocultar el estado de carga
    }
  };

  useEffect(() => {
    getSales();
  }, [])

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

  const handleOpen = () => {
    getClients();
    getProducts();
    setOpen(true);
  };

  const handleOpenEdit = (id) => {
    getSaleById(id);
    setOpenEdit(true);
  };

  const handleClose = () => setOpen(false);

  const handleCloseEdit = () => setOpenEdit(false);

  const getClients = async () => {
    try {
      const response = await axios.get("https://breiner-back-production.up.railway.app/api/clients");
      console.log(response.data, "respuesta clients");
      setClients(response.data); // Guardar los usuarios en el estado
    } catch (err) {
      console.log("error", err);
      //setError("Error al obtener los usuarios"); // Manejar errores
    } finally {
      //setLoading(false); // Ocultar el estado de carga
    }
  };

  const getSaleById = async (id) => {
    setOpenEdit(true)
    try {
      const response = await axios.get(`https://breiner-back-production.up.railway.app/api/sales/by/${id}`);
      console.log(response.data[0], "respuesta aaa");
      setSelectedSale(response.data[0])
    } catch (err) {
      console.log("error", err);
      //setError("Error al obtener los usuarios"); // Manejar errores
    } finally {
      //setLoading(false); // Ocultar el estado de carga
    }
  };

  const editOrder = async () => {
    try {
      const response = await axios.post(`https://breiner-back-production.up.railway.app/api/sales/edit`, {
        params: {
          id: selectedSale.id,
          client_id: selectedSale.client_id, 
          product_id: selectedSale.product_id, 
          total: newOrder.total,
          quantity_sold: newOrder.quantity_sold
        }
      });


      console.log(response.data, "respuesta edit");
      //setProducts(response.data); // Guardar los usuarios en el estado
    } catch (err) {
      console.log("error", err);
      //setError("Error al obtener los usuarios"); // Manejar errores
    } finally {
      //setLoading(false); // Ocultar el estado de carga
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("https://breiner-back-production.up.railway.app/api/products");
      console.log(response.data, "respuesta clients");
      setProducts(response.data); // Guardar los usuarios en el estado
    } catch (err) {
      console.log("error", err);
      //setError("Error al obtener los usuarios"); // Manejar errores
    } finally {
      //setLoading(false); // Ocultar el estado de carga
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: Number(value) });
  };
  const handleProductChange = (event) => {
    const selectedProduct = products.find(product => product.id === parseInt(event.target.value));

    setNewOrder({
      ...newOrder,
      product_id: event.target.value,
      product_name: selectedProduct.name,
      status: "pending"
    });
  };
  const handleClientChange = (event) => {
    const selectedClient = clients.find(client => client.id === parseInt(event.target.value));

    console.log(selectedClient, "celinetes")
    setNewOrder({
      ...newOrder,
      client_id: event.target.value,
      client_name: selectedClient.name,
      client_last_name: selectedClient.last_name
    });
  };
  const handleAddOrder = async (e) => {
    console.log(newOrder, "Nueva orden");
    e.preventDefault();
    const venta = {
      amount: parseFloat(newOrder.total),
      product_id: parseInt(newOrder.product_id),
      client_id: parseInt(newOrder.client_id),
      quantity_sold: parseInt(newOrder.quantity_sold),
    };

    try {
      const response = await axios.post('https://breiner-back-production.up.railway.app/api/sales', venta);
      //alert('Venta registrada exitosamente');
      console.log('Venta registrada:', response.data);
    } catch (error) {
      console.error('Error al registrar la venta:', error.response ? error.response.data : error.message);
      alert('Error al registrar la venta');
    }
    //return;
    const array = {
      author: <Author name={newOrder.product_name} quantity={`X${newOrder.quantity_sold}`} />,
      function: <Job title={newOrder.client_name} lastname={newOrder.client_last_name} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={newOrder.status}
            color={newOrder.status == "pending" ? "warning" : "success"}
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
    localStorage.setItem("sales", newOrder.total);

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
        </Grid>
      </MDBox>

      <Footer />


      {/* Modal para EDITAR pedido */}
      <Modal open={openEdit} onClose={handleCloseEdit}>
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
            Editar Pedido
          </MDTypography>
          {/*<FormControl fullWidth margin="normal">
            <InputLabel>{selectedSale.client_name} {selectedSale.last_name}</InputLabel>
            <Select
              fullWidth
              value={newOrder.client}
              onChange={handleClientChange}
              label={selectedSale.client_name}
              name="client"
            >
              {clients?.map((client, key) => (
                <MenuItem key={key} value={client.id}>
                  {" "}
                  {client.name}{""}
                </MenuItem>
              ))}
            </Select>
              </FormControl> */}
          <TextField
            fullWidth
            label={selectedSale.client_name}
            name="total"
            disabled={true}
            //value={newOrder.total}
            onChange={handleInputChange}
            margin="normal"
          />
          {/*<TextField
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
              />*/}
          <TextField
            fullWidth
            label={selectedSale.quantity_sold}
            name="quantity_sold"
            //value={newOrder.quantity}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label={selectedSale.total}
            name="total"

            //value={newOrder.total}
            onChange={handleInputChange}
            margin="normal"
          />
          {/* Select para productos de tecnología */}
          <TextField
            fullWidth
            label={selectedSale.product_name}
            name="total"
            disabled={true}
            //value={newOrder.total}
            onChange={handleInputChange}
            margin="normal"
          />
          {/*<FormControl fullWidth margin="normal">
            <InputLabel>Producto</InputLabel>
            <Select
              fullWidth
              value={newOrder.product}
              onChange={handleProductChange}
              label={selectedSale.product_name}
              name="product"
            >
              {products?.map((product, key) => (
                <MenuItem key={key} value={product.id}>
                  {" "}
                  {product.name}{""}
                </MenuItem>
              ))}

            </Select>
              </FormControl> */}
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={editOrder} style={{ color: 'white' }} variant="contained" sx={{ ml: 2 }}>
              Editar Pedido
            </Button>
          </Box>
        </Box>
      </Modal>

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
          <FormControl fullWidth margin="normal">
            <InputLabel>Cliente:</InputLabel>
            <Select
              fullWidth
              value={newOrder.client}
              onChange={handleClientChange}
              label="Producto de Tecnología"
              name="client"
            >
              {clients?.map((client, key) => (
                <MenuItem key={key} value={client.id}>
                  {" "}
                  {client.name}{""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/*<TextField
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
              />*/}
          <TextField
            fullWidth
            label="Cantidad"
            name="quantity_sold"
            //value={newOrder.quantity}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Total"
            name="total"
            //value={newOrder.total}
            onChange={handleInputChange}
            margin="normal"
          />
          {/* Select para productos de tecnología */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Producto</InputLabel>
            <Select
              fullWidth
              value={newOrder.product}
              onChange={handleProductChange}
              label="Producto de Tecnología"
              name="product"
            >
              {products?.map((product, key) => (
                <MenuItem key={key} value={product.id}>
                  {" "}
                  {product.name}{""}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleAddOrder} style={{ color: 'white' }} variant="contained" sx={{ ml: 2 }}>
              Agregar Pedido
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
