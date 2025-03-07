import React from 'react';
import AccountFIlter from "./AccountFIlter";
import DateFilter from "./DateFilter";


function Filter() {
  return (
    <div className="lg:flex lg:flex-row lg:justify-between gap-2 space-y-3 lg:space-y-0 pt-4">
      <AccountFIlter />
      <DateFilter />
    </div>
  )
}

export default Filter