import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min"; 

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    return () => {
     
      const logoutModal = document.getElementById("logout-modal");
      const successModal = document.getElementById("success-modal");

      if (logoutModal) {
        const modalInstance = bootstrap.Modal.getInstance(logoutModal);
        if (modalInstance) modalInstance.dispose();
      }

      if (successModal) {
        const modalInstance = bootstrap.Modal.getInstance(successModal);
        if (modalInstance) modalInstance.dispose();
      }
    };
  }, []);

  const handleLogout = () => {

    const logoutModal = document.getElementById("logout-modal");
    const successModal = document.getElementById("success-modal");

    if (logoutModal) {
      const modalInstance = bootstrap.Modal.getInstance(logoutModal);
      if (modalInstance) modalInstance.hide();
    }

    if (successModal) {
      const modalInstance = bootstrap.Modal.getInstance(successModal);
      if (modalInstance) modalInstance.show();
    }

 
    localStorage.removeItem("token");

    
    setTimeout(() => {
      window.location.href = "/sign-up";
    }, 1000);
  };

  return (
    <>

      <div
        className="modal fade"
        id="logout-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <p>
                Are you sure,<br />
                you want to logout?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btnThird" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btnPrimary"
                data-bs-toggle="modal"
                data-bs-target="#success-modal"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="success-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <p>Successfully logged out</p>
              <Icon
                icon="material-symbols:check-circle-outline-rounded"
                className="icon"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btnThird" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
