import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips/indext";



export function MainForm() {
  const { state, dispatch } = useTaskContext()
  // const [taskName, setTaskName] = useState('')
  const taskNameInput = useRef<HTMLInputElement>(null)

  const nextCycle = getNextCycle(state.currentCycle)
  console.log(nextCycle)
  const nextCycleType = getNextCycleType(nextCycle)



  function handleTaskTest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (taskNameInput.current === null) return

    const taskName = taskNameInput.current.value.trim()
    console.log(taskName)

    if (!taskName) {
      alert('Digite o nome da tarefa')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,

    }

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask })

  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK })

  }

  return (
    <form onSubmit={handleTaskTest} className='form' action="">
      <div className="formRow">
        <DefaultInput
          labelText='Tarefa'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          // value={taskName}
          // onChange={e => setTaskName(e.target.value)}
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>
      <div className="formRow">
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        {!state.activeTask && (<DefaultButton
          aria-label="Iniciar nova tarefa"
          title="Iniciar nova tarefa"
          type="submit"
          icon={<PlayCircleIcon />}
          key='botao_submit'
        />)}

        {!!state.activeTask && (
          <DefaultButton
            aria-label="Interromper tarefa atual"
            title="Interromper tarefa atual"
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key='botao_button'
          />

        )}


      </div>
    </form>
  )
}
