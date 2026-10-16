import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import playTube from "../assets/logo-no-background.png";
import playTubeMobile from "../assets/logo-colorfevicon.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

import { DataContext } from "../context/contextApi";
import Loader from "../shared/Loader";
import UseOnline from "../utils/UseOnline";
import UploadModal from "./UploadModal"; // Подключаем модалку

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, mobileMenu, setMobileMenu, theme, setTheme } = useContext(DataContext);
  const navigate = useNavigate();
  const isOnline = UseOnline();

  const searchQueryHandler = (event) => {
    if ((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const searchQueryHandler2 = () => {
    if (searchQuery?.length > 0) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className="flex flex-row h-14 px-4 md:px-5 justify-between items-center sticky top-0 z-20 bg-white dark:bg-black shadow-md">
      {loading && <Loader />}

      <div className="flex h-5 items-center relative">
        {pageName !== "video" && (
          <div
            onClick={mobileMenuToggle}
            className="flex h-10 w-10 justify-center items-center rounded-full md:hidden md:mr-6 cursor-pointer hover:bg-[#303030]/[0.6]"
          >
            {mobileMenu ? (
              <CgClose className="text-black dark:text-white text-xl" />
            ) : (
              <SlMenu className="text-black dark:text-white text-xl" />
            )}
          </div>
        )}

        {/* РОЗОВЫЙ ЛОГОТИП */}
        <div 
          onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)} 
          className="flex h-5 items-center cursor-pointer relative"
          title="Создать видео"
        >
          <img src={playTube} alt="PlayTube" className="h-full hidden md:block" />
          <img src={playTubeMobile} alt="PlayTube" className="h-8 w-8 md:hidden rounded-full" />
        </div>

        {/* МЕНЮ СОЗДАНИЯ */}
        {isCreateMenuOpen && (
          <div className="absolute left-0 top-10 w-60 bg-white dark:bg-[#212121] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50">
            <div className="px-4 py-2 text-xs font-bold text-pink-500 uppercase tracking-wider">
              Создать
            </div>

            <button 
              onClick={() => { setIsCreateMenuOpen(false); setIsModalOpen(true); }}
              className="flex items-center w-full px-4 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              📹 Загрузить видео / фото
            </button>
          </div>
        )}
      </div>

      {/* ПОИСК */}
      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#404040] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0 ">
          <div className="w-10 justify-center items-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-black/[0.7] dark:text-white text-xl" />
          </div>
          <input
            type="text"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            className="w-44 px-5 bg-transparent outline-none text-black dark:text-white md:pl-0 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
          />
        </div>
        <button
          onClick={searchQueryHandler2}
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#404040] rounded-r-3xl bg-black/[0.1] dark:bg-white/[0.15]"
        >
          <IoIosSearch className="text-black/[0.9] dark:text-white text-xl" />
        </button>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div
            className={`flex justify-center items-center h-10 w-10 rounded-full ${
              isOnline ? "hover:bg-[#34a0a4]/[0.7]" : "hover:bg-[#f2bad5]/[0.4]"
            }`}
          >
            {isOnline ? (
              <HiOutlineStatusOnline className="text-[#1795a8] dark:text-[#7cf6fd] text-xl" />
            ) : (
              <HiOutlineStatusOffline className="text-[#f74a8a] text-xl" />
            )}
          </div>
          <div
            onClick={handleThemeSwitch}
            className="flex justify-center items-center ml-2 h-10 w-10 rounded-full hover:bg-black/[0.2] dark:hover:bg-[#303030]/[0.6]"
          >
            {theme === "dark" ? (
              <MdOutlineLightMode className="text-white text-xl cursor-pointer" />
            ) : (
              <MdDarkMode className="text-[#3a5171] text-xl cursor-pointer" />
            )}
          </div>
        </div>
        
        {/* АВАТАРКА DANIEL.JPG */}
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
          <img
            src="/Daniel.jpg"
            alt="Daniel"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* ОКОШКО ЗАГРУЗКИ ВИДЕО */}
      {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Header;