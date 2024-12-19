import React, { useState } from "react";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import CustomerService from "../service/CustomerService";
import Select from "react-select";
import MultipleValueTextInput from "react-multivalue-text-input";

function AddCustomerPopUp({ open, handleOpen, routes, fetchCustomersByRoute, routeName }) {
  const [customer, setCustomer] = useState({
    customerName: "",
    routeId: "",
    address: "",
    telephoneNum: "",
  });
  const handleChange = (item, allItems) => {
    console.log(`Item  ${item}`, allItems);
    setCustomer({ ...customer, telephoneNum: allItems });
  };
  const saveCustomer = (e) => {
    e.preventDefault();
    console.log(customer);
    CustomerService.saveCustomer(customer)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      fetchCustomersByRoute(routeName);
      console.log(routeName)
    handleOpen();
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };
  const handleRoute = (route) => {
    setCustomer({ ...customer, routeId: route.value });
  };
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Add New Customer
          </Typography>
          <Typography className="-mb-2 text-blue-gray-900" variant="h6">
            Customer Name
          </Typography>
          <Input
            label="Customer Name"
            name="customerName"
            size="lg"
            value={customer.customerName}
            onChange={(e) => handleInput(e)}
          />
          <Typography className="-mb-2 text-blue-gray-900" variant="h6">
            Address
          </Typography>
          <Input
            label="Address"
            name="address"
            size="lg"
            value={customer.address}
            onChange={(e) => handleInput(e)}
          />
          <Typography className="-mb-2 text-blue-gray-900" variant="h6">
            Telephone Number
          </Typography>
          <MultipleValueTextInput
            onItemAdded={(item, allItems, value) =>
              handleChange(item, allItems, value)
            }
            onItemDeleted={(item, allItems) => handleChange(item, allItems)}
            name="telephoneNumber"
            placeholder="Enter the phone Numbers"
            className=" placeholder-blue-gray-700 placeholder-font-normal rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-black-500 font-sans"
          />
          <Typography className="-mb-2 text-blue-gray-900" variant="h6">
            Route
          </Typography>
          <Select
            name="routeId"
            value={customer.route}
            onChange={handleRoute}
            size="lg"
            placeholder="Select Route"
            className="!border-t-blue-gray-400 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            options={routes.map((route) => ({
              value: route.route_id,
              label: route.routeName,
            }))}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={saveCustomer} fullWidth color="blue-gray">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}

export default AddCustomerPopUp;
