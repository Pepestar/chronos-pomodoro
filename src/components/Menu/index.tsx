import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { RouterLink } from '../RouterLink'

type AvailableThemes = 'dark' | 'light'

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvailableThemes || 'dark')
    return storageTheme
  })

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault()
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    })
  }

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  }


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])


  return <nav className={styles.menu}>
    <RouterLink className={styles.menuLink} href="/" aria-label='Ir para a home' title='Ir para a home'>
      <HouseIcon width={64} />

    </RouterLink>
    <RouterLink className={styles.menuLink} href="history/" aria-label='Ver historico' title='Ver historico'>
      <HistoryIcon width={64} />

    </RouterLink>
    <RouterLink className={styles.menuLink} href="/settings/" aria-label='Configurações' title='Configurações'>
      <SettingsIcon width={64} />

    </RouterLink>
    <a className={styles.menuLink} href="#" aria-label='Alterar tema' title='Alterar tema'
      onClick={handleThemeChange}
    >
      {nextThemeIcon[theme]}

    </a>

  </nav>
}