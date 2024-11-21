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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axios from 'axios';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [totalSales, setTotalSales] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const [weekSales, setWeekSales] = useState(0);
  const [monthSales, setMonthSales] = useState(0);
  const [productMonthSales, setProductMonthSales] = useState(0);
  const [salesToday, setSalesToday] = useState(0);

  const getTotalSales = async () => {
    const response = await axios.get("https://breiner-back-production.up.railway.app/api/total-sales")
    setTotalSales(response.data[0].total_sales)
    console.log(response.data[0].total_sales, "total sales")

  }

  const getProductsSold = async () => {
    const response = await axios.get("https://breiner-back-production.up.railway.app/api/products/sold")
    setProductsSold(response.data[0].quantity_sold)
    console.log(response.data[0], "total products")

  }

  const getSalesToday = async () => {
    const response = await axios.get("https://breiner-back-production.up.railway.app/api/sales/today")
    //setSalesToday(response.data)
    setSalesToday(response.data[0].ventas_hoy)

  }


  const getWeekSales = async () => {
    const response = await axios.get("https://breiner-back-production.up.railway.app/api/week-sales")
    const ventasUltimaSemana = Array(7).fill(1);
    (response.data).forEach((registro) => {
      // Convertimos ventas_totales a número, y si es 0, lo dejamos como 1
      ventasUltimaSemana[registro.dia_semana - 1] = parseInt(registro.ventas_totales) === 0 ? 1 : parseInt(registro.ventas_totales);
    });
    // Crear la variable con el formato completo
    const datosVentas = {
      labels: ["L", "M", "M", "J", "V", "S", "D"],  // Las etiquetas para los días de la semana
      datasets: {
        label: "Ventas",
        data: ventasUltimaSemana  // Datos de ventas para cada día
      }
    };

    setWeekSales(datosVentas)


  }


  const getMonthSales = async () => {
    const response = await axios.get("https://breiner-back-production.up.railway.app/api/month-sales")
    const ventasMes = Array(12).fill(1);
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const labels = [];
    const data = [];
    (response.data).forEach(item => {
      labels.push(meses[item.mes - 1]);  // El índice de los meses comienza en 0, por lo que restamos 1
      data.push(item.ventas_totales);  // Agregar las ventas para ese mes
    });
    // Crear la variable con el formato completo
    const sales = {
      labels: labels,
      datasets: {
        label: "Ventas",
        data: data
      }
    };
    setMonthSales(sales)
    console.log(sales, "ventas")


  }

  const getProductsMonthSales = async () => {
    const response = await axios.get("https://breiner-back-production.up.railway.app/api/products/month-sales")

    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const labels = [];
    const data = [];
    (response.data).forEach(item => {
      labels.push(meses[item.mes - 1]);  // El índice de los meses comienza en 0, por lo que restamos 1
      data.push(item.ventas_totales);  // Agregar las ventas para ese mes
    });
    // Crear la variable con el formato completo
    const sales = {
      labels: labels,
      datasets: {
        label: "Ventas",
        data: data
      }
    };
    setProductMonthSales(sales)
    console.log(sales, "ventas")


  }
  

  useEffect(() => {
    getTotalSales()
    getProductsSold()
    getWeekSales()
    getMonthSales()
    getProductsMonthSales()
    getSalesToday()
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="VENTAS TOTALES"
                count={totalSales}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "Semana anterior",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="PRODUCTOS VENDIDOS"
                count={productsSold}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "Que el Último mes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="MARGEN %"
                count="34%"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "Que Ayer",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="NUMERO DE VENTAS HOY"
                count={salesToday}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Recién Actualizado",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Ventas por Día"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={weekSales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Ventas Mensuales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={monthSales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Número de productos vendidos"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={productMonthSales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
