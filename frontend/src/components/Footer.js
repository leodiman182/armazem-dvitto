import React, { useContext } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

import ConfigsContext from '../context/ConfigsContext';

function Footer() {
  const {
    pageConfig, footer
  } = useContext(ConfigsContext);
  const { color } = pageConfig;
  const date = new Date();
  const year = date.getFullYear();
  return(
    <footer style={ { borderColor: color } } className="w-full bg-gray1 text-white py-4 text-center">
      <img className="w-32 mx-auto py-2 mb-4" src={footer.img} alt="logo" />
      <p className="flex flex-row items-center justify-center">
        <FaMapMarkerAlt style={ { color: `${color}` } } className="mr-1" />
        {footer.address}
      </p>
      <h3 className="pt-4 text-xs">Copyright © { year } Armazém D'Vitto | Desenvolvido por <a target="_blank" rel="noreferrer" href="https://agatecnologia.com/" style={ { color: `${color}` } } className="font-bold hover:text-black duration-150">AGA Tecnologia</a></h3>
    </footer>
  )
}

export default Footer;