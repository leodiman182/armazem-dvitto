import React, { useContext } from 'react';
import ConfigsContext from '../context/ConfigsContext';

const MenuViewer = () => {
  const {
    menu,
    // menuViewer,
    // SetMenuViewer
  } = useContext(ConfigsContext);

  const { link } = menu;

  return (
    <div>
      <iframe className="w-full h-screen" title="pdfMenu" src={ link } frameBorder="0"></iframe>
    </div>
  )
}

export default MenuViewer;