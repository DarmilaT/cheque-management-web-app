import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import chequeService from "../service/chequeService";
import Cheque from "../components/Cheque";
import FilterSection from "../components/FilterSection";
import CustomerService from "../service/CustomerService";
import RouteService from "../service/RouteService";

const ChequeList = () => {
  const table_head = [
    "Date",
    "Route",
    "Customer Name",
    "Bank",
    "Branch",
    "Cheque Number",
    "Amount",
    "Clearing Date",
    "Status",
    "Actions",
  ];
  const tabs = [
    "All",
    "Pending",
    "Deposited",
    "Cleared",
    "Returned",
    "Stopped",
    "Cancelled",
  ];
  const [cheque, setCheque] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showTotalAmt, setShowTotalAmt] = React.useState(false);
  const [totalAmt, setTotalAmt] = React.useState(0);
  const [chequeDetails, setChequeDetails] = React.useState([]);

  const fetchCustomerAndRouteData = async () => {
    console.log(chequeDetails);
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
        // console.log(routeDetailsArray[index].data);
        return {
          ...cheque,
          customerName: customerDetailsArray[index].data.customerName,
          route: routeDetailsArray[index].data.routeName,
        };
      }
    );
    setCheque(chequeDetailsWithCustomerAndRouteInfo);
    console.log(cheque);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await chequeService.getAllCheques();
      setChequeDetails(response.data);
      console.log(response.data);
      console.log(chequeDetails);
      fetchCustomerAndRouteData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (chequeDetails !== null) {
      fetchCustomerAndRouteData();
    }
  }, [chequeDetails]);

  const deleteCheque = (e, id) => {
    e.preventDefault();
    console.log(id);
    chequeService.deleteCheque(id).then((res) => {
      console.log(res);
      fetchData();
      setChequeDetails((prevDetails) => {
        return prevDetails.filter((ch) => ch.id !== id);
      });
    });
  };

  const searchCheque = async (e) => {
    e.preventDefault();
    try {
      const keyword = e.target.value;
      console.log(keyword);
      const response = await chequeService.searchByKeyword(keyword);
      setChequeDetails(response.data);
      fetchCustomerAndRouteData();
    } catch (err) {
      console.log(err);
    }
  };

  const filterStatus = async (status) => {
    try {
      const response = await chequeService.filterByStatus(status);
      console.log(response.data);
      setChequeDetails(response.data);
      fetchCustomerAndRouteData();
      console.log(cheque);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (tab) => {
    console.log(tab);
    if (tab === "All") {
      fetchData();
    } else {
      filterStatus(tab);
    }
  };

  const getDataFromFilter = (chqList, totalAmount) => {
    setChequeDetails(chqList);
    fetchCustomerAndRouteData();
    setShowTotalAmt(true);
    setTotalAmt(totalAmount);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h2" color="blue-gray">
              Cheque List
            </Typography>
          </div>
          <div>
            <FilterSection
              onFilter={chequeService.filterByClearingDate}
              sendDataToChequeList={getDataFromFilter}
              totalAmountOfPending={
                chequeService.getTotalAmountOfPendingByClearingDateRange
              }
            />
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                onChange={(e) => searchCheque(e)}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <div className="items-center ">
          <ButtonGroup fullWidth color="blue-gray">
            {tabs.map((tab) => (
              <Button onClick={() => handleTabChange(tab)} key={tab}>
                {tab}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {table_head.map((heading) => (
                <th
                  key={heading}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {" "}
                    {heading}{" "}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {!loading && cheque && (
            <tbody>
              {cheque.map((cheque, index) => {
                const isLast = index === cheque.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <Cheque
                    cheque={cheque}
                    deleteCheque={deleteCheque}
                    key={cheque.cheque_id}
                    classes={classes}
                  />
                );
              })}
            </tbody>
          )}
        </table>
      </CardBody>
      {showTotalAmt && (
        <CardFooter className="flex items-center justify-between mt-4">
          <div className="flex">
            <Typography className="mr-2">Total Pending Amount:</Typography>
            <Typography>{totalAmt}</Typography>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ChequeList;
