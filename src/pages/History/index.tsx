
import { MainTemplate } from '../../templates/MainTemplate'
import { Container } from '../../components/Container'
import { Heading } from '../../components/Heading'
import { DefaultButton } from '../../components/DefaultButton'
import { TrashIcon } from 'lucide-react'

import styles from './styles.module.css'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { formatDate } from '../../utils/formatDate'
import { getTaskStatus } from '../../utils/getTaskStatus'
import { useEffect, useState } from 'react'
import { sortTasks, SortTasksOptions } from '../../utils/sortTasks'
import { showMessage } from '../../adapters/showMessage'
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions'

export function History() {
  const { state, dispatch } = useTaskContext()
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc',
    }
  })

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc'
    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    })
  }

  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss()
    }
  }, [])

  function handleResetHistory() {
    showMessage.dismiss()
    showMessage.confirm('Tem certeza que deseja excluir o histórico?', confirmation => {
      setConfirmClearHistory(confirmation)
    })

    // if (!confirm("Tem certeza que deseja excluir histórico?")) return
    // dispatch({ type: TaskActionTypes.RESET_STATE })
  }

  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <span>Histórico</span>
            {hasTasks && (
              <span className={styles.buttonContainer}>
                <DefaultButton icon={<TrashIcon />} color='red'
                  aria-label='Apagar todo o histórico'
                  title='Apagar histórico'
                  onClick={handleResetHistory}
                >
                </DefaultButton>
              </span>
            )}
          </Heading>
        </Container>
        <Container>
          {hasTasks && (
            <div className={styles.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>Tarefa ↕</th>
                    <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>Duração ↕</th>
                    <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>Data ↕</th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {sortTasksOptions.tasks.map((task) => {
                    const taskTypeDictionary = {
                      workTime: 'Foco',
                      shortBreakTime: 'Descanso curto',
                      longBreakTime: 'Descanso longo',
                    };
                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration}</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskTypeDictionary[task.type]}</td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>
          )}

          {!hasTasks && (
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Ainda não existem tarefas criadas.
            </p>
          )}
        </Container>
      </MainTemplate>
    </>
  )
}

