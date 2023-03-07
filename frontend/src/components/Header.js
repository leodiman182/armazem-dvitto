import React, { useContext } from 'react'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import {
  BsWhatsapp,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import ConfigsContext from '../context/ConfigsContext';

export default function Header() {
  const {
    pageConfig
  } = useContext(ConfigsContext);

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

  const { color } = pageConfig;

  return (
    <Disclosure as="nav" className="bg-gray1 fixed top-0 z-30 w-full">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto py-2 md:py-0 px-4 sm:px-6 md:px-16 xl:max-w-screen-lg">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <nav className="flex flex-row w-32 justify-evenly">
                    {navigation.map((item) => (
                      <a key={item.name} href={item.href} className="text-white opacity-80 hover:opacity-100 hover:scale-125 ease-out duration-150 hover:text-white" target="_blank" rel="noreferrer">
                        <span className="sr-only">{item.name}</span>
                        {item.icon}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <a
                    href="#home"
                    className="text-gray-300 hover:bg-black duration-150 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>
                  <a
                    href="#highlights"
                    className="text-gray-300 hover:bg-black duration-150 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Destaques
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href=""
                    className="text-gray-300 hover:bg-black duration-150 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Delivery
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href=""
                    className="text-gray-300 hover:bg-black duration-150 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Localização
                  </a>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon style={ { color: `${color}` } } className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon style={ { color: `${color}` } } className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 py-4 space-y-1 z-20">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#highlights"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Destaques
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href=""
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Delivery
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                target="_blank"
                rel="noreferrer"
                href=""
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Localização
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

