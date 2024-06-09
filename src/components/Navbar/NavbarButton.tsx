import React from "react";
import { cn } from "@/lib/cn";

interface NavbarButtonProps {
  onClick: () => void;
  text: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ onClick, text }) => (
  <button
    className={cn(
      "text-[#0C364B] px-4 py-2 rounded-full font-extrabold",
      "bg-[#0C364B] text-white px-4 py-2 rounded-full font-bold"
    )}
    type="button"
    onClick={onClick}
  >
    {text}
  </button>
);

export default NavbarButton;
