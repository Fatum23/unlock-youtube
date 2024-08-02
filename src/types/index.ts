export type TypeSettingsKeys = 'theme' | 'language'
export type TypeStoreKeys = TypeSettingsKeys | 'on'

export type TypeTheme = 'system' | 'light' | 'dark'
export type TypeLanguage = 'system' | 'ru' | 'en'

export type TypeStore = {
	on: boolean
	setOn: (on: boolean) => void

	theme: TypeTheme
	setTheme: (theme: TypeTheme) => void

	language: TypeLanguage
	setLanguage: (language: TypeLanguage) => void
}
