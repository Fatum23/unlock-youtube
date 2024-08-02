import { Store } from '@tauri-apps/plugin-store'
import { TypeStoreKeys } from '@/types'

const store = new Store('.store.dat')

export const getFromStore = async <T>(
	key: TypeStoreKeys | 'on'
): Promise<T | null> => await store.get<T>(key)

export const setToStore = <T>(key: TypeStoreKeys, value: T) => {
	store.set(key, value)
	store.save()
}
