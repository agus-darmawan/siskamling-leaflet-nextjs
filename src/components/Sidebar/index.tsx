import React from "react";
import Link from "next/link";
import { IoIosCreate } from "react-icons/io";
import { TbMapSearch } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";

interface SidebarProps {
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => (
  <div
    id="sidebarExample"
    className="fixed inset-y-0 left-0 bg-[#0C364B] transform transition-transform translate-x-0 z-20 w-64 border-r"
    tabIndex={-1}
  >
    <div className="w-64 p-4">
      <div className="flex justify-between items-center">
        <h5 className="text-xl font-bold text-[#9BD2EF]">Beranda</h5>
        <button type="button" className="text-white" onClick={toggleSidebar}>
          ✕
        </button>
      </div>
      <div className="mt-4 space-y-4 text-white font-bold">
        <Navigate
          href="/Petasebaran"
          icon={<TbMapSearch />}
          text="Peta Sebaran"
        />
        <Navigate href="/formaduan" icon={<IoIosCreate />} text="Form Aduan" />
        <Navigate
          href="#"
          icon={<VscGraphLine />}
          text="Statistika"
          onClick={toggleSidebar}
        />
      </div>
    </div>
  </div>
);

interface NavigateProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const Navigate: React.FC<NavigateProps> = ({ href, icon, text, onClick }) => (
  <Link href={href} legacyBehavior passHref>
    <a
      className="flex items-center hover:bg-[#4B6C7D] focus:outline-none rounded-full p-2"
      onClick={onClick}
      style={{ display: "flex", alignItems: "center" }}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  </Link>
);

export default Sidebar;
