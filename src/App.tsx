import { Conteiner } from './components/Container'
import { Logo } from './components/Logo'
import './styles/theme.css'
import './styles/global.css'
import { Menu } from './components/Menu'

export function App() {
  return (
    <>
      <Conteiner>
        <Logo />
      </Conteiner>
      <Conteiner>
        <Menu />
      </Conteiner>
    </>
  )
}

