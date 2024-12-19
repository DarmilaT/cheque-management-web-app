import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import chequeService from "../service/chequeService";

function PendingChequeCard() {
  const [amount, setAmount] = React.useState(0);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await chequeService.getTotalAmountOfPendingCheques();
        setAmount(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        variant="gradient"
        className="bg-blue-gray-800 w-full sm:w-64 m-2 h-40"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-6 rounded-none pb-6 text-center"
        >
          <Typography
            variant="h6"
            color="white"
            className="mt-4 text-xl sm:text-2xl font-semibold"
          >
            Pending Cheques
          </Typography>
        </CardHeader>
        <CardBody className="p-0 text-center">
          <Typography
            variant="h6"
            color="white"
            className="mb-4 text-3xl sm:text-4xl font-bold"
          >
            {amount}
          </Typography>
        </CardBody>
      </Card>

      <Card
        variant="gradient"
        className="bg-blue-gray-800 w-full sm:w-64 m-2 h-40"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-6 rounded-none pb-6 text-center"
        >
          <Typography
            variant="h6"
            color="white"
            className="mt-4 text-xl sm:text-2xl font-semibold"
          >
            Pending Cheques
          </Typography>
        </CardHeader>
        <CardBody className="p-0 text-center">
          <Typography
            variant="h6"
            color="white"
            className="mb-4 text-3xl sm:text-4xl font-bold"
          >
            {amount}
          </Typography>
        </CardBody>
      </Card>

      <Card
        variant="gradient"
        className="bg-blue-gray-800 w-full sm:w-64 m-2 h-40"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-6 rounded-none pb-6 text-center"
        >
          <Typography
            variant="h6"
            color="white"
            className="mt-4 text-xl sm:text-2xl font-semibold"
          >
            Pending Cheques
          </Typography>
        </CardHeader>
        <CardBody className="p-0 text-center">
          <Typography
            variant="h6"
            color="white"
            className="mb-4 text-3xl sm:text-4xl font-bold"
          >
            {amount}
          </Typography>
        </CardBody>
      </Card>

      <Card
        variant="gradient"
        className="bg-blue-gray-800 w-full sm:w-64 m-2 h-40"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-6 rounded-none pb-6 text-center"
        >
          <Typography
            variant="h6"
            color="white"
            className="mt-4 text-xl sm:text-2xl font-semibold"
          >
            Pending Cheques
          </Typography>
        </CardHeader>
        <CardBody className="p-0 text-center">
          <Typography
            variant="h6"
            color="white"
            className="mb-4 text-3xl sm:text-4xl font-bold"
          >
            {amount}
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default PendingChequeCard;
