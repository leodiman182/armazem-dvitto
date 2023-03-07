import React, { useContext } from 'react'
import ConfigsContext from '../context/ConfigsContext';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {
  BsWhatsapp,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";

const Gallery = () => {
  const {
    top,
    pageConfig,
    gallery,
    setGalleryPage
  } = useContext(ConfigsContext);
  const { color } = pageConfig;
  const { logo } = top;

  const navigation = [
    {
      name: 'WhatsApp',
      href: '',
      icon: <BsWhatsapp />
    },
    {
      name: 'Instagram',
      href: '',
      icon: <BsInstagram />
    },
    {
      name: 'Facebook',
      href: '',
      icon: <BsFacebook />
    },
  ]
  
  return (
    <div style={ {backgroundColor: '#9999' } } className="h-full md:h-screen">
      <header className="bg-gray1 fixed md:static top-0 z-30 w-full flex flex-row justify-center items-center px-4">
        <div className="flex flex-row items-center justify-center">    
          <img className="h-16 px-4 my-4" src={logo} alt="Armazém D'Vitto" onClick={() => setGalleryPage(false)}/>
        </div>
        <nav className="flex flex-row w-24 md:w-32 justify-evenly">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-white opacity-80 hover:opacity-100 hover:scale-125 ease-out duration-150 hover:text-white" target="_blank" rel="noreferrer">
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </nav>
      </header>
      <section  className="mt-20 md:mt-0 px-6 md:pr-0 text-center pt-5">
        <div className="flex flex-row items-center">
          <button className="fixed top-18 right-4 md:static py-4 pr-8" onClick={() => setGalleryPage(false)}>
            <BsFillArrowLeftCircleFill style={ { color: `${ color }`, stroke: 'rgba(153, 153, 153, 0.9)', strokeWidth: 0.5} } className="h-12 p-1 w-12 md:h-8 md:w-8 hover:scale-110 duration-150" />
          </button> 
          <h2 style={ { color: `${ color }`} } className="font-bold text-5xl text-left">Nossa Casa</h2>
        </div>
        <div className="w-full flex flex-col md:flex-row md:overflow-x-auto">
          {
            gallery.array.map((img, i) => (
              <img key={i} className="my-2 rounded border-4 md:border-4 border-white md:md:max-h-96 md:mx-2" src={img} alt="img" />
            ))
          }
        </div>
      </section>
    </div>

  )
}

export default Gallery;
