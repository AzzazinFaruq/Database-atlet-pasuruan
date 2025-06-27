"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";

const CABANG_OLAHRAGA = ["HAPKIDO"];

const NOMOR_PERTANDINGAN = {
  HAPKIDO: [
    "Individual Hyung PUTRI",
    "Individual Hyung PUTRA",
    "Bezpasangan Hoehnsul PUTRI",
    "Bezpasangan Hoehnsul PUTRA",
    "Hospital Gaya Bebas (Free Style)",
  ],
};

axios
  .get("http://localhost:8080/api/atlet")
  .then((res) => {
    athletes = res.data.data;
  })
  .catch((err) => {
    console.error("Gagal ambil data:", err);
  });

var athletes = [];

const AthletesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCabor, setFilterCabor] = useState("");
  const [filterNomor, setFilterNomor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
      const matchesSearch =
        searchQuery === "" ||
        athlete.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.cabangOlahraga
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (athlete.nomor &&
          athlete.nomor.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCabor && matchesNomor && matchesSearch;
    });
  }, [filterCabor, filterNomor, searchQuery]);

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
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <select
                value={filterCabor}
                onChange={handleFilterCaborChange}
                className="w-full p-3 rounded-lg border appearance-none"
                style={{
                  borderColor: "var(--color-gray-300)",
                  backgroundColor: "var(--color-white)",
                }}
              >
                <option value="">Semua Cabang Olahraga</option>
                {CABANG_OLAHRAGA.map((cabor, index) => (
                  <option key={index} value={cabor}>
                    {cabor}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Cari atlet..."
              className="w-full p-3 rounded-lg border"
              style={{
                borderColor: "var(--color-gray-300)",
                backgroundColor: "var(--color-white)",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <Link
            href="/daftar-atlet/form"
            className="px-4 py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Tambah Atlet
          </Link>
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
                        src={athlete.foto_3x4}
                        alt={athlete.foto_bebas}
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
                        {athlete.nama}
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
