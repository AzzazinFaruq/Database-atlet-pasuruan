import React from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const getAthlete = (id) => {
  const athletes = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      photo: "/atlet-2.jpg",
      birthPlace: "Pasuruan",
      birthDate: "15/05/2005",
      gender: "Laki-laki",
      address: "Jl. Merdeka No. 123, Pasuruan",
      school: "SMAN 1 Pasuruan",
      parent: "Budi Santoso",
      sport: "Hapkido - Individual Hyung PUTRA",
    },
    {
      id: 2,
      name: "Siti Rahmawati",
      photo: "/atlet-1.jpg",
      birthPlace: "Pasuruan",
      birthDate: "22/08/2006",
      gender: "Perempuan",
      address: "Jl. Diponegoro No. 45, Pasuruan",
      school: "SMAN 2 Pasuruan",
      parent: "Surya Wijaya",
      sport: "Hapkido - Individual Hyung PUTRI",
    },
  ];

  return athletes.find((athlete) => athlete.id === parseInt(id)) || athletes[0];
};

const AthleteDetail = ({ params }) => {
  const athlete = getAthlete(params.id);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/daftar-atlet"
            className="inline-block mb-6"
            style={{ color: "var(--color-primary)" }}
          >
            &larr; Kembali
          </Link>

          <div
            className="bg-white rounded-2xl shadow-xl p-8"
            style={{ border: "1px solid var(--color-gray-200)" }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="w-64 h-80 rounded-xl overflow-hidden">
                  <img
                    src={athlete.photo}
                    alt={athlete.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:w-2/3 md:pl-8">
                <h1
                  className="mb-6"
                  style={{
                    fontSize: "var(--font-size-xlarge)",
                    fontWeight: "bold",
                    color: "var(--color-black)",
                  }}
                >
                  {athlete.name}
                </h1>

                <div className="space-y-4">
                  <div>
                    <h2
                      className="font-medium"
                      style={{
                        fontSize: "var(--font-size-regular)",
                        color: "var(--color-gray-400)",
                      }}
                    >
                      TTL
                    </h2>
                    <p>
                      {athlete.birthPlace}, {athlete.birthDate}
                    </p>
                  </div>

                  <div>
                    <h2
                      className="font-medium"
                      style={{
                        fontSize: "var(--font-size-regular)",
                        color: "var(--color-gray-400)",
                      }}
                    >
                      Jenis Kelamin
                    </h2>
                    <p>{athlete.gender}</p>
                  </div>

                  <div>
                    <h2
                      className="font-medium"
                      style={{
                        fontSize: "var(--font-size-regular)",
                        color: "var(--color-gray-400)",
                      }}
                    >
                      Alamat
                    </h2>
                    <p>{athlete.address}</p>
                  </div>

                  <div>
                    <h2
                      className="font-medium"
                      style={{
                        fontSize: "var(--font-size-regular)",
                        color: "var(--color-gray-400)",
                      }}
                    >
                      Sekolah
                    </h2>
                    <p>{athlete.school}</p>
                  </div>

                  <div>
                    <h2
                      className="font-medium"
                      style={{
                        fontSize: "var(--font-size-regular)",
                        color: "var(--color-gray-400)",
                      }}
                    >
                      Nama Orang Tua/Wali
                    </h2>
                    <p>{athlete.parent}</p>
                  </div>

                  <div>
                    <h2
                      className="font-medium"
                      style={{
                        fontSize: "var(--font-size-regular)",
                        color: "var(--color-gray-400)",
                      }}
                    >
                      Cabang Olahraga
                    </h2>
                    <p>{athlete.sport}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AthleteDetail;
