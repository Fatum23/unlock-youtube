import { MainNavBar, ToggleButton } from '@/components'

export const MainPage = () => {
	return (
		<div className='w-screen h-screen flex flex-col justify-between items-center'>
			<MainNavBar />
			<ToggleButton />
			<div></div>
		</div>
	)
}
