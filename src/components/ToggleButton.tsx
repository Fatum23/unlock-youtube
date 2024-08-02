import { useAppStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { IoIosPower } from 'react-icons/io'

export const ToggleButton = () => {
	const { t } = useTranslation()
	const { on, setOn } = useAppStore()
	return (
		<div>
			<button
				className={`rounded-full w-28 h-28 flex flex-col items-center p-4 gap-2 ${
					on
						? 'bg-accent hover:bg-accent shadow-glow'
						: ' bg-dark hover:bg-dark shadow-dark'
				}`}
				onClick={() => setOn(!on)}
			>
				<IoIosPower size={24} />
				<h1>{t(on ? 'On' : 'Off')}</h1>
			</button>
		</div>
	)
}
