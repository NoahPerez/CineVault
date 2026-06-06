// import logo from "../assets/logo.svg"
  
// export default function Footer() {
//   return (
// <footer
//   style={{
//     marginTop: "80px",
//     padding: "30px 24px",
//     background: "#111827",
//     color: "white",
//   }}
// >

// <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "12px",
//         }}
//       >
//          <img
//             src={logo}
//             alt="CineVault logo"
//             style={{
//               width: "140px",
//               objectFit: "contain",
//                marginBottom: "5px",
//   }}
//     />
//       <span style={{ color: "#9ca3af", fontSize: "14px" }}>
//           © {new Date().getFullYear()} All rights reserved
//         </span>

//  </div>

 
 

//   <div
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       gap: "20px",
//       marginTop: "16px",
//     }}
//   >
//     <a href="/">Terms of Use</a>
//     <a href="/watchlist">Privacy Policy</a>
//     <a href="/profile">Help Centre</a>
//      <a href="/profile">Contact Us</a>
//   </div>

 
// </footer>
//   );
// }

import logo from "../assets/logo.svg";

export default function Footer() {
  return (
 <footer className="w-full bg-gray-900 text-white ">
      
      
      <div className=" flex gap-3 flex-col" >
        <img
          src={logo}
          alt="CineVault logo"
          className="w-36 ml-0"
        />

        <span className="text-gray-400 text-sm">
          © {new Date().getFullYear()} All rights reserved
        </span>
      </div>

     
      <div className="flex justify-center gap-6 mt-6">
        <a href="/" className="text-gray-300 hover:text-white transition">
          Terms of Use
        </a>
        <a
          href="/watchlist"
          className="text-gray-300 hover:text-white transition"
        >
          Privacy Policy
        </a>
        <a
          href="/profile"
          className="text-gray-300 hover:text-white transition"
        >
          Help Centre
        </a>
        <a  href="/profile" 
        className="text-gray-300 hover:text-white transition">
          Contact Us
        </a>
      </div>

    
    </footer>
  );
}