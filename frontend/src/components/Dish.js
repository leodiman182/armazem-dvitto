import React, { useContext } from 'react';
import ConfigsContext from '../context/ConfigsContext';

function Dish({ name, description, price }) {
  const {
    pageConfig
  } = useContext(ConfigsContext);
  const { color } = pageConfig;

  return (
    <>
      <div style={ { color: `${color}` } } className="flex flex-row justify-between items-end py-1">
        <h2 className="text-2xl">{ name }</h2>
        <p className="text-xs">R$ <span className="text-2xl">{price && price.toFixed(2)}</span></p>
      </div>
      <p className="text-justify pr-10 text-white text-md opacity-80">{ description }</p>
      <div style={ { backgroundColor: `${color}` } } className="my-4 h-0.5 w-full bg-gradient-to-r from-transparent" />
    </>
  )
}

export default Dish;