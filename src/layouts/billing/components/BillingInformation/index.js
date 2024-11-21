// @mui material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from "react";
import axios from "axios";

function BillingInformation() {
  // Estado para almacenar las fechas
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sales, setSales] = useState(0);


  const getAllSales = async () => {

    const response = await axios.get("https://breiner-back-production.up.railway.app/api/sales")
    setSales(response.data)

    console.log("response.data", response.data)
  }

  useEffect(() => {
    getAllSales()
  }, [])
  // Datos de ejemplo para facturas
  const bills = [
    { name: "Angie Castaño", company: "viking burrito", email: "oliver@burrito.com", date: "2024-11-10" },
    { name: "Esteban Rojas", company: "stone tech zone", email: "lucas@stone-tech.com", date: "2024-11-12" },
    { name: "Enrique Nieto", company: "fiber notion", email: "ethan@fiber.com", date: "2024-11-15" },
  ];

  let filteredBills = []
  /* Filtrar facturas por rango de fechas*/
  if (sales?.length > 0) {
    filteredBills = sales?.filter((bill) => {
      const billDate = new Date(bill.created_at);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || billDate >= start) && (!end || billDate <= end);
    });
  }


  return (
    <Card id="date-picker">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" align="center">
          Filtrar Pedidos por Fecha
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <form>
          <MDBox display="flex" gap={2} mb={2} justifyContent="center" sx={{ width: '100%' }}>
            <div>
              <label htmlFor="start-date">Fecha de inicio:</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label htmlFor="end-date">Fecha de fin:</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
          </MDBox>
          {/*<Button variant="contained" color="primary" fullWidth sx={{ maxWidth: 200 }}>
            Buscar
  </Button>*/}
        </form>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {
            filteredBills.length > 0 && (
              filteredBills?.map((bill, index) => (
                <Bill
                  key={index}
                  name={bill.client_name}
                  company={bill.product_name}
                  email={bill.quantity_sold}
                  vat={bill.total}
                  date={bill.created_at}
                />
              )))
          }
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
