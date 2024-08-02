import { TypeTheme } from '@/types'
import { listen } from '@tauri-apps/api/event'

let themeLoaded: boolean = false
let transitionStylesheet = document.createElement('style')
document.head.appendChild(transitionStylesheet)
listen<TypeTheme>('theme', e => {
	document.documentElement.className = `theme-${e.payload}`
	if (!themeLoaded) {
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				transitionStylesheet.sheet!.insertRule(
					'* { transition: color 0.3s, background 0.3s !important; }',
					0
				)
				themeLoaded = true
			})
		)
	}
})
