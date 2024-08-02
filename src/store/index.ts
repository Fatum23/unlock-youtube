import { create } from 'zustand'
import { invoke } from '@tauri-apps/api/core'
import { emit, listen } from '@tauri-apps/api/event'
import { TypeLanguage, TypeStore, TypeTheme } from '@/types'
import { getFromStore, setToStore } from '@/services/store'

export const useAppStore = create<TypeStore>(set => ({
	on: false,
	setOn: on => {
		emit('on', on)
		setToStore<boolean>('on', on)
		set(() => ({
			on: on,
		}))
	},

	theme: 'system',
	setTheme: theme => {
		emit('theme', theme)
		setToStore<TypeTheme>('theme', theme)
		set(() => ({
			theme: theme,
		}))
	},
	language: 'system',
	setLanguage: language => {
		emit('language', language)
		setToStore<TypeLanguage>('language', language)
		set(() => ({
			language: language,
		}))
	},
}))

const initSettingsStore = async () => {
	await getFromStore<boolean>('on').then(on => {
		on = on ? on : false
		emit('on', on)
		useAppStore.setState({
			on: on,
		})
	})
	await getFromStore<TypeTheme>('theme').then(theme => {
		theme = theme ? theme : 'system'
		emit('theme', theme)
		useAppStore.setState({
			theme: theme,
		})
	})
	await getFromStore<TypeLanguage>('language').then(language => {
		language = language ? language : 'system'
		emit('language', language)
		useAppStore.setState({
			language: language,
		})
	})

	requestAnimationFrame(() =>
		requestAnimationFrame(() => invoke('show_main_window'))
	)
}

initSettingsStore()
listen<boolean>('on', e => {
	console.log(e)
	useAppStore.setState({
		on: e.payload,
	})
})
