import { listen } from '@tauri-apps/api/event'
import i18next from 'i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './en'
import { ru } from './ru'

i18n.use(initReactI18next).init({
	lng: 'ru',
	fallbackLng: 'en',
	resources: {
		en: {
			translation: en,
		},
		ru: {
			translation: ru,
		},
	},
	interpolation: {
		escapeValue: false,
	},
})

listen('language', (e: { payload: string }) => {
	e.payload = e.payload !== 'system' ? e.payload : navigator.language
	i18next.changeLanguage(e.payload)
})
