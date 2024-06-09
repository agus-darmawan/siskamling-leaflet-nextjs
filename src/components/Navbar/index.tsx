"use client";
import React from "react";
import { TiThMenu } from "react-icons/ti";
import NavbarButton from "./NavbarButton";
import Sidebar from "../Sidebar";
import LoginModal from "../modal/LoginModal";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleLogin = (username: string, password: string) => {
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      login();
      toggleModal();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <nav className="bg-white relative z-10">
      <div className="container mx-auto flex items-center justify-between h-16">
        <button
          className="text-xl font-bold text-[#0C364B]"
          aria-controls="sidebarExample"
          onClick={toggleSidebar}
        >
          <TiThMenu />
        </button>
        <div className="flex-grow flex justify-center">
          <form className="flex ml-96"></form>
        </div>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <NavbarButton onClick={toggleModal} text="Log In" />
          ) : (
            <>
              <span className="text-[#0C364B] font-bold">Welcome, Admin</span>
              <NavbarButton onClick={logout} text="Log Out" />
            </>
          )}
        </div>
      </div>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
      {isModalOpen && (
        <LoginModal handleLogin={handleLogin} toggleModal={toggleModal} />
      )}
    </nav>
  );
};

export default Navbar;
