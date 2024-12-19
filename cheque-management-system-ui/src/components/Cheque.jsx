import React from "react";
import {
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

function Cheque({ cheque, deleteCheque, classes }) {
  const navigate = useNavigate();
  const editCheque = (e, id) => {
    e.preventDefault();
    navigate(`/editCheque/${id}`);
  };
  return (
    <tr key={cheque.cheque_id} className="even:bg-blue-gray-800">
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.date}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.route}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.customerName}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.bank}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.branch}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.chequeNumber}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.amount}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold text-white"
        >
          {cheque.clearingDate}
        </Typography>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            size="sm"
            variant="ghost"
            value={cheque.status}
            color={
              cheque.status === "Pending"
                ? "cyan"
                : cheque.status === "Deposited"
                ? "indigo"
                : cheque.status === "Cleared"
                ? "green"
                : cheque.status === "Returned"
                ? "red"
                : cheque.status === "Stopped"
                ? "pink"
                : "amber"
            }
            className="text-white"
          />
        </div>
      </td>
      <td className={classes}>
        <Tooltip content="Edit Cheque">
          <IconButton
            variant="text"
            className="p-1 hover:bg-blue-gray-600"
            style={{ borderColor: "white" }}
          >
            <EditOutlinedIcon
              onClick={(e) => editCheque(e, cheque.cheque_id)}
              className="text-white"
            />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete Cheque">
          <IconButton
            variant="text"
            className="p-1 hover:bg-blue-gray-600"
            style={{ borderColor: "white" }}
          >
            <DeleteOutlineOutlinedIcon
              onClick={(e) => deleteCheque(e, cheque.cheque_id)}
              className="text-white"
            />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
}

export default Cheque;
