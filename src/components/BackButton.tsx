import { useCallback, useEffect } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
	const navigate = useNavigate()

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && navigate(-1)
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [])
	return (
		<div>
			<button className='p-1' onClick={() => navigate(-1)}>
				<IoArrowBackOutline size={24} />
			</button>
		</div>
	)
}
