import { signInWithGoogle, logOut } from "../Auth/Authentication";
import { navs } from "../Config/config";
import useStore from "../Context/Store";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user } = useStore();
  const [query, setQuery] = useState("");
  const {setLanguage} = useStore();
  const languages = [
    {
    lang:"Tamil",
    code: "ta"
    },
    {
      lang:"Hindi",
      code: "hi"
      },
      {
        lang:"Malayalam",
        code: "ml"
        },
        {
          lang:"Marathi",
          code: "mr"
          },
          {
            lang:"Telugu",
            code: "te"
            },
            {
              lang:"English",
              code: "en"
            }

];

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between">
      
      <div className="text-white font-bold text-2xl tracking-wide mb-4 md:mb-0">
        <h1 className="hover:text-yellow-300 transition duration-300 ease-in-out">
          TECH TITANS
        </h1>
      </div>

      
      <ul className="flex space-x-4 text-white font-semibold">
        {navs.map((nav, index) => (
          <li key={index} className="hover:text-yellow-300 transition duration-300 ease-in-out">
            <Link to={nav.path}>{nav.name}</Link>
          </li>
        ))}
      </ul>

     
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? (window.location.href = `/search/${query}`) : null)}
        className="w-full md:w-1/3 bg-white border border-transparent focus:ring-4 focus:ring-purple-300 text-gray-900 py-2 px-4 rounded-lg shadow-lg placeholder-gray-500 transition duration-300 ease-in-out transform hover:scale-105"
        placeholder="Search..."
      />

     
      <div className="relative">
      
          {languages.map((language, index) => (
            <button
              key={index}
              
              onClick={()=>setLanguage(language.code)}
              className="px-4 py-2 hover:bg-purple-100 transition duration-200 ease-in-out cursor-pointer"
            >
              {language.lang}  
            </button>
          ))}
       
        
      </div>

      
      {user ? (
        <button
          onClick={logOut}
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-800 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Log out
        </button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sign in
        </button>
      )}

      {/* User Profile */}
      {user?.photoURL && (
        <img
          src={user.photoURL}
          alt="User profile"
          className="w-10 h-10 rounded-full ml-4 border-2 border-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
        />
      )}
    </nav>
  );
};

export default Navbar;