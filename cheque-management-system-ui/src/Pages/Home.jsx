import React from "react";
import PendingChequeCard from "../components/PendingChequeCard";
import WeekCheques from "../components/WeekCheques";

const Home = () => {
  return (
    <div>
      <PendingChequeCard />
      <WeekCheques />
    </div>
  );
};

export default Home;
