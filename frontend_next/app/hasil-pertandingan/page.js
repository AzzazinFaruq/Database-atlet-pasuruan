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
    medali: 1,
    tanggal: "16/06/2025",
  },
  {
    id: 2,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRI",
    medali: 2,
    tanggal: "16/06/2025",
  },
  {
    id: 3,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRI",
    medali: 3,
    tanggal: "16/06/2025",
  },
  {
    id: 4,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRA",
    medali: 4,
    tanggal: "16/06/2025",
  },
  {
    id: 5,
    cabangOlahraga: "HAPKIDO",
    nomor: "Individual Hyung PUTRA",
    medali: 5,
    tanggal: "16/06/2025",
  },
  {
    id: 6,
    cabangOlahraga: "HAPKIDO",
    nomor: "Bezpasangan Hoehnsul PUTRI",
    medali: 6,
    tanggal: "16/06/2025",
  },
];

// Fungsi untuk mendapatkan nilai medali
const getMedal = (position) => {
  if (position === 1) return "EMAS";
  if (position === 2) return "PERAK";
  if (position === 3) return "PERUNGGU";
  return `${position}th`;
};

const getUniqueValues = (key) => [
  ...new Set(allResults.map((item) => item[key])),
];

const ResultsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCabor, setFilterCabor] = useState("");
  const [filterNomor, setFilterNomor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newResult, setNewResult] = useState({
    cabor: "",
    nomor: "",
    atlet: [{ id: "", posisi: "" }],
  });

  const [athletes] = useState([
    { id: 1, name: "Siti Rahmawati" },
    { id: 2, name: "Ahmad Fauzi" },
    { id: 3, name: "Budi Santoso" },
    { id: 4, name: "Citra Dewi" },
  ]);

  const resultsPerPage = 10;

  const uniqueCabors = useMemo(() => getUniqueValues("cabangOlahraga"), []);
  const allUniqueNomors = useMemo(() => getUniqueValues("nomor"), []);
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

  const addAthlete = () => {
    setNewResult((prev) => ({
      ...prev,
      atlet: [...prev.atlet, { id: "", posisi: "" }],
    }));
  };

  // Fungsi untuk menghapus atlet
  const removeAthlete = (index) => {
    if (newResult.atlet.length <= 1) return;
    setNewResult((prev) => {
      const updatedAtlet = [...prev.atlet];
      updatedAtlet.splice(index, 1);
      return { ...prev, atlet: updatedAtlet };
    });
  };

  const handleAthleteChange = (index, field, value) => {
    const updatedAtlet = [...newResult.atlet];
    updatedAtlet[index][field] = value;
    setNewResult((prev) => ({
      ...prev,
      atlet: updatedAtlet,
    }));
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

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-3 rounded-lg flex items-center justify-center gap-2"
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
            Hasil Pertandingan
          </button>
        </div>

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl">
              <div className="p-6">

                {/* Cabang Olahraga */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-gray-700)" }}
                  >
                    Cabang Olahraga
                  </label>
                  <input
                    list="cabor-list"
                    value={newResult.cabor}
                    onInput={(e) => {
                      const value = e.target.value;
                      if (uniqueCabors.includes(value)) {
                        e.target.blur();
                      }
                    }}
                    onChange={(e) =>
                      setNewResult({ ...newResult, cabor: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border"
                    style={{
                      borderColor: "var(--color-gray-300)",
                    }}
                    placeholder="Masukkan cabang olahraga"
                  />
                  <datalist id="cabor-list">
                    {uniqueCabors.map((cabor, index) => (
                      <option key={index} value={cabor} />
                    ))}
                  </datalist>
                </div>

                {/* Nomor Pertandingan */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-gray-700)" }}
                  >
                    Nomor Pertandingan
                  </label>
                  <input
                    list="nomor-list"
                    value={newResult.nomor}
                    onInput={(e) => {
                      const value = e.target.value;
                      if (allUniqueNomors.includes(value)) {
                        e.target.blur(); 
                      }
                    }}
                    onChange={(e) =>
                      setNewResult({ ...newResult, nomor: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border"
                    style={{
                      borderColor: "var(--color-gray-300)",
                    }}
                    placeholder="Masukkan nomor pertandingan"
                  />
                  <datalist id="nomor-list">
                    {allUniqueNomors.map((nomor, index) => (
                      <option key={index} value={nomor} />
                    ))}
                  </datalist>
                </div>

                {/* Atlet */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-gray-700)" }}
                  >
                    Atlet
                  </label>
                  {newResult.atlet.map((athlete, index) => (
                    <div key={index} className="flex gap-2 mb-2 items-center">
                      <div className="flex-1 relative">
                        <select
                          value={athlete.id}
                          onChange={(e) =>
                            handleAthleteChange(index, "id", e.target.value)
                          }
                          className="w-full p-3 rounded-lg border pr-10 appearance-none" // Tambahkan appearance-none di sini
                          style={{
                            borderColor: "var(--color-gray-300)",
                          }}
                        >
                          <option value="">Pilih Atlet</option>
                          {athletes.map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.name}
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
                      <input
                        type="number"
                        min="1"
                        value={athlete.posisi}
                        onChange={(e) =>
                          handleAthleteChange(index, "posisi", e.target.value)
                        }
                        className="w-40 p-3 rounded-lg border"
                        style={{
                          borderColor: "var(--color-gray-300)",
                        }}
                        placeholder="Posisi"
                      />
                      {/* Delete Button */}
                      {newResult.atlet.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAthlete(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                          aria-label="Hapus atlet"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAthlete}
                    className="flex items-center gap-1 text-sm mt-2"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border"
                    style={{
                      borderColor: "var(--color-gray-300)",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      console.log("New result:", newResult);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                    {result.medali && (
                      <span
                        className={`px-2 py-1 rounded-full ${
                          result.medali === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : result.medali === 2
                            ? "bg-gray-100 text-gray-800"
                            : result.medali === 3
                            ? "bg-yellow-700 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {getMedal(result.medali)}
                      </span>
                    )}
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
