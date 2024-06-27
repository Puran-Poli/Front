// ** React Imports
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

// ** Data import
import * as data from "@/lib/sales-data.json";
import {
  filterArrayByValues,
  calculateTotal,
  totalData,
} from "@/lib/analytics/sales/sales";
import { formatNumberToIn } from "@/lib/utils";

// RECHARTS
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ProfitProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#4caf50" : "#6fbf73",
  },
}));

const RevenueProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const StockProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#9155FD" : "#9c27b0",
  },
}));

function convertObject(oldObject) {
  const newFormat = [];
  for (let key of Object.keys(oldObject)) {
    let obj = { field: key, headerName: key };

    if (key === "pid") {
      obj.width = 300;
      obj.renderCell = (params) => {
        return (
          <Link
            href={`/products/${params.value}`}
            target="_blank"
            className="flex items-center"
          >
            <Image
              src={params.row.image ? params.row.image : "/images/default.png"}
              alt="Trending Up"
              width={40}
              height={40}
            />
            <p className="ml-2">{params.value}</p>
          </Link>
        );
      };
    }

    if (key === "date") {
      obj.hide = true;
    }

    newFormat.push(obj);
  }
  return newFormat;
}

const winnerColumns = convertObject(data.info.details[0]);

// ** Icons Imports
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WarehouseIcon from "@mui/icons-material/Warehouse";

export default function TableWinners() {
  const filteredData = filterArrayByValues(data.info.details, "grade", [
    "A+",
    "A",
  ]);

  const filteredDataTotal = {
    profitPerc: Math.round(
      (calculateTotal(filteredData, "profit_sales") / totalData.profit) * 100
    ),
    revenuePerc: Math.round(
      (calculateTotal(filteredData, "revenue_sales") / totalData.revenue) * 100
    ),
    stockValuePerc: Math.round(
      (calculateTotal(filteredData, "qty_soh") / totalData.stockValue) * 100
    ),
    sales: calculateTotal(filteredData, "qty_sales"),
    revenue: calculateTotal(filteredData, "revenue_sales"),
  };

  const rechartsData = [
    {
      name: "Apr 23",
      sales: filteredDataTotal.sales,
      soh: calculateTotal(filteredData, "qty_soh"),
    },
    {
      name: "May 23",
      sales: filteredDataTotal.sales * 1.3,
      soh: calculateTotal(filteredData, "qty_soh") * 1.6,
    },
    {
      name: "Jun 23",
      sales: filteredDataTotal.sales * 1.1,
      soh: calculateTotal(filteredData, "qty_soh") * 1.2,
    },
    {
      name: "Jul 23",
      sales: filteredDataTotal.sales * 1.4,
      soh: calculateTotal(filteredData, "qty_soh") * 1.8,
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Winning Products"
        titleTypographyProps={{
          sx: {
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent
        sx={{ "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 } }}
      >
        <Grid container spacing={6} sx={{ mb: 12 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {/* Icon */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/images/trophy.png"
                  alt="Trending Up"
                  width={100}
                  height={100}
                />
              </Box>
              {/* Icon . */}

              {/* Name */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.125rem",
                    color: "primary.main",
                  }}
                >
                  Winners
                </Typography>
              </Box>
              {/* Name . */}

              {/* Number */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  {filteredData.length} Products
                </Typography>
              </Box>
              {/* Number . */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Box sx={{ width: "100%", mt: 2 }}>
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 400, fontSize: "1rem" }}
              >
                <TrendingUpIcon
                  sx={{
                    fontSize: "1.5rem",
                    verticalAlign: "middle",
                    color: "#4caf50",
                    mr: 1,
                  }}
                />
                Profit
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ProfitProgress
                  variant="determinate"
                  value={filteredDataTotal.profitPerc}
                  sx={{ width: "100%" }}
                />
                <Typography variant="subtitle2" component="span" sx={{ ml: 2 }}>
                  {filteredDataTotal.profitPerc}%
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 400, fontSize: "1rem" }}
              >
                <AttachMoneyIcon
                  sx={{
                    fontSize: "1.5rem",
                    verticalAlign: "middle",
                    color: "#1a90ff",
                    mr: 1,
                  }}
                />
                Revenue
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <RevenueProgress
                  variant="determinate"
                  value={filteredDataTotal.revenuePerc}
                  sx={{ width: "100%" }}
                />
                <Typography variant="subtitle2" component="span" sx={{ ml: 2 }}>
                  {filteredDataTotal.revenuePerc}%
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              <Typography
                variant="body2"
                component="span"
                sx={{ fontWeight: 400, fontSize: "1rem" }}
              >
                <WarehouseIcon
                  sx={{
                    fontSize: "1.5rem",
                    verticalAlign: "middle",
                    color: "#9155FD",
                    mr: 1,
                  }}
                />
                Stock Value
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StockProgress
                  variant="determinate"
                  value={filteredDataTotal.stockValuePerc}
                  sx={{ width: "100%" }}
                />
                <Typography variant="subtitle2" component="span" sx={{ ml: 2 }}>
                  {filteredDataTotal.stockValuePerc}%
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ width: "100%", mt: 5 }}>
              <List sx={{ width: "100%" }} dense={true}>
                {/* <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {"They represent "}
                        <Typography
                          sx={{ display: "inline", fontWeight: 600 }}
                          component="span"
                          color="text.primary"
                        >
                          32.5%
                        </Typography>
                        {" of your inventory."}
                      </React.Fragment>
                    }
                  />
                </ListItem> */}
                <Divider />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {"Total sales: "}
                        <Typography
                          sx={{ display: "inline", fontWeight: 600 }}
                          component="span"
                          color="text.primary"
                        >
                          {formatNumberToIn(filteredDataTotal.sales)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {"Total revenue: "}
                        <Typography
                          sx={{ display: "inline", fontWeight: 600 }}
                          component="span"
                          color="text.primary"
                        >
                          ₹{formatNumberToIn(filteredDataTotal.revenue)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            my: 2,
          }}
        >
          <Grid item xs={12} md={6}>
            <h2 className="mb-2  text-2xl text-gray-700">Sales Forecast</h2>
            <p className="mb-6 text-sm text-gray-500">
              Sales Forecast for the next 3 months (in units) for the winning
              Products
            </p>
            <div className="h-96 w-full">
              <ResponsiveContainer>
                <ComposedChart
                  width={500}
                  height={400}
                  data={rechartsData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(number) => formatNumberToIn(number)} />

                  <Tooltip
                    wrapperStyle={{
                      outline: "1px solid #e5e7eb",
                    }}
                    formatter={(value) => formatNumberToIn(value)}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <h2 className="mb-2  text-2xl text-gray-700">Inventory Forecast</h2>
            <p className="mb-6 text-sm text-gray-500">
              Inventory Forecast for the next 3 months (in units) for the
              winning Products
            </p>
            <div className="h-96 w-full">
              <ResponsiveContainer>
                <ComposedChart
                  width={500}
                  height={400}
                  data={rechartsData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(number) => formatNumberToIn(number)} />

                  <Tooltip
                    wrapperStyle={{
                      outline: "1px solid #e5e7eb",
                    }}
                    formatter={(value) => formatNumberToIn(value)}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="soh" stroke="#58508d" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Grid>
        </Grid>

        <Box sx={{ height: 450, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.pid}
            rows={filteredData}
            columns={winnerColumns}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
          />
        </Box>
      </CardContent>
    </Card>
  );
}
