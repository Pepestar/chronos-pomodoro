
import { MainTemplate } from '../../templates/MainTemplate'
import { Conteiner } from '../../components/Container'
import { CountDown } from '../../components/CountDown'
import { MainForm } from '../../components/MainForm'

export function Home() {
  return (
    <>
      <MainTemplate>
        <Conteiner>
          <CountDown />
        </Conteiner>
        <Conteiner>
          <MainForm />
        </Conteiner>
      </MainTemplate>
    </>
  )
}

