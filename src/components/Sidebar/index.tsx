import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosCreate } from "react-icons/io";
import { TbMapSearch } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div
      id="sidebarExample"
      className="fixed inset-y-0 left-0 bg-[#0C364B] transform transition-transform translate-x-0 z-20 w-64 border-r mt-16"
      tabIndex={-1}
    >
      <div className="w-64 p-4 h-full flex justify-between flex-col">
        <div>
          <div className="flex justify-between items-center pt-5">
            <h5 className="text-lg font-bold text-[#9BD2EF]">Beranda</h5>
          </div>
          <div className="mt-4 space-y-2 text-white font-bold">
            <Navigate
              href="/Petasebaran"
              icon={<TbMapSearch />}
              text="Peta Sebaran"
              isActive={pathname === "/Petasebaran"}
            />
            <Navigate
              href="/formaduan"
              icon={<IoIosCreate />}
              text="Form Aduan"
              isActive={pathname === "/formaduan"}
            />
            <Navigate
              href="#"
              icon={<VscGraphLine />}
              text="Statistika"
              isActive={pathname === "#"}
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white font-semibold text-center leading-tight text-sm">
            Support by <br /> Institut Teknologi Sepuluh Nopember <br />
            Geomatics Engineering <br />
            Field Camp Thematic <br />
            Team 16
          </p>
          <Image
            src="/images/footer/logo-its-dep-bg.png"
            alt="Logo"
            width={151}
            height={34}
            className="w-full max-w-xs px-4"
          />
        </div>
      </div>
    </div>
  );
};

interface NavigateProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

const Navigate: React.FC<NavigateProps> = ({
  href,
  icon,
  text,
  isActive,
  onClick,
}) => (
  <Link href={href} legacyBehavior passHref>
    <a
      className={`flex items-center hover:bg-[#4B6C7D] focus:outline-none rounded-full p-2 ${
        isActive ? "bg-[#4B6C7D]" : ""
      }`}
      onClick={onClick}
      style={{ display: "flex", alignItems: "center" }}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  </Link>
);

export default Sidebar;
