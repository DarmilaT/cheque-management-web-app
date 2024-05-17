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
    <Card color="gray" variant="gradient" className="m-4">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="h1"
          color="white"
          className="mt-4 mb-2 flex justify-center gap-1 text-5xl font-normal"
        >
          Total Amount of Pending Cheques
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <Typography
          variant="h1"
          color="white"
          className="mt-2 mb-4 flex justify-center gap-1 text-5xl font-normal"
        >
          {amount}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default PendingChequeCard;
