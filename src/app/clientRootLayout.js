// "use client";

// import { usePathname } from "next/navigation";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// export default function ClientRootLayout({ children }) {
//   const pathname = usePathname();

//   // Conditionally hide the Navbar on /explore/[name] pages
//   const showNavbar = !pathname.startsWith("/explore/");

//   return (
//     <>
//       {showNavbar && <Navbar />}
//       {children}
//       <Footer />
//     </>
//   );
// }
