import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="border border-black bg-white text-[#0C364B] py-5 font-poppins font-bold"
    >
      <div className="container mx-auto px-4 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
          <div className="flex justify-center md:justify-start items-center">
            <Image
              src="/images/footer/siskamling.png"
              alt="Logo"
              width={200}
              height={100}
              className="w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-end text-center md:text-right">
            <div className="text-xs mb-4">
              <p>Support by</p>
              <p>Institut Teknologi Sepuluh Nopember</p>
              <p>Departemen Teknik Geomatika</p>
              <p>Field Camp Thematic</p>
              <p className="mb-4">Team 16</p>
            </div>
            <Image
              src="/images/footer/logo-its-dep.png"
              alt="Sponsor Logo"
              width={200}
              height={100}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
