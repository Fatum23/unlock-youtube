import { BackButton } from '@/components'
import { useAppStore } from '@/store'
import { TypeLanguage, TypeTheme } from '@/types'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export const SettingsNavBar = (props: {
	theme: TypeTheme
	setTheme: Dispatch<SetStateAction<TypeTheme>>
	language: TypeLanguage
	setLanguage: Dispatch<SetStateAction<TypeLanguage>>
}) => {
	const { t } = useTranslation()
	const store = useAppStore()
	return (
		<div className='w-full h-6 px-2 pt-2 flex justify-between'>
			<BackButton />
			<div className='flex flex-row gap-2'>
				<div>
					<button
						className='p-1'
						disabled={
							props.theme === store.theme && props.language === store.language
						}
						onClick={() => {
							store.setTheme(props.theme)
							store.setLanguage(props.language)
						}}
					>
						{t('Apply')}
					</button>
				</div>
				<div>
					<button
						className='p-1'
						disabled={
							props.theme === 'system' &&
							store.theme === 'system' &&
							props.language === 'system' &&
							store.language === 'system'
						}
						onClick={() => {
							props.setTheme('system')
							store.setTheme('system')
							props.setLanguage('system')
							store.setLanguage('system')
						}}
					>
						{t('Reset')}
					</button>
				</div>
			</div>
		</div>
	)
}
