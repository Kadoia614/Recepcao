import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [tab, setTab] = useState(location.pathname);

  const navigation = [
    { name: "Visitors", path: "/Admin", icon: "pi-pen-to-square" },
    { name: "Users", path: "/Admin/Users", icon: "pi-user" },
    { name: "Calendar", path: "/Admin/Calendar", icon: "pi-calendar" },
    { name: "Configurations", path: "/Admin/Configurations", icon: "pi-cog" },
  ];

  return (
    <div
      className="bg-background md:w-60 md:block shadow md:p-6 p-2"
      id="SideNav"
    >
      <ul className="flex md:flex-col flex-row gap-4 w-full">
        {navigation.map((item, index) => {
          return (
            <li
              key={index}
              className={`rounded-md md:text-start text-center text-nowrap ${
                tab === item.path ? "selected" : ""
              }`}
              onClick={() => {
                setTab(item.path);
              }}
            >
              <Link
                to={`${item.path}`}
                className="flex items-center w-full h-full p-1 pr-2"
              >
                <i className={`pi ${item.icon} p-2`}></i> {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
