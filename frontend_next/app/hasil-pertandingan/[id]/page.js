import React from "react";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const getResultDetail = (id) => {
  const results = [
    {
      id: 1,
      cabangOlahraga: "HAPKIDO",
      nomor: "Individual Hyung PUTRI",
      tanggal: "16/06/2025",
      peserta: [
        {
          nama: "Siti Rahmawati",
          foto: "/atlet-1.jpg",
          medali: "EMAS",
        },
        {
          nama: "Atlet 2",
          foto: "/atlet-3.jpg",
          medali: "5th",
        },
      ],
    },
    {
      id: 2,
      cabangOlahraga: "HAPKIDO",
      nomor: "Individual Hyung PUTRA",
      tanggal: "16/06/2025",
      peserta: [
        {
          nama: "Ahmad Fauzi",
          foto: "/atlet-2.jpg",
          medali: "PERUNGGU",
        },
        {
          nama: "Atlet 4",
          foto: "/atlet-4.jpg",
          medali: "10th",
        },
      ],
    },
  ];

  return results.find((result) => result.id === parseInt(id)) || results[0];
};

const ResultDetail = ({ params }) => {
  const result = getResultDetail(params.id);
  const galleryImages = [
    { id: 1, alt: "Pertandingan Hapkido" },
    { id: 2, alt: "Latihan Hapkido" },
    { id: 3, alt: "Penyerahan Medali" },
    { id: 4, alt: "Pose Atlet" },
    { id: 5, alt: "Aksi Pertandingan" },
    { id: 6, alt: "Tim Hapkido" },
  ];

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
            href="/hasil-pertandingan"
            className="inline-block mb-6"
            style={{ color: "var(--color-primary)" }}
          >
            &larr; Kembali
          </Link>

          <div
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            style={{ border: "1px solid var(--color-gray-200)" }}
          >
            <h1
              className="mb-2"
              style={{
                fontSize: "var(--font-size-xlarge)",
                fontWeight: "bold",
                color: "var(--color-black)",
              }}
            >
              {result.cabangOlahraga}
            </h1>
            <h2
              className="mb-6"
              style={{
                fontSize: "var(--font-size-large)",
                color: "var(--color-gray-600)",
              }}
            >
              {result.nomor}
            </h2>
            <p className="mb-8" style={{ color: "var(--color-gray-500)" }}>
              Tanggal: {result.tanggal}
            </p>

            <div className="space-y-6 mb-12">
              {result.peserta.map((peserta, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg"
                  style={{
                    backgroundColor: "var(--color-gray-100)",
                    borderLeft: `4px solid ${
                      peserta.medali === "EMAS"
                        ? "#FFD700"
                        : peserta.medali === "PERAK"
                        ? "#C0C0C0"
                        : peserta.medali === "PERUNGGU"
                        ? "#CD7F32"
                        : "transparent"
                    }`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={peserta.foto}
                      alt={peserta.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3
                      className="font-semibold"
                      style={{ fontSize: "var(--font-size-medium)" }}
                    >
                      {peserta.nama}
                    </h3>
                  </div>

                  {peserta.medali === "EMAS" ||
                  peserta.medali === "PERAK" ||
                  peserta.medali === "PERUNGGU" ? (
                    <div
                      className={`px-4 py-1 rounded-full font-bold ${
                        peserta.medali === "EMAS"
                          ? "bg-yellow-100 text-yellow-800"
                          : peserta.medali === "PERAK"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-700 text-white"
                      }`}
                    >
                      {peserta.medali}
                    </div>
                  ) : (
                    <div className="px-4 py-1 font-bold">{peserta.medali}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Dokumentasi */}
            <div>
              <h2
                className="font-bold mb-6"
                style={{
                  fontSize: "var(--font-size-large)",
                  color: "var(--color-gray-800)",
                }}
              >
                Dokumentasi Pertandingan
              </h2>
              <div
                className="relative w-full overflow-hidden rounded-2xl p-4 mb-4"
                style={{
                  backgroundColor: "var(--color-gray-100)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="relative overflow-hidden h-64 rounded-xl">
                  <div className="absolute flex animate-scroll whitespace-nowrap">
                    {galleryImages.map((img) => (
                      <div key={img.id} className="inline-block mx-4">
                        <div
                          className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl w-96 h-56 flex items-center justify-center font-medium shadow-md"
                          style={{ fontSize: "var(--font-size-normal)" }}
                        >
                          {img.alt}
                        </div>
                      </div>
                    ))}
                    {galleryImages.map((img) => (
                      <div key={`copy-${img.id}`} className="inline-block mx-4">
                        <div
                          className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl w-96 h-56 flex items-center justify-center font-medium shadow-md"
                          style={{ fontSize: "var(--font-size-normal)" }}
                        >
                          {img.alt}
                        </div>
                      </div>
                    ))}
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

export default ResultDetail;
