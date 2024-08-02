import { TypeSettingsKeys } from '@/types'
import { useTranslation } from 'react-i18next'
import { Select } from '@/components'
import { Dispatch, SetStateAction } from 'react'

export const SettingsItem = <T,>(props: {
	storeKey: TypeSettingsKeys
	value: T
	setValue: Dispatch<SetStateAction<T>>
	dropdownValues?: T[]
}) => {
	const { t } = useTranslation()
	return (
		<div className='w-full bg-light hover:bg-dark group p-2 rounded-md flex flex-row justify-between items-center'>
			<div>{t(props.storeKey)}</div>
			<div>
				<Select
					value={props.value as string}
					setValue={props.setValue as Dispatch<SetStateAction<string>>}
					dropdownValues={props.dropdownValues! as string[]}
				/>
			</div>
		</div>
	)
}
