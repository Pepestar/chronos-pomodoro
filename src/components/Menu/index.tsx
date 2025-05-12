import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

type AvailableThemes = 'dark' | 'light'

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>('dark')

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault()
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    })
  }


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])


  return <nav className={styles.menu}>
    <a className={styles.menuLink} href="#" aria-label='Ir para a home' title='Ir para a home'>
      <HouseIcon width={64} />

    </a>
    <a className={styles.menuLink} href="#" aria-label='Ver historico' title='Ver historico'>
      <HistoryIcon width={64} />

    </a>
    <a className={styles.menuLink} href="#" aria-label='Configurações' title='Configurações'>
      <SettingsIcon width={64} />

    </a>
    <a className={styles.menuLink} href="#" aria-label='Alterar tema' title='Alterar tema'
      onClick={handleThemeChange}
    >
      <SunIcon width={64} />

    </a>

  </nav>
}