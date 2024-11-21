/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Nombre", accessor: "product_name", width: "30%", align: "center" },
      { Header: "Descripcion", accessor: "description", align: "left" },
      { Header: "Cantidad Vendida", accessor: "quantity_sold", align: "center" },
      { Header: "Cantidad en Stock", accessor: "quantity_in_stock", align: "center" },
      { Header: "Fecha Creación", accessor: "created_date", align: "center" },
      { Header: "Opciones", accessor: "options", align: "center" },
    ],

    rows: [
      {
        product_name: "Audifonos Airpods",
        description: "adasdsadasd sasdasd",
        quantity_sold: 20,
        quantity_in_stock: 100,
        created_date: "2024-10-05",
        options: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Editar
          </MDTypography>
        ),
      },
      {
        product_name: "Teclado Mac",
        description: "asdasdsasdsdsadasdasdsadasds sasdasd",
        quantity_sold: 10,
        quantity_in_stock: 4500,
        created_date: "2024-10-05",
        options: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Editar
          </MDTypography>
        ),
      },
    ],
  };
}
