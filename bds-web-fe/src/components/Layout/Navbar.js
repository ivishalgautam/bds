import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo.svg";
import { FiSettings } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/router";
import Image from "next/image";
import Avatar from "../../assets/avatar.svg";
import { MainContext } from "@/store/context";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleLogOut = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.push("/login");
  };

  const { user } = useContext(MainContext);

  const userProfile = (firstName, lastName, username, email) => {
    let displayName;

    if (firstName && lastName) {
      displayName = `${firstName} ${lastName}`;
    } else if (firstName) {
      displayName = firstName;
    } else if (lastName) {
      displayName = lastName;
    } else {
      displayName = username;
    }

    return (
      <>
        <p className="text-base font-bold font-mulish">{displayName}</p>
        <p className="text-sm text-[#9A9AB0] -mt-1">{email}</p>
      </>
    );
  };

  return (
    <div className="bg-white shadow-md h-[80px] flex items-center justify-between px-4 border-b">
      <Image src={Logo} alt="logo" width={160} height={40} priority />
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer">
          <FiSettings className="w-6 h-6" />
        </div>
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer">
          <IoMdNotificationsOutline className="w-7 h-7" />
        </div>
        <div className="relative inline-block">
          {user && (
            <div onClick={toggleDropdown} className="flex gap-4 items-center cursor-pointer">
              {user.image_url ? (
                <img
                  src={user.image_url}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <Image src={Avatar} alt="" className="w-12 h-12 rounded-full" />
              )}
              <div>
                {userProfile(
                  user.first_name,
                  user.last_name,
                  user.username,
                  user.email
                )}
              </div>
            </div>
          )}
          {isOpen && (
            <div className="absolute mt-2 py-2 px-4 bg-white border border-gray-300 rounded-md w-full z-10 cursor-pointer">
              {/* Dropdown content */}
              <ul>
                <li onClick={handleLogOut}>Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
