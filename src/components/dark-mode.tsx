'use client';

import { useEffect, useState } from 'react';
import { Moon, SunMoon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ToggleDarkMode({ mode = false }) {
	const [isDarkMode, setDarkMode] = useState(mode);

	useEffect(() => {
		if (isDarkMode) {
			document.cookie = 'theme=dark';
			document.documentElement.classList.add('dark');
		} else {
			document.cookie = 'theme=light';
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<div className="flex items-center gap-2 cursor-pointer">
			<AnimatePresence initial={false}>
				{isDarkMode && (
					<motion.span
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						onClick={() => setDarkMode(!isDarkMode)}>
						<SunMoon />
					</motion.span>
				)}
				{!isDarkMode && (
					<motion.span
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						onClick={() => setDarkMode(!isDarkMode)}>
						<Moon />
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
}

export default ToggleDarkMode;
