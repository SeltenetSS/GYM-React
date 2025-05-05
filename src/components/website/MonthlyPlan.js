import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MonthlyPlan.css";

const MonthlyPlan = () => {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(4); // Hər səhifədə göstərilən paket sayı

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Package/packages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  // Hesablamaq üçün səhifə nömrələrini əldə et
  const totalPages = Math.ceil(packages.length / packagesPerPage);

  // Hər səhifəyə aid olan paketləri göstərmək
  const currentPackages = packages.slice(
    (currentPage - 1) * packagesPerPage,
    currentPage * packagesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section id="section7" className="mb-4 pt-3">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center my-5">
            <h6 className="my-3 fw-bold">OUR PLAN</h6>
            <h2 className="display-6">CHOOSE YOUR PRICING PLAN</h2>
          </div>
        </div>

        <div className="row justify-content-center">
          {/* Keçid işarələri sol tərəfdə */}
          <div className="col-1 text-start">
            <button onClick={handlePrevPage} className="page-nav-btn">
              &lt;
            </button>
          </div>

          {/* Üfüqi olaraq kaydırılabilen paketlər */}
          <div className="col-10">
            <div className="packages-container">
              {currentPackages.map((pkg) => (
                <div key={pkg.id} className="ps-item text-center mb-4">
                  <h3 className="mb-4">{pkg.packageName}</h3>
                  <div className="pi-price mb-4">
                    <h2>${pkg.price}</h2>
                    <span>{pkg.durationInMonths} Months</span>
                  </div>
                  <ul className="list-group mb-4">
                    <li>{pkg.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Keçid işarələri sağ tərəfdə */}
          <div className="col-1 text-end">
            <button onClick={handleNextPage} className="page-nav-btn">
              &gt;
            </button>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="text-center mt-4">
          <span>
            {currentPage} / {totalPages}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MonthlyPlan;
