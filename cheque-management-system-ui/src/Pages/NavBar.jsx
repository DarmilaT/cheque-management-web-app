import React from "react";
import { Navbar, Typography, MenuItem } from "@material-tailwind/react";

function NavBar() {
  return (
    <Navbar
      variant="gradient"
      // color="blue-gray"
      fullWidth
      className="bg-blue-gray-900 rounded-none border-none shadow-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          variant="h6"
          className="mr-4 ml=2 py-1.5 font-bold text-4xl"
        >
          Cheque Management System
        </Typography>
        <div>
          <ul className="my-2 flex flex-row gap-2">
            <Typography
              as="a"
              href="/home"
              variant="small"
              className="p-1 font-medium font"
            >
              <MenuItem className="flex items-center gap-2 hover:bg-blue-gray-700 font-bold">
                <span className="text-white"> Home </span>
              </MenuItem>
            </Typography>
            <Typography
              as="a"
              href="/addCheque"
              variant="small"
              className="p-1 font-medium font"
            >
              <MenuItem className="flex items-center gap-2 hover:bg-blue-gray-700 font-bold">
                <span className="text-white"> Add Cheque </span>
              </MenuItem>
            </Typography>
            <Typography
              as="a"
              href="/chequeList"
              variant="small"
              className="p-1 font-medium font"
            >
              <MenuItem className="flex items-center gap-2 hover:bg-blue-gray-700 font-bold">
                <span className="text-white"> Cheque List </span>
              </MenuItem>
            </Typography>
          </ul>
        </div>
      </div>
    </Navbar>
  );
}

export default NavBar;
