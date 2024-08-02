import { SettingsItem, SettingsNavBar } from '@/components'
import { useAppStore } from '@/store'
import { TypeLanguage, TypeTheme } from '@/types'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'

export const SettingsPage = () => {
	const store = useAppStore()
	const [theme, setTheme] = useState<TypeTheme>(store.theme)
	const [language, setLanguage] = useState<TypeLanguage>(store.language)

	return (
		<div className='w-screen h-screen flex flex-col justify-between'>
			<div>
				<SettingsNavBar
					theme={theme}
					setTheme={setTheme}
					language={language}
					setLanguage={setLanguage}
				/>
				<div className='mt-8 flex flex-col gap-2 px-2'>
					<SettingsItem<TypeTheme>
						storeKey='theme'
						value={theme}
						dropdownValues={['system', 'light', 'dark']}
						setValue={setTheme}
					/>
					<SettingsItem<TypeLanguage>
						storeKey='language'
						value={language}
						dropdownValues={['system', 'ru', 'en']}
						setValue={setLanguage}
					/>
				</div>
			</div>
			<div className='pl-2 pb-2 flex'>
				<a
					href='https://github.com/Fatum23/unlock-youtube'
					target='_blank'
					title='https://github.com/Fatum23/unlock-youtube'
					className='group'
				>
					<div className='flex flex-col'>
						<div className='flex flex-row items-center gap-0.5'>
							<FaGithub className='group-hover:fill-sky-400 [transition:fill_0.3s_!important]' />
							<div className='group-hover:text-sky-400'>Github</div>
						</div>
						<div className='h-0.5 bg-text group-hover:bg-sky-400'></div>
					</div>
				</a>
			</div>
		</div>
	)
}
