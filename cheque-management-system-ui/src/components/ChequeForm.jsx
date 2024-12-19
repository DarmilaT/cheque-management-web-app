import React from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import Select from "react-select";
import { useState } from "react";
import AddCustomerPopUp from "./AddCustomerPopUp";
import RouteService from "../service/RouteService";
import CustomerService from "../service/CustomerService";
function ChequeForm({
  cheque,
  handleChange,
  handleSelect,
  handleBtn1,
  handleBtn2,
  btn1,
  btn2,
  routeName,
  customerName,
  statusOption,
  handleCustomer,
  setRouteOption,
}) {
  const status = [
    { value: "Pending", label: "Pending" },
    { value: "Deposited", label: "Deposited" },
    { value: "Cleared", label: "Cleared" },
    { value: "Returned", label: "Returned" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Stopped", label: "Stopped" },
  ];

  const inputRefs = React.useRef([]);

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = index + 1;
      console.log("Next index:", nextIndex);
      if (inputRefs.current[nextIndex]) {
        console.log("Next index:", inputRefs.current[nextIndex]);
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const [open, setOpen] = useState(false);
  const handleAddCustomer = () => {
    setOpen((cur) => !cur);
  };
  const [routes, setRoutes] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  React.useEffect(() => {
    fetchRoutes();
  }, []);
  const fetchRoutes = () => {
    RouteService.getAllRoutes()
      .then((response) => {
        console.log(response.data);
        setRoutes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchCustomersByRoute = (route) => {
    setRouteOption(route);
    console.log(routeName);
    CustomerService.getCustomersByRoute(route.value)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(customers);
  };
  React.useEffect(() => {
    if (customers.length > 0) {
      fetchCustomersByRoute(routeName);
    }
  }, [customers]);

  return (
    <form className="mt-8 mb-2 mac-w-screen-lg w-1/2">
      <div className="mb-1 flex flex-col gap-6 px-2">
        <div className="flex flex-row gap-6">
          <div style={{ flexBasis: "calc(50% - 8px)" }}>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Date
            </Typography>
            <Input
              name="date"
              value={cheque.date}
              onChange={(e) => handleChange(e)}
              size="lg"
              placeholder="yyyy-mm-dd"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={(ref) => {
                inputRefs.current[0] = ref;
                console.log(ref);
              }}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
            {/* Add dropdown for selecting route */}
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Route
            </Typography>
            <Select
              name="route"
              value={routeName}
              onChange={fetchCustomersByRoute}
              size="lg"
              placeholder="Select Route"
              className="!bg-blue-gray-900 !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              options={routes.map((route) => ({
                value: route.route_id,
                label: route.routeName,
              }))}
            />
            {/* Add dropdown for selecting customer */}
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Customer Name
            </Typography>
            <Select
              name="customer"
              value={customerName}
              onChange={handleCustomer}
              isSearchable
              size="lg"
              placeholder="Select Customers"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              options={customers.map((customer) => ({
                value: customer.customer_id,
                label: customer.customerName,
              }))}
              noOptionsMessage={() => (
                <Button
                  onClick={handleAddCustomer}
                  className="bg-blue-gray-900"
                >
                  Add New Customer
                </Button>
              )}
            />
            <AddCustomerPopUp
              open={open}
              handleOpen={handleAddCustomer}
              routes={routes}
              fetchCustomersByRoute={fetchCustomersByRoute}
              routeName={routeName}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Bank
            </Typography>
            <Input
              name="bank"
              value={cheque.bank}
              onChange={(e) => handleChange(e)}
              size="lg"
              placeholder="bank"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={(ref) => {
                inputRefs.current[1] = ref;
                console.log(inputRefs.current[1]);
              }}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
          </div>
          <div style={{ flexBasis: "calc(50% - 8px)" }}>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Branch
            </Typography>
            <Input
              name="branch"
              value={cheque.branch}
              onChange={(e) => handleChange(e)}
              size="lg"
              placeholder="branch"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={(ref) => (inputRefs.current[2] = ref)}
              onKeyDown={(e) => handleKeyDown(e, 2)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Cheque Number
            </Typography>
            <Input
              name="chequeNumber"
              value={cheque.chequeNumber}
              onChange={(e) => handleChange(e)}
              size="lg"
              placeholder="cheque number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={(ref) => (inputRefs.current[3] = ref)}
              onKeyDown={(e) => handleKeyDown(e, 3)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Amount
            </Typography>
            <Input
              name="amount"
              value={cheque.amount}
              onChange={(e) => handleChange(e)}
              size="lg"
              placeholder="amount"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={(ref) => (inputRefs.current[4] = ref)}
              onKeyDown={(e) => handleKeyDown(e, 4)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 mt-2 text-white"
            >
              Cheque Clearing Date
            </Typography>
            <Input
              name="clearingDate"
              value={cheque.clearingDate}
              onChange={(e) => handleChange(e)}
              size="lg"
              placeholder="yyyy-mm-dd"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={(ref) => (inputRefs.current[5] = ref)}
              onKeyDown={(e) => handleKeyDown(e, 5)}
            />
          </div>
        </div>
        <Typography variant="h6" color="blue-gray" className="-mb-3 text-white">
          Status
        </Typography>
        <Select
          value={statusOption}
          onChange={handleSelect}
          size="lg"
          placeholder="Select cheque status"
          // defaultValue={status[0]}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          isSearchable
          options={status}
        />

        <div className="flex flex-row justify-items-center ">
          <Button
            className="mt-4 mr-4"
            color="green"
            size="lg"
            fullWidth={false}
            onClick={handleBtn1}
          >
            {btn1}
          </Button>
          <Button
            onClick={handleBtn2}
            className="mt-4 ml-4"
            color="red"
            size="lg"
            fullWidth={false}
          >
            {btn2}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ChequeForm;
