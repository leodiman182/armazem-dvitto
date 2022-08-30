/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../assets/css/Slideshow.css'

function Slideshow({ imageArray, interval }) {
  const [imageURL, SetImageURL] = useState(imageArray[0]);
  const [imageIndex, SetImageIndex] = useState(0);

  useEffect(() => {
    function handleImageChange() {
      SetImageURL(imageArray[imageIndex])
      imageIndex === 2 ? SetImageIndex(0) : SetImageIndex(imageIndex + 1);
    }
    setTimeout(handleImageChange, (interval * 1000));
  }, [imageIndex,])

  return (
    <img className="w-full h-96 object-cover md:h-102 2xl:h-110 opacity-100" src={imageURL} alt="slide1" />
  )
}

export default Slideshow;