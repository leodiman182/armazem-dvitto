import React, { useEffect, useState } from 'react';
import ConfigsContext from './ConfigsContext';
import { topSection, pageSection, highlightsSection, footerSection, pageConfigSection, gallerySection, menuSection } from '../domain/sectionDomains';
import getData from '../services/firebase/dataService';
import getImage from '../services/firebase/imageService';

function ConfigsProvider({ children }) {
  const [ galleryPage, setGalleryPage ] = useState(false);

  const [top, setTop] = useState({});

  const [page, setPage] = useState({});

  const [highlights, setHighlights] = useState({});

  const [footer, setFooter] = useState({});

  const [pageConfig, setPageConfig]  = useState({});

  const [menu, setMenu]  = useState({});

  const [gallery, setGallery] = useState(false);

  const [menuViewer, setMenuViewer] = useState(false);
  
  useEffect(() => {
    async function fetchPageConfig() {
      const pageConfig = await getData(pageConfigSection.pageConfig.hash)
      
      const interval = await pageConfig[0]['tempo_do_carrosel']
      const primaryColor = await pageConfig[0]['cor_padrão_do_site']

      setPageConfig({
        interval,
        color: primaryColor
      })
    }

    async function fetchGallery () {
      const gallery = await getData(gallerySection.gallery.hash)
      const array = [];

      gallery.forEach(async (element) => {
        const thisImg = await getImage(element.imagem.fullPath)
        array.push(thisImg)
      })

      setGallery({
        array
      })
    }

    async function fetchTop() {
      const carousel = await getData(topSection.carouselImages.hash)
      const img1 = await getImage(carousel[0][topSection.carouselImages.keys[0]].fullPath)
      const img2 = await getImage(carousel[0][topSection.carouselImages.keys[1]].fullPath)
      const img3 = await getImage(carousel[0][topSection.carouselImages.keys[2]].fullPath)
      
      const welcome = await getData(topSection.welcomeContent.hash)
      const titleW = welcome[0]['título']
      const subtitleW = welcome[0]['sub-título']
      const logo = await getImage(welcome[0].logo.fullPath)
      
      setTop({
        carousel: [img1, img2, img3],
        title: titleW,
        subtitle: subtitleW,
        logo
      })
    }

    async function fetchPage() {
      const content = await getData(pageSection.content.hash)
      const titleW = content[0]['título']
      const subtitleW = content[0]['sub-título']
  
      const links = await getData(pageSection.links.hash)
      console.log(links);

      const linksOrder = links.sort((a, b) => a['posição_do_link'] - b['posição_do_link'])
  
      const link1t = linksOrder[0]['título']
      const link1st = linksOrder[0]['sub-título']
      const link1ref = linksOrder[0].link
      const link1img = await getImage(linksOrder[0][pageSection.content.keys[0]].fullPath)
      const link1Gallery = linksOrder[0]['galeria']
      const link1Menu = linksOrder[0]['cardápio']
  
      const link2t = linksOrder[1]['título']
      const link2st = linksOrder[1]['sub-título']
      const link2ref = linksOrder[1].link
      const link2img = await getImage(linksOrder[1][pageSection.content.keys[0]].fullPath)
      const link2Gallery = linksOrder[1]['galeria']
      const link2Menu = linksOrder[1]['cardápio']



      const link3t = linksOrder[2]['título']
      const link3st = linksOrder[2]['sub-título']
      const link3ref = linksOrder[2].link
      const link3img = await getImage(linksOrder[2][pageSection.content.keys[0]].fullPath)
      const link3Gallery = linksOrder[2]['galeria']
      const link3Menu = linksOrder[2]['cardápio']
  
      setPage({
        title: titleW,
        subtitle: subtitleW,
        link: [
          {
            title: link1t,
            subtitle: link1st,
            ref: link1ref,
            img: link1img,
            gallery: link1Gallery[0].value,
            menu: link1Menu[0].value
          },
          {
            title: link2t,
            subtitle: link2st,
            ref: link2ref,
            img: link2img,
            gallery: link2Gallery[0].value,
            menu: link2Menu[0].value
          },
          {
            title: link3t,
            subtitle: link3st,
            ref: link3ref,
            img: link3img,
            gallery: link3Gallery[0].value,
            menu: link3Menu[0].value

          },
        ]
      })
    }
  
    async function fetchHighlights() {
      const title = await getData(highlightsSection.title.hash)
      const highTitle = title[0]['título']
  
      const tabs = await getData(highlightsSection.tabs.hash)
  
      const dishes = await getData(highlightsSection.dishes.hash)

      let menuTabs = [];

      for (let index = 0; index < tabs.length; index++) {
        const tab = tabs[index];
        const tabImg = await getImage(tab[highlightsSection.tabs.keys[0]].fullPath)

        menuTabs.push({
          title: tab['título'],
          img: tabImg,
          dishes: []
        })

        for (let index1 = 0; index1 < dishes.length; index1++) {
          const dish = dishes[index1];

          if (tab['título'] === dish['Abas'].name) {
            menuTabs[index].dishes.push({
              name: dish['nome'],
              description: dish['descrição'],
              price: dish['preço']
            })
          }
        }
      }
  
      setHighlights({
        title: highTitle,
        menuTabs
      })
    }
  
    async function fetchFooter() {
      const footerContent = await getData(footerSection.footer.hash)
      const b = await getImage(footerContent[0][footerSection.footer.keys[0]].fullPath)
  
      setFooter({
        address: footerContent[0]['endereço'],
        img: b
      })
    }

    // PEGANDO O LINK DO MENU PDF AQUI E PASSANDO ELE COMO STATE DO CONTEXTO
    async function fetchMenu() {
      const menu = await getData(menuSection.menu.hash);
      
      const menuPdf = menu[0]['cardápio']
      const menuPdfImg = await getImage(menuPdf.fullPath)

      setMenu({
        link: menuPdfImg
      })
    }

    fetchTop()
    fetchPage()
    fetchHighlights()
    fetchFooter()
    fetchPageConfig()
    fetchGallery()
    fetchMenu()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const context = {
    top,
    page,
    highlights,
    footer,
    pageConfig,
    gallery,
    galleryPage,
    setGalleryPage,
    menu,
    menuViewer,
    setMenuViewer
  }

  return (
    <ConfigsContext.Provider value={context}>
      { children }
    </ConfigsContext.Provider>
  )
}

export default ConfigsProvider;