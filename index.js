import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const regions = [
  { 
    title: "Introduction", 
    subChapters: [ 
      { number: "1.1", title: "About", content: "Welcome to Machtls Skispaß! This guide is designed to take you through some of the most incredible skiing and travel destinations. Whether you're looking for thrilling slopes, breathtaking landscapes, or cultural experiences, we've got you covered!", image: "/about.jpg" }, 
      { number: "1.2", title: "Overview Map", content: "Here is an overview map highlighting all the destinations covered in this guide.", image: "/map.jpg" } 
    ] 
  },
  { number: "1", title: "Paris", content: "The city of light, known for the Eiffel Tower, art, and fashion.", image: "/paris.jpg" },
  { number: "2", title: "Kyoto", content: "Famous for its classical Buddhist temples, gardens, and geisha culture.", image: "/kyoto.jpg" },
  { number: "3", title: "New York", content: "A bustling metropolis, home to Broadway, Central Park, and skyscrapers.", image: "/newyork.jpg" },
];

export default function TravelGuide() {
  const [currentPage, setCurrentPage] = useState(-1);
  const [currentSubPage, setCurrentSubPage] = useState(0);
  const [search, setSearch] = useState("");

  const nextPage = () => {
    if (currentPage < regions.length - 1) {
      setCurrentPage(currentPage + 1);
      setCurrentSubPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > -1) {
      setCurrentPage(currentPage - 1);
      setCurrentSubPage(0);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-200 min-h-screen">
      {/* Table of Contents */}
      <div className="table-of-contents mb-6 w-full">
        <h3 className="font-bold text-xl mb-2">Table of Contents</h3>
        <ul>
          <li onClick={() => setCurrentPage(-1)}>Introduction</li>
          <li onClick={() => setCurrentPage(0)}>1. Paris</li>
          <li onClick={() => setCurrentPage(1)}>2. Kyoto</li>
          <li onClick={() => setCurrentPage(2)}>3. New York</li>
        </ul>
      </div>

      <Input
        placeholder="Search region..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-64"
      />

      <div className="relative w-[600px] h-[400px] bg-white shadow-lg rounded-lg p-6 border border-gray-300 book-page">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col gap-2">
          {regions.map((region, index) => (
            <button
              key={index}
              onClick={() => { setCurrentPage(index); setCurrentSubPage(0); }}
              className={`px-4 py-1 text-sm font-bold border-r-4 transition-all ${index === currentPage ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
            >
              {region.number}. {region.title}
            </button>
          ))}
        </div>

        {/* Content Display */}
        {currentPage === -1 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-serif font-bold mb-4">Machtls Skispaß</h1>
            <img src="/skier.jpg" alt="skier" className="w-full h-40 object-cover rounded-md mb-2 border border-gray-300" />
            <p className="text-gray-700 text-lg font-serif italic">Explore the world's most amazing destinations!</p>
          </motion.div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center"
          >
            <h2 className="text-3xl font-serif font-bold mb-2">{regions[currentPage].number}. {regions[currentPage].title}</h2>
            {regions[currentPage].subChapters ? (
              <>
                <div className="flex gap-4 mb-2">
                  {regions[currentPage].subChapters.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => setCurrentSubPage(subIndex)}
                      className={`px-3 py-1 text-sm font-bold border-b-4 transition-all ${subIndex === currentSubPage ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                    >
                      {sub.number} {sub.title}
                    </button>
                  ))}
                </div>
                <img src={regions[currentPage].subChapters[currentSubPage].image} alt="subchapter" className="w-full h-40 object-cover rounded-md mb-2 border border-gray-300" />
                <p className="text-gray-700 text-lg font-serif italic">{regions[currentPage].subChapters[currentSubPage].content}</p>
              </>
            ) : (
              <>
                <img src={regions[currentPage].image} alt="region" className="w-full h-40 object-cover rounded-md mb-2 border border-gray-300" />
                <p className="text-gray-700 text-lg font-serif italic">{regions[currentPage].content}</p>
              </>
            )}
          </motion.div>
        )}
      </div>
      
      <div className="mt-4 flex gap-4">
        <Button onClick={prevPage} disabled={currentPage === -1}>Previous</Button>
        <Button onClick={nextPage} disabled={currentPage >= regions.length - 1}>Next</Button>
      </div>
    </div>
  );
}
