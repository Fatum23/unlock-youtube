import { HashRouter, Route, Routes } from 'react-router-dom'
import '@/App.scss'
import '@/services/theme'
import '@/services/language'
import { MainPage, SettingsPage } from '@/pages'

export const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</HashRouter>
	)
}
