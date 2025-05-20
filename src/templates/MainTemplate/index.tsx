import { Conteiner } from '../../components/Container'
import { Logo } from '../../components/Logo'
import { Menu } from '../../components/Menu'
import { Footer } from '../../components/Footer'

type MainTemplateProps = {
  children: React.ReactNode
}

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Conteiner>
        <Logo />
      </Conteiner>
      <Conteiner>
        <Menu />
      </Conteiner>
      {children}
      <Conteiner>
        <Footer />
      </Conteiner>
    </>
  )
}

