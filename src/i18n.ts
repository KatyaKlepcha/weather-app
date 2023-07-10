import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)// passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next"
                }
            }
        },
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });