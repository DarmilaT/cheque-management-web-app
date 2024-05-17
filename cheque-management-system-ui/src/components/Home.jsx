import React from "react";
import PendingChequeCard from "./PendingChequeCard";
import WeekCheques from "./WeekCheques";

const Home = () => {
  return (
    <div>
      <PendingChequeCard />
      <WeekCheques />
    </div>
  );
};

export default Home;
