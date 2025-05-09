import { TimerIcon } from 'lucide-react'
import styles from './styles.module.css'


export function Logo() {
  return <div className={styles.logo}>
    <a className={styles.logoLink} href="#">
      <TimerIcon width={64} />
      <span>Chronos</span>
    </a>

  </div>
}