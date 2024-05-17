import React from "react";
import {
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

function Cheque({ cheque, deleteCheque, classes }) {
  const navigate = useNavigate();
  const editCheque = (e, id) => {
    e.preventDefault();
    navigate(`/editCheque/${id}`);
  };
  return (
    <tr key={cheque.cheque_id} className="even:bg-teal-50/50">
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
          {cheque.date}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
          {cheque.route}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
          {cheque.customerName}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
          {cheque.bank}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
          {cheque.branch}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
          {cheque.chequeNumber}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
          {cheque.amount}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-bold">
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
          />
        </div>
      </td>
      <td className={classes}>
        <Tooltip content="Edit Cheque">
          <IconButton variant="text">
            <EditOutlinedIcon onClick={(e) => editCheque(e, cheque.cheque_id)} />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete Cheque">
          <IconButton variant="text">
            <DeleteOutlinedIcon onClick={(e) => deleteCheque(e, cheque.cheque_id)} />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
}

export default Cheque;
