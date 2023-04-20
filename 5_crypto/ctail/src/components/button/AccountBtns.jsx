import React from "react";
//import data
import { navData } from "../../data";
import Login from "./Login";
const AccountBtns = () => {
  return (
    <nav className="flex items-center gap-11">
      <ul className="flex gap-x-8">
        {navData.map((item, index) => {
          return (
            <li
              className="border-b-2 border-transparent hover:border-blue transition-all duration-300"
              key={index}
            >
              <a href={item.href}>{item.name}</a>
            </li>
          );
        })}
      </ul>
      <Login />
    </nav>
  );
};

export default AccountBtns;
