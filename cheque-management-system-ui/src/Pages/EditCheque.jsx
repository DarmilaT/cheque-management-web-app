import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import ChequeForm from "../components/ChequeForm";
import { useEffect, useState } from "react";
import chequeService from "../service/chequeService";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../service/CustomerService";
import RouteService from "../service/RouteService";

function EditCheque() {
  const [cheque, setCheque] = useState({
    date: "",
    route: "",
    customerName: "",
    bank: "",
    branch: "",
    chequeNumber: "",
    amount: "",
    clearingDate: "",
    status: "Pending",
  });
  const [routeOption, setRouteOption] = useState({
    value: "",
    label: "",
  });
  const [customerOption, setCustomerOption] = useState({
    value: "",
    label: "",
  });
  const [statusOption, setStatusOption] = useState({
    value: "",
    label: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await chequeService.getChequeById(id);
        setCheque(response.data);
        setStatusOption({
          value: response.data.status,
          label: response.data.status,
        });
        // console.log(id, response.data);
        const res1 = await CustomerService.getCustomerById(
          response.data.customerId
        );
        setCustomerOption({
          value: res1.data.customer_id,
          label: res1.data.customerName,
        });
        // console.log(res1.data);
        const res2 = await RouteService.getRouteById(res1.data.routeId);
        setRouteOption({
          value: res2.data.routeName,
          label: res2.data.routeName,
        });
        // console.log(res2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  const updateCheque = (e) => {
    e.preventDefault();
    console.log(cheque);
    chequeService
      .editCheque(id, cheque)
      .then((res) => {
        navigate("/chequeList");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCheque({ ...cheque, [name]: value });
  };
  const handleSelect = (status) => {
    setStatusOption(status)
    console.log(status);
    setCheque({ ...cheque, status: status.value });
  };
  const handleCustomer = (customer) => {
    setCustomerOption(customer)
    console.log(customer);
    setCheque({ ...cheque, customerId: customer.value });
  };

  return (
    <Card color="transparent" className="m-2 items-center">
      <Typography variant="h4" color="blue-gray" className="px-2 py-2">
        Update the Cheque
      </Typography>
      <ChequeForm
        cheque={cheque}
        handleChange={handleChange}
        handleSelect={handleSelect}
        handleBtn1={updateCheque}
        btn1={"Update"}
        btn2={"Cancel"}
        handleBtn2={() => navigate("/chequeList")}
        routeName={routeOption}
        customerName={customerOption}
        statusOption={statusOption}
        handleCustomer={handleCustomer}
        setRouteOption={setRouteOption}
      />
    </Card>
  );
}

export default EditCheque;
