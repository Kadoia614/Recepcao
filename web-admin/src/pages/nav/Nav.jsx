import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import { Avatar } from "primereact/avatar";

import { useThemeContext } from "@/context/theme/ThemeContext";
import { useAuth } from "../../context/auth/AuthContext";
import { useProfile } from "../../context/profile/ProfileContext";

const navigation = [
  { name: "Dashboard", href: "/Admin", current: true, private: true },
  { name: "Terms of Use", href: "/Terms", current: false, private: false },
  { name: "Privacity", href: "/Privacity", current: false, private: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [active, setActive] = useState(location.pathname);

  const { isAuth } = useAuth();
  const { image } = useProfile();
  const { toggleTheme } = useThemeContext();

  return (
    <Disclosure as="nav" className="bg-background shadow sticky top-0 z-11">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Image */}
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="/Brasao.png"
                className="h-8 w-auto"
              />
            </div>

            {/* navigation */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {!isAuth && (
                  <Link
                    to={"/"}
                    aria-current={"Login"}
                    className={classNames(
                      active === "/" && "bg-primary-light text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    onClick={() => setActive("/")}
                  >
                    Login
                  </Link>
                )}
                {navigation.map((item) => (
                  <>
                    {!item.private || isAuth ? (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          active.includes(item.href) &&
                            "bg-primary-light text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => setActive(item.href)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* right Icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={() => toggleTheme("dark")}
              className="relative rounded-full hover:bg-blue-100 bg-blue-50 dark:bg-gray-800 p-1 text-gray-400 dark:hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden mr-3"
            >
              <span className="sr-only">Toogle Theme</span>

              <SunIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Will be implanted */}
            {/* <button
              type="button"
              className="relative rounded-full hover:bg-blue-100 bg-blue-50 dark:bg-gray-800 p-1 text-gray-400 dark:hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}

            {/* Profile dropdown */}
            {isAuth ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {image ? (
                      <img alt="" src={image} className="size-8 rounded-full" />
                    ) : (
                      <Avatar label="U" size="large" shape={"circle"} />
                    )}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-11 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/Profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/Profile/Configuration"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/Singout"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                      Sign out
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* ---------------- MENU MOBILE ------------------------------ */}
      <DisclosurePanel className="sm:hidden absolute w-full bg-background">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {!isAuth && (
            <DisclosureButton
              as={Link}
              to="/"
              onClick={() => setActive("/")}
              className={classNames(
                active === "/" && "bg-primary-light text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              Login
            </DisclosureButton>
          )}

          {navigation.map((item) =>
            !item.private || isAuth ? (
              <DisclosureButton
                key={item.href}
                as={Link}
                to={item.href}
                onClick={() => setActive(item.href)}
                className={classNames(
                  active.startsWith(item.href)
                    ? "bg-primary-light text-white"
                    : " hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ) : null
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
