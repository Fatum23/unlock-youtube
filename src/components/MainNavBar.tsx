import { IoSettingsSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const MainNavBar = () => {
	const navigate = useNavigate()
	return (
		<div className='w-full h-6 flex justify-end px-2 pt-2'>
			<div>
				<div className='cursor-pointer' onClick={() => navigate('/settings')}>
					<IoSettingsSharp size={24} />
				</div>
			</div>
		</div>
	)
}
