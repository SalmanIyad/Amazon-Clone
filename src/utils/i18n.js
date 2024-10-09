import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from '../Locales/EN/Common.json';
import  translationAR from '../Locales/AR/Common.json';
import languageDetector from 'i18next-browser-languagedetector';
import NavbarBelt from "../components/Navbar/NavbarBelt/NavbarBelt";


const resources = {
  en: {
    translation: translationEN,
  
  },
  ar: {
    translation: translationAR,
  
  }
};

i18n
 .use(languageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en", 

    interpolation: {
      escapeValue: false 
    },
    react:{
      useSuspense:false
    }
  });
  i18n.on('languageChanged', (lang) => {
    const navbar = document.querySelector('.navbarBelt'); 
    const navbarmb = document.querySelector('.navbarBeltmb'); 
    const navbarBeltMbSearchBox =document.querySelector('.navbarBeltMbSearchBox')
    
    if (lang === 'ar') {
      document.body.style.direction = 'rtl';  
      document.body.style.textAlign = 'right';
  
     
      if (navbar ) {
        navbar.style.direction = 'ltr';  
        navbar.style.textAlign = 'left';  
        navbarmb.style.direction = 'ltr'; 
        navbarmb.style.textAlign = 'left'; 
        navbarBeltMbSearchBox.style.direction = 'ltr';
        navbarBeltMbSearchBox.style.textAlign = 'left';
      }
    } else {
      document.body.style.direction = 'ltr';  
      document.body.style.textAlign = 'left';
  
    
      if (navbar) {
        navbar.style.direction = 'ltr';
        navbar.style.textAlign = 'left';
      }
    }
  });
  

  export default i18n;