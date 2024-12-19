import React from "react";
import PendingChequeCard from "../components/PendingChequeCard";
import WeekCheques from "../components/WeekCheques";

const Home = () => {
  return (
    <div className="bg-blue-gray-900">
      <PendingChequeCard />
      <WeekCheques />
    </div>
  );
};

export default Home;
