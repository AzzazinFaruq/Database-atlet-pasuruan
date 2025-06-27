"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const allResults = [
  {
    id: 1,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRI",
    medali: "EMAS",
    tanggal: "16/06/2025",
  },
  {
    id: 2,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRI",
    medali: "PERAK",
    tanggal: "16/06/2025",
  },
  {
    id: 3,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRI",
    medali: "PERUNGGU",
    tanggal: "16/06/2025",
  },
  {
    id: 4,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRA",
    medali: "",
    tanggal: "16/06/2025",
  },
  {
    id: 5,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRA",
    medali: "",
    tanggal: "16/06/2025",
  },
  {
    id: 6,
    cabangOlahraga: "HAPKIDO",
    nomor: "Bezpasangan Hoehnsul PUTRI",
    medali: "",
    tanggal: "16/06/2025",
  },
];

const getUniqueValues = (key) => [
  ...new Set(allResults.map((item) => item[key])),
];

const ResultsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCabor, setFilterCabor] = useState("");
  const [filterNomor, setFilterNomor] = useState("");

  const resultsPerPage = 10;

  const uniqueCabors = useMemo(() => getUniqueValues("cabangOlahraga"), []);
  const uniqueNomors = useMemo(() => {
    if (!filterCabor) return [];
    return [
      ...new Set(
        allResults
          .filter((item) => item.cabangOlahraga === filterCabor)
          .map((item) => item.nomor)
      ),
    ];
  }, [filterCabor]);

  const filteredResults = useMemo(() => {
    return allResults.filter((result) => {
      const matchesCabor =
        filterCabor === "" || result.cabangOlahraga === filterCabor;
      const matchesNomor = filterNomor === "" || result.nomor === filterNomor;
      return matchesCabor && matchesNomor;
    });
  }, [filterCabor, filterNomor]);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

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
          HASIL PERTANDINGAN
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
              {uniqueCabors.map((cabor, index) => (
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

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg mb-8">
          <table
            className="w-full"
            style={{
              borderCollapse: "collapse",
              backgroundColor: "var(--color-white)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--color-gray-100)" }}>
                <th
                  className="p-4 text-left"
                  style={{ borderBottom: "1px solid var(--color-gray-200)" }}
                >
                  Cabang Olahraga
                </th>
                <th
                  className="p-4 text-left"
                  style={{ borderBottom: "1px solid var(--color-gray-200)" }}
                >
                  Nomor
                </th>
                <th
                  className="p-4 text-left"
                  style={{ borderBottom: "1px solid var(--color-gray-200)" }}
                >
                  Medali
                </th>
                <th
                  className="p-4 text-left"
                  style={{ borderBottom: "1px solid var(--color-gray-200)" }}
                >
                  Updates
                </th>
                <th
                  className="p-4 text-left"
                  style={{ borderBottom: "1px solid var(--color-gray-200)" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((result) => (
                <tr
                  key={result.id}
                  style={{ borderBottom: "1px solid var(--color-gray-200)" }}
                >
                  <td className="p-4">{result.cabangOlahraga}</td>
                  <td className="p-4">{result.nomor}</td>
                  <td className="p-4">
                    {result.medali === "EMAS" ||
                    result.medali === "PERAK" ||
                    result.medali === "PERUNGGU" ? (
                      <span
                        className={`px-2 py-1 rounded-full ${
                          result.medali === "EMAS"
                            ? "bg-yellow-100 text-yellow-800"
                            : result.medali === "PERAK"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-700 text-white"
                        }`}
                      >
                        {result.medali}
                      </span>
                    ) : null}
                  </td>
                  <td className="p-4">{result.tanggal}</td>
                  <td className="p-4">
                    <Link href={`/hasil-pertandingan/${result.id}`}>
                      <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="var(--color-primary)"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
                color: currentPage === page ? "white" : "var(--color-gray-800)",
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
                currentPage === totalPages ? "var(--color-gray-600)" : "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultsPage;
