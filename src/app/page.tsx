import * as React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <main className=" flex items-center max-h-[75vh] bg-gray-800 pt-20">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-4">
            <section className="p-4">
              <h1 className="text-4xl text-white">Selamat Datang di</h1>
              <h1 className="text-4xl text-white font-bold">SISKAMLING</h1>
              <h1 className="text-4xl text-white font-bold">KLAMPIS NGASEM</h1>
              <h1 className="text-4xl text-white font-bold">SUKOLILO</h1>
              <p className="mt-4 text-white">
                <span className="font-bold">Sistem Keamanan Lingkungan</span>{" "}
                merupakan sebuah website berfungsi sebagai media informasi untuk
                memantau dan melaporkan tindak kriminalitas di Kelurahan Klampis
                Ngasem. Website ini dapat dimanfaatkan oleh masyarakat umum
                sebagai layanan aduan apabila terjadi tindak kriminalitas di
                lingkungan Klampis Ngasem. Harapannya media ini dapat
                dimanfaatkan sebaik mungkin untuk meningkatkan keamanan di
                lingkungan Klampis Ngasem.
              </p>
            </section>
            <section className="flex items-center">
              <Image
                src="/images/homepage/map-image.png"
                alt="Hero Image"
                width={792}
                height={722}
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
