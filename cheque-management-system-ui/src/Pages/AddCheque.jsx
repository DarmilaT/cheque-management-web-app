import {
  Card,
  Typography,
  Dialog,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
import chequeService from "../service/chequeService";
import { useState } from "react";
import ChequeForm from "../components/ChequeForm";

const AddCheque = () => {
  // Get current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [cheque, setCheque] = useState({
    date: formattedDate,
    customerId: "",
    bank: "",
    branch: "",
    chequeNumber: "",
    amount: "",
    clearingDate: "",
    status: "Pending",
  });
  const [open, setOpen] = React.useState(false);

  const [routeOption, setRouteOption] = useState({
    value: "",
    label: "",
  });
  const [customerOption, setCustomerOption] = useState({
    value: "",
    label: "",
  });
  const [statusOption, setStatusOption] = useState({
    value: "Pending",
    label: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCheque({ ...cheque, [name]: value });
  };

  const handleSelect = (status) => {
    setStatusOption(status);
    console.log(status);
    setCheque({ ...cheque, status: status.value });
  };

  const handleCustomer = (customer) => {
    setCustomerOption(customer);
    console.log(customer);
    setCheque({ ...cheque, customerId: customer.value });
  };

  const saveCheque = (e) => {
    e.preventDefault();
    console.log(cheque);
    chequeService
      .saveCheque(cheque)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(true);
    reset(e);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const reset = (e) => {
    e.preventDefault();
    setCheque({
      date: formattedDate,
      route: "",
      customerName: "",
      bank: "",
      branch: "",
      chequeNumber: "",
      amount: 0,
      clearingDate: "",
      status: "Pending",
    });
    setRouteOption({
      value: "",
      label: "",
    });
    setCustomerOption({
      value: "",
      label: "",
    });
    setStatusOption({
      value: "Pending",
      label: "Pending",
    });
  };

  return (
    <Card color="transparent" className="items-center ">
      <Typography variant="h4" color="blue-gray" className="px-2 py-2 mb-0 text-white">
        Add New Cheque
      </Typography>
      <Dialog
        open={open}
        handler={() => setOpen(false)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Cheque Saved!</DialogHeader>
      </Dialog>
      <ChequeForm
        cheque={cheque}
        handleChange={handleChange}
        handleSelect={handleSelect}
        btn1={"Save"}
        btn2={"Clear"}
        handleBtn1={saveCheque}
        handleBtn2={reset}
        handleCustomer={handleCustomer}
        routeName={routeOption}
        customerName={customerOption}
        statusOption={statusOption}
        setRouteOption={setRouteOption}
      />
    </Card>
  );
};

export default AddCheque;
