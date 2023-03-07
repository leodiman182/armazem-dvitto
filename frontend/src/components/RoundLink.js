import React, { useContext } from 'react';
import ConfigsContext from '../context/ConfigsContext';

function RoundLink({ title, subtitle, img, link, onClick }) {
  const {
    pageConfig
  } = useContext(ConfigsContext);
  const { color } = pageConfig;

  return (
    <div className="w-full md:w-56 mx-4 text-center py-4 md:py-0  rounded">
      <a className="mx-auto flex flex-col items-center justify-center hover:scale-110 duration-150" href={link} onClick={onClick} target="_blank" rel="noreferrer">
        <img style={{ borderColor: `${color}` }} className="rounded-full border-4 w-36 h-36 object-cover" src={img} alt="img" />
      </a>
      <h4 className="text-lg text-black md:text-md pt-4">{title}</h4>
      <p className="text-lg text-gray-500 px-12 md:px-0 pt-2">{subtitle}</p>
    </div>
  )
}

export default RoundLink;