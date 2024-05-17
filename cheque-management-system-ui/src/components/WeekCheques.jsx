import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import chequeService from "../service/chequeService";
import CustomerService from "../service/CustomerService";
import RouteService from "../service/RouteService";

function WeekCheques() {
  const columns = [
    { field: "route", headerName: "Route", width: 90 },
    {
      field: "customerName",
      headerName: "Customer name",
      width: 150,
      editable: false,
    },
    {
      field: "bank",
      headerName: "Bank",
      width: 150,
      editable: false,
    },
    {
      field: "chequeNumber",
      headerName: "Cheque Number",
      width: 150,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      editable: false,
    },
    {
      field: "clearingDate",
      headerName: "Clearing Date",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
    },
  ];
  const [cheques, setCheques] = React.useState([]);
  React.useEffect(() => {
    const fetchWeekCheques = async () => {
      try {
        const response = await chequeService.getWeekCheques();
        const chequeDetails = response.data;
        const customerPromises = chequeDetails.map((cheque) => {
          return CustomerService.getCustomerById(cheque.customerId);
        });
        const customerDetailsArray = await Promise.all(customerPromises);
        // fetch the correspond route details
        const routePromises = customerDetailsArray.map((customer) => {
          return RouteService.getRouteById(customer.data.routeId);
        });
        const routeDetailsArray = await Promise.all(routePromises);

        const chequeDetailsWithCustomerAndRouteInfo = chequeDetails.map(
          (cheque, index) => {
            return {
              ...cheque,
              customerName: customerDetailsArray[index].data.customerName,
              route: routeDetailsArray[index].data.routeName,
            };
          }
        );
        setCheques(chequeDetailsWithCustomerAndRouteInfo);
      } catch (error) {
        console.error("Error fetching week cheques:", error);
      }
    };

    fetchWeekCheques();
  }, []);

  const getRowId = (row) => row.cheque_id;

  return (
    <div className="items-center ml-8 flex justify-center">
      <Box sx={{ height: 275, width: "75%" }}>
        <DataGrid
          rows={cheques}
          columns={columns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSizeOptions={[3]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default WeekCheques;
