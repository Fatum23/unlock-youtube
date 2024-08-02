import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { default as ReactSelect } from 'react-select'

export const Select = (props: {
	value: string
	dropdownValues: string[]
	setValue: Dispatch<SetStateAction<string>>
}) => {
	const { t } = useTranslation()
	const [options, setOptions] = useState<
		{ label: string; value: string }[] | []
	>([])

	useEffect(() => {
		setOptions(
			props.dropdownValues.map(value => ({
				label: t(
					value.replace(/(^\w{1}|[\s.-]\w{1})/g, match => match.toUpperCase())
				),
				value: value,
			}))
		)
	}, [props.dropdownValues])

	return (
		<ReactSelect
			classNamePrefix='react-select'
			isSearchable={false}
			onChange={item => props.setValue(item!.value)}
			options={options}
			value={options.at(
				options.findIndex(option => option.value === props.value)
			)}
			menuPlacement='auto'
			menuPosition='fixed'
		/>
	)
}
