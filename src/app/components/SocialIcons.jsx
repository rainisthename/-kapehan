import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Ensure react-icons is installed

const SocialIcons = () => {
  return (
    <div className="flex justify-start py-6">
      <div className="flex gap-4"> {/* Use flex with a small gap */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-base text-black hover:text-gray-700 transition duration-300" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-base text-black hover:text-gray-700 transition duration-300" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="text-base text-black hover:text-gray-700 transition duration-300" />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
