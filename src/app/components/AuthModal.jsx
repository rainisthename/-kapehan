// components/Modal.js
import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa"; // Importing icons from react-icons
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../lib/firebase";

const googleProvider = new GoogleAuthProvider();

const Modal = ({ show, onClose }) => {
  
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log('res', result)
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      // // IdP data available using getAdditionalUserInfo(result)
      // // ...
      show = false;
    } catch (error) {
      console.log('error', error)
    }
  }

  if(!show) {
    return null
  }

  return (
    
    show && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96 md:w-[500px]">
          {/* Header with Title */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-poppins-semibold text-gray-800">Write a Review</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">
              <FaTimes />
            </button>
          </div>

          {/* Rating Section */}
          <button onClick={loginWithGoogle}>
            Log in with Google
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
