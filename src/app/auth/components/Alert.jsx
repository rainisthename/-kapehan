import { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const AlertModal = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white flex items-center`}>
      {type === "success" ? <FaCheckCircle className="mr-2" /> : <FaExclamationCircle className="mr-2" />}
      <span>{message}</span>
    </div>
  );
};

export default AlertModal;
