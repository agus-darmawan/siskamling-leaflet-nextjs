"use client";
import React from "react";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import Sidebar from "../Sidebar";
import LoginModal from "../modal/LoginModal";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const route = usePathname();

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

  const isHomepage = route === "/";

  React.useEffect(() => {
    if (!isHomepage) {
      setSidebarOpen(true);
    }
  }, [isHomepage]);

  return (
    <nav className="bg-white z-50 fixed top-0 right-0 left-0">
      <div className="container mx-auto flex items-center justify-between h-16">
        <button
          className="text-xl font-bold text-[#0C364B]"
          aria-controls="sidebarExample"
          onClick={toggleSidebar}
        >
          {isHomepage ? (
            isSidebarOpen ? (
              <FaTimes />
            ) : (
              <FaAlignJustify />
            )
          ) : (
            <Image
              src="/images/footer/siskamling.png"
              alt="Logo"
              width={145}
              height={20}
              className="w-full max-w-xs"
            />
          )}
        </button>
        <div className="flex-grow flex justify-center">
          <form className="flex ml-96"></form>
        </div>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <NavbarButton onClick={toggleModal} text="Log In" />
          ) : (
            <>
              <h2 className="text-[#0C364B] font-bold">Welcome, Admin</h2>
              <NavbarButton onClick={logout} text="Log Out" />
            </>
          )}
        </div>
      </div>
      {isSidebarOpen && <Sidebar />}
      {isModalOpen && (
        <LoginModal handleLogin={handleLogin} toggleModal={toggleModal} />
      )}
    </nav>
  );
};

export default Navbar;
