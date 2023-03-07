import React, { useContext, useEffect, useState } from 'react';
import './services/firebase/firebase';
import Dish from './components/Dish';
import Footer from './components/Footer';
import Header from './components/Header';
import RoundLink from './components/RoundLink';
import './svg.css';
import './Highlights.css';
import ConfigsContext from './context/ConfigsContext';

import iconLogo from './assets/SITE (1).png'
import Slideshow from './components/Slideshow';
import Gallery from './pages/Gallery';
import MenuViewer from './pages/MenuViewer';
// import MenuViewer from './pages/MenuViewer';

function App() {
  const {
      top,
      page,
      highlights,
      footer,
      pageConfig,
      galleryPage,
      setGalleryPage,
      menuViewer,
      setMenuViewer,
  } = useContext(ConfigsContext);
  const [ loading, setLoading ] = useState(false);
  const [ section, setSection ] = useState('EXECUTIVOS');

  const { color } = pageConfig;

  useEffect(() => {
    function checkFetch() {
      if (
        Object.keys(top).length !== 0
        && Object.keys(page).length !== 0
        && Object.keys(highlights).length !== 0
        && Object.keys(footer).length !== 0
      ) {
        setLoading(true);
      }
    }
    checkFetch()
  }, [ top, page, highlights, footer ]);

  useEffect(() => {
    if (loading) {
      const firstButton = highlights.menuTabs[0].title;
      const hlButtons = Array.from(document.querySelectorAll('.highlight-button'))
      hlButtons.forEach(button => {
        if (button.innerHTML === firstButton) {
          button.style.backgroundColor = color;
          button.style.color = 'rgb(75 75 77)';
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  useEffect(() => {
    if (loading) {
      const firstButton = highlights.menuTabs[0].title;
      const hlButtons = Array.from(document.querySelectorAll('.highlight-button'))
      hlButtons.forEach(button => {
        if (button.innerHTML === firstButton) {
          button.style.backgroundColor = color;
          button.style.color = 'rgb(75 75 77)';
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const hlButtons = Array.from(document.querySelectorAll('.highlight-button'))
    hlButtons.forEach(el => {
      if (el.innerHTML === section) {
        el.style.backgroundColor = color;
        el.style.color = 'rgb(75 75 77)';
      } else {
        el.style.backgroundColor = 'transparent';
        el.style.color = color;
      }
    })
  }, [ section, color ]);

  function handleDishSection() {
    const selectedSection = highlights.menuTabs.find((tab) => tab.title === section)
    return (
      selectedSection.dishes.map((dish, i) => (
        <Dish
          key={i}
          name={ dish.name }
          description={ dish.description }
          price={ dish.price }
        />
      ))
    )
  }

  function checkSection(e) {
    e.preventDefault();
    const { target } = e;
    const clickedSection = target.innerHTML;
    setSection(clickedSection);
  }

  function desktopDishImg() {
    const selectedSection = highlights.menuTabs.find(tab => tab.title === section)
    return (
      <img className="-z-10 absolute h-full object-cover lg:w-full xl:rounded-r-lg" src={ selectedSection.img } alt="Meal" />
    )
  }

  function mobileDishImg() {
    const selectedSection = highlights.menuTabs.find(tab => tab.title === section)
    return (
      <img className="absolute top-0 -z-20 object-cover h-full w-full" src={ selectedSection.img } alt="Meal" />
    )
  }

  const structure = (
    <>
      <Header />
      {
        loading && (
          <main className="overflow-x-hidden">
            <section id="home" style={ { backgroundColor: `${ color }` } } className="mt-14 md:mt-10">
              <div className=".carousel-dur relative w-full h-full">
                <Slideshow imageArray={ top.carousel } interval={ pageConfig.interval } />
                <svg className="z-10 svg-css w-more absolute -bottom-0.5" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1"
                  viewBox="0 0 14770.52 2110.59"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlnsxodm="http://www.corel.com/coreldraw/odm/2003">
                  <path className="fil0" d="M-0 0l14716.31 0.21 -1.02 350.75c-200.47,141.18 -349.85,258.59 -600.34,419.17 -1057,682.6 -2244.02,1031.29 -4470.37,1004.18l-10.72 19.44c808.43,73.65 1730.1,67.92 3302.39,-393.79 -202.83,77.55 -438.47,145.51 -680.37,211.64 695.02,-153.85 1342.66,-417.22 1920.42,-788.27 176.81,-125.9 360.01,-286.82 540,-430.23l0 359.55 -203.36 166.52 203.36 -135.29 -0.36 48.98c-2428.61,1612.5 -5293.92,1406.23 -8972.01,766.91 -219.9,-38.22 2469.78,343.33 2286.08,291.28 -201.65,-57.13 -1600.84,-240.83 -2005.66,-301.72 -132.54,-28.8 -443.52,-61.29 -689.32,-103.83 -5.49,-1.96 -11.24,-4.59 -16.45,-7.1 130.86,-0.02 212.63,13.37 254.29,9.18 -40.22,-11.11 -120.3,-15.7 -129.98,-38.75 28.17,0.18 93.04,-0.06 177.92,7.31 82.53,7.17 166.68,10.53 168.37,32.11 -29.92,-0.52 -74.5,6.8 -128.05,5.63 51.06,6.96 54.86,7.48 249.98,34.04 498.31,64.33 1106.17,172.58 1466.33,221.58 127.61,2.1 242.2,23.23 365.16,14.15 94.71,-8.03 216.17,-4.64 284.12,-24.1 -8.61,-43.74 -145.8,-48.03 -275.71,-65.41l-2539.41 -397.55 -905.25 -148.02c8.95,-8.26 30.01,-9.83 67.97,-5.52l588.34 76.94 1652.26 243.92c-99.81,-20.88 -213.55,-41.7 -299.41,-62.64l357.79 38.91c835.17,135.44 1202.03,167.57 1445.46,172.47 -549.54,-64.22 -1109.54,-140.01 -1672.09,-227.71 -1057.89,-172.1 -2092.99,-346.74 -3237.8,-509.33 -1057.35,-131.34 -2126.06,-238.46 -3208.61,-249.95l0.08 -65.76c7.91,-2.67 16.17,-4.52 27.99,-4.45 25.45,0.17 68.92,4.69 171.1,-3.24l626.8 9.98c913.38,29.99 1880.63,149.09 2867.55,285.04 634.99,87.47 1524.47,244.24 1920.37,273.08 -738.38,-113.34 -1471.18,-227.41 -2249.32,-335.98 -573.15,-78.6 -1152.65,-147.97 -1748.26,-194.16 -305.8,-24.44 -608.66,-45.04 -901.36,-52.24 -27.05,0.24 -53.74,-1.82 -80.21,-5.44l-475.49 -6.86c-7.41,-0.38 -13.12,-0.11 -15.81,1.35 -2.91,-3.17 -6.71,-6.35 -10.54,-9.12 54.73,-8.19 105.99,-26.72 164.17,-24.58 304.31,1.29 622.79,10.37 958.09,30.58 523.43,28.03 1084.06,80.24 1573.4,117.15 -293.51,-50.07 -824.8,-84.53 -1285.55,-121.48 -15.03,-10.03 -36.42,-16.39 -67.63,-17.08 -379.45,-13.37 -756.17,-26.9 -1058.35,-28.92 5.37,-2.37 10.68,-5.61 16.1,-7.12 9.46,-2.31 28.63,-4.16 47.02,-6.7 54.53,-7.53 125.07,-14.06 142.03,-20.68 -204.27,-5.48 -418.2,-6.63 -622.47,-5.22l0 -413.82zm9215.87 1601.33c-531.94,-38.09 -1047.22,-101.76 -1549.1,-185.99 512.1,74.77 1028.08,137.93 1549.1,185.99zm1595.73 14.87c329.1,-17.11 645.47,-46.14 930.23,-104.61 -313.5,30.45 -623.6,65.3 -930.23,104.61zm-2433.46 2.46c995.73,129.52 1915.13,111.53 2784.42,-3.32 -946.57,84.85 -1875.25,88.4 -2784.42,3.32zm317.98 342.95c1190.52,132.19 1879.99,83.67 2509.35,13.48 -836.41,48.31 -1672.86,60.29 -2509.35,-13.48zm-393.84 -84.09c900.95,129.06 1744.25,148.88 2535.02,69.16 -879.31,47.94 -1722.14,20.37 -2535.02,-69.16z" />
                  <path className="fil1" d="M14715.95 350.79l0 42.52c-179.91,143.36 -363,304.18 -539.72,430.01 -577.76,371.05 -1225.41,634.41 -1920.42,788.27 241.9,-66.13 477.53,-134.09 680.37,-211.64 -1572.29,461.71 -2493.97,467.45 -3302.39,393.79l10.72 -19.44c2226.35,27.1 3413.37,-321.58 4470.37,-1004.18 250.48,-160.58 399.87,-277.99 600.34,-419.17l0.74 -0.17zm-14715.67 1854.73l0.08 223.76 14715.59 0 0 -1596.28 -0.54 0.47c-2428.61,1612.5 -5293.46,1405.59 -8971.55,766.29 -219.88,-38.22 2469.78,343.33 2286.08,291.28 -201.65,-57.13 -1600.84,-240.83 -2005.66,-301.72 -132.54,-28.8 -443.52,-61.29 -689.32,-103.83 -5.49,-1.96 -11.24,-4.59 -16.45,-7.1 130.86,-0.02 212.63,13.37 254.29,9.18 -40.22,-11.11 -120.3,-15.7 -129.98,-38.75 28.17,0.18 93.05,-0.05 177.92,7.31 82.52,7.16 166.68,10.53 168.37,32.11 -29.92,-0.52 -74.5,6.8 -128.05,5.63l249.98 34.04c498.31,64.33 1106.17,172.58 1466.33,221.58 127.61,2.1 242.2,23.23 365.16,14.15 94.71,-8.03 216.17,-4.64 284.12,-24.1 -8.61,-43.74 -145.8,-48.03 -275.71,-65.41l-3444.65 -545.57c8.95,-8.26 30.01,-9.83 67.97,-5.52l2240.6 320.86c-99.81,-20.88 -213.55,-41.7 -299.41,-62.64l357.79 38.91c835.17,135.44 1202.03,167.57 1445.46,172.47 -549.54,-64.22 -1109.54,-140.01 -1672.09,-227.71 -1057.89,-172.1 -2092.99,-346.74 -3237.8,-509.33 -1057.35,-131.34 -2119.77,-238.62 -3202.31,-250.11l-6.22 0.16 0 1599.87zm8.46 -1667.83c23.98,-7.07 44.96,5.82 190.63,-5.49l626.8 9.98c913.38,29.99 1880.63,149.11 2867.55,285.04 634.97,87.47 1524.47,244.24 1920.37,273.08 -738.38,-113.34 -1471.18,-227.41 -2249.32,-335.98 -573.15,-78.6 -1152.65,-147.97 -1748.26,-194.16 -305.8,-24.44 -608.66,-45.04 -901.36,-52.24 -27.05,0.24 -53.74,-1.82 -80.21,-5.44l-475.49 -6.86c-7.41,-0.38 -13.12,-0.11 -15.81,1.35 -2.91,-3.17 -6.71,-6.35 -10.54,-9.12 54.73,-8.19 105.99,-26.72 164.17,-24.58 304.31,1.29 622.79,10.37 958.09,30.58 523.43,28.03 1084.06,80.24 1573.4,117.15 -293.51,-50.07 -824.8,-84.53 -1285.55,-121.48 -15.03,-10.03 -36.42,-16.39 -67.63,-17.08 -379.45,-13.37 -756.17,-26.9 -1058.35,-28.92 5.37,-2.37 10.68,-5.61 16.1,-7.12 9.46,-2.31 28.64,-4.17 47.02,-6.7 54.52,-7.52 125.07,-14.06 142.03,-20.68 -204.12,-5.48 -417.89,-6.63 -622.03,-5.22l0 126.07c2.88,-1.14 5.76,-1.92 8.38,-2.2zm14707.2 215.18l0 31.19 -203.08 135.1 203.08 -166.29zm-5500.15 848.46c-531.94,-38.09 -1047.22,-101.76 -1549.1,-185.99 512.1,74.77 1028.08,137.93 1549.1,185.99zm1595.73 14.87c329.1,-17.11 645.47,-46.14 930.23,-104.61 -313.5,30.45 -623.6,65.3 -930.23,104.61zm-2433.46 2.46c995.73,129.52 1915.13,111.53 2784.42,-3.32 -946.57,84.85 -1875.25,88.4 -2784.42,3.32zm317.98 342.95c1190.52,132.19 1879.99,83.67 2509.35,13.48 -836.41,48.31 -1672.86,60.29 -2509.35,-13.48zm-393.84 -84.09c900.95,129.06 1744.25,148.88 2535.02,69.16 -879.31,47.94 -1722.14,20.37 -2535.02,-69.16z" />
                </svg>
                <span className="h-full w-full absolute top-0 bg-black opacity-60" />
                <article className="absolute text-center inset-0 lg:inset-0 mt-12">
                  <img className="w-44 mx-auto" src={top.logo} alt="logo" />
                  <h2 style={ { color: `${color}` } } className="text-4xl md:text-6xl pt-8">{top.title}</h2>
                  <p className="text-white px-28 py-3 text-md md:text-xl uppercase">{top.subtitle}</p>
                </article>
              </div>
            </section>
            <section id="page" className="py-8 pt-0 px-4 text-center">
              <div className="mx-auto py-8">
                <h2 style={ { color: `${color}` } } className="text-5xl pb-4">{page.title}</h2>
                <p className="text-xl py-4 px-6">{page.subtitle}</p>
              </div>
              <div className="flex flex-col justify-center md:items-start items-center md:flex-row w-full mx-auto">
                {
                  page.link.map((el, index) => el.gallery === true
                  ? (
                    <RoundLink title={el.title} subtitle={el.subtitle} img={el.img} onClick={() => setGalleryPage(true)} key={index} />
                  ) 
                  : el.menu === true 
                  ? (
                    <RoundLink title={el.title} subtitle={el.subtitle} img={el.img} onClick={() => setMenuViewer(true)} key={index} />
                  )
                  : (
                    <RoundLink title={el.title} subtitle={el.subtitle} img={el.img} link={el.ref} key={index} />
                  ))
                }
              </div>
            </section>
            <section id="highlights">
              {/* MOBILE*/}
              <article className="relative pb-8 pt-4 sm:hidden">
                <h2 style={ { color: `${color}` } } className="text-center text-3xl pt-2 pb-6 uppercase">{ highlights.title }</h2>
                <div className="grid grid-cols-3 gap-2 px-8">
                  {
                    highlights.menuTabs.map((tab, i) => {
                      return (
                        <button
                          onClick={ (e) => checkSection(e) }
                          key={ i }
                          style={ { color: `${color}`, borderColor: `${color}` } }
                          className="highlight-button px-1 text-md border-2 bg-transparent rounded active:scale-110 uppercase"
                        >
                          { tab.title }
                        </button>
                      )
                    })
                  }
                </div>
                <div className="px-12 pt-6">
                  {handleDishSection()}
                </div>
                {mobileDishImg()}
                <div className="absolute top-0 bg-gray1 w-full h-full -z-20 opacity-60" />
                <div className="absolute top-0 bg-gradient-to-r from-black w-full h-full -z-10 opacity-80" />
              </article>

              {/* DESKTOP */}
              <div className="hidden sm:block xl:mx-auto">
                <div className="grid grid-cols-2">
                  <article className="bg-gray1 py-8 px-4 hidden sm:block xl:pl-52 uw:pl-96">
                    <h2 style={ { color: `${color}` } } className="text-center text-3xl pt-2 pb-6 uppercase">{highlights.title}</h2>
                    <div className="grid grid-cols-3 gap-3 px-8">
                      {
                        highlights.menuTabs.map((tab, i) => (
                          <>
                            <button
                              id={`hightlight${i}`}
                              onClick={ (e) => checkSection(e) }
                              key={ i }
                              style={ { color: `${color}`, borderColor: `${color}` } }
                              className={`highlight-button px-4 text-md border-2 bg-transparent rounded duration-100 focus:scale-110 focus:bg-${color} ease-in ease-out uppercase hover:scale-105 hover:scale-y-110`}
                            >
                              { tab.title }
                            </button>
                          </>
                        ))
                      }
                    </div>
                    <div className="px-12 pt-6">
                      {handleDishSection()}
                    </div>
                  </article>
                  <aside className="relative hidden sm:block">
                    {desktopDishImg()}
                    <div className="z-20 absolute w-24 h-full bg-gradient-to-r from-gray1" />
                    <div className="z-10 absolute w-more h-full bg-gradient-to-r from-gray1 top-0 right-0" />
                  </aside>
                </div>
              </div>
            </section>
          </main>
        )
      }      
      <Footer />
    </>
  );

  return (    
    // !loading ? (
    //   <div style={ { backgroundColor: `${ color }` } }  className="w-full h-screen flex flex-col items-center justify-center duration-100 ease-in">
    //     <img  className="w-48" src={ iconLogo } alt="Ícone D'Vitto" />
    //   </div>
    // ) 
    // : 
    //   !galleryPage ? structure : <Gallery />

    !loading ? (
      <div style={ { backgroundColor: `${ color }` } }  className="w-full h-screen flex flex-row items-center justify-center duration-100 ease-in">
        <img  className="w-48" src={ iconLogo } alt="Ícone D'Vitto" />
      </div>
    ) 
    : 
      galleryPage
    ? <Gallery />
    : menuViewer 
    ? <MenuViewer />
    : structure
  )
}

export default App;
