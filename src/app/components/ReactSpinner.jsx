// components/Spinner.js

const Spinner = ({ size = 20, color = "#ffffff" }) => {
    return (
      <div
        className="border-t-4 border-gray-200 border-solid w-8 h-8 rounded-full animate-spin"
        style={{
          borderTopColor: color,
          width: size,
          height: size,
        }}
      />
    );
  };
  
  export default Spinner;
  