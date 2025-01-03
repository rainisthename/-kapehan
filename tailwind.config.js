// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./server/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         'mona-regular': ['Mona Regular', 'sans'],
//         'mona-medium': ['Mona Medium', 'sans'],
//         'mona-bold': ['Mona Bold', 'sans'],
//         'mona-semibold': ['Mona SemiBold', 'sans'],
//         'mona-black': ['Mona Black', 'sans'],
//         'mona-extrabold': ['Mona ExtraBold', 'sans'],
//         'poppins': ['Poppins', 'sans'],
//         'poppins-medium': ['Poppins Medium', 'sans'],
//         'poppins-black': ['Poppins Black', 'sans'],
//         'poppins-extra-bold': ['Poppins Extra Bold', 'sans'],
//         'poppins-bold': ['Poppins Bold', 'sans'],
//         'inter': ['Inter', 'sans'],
//         'inter-medium': ['Inter Medium', 'sans'],
//         'inter-black': ['Inter Black', 'sans'],

//       },  
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//         titleColor: "#291009"
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./server/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mona-regular': ['Mona Regular', 'sans'],
        'mona-medium': ['Mona Medium', 'sans'],
        'mona-bold': ['Mona Bold', 'sans'],
        'mona-semibold': ['Mona SemiBold', 'sans'],
        'mona-black': ['Mona Black', 'sans'],
        'mona-extrabold': ['Mona ExtraBold', 'sans'],
        'poppins': ['Poppins', 'sans'],
        'poppins-medium': ['Poppins Medium', 'sans'],
        'poppins-black': ['Poppins Black', 'sans'],
        'poppins-extra-bold': ['Poppins Extra Bold', 'sans'],
        'poppins-bold': ['Poppins Bold', 'sans'],
        'inter': ['Inter', 'sans'],
        'inter-medium': ['Inter Medium', 'sans'],
        'inter-black': ['Inter Black', 'sans'],
      },  
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        titleColor: "#291009"
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
