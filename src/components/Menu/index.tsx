import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react'
import styles from './styles.module.css'


export function Menu() {
  return <nav className={styles.menu}>
    <a className={styles.menuLink} href="#">
      <HouseIcon width={64} />

    </a>
    <a className={styles.menuLink} href="#">
      <HistoryIcon width={64} />

    </a>
    <a className={styles.menuLink} href="#">
      <SettingsIcon width={64} />

    </a>
    <a className={styles.menuLink} href="#">
      <SunIcon width={64} />

    </a>

  </nav>
}