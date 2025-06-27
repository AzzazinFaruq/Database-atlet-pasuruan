"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const CABANG_OLAHRAGA = [
  "HAPKIDO",
];

const NOMOR_PERTANDINGAN = {
  HAPKIDO: [
    "Individual Hyung PUTRI",
    "Individual Hyung PUTRA",
    "Bezpasangan Hoehnsul PUTRI",
    "Bezpasangan Hoehnsul PUTRA",
    "Hospital Gaya Bebas (Free Style)",
  ],
};

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
    cabangOlahraga: "Hapkido",
    nomor: "Individual Hyung PUTRA",
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
    cabangOlahraga: "Hapkido",
    nomor: "Individual Hyung Putri",
  },

  ...Array.from({ length: 18 }, (_, i) => {
    const cabang = CABANG_OLAHRAGA[i % CABANG_OLAHRAGA.length];
    const nomorOptions = NOMOR_PERTANDINGAN[cabang] || ["Umum"];
    const nomor = nomorOptions[i % nomorOptions.length];

    return {
      id: i + 3,
      name: `Atlet ${i + 3}`,
      photo: `/athlete${(i % 5) + 1}.jpg`,
      birthPlace: "Pasuruan",
      birthDate: `01/01/200${i % 10}`,
      gender: i % 2 === 0 ? "Laki-laki" : "Perempuan",
      address: `Jl. Contoh No. ${i + 1}, Pasuruan`,
      school: `SMA ${(i % 3) + 1} Pasuruan`,
      parent: `Orang Tua ${i + 1}`,
      sport: `${cabang} - ${nomor}`,
      cabangOlahraga: cabang,
      nomor: nomor,
    };
  }),
];

const AthletesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCabor, setFilterCabor] = useState("");
  const [filterNomor, setFilterNomor] = useState("");

  const athletesPerPage = 9;

  const uniqueNomors = useMemo(() => {
    if (!filterCabor) return [];
    return NOMOR_PERTANDINGAN[filterCabor] || [];
  }, [filterCabor]);

  const filteredAthletes = useMemo(() => {
    return athletes.filter((athlete) => {
      const matchesCabor =
        filterCabor === "" || athlete.cabangOlahraga === filterCabor;
      const matchesNomor = filterNomor === "" || athlete.nomor === filterNomor;
      return matchesCabor && matchesNomor;
    });
  }, [filterCabor, filterNomor]);

  // Pagination
  const indexOfLastAthlete = currentPage * athletesPerPage;
  const indexOfFirstAthlete = indexOfLastAthlete - athletesPerPage;
  const currentAthletes = filteredAthletes.slice(
    indexOfFirstAthlete,
    indexOfLastAthlete
  );
  const totalPages = Math.ceil(filteredAthletes.length / athletesPerPage);

  const handleFilterCaborChange = (e) => {
    setFilterCabor(e.target.value);
    setFilterNomor(""); 
    setCurrentPage(1);
  };

  const handleFilterNomorChange = (e) => {
    setFilterNomor(e.target.value);
    setCurrentPage(1); 
  };

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
        <h1
          className="text-center mb-8"
          style={{
            fontSize: "var(--font-size-xlarge)",
            fontWeight: "bold",
            color: "var(--color-primary)",
          }}
        >
          DAFTAR ATLET
        </h1>

        {/* Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <select
              value={filterCabor}
              onChange={handleFilterCaborChange}
              className="w-full p-3 rounded-lg border appearance-none"
              style={{
                borderColor: "var(--color-gray-300)",
                backgroundColor: "var(--color-white)",
                paddingTop: "1.5rem",
              }}
            >
              <option value="">Semua Cabang Olahraga</option>
              {CABANG_OLAHRAGA.map((cabor, index) => (
                <option key={index} value={cabor}>
                  {cabor}
                </option>
              ))}
            </select>
            <span
              className="absolute left-3 top-3 text-xs pointer-events-none"
              style={{ color: "var(--color-gray-500)" }}
            >
              Cabang Olahraga
            </span>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 relative">
            <select
              value={filterNomor}
              onChange={handleFilterNomorChange}
              className="w-full p-3 rounded-lg border appearance-none"
              style={{
                borderColor: "var(--color-gray-300)",
                backgroundColor: "var(--color-white)",
                paddingTop: "1.5rem",
              }}
              disabled={!filterCabor}
            >
              <option value="">Semua Nomor Pertandingan</option>
              {uniqueNomors.map((nomor, index) => (
                <option key={index} value={nomor}>
                  {nomor}
                </option>
              ))}
            </select>
            <span
              className="absolute left-3 top-3 text-xs pointer-events-none"
              style={{ color: "var(--color-gray-500)" }}
            >
              Nomor Pertandingan
            </span>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentAthletes.length > 0 ? (
            currentAthletes.map((athlete) => (
              <Link key={athlete.id} href={`/daftar-atlet/${athlete.id}`}>
                <div
                  className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                  style={{
                    border: "1px solid var(--color-gray-200)",
                  }}
                >
                  <div className="flex items-center p-4">
                    <div
                      className="w-20 h-20 rounded-full overflow-hidden mr-4"
                      style={{
                        backgroundColor: "var(--color-gray-100)",
                      }}
                    >
                      <img
                        src={athlete.photo}
                        alt={athlete.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold"
                        style={{
                          fontSize: "var(--font-size-medium)",
                          color: "var(--color-gray-800)",
                        }}
                      >
                        {athlete.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-gray-600)" }}
                      >
                        {athlete.sport}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p>Tidak ada atlet yang ditemukan</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredAthletes.length > athletesPerPage && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor:
                  currentPage === 1
                    ? "var(--color-gray-200)"
                    : "var(--color-primary)",
                color: currentPage === 1 ? "var(--color-gray-600)" : "white",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === page ? "font-bold" : ""
                }`}
                style={{
                  backgroundColor:
                    currentPage === page
                      ? "var(--color-primary)"
                      : "var(--color-gray-100)",
                  color:
                    currentPage === page ? "white" : "var(--color-gray-800)",
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor:
                  currentPage === totalPages
                    ? "var(--color-gray-200)"
                    : "var(--color-primary)",
                color:
                  currentPage === totalPages
                    ? "var(--color-gray-600)"
                    : "white",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AthletesPage;
