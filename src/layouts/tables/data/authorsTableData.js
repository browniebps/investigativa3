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
      { Header: "Producto", accessor: "author", width: "30%", align: "center" },
      { Header: "Cliente", accessor: "function", align: "left" },
      { Header: "Total", accessor: "total", align: "center" },
      { Header: "Estado", accessor: "status", align: "center" },
      { Header: "Fecha Creación", accessor: "employed", align: "center" },
      { Header: "Opciones", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <Author name="Audifonos" email="X3" />,
        function: <Job title="Breiner" description="Parra" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Entregado" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        total: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            $100.000
          </MDTypography>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Editar
          </MDTypography>
        ),
      },
      {
        author: <Author name="Audifonos" email="X3" />,
        function: <Job title="Breiner" description="Parra" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Pendiente" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        total: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            $132.000
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
      },
    ],
  };
}
