import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import { TaskContext } from "./TaskContext";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const playBeepRef = useRef<() => void | null>(null)
  const worker = TimerWorkerManager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        console.log('tocando audio')
        playBeepRef.current()
        playBeepRef.current = null
      }
      dispatch({ type: TaskActionTypes.COMPLETE_TASK })
      worker.terminate();
    } else {
      dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds } })
    }
  });

  useEffect(() => {
    console.log(state)

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`

    worker.postMessage(state);
  }, [worker, state])

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      console.log('Carregando audio...')
      playBeepRef.current = loadBeep()
    } else {
      console.log('ZERANDO audio...')
      playBeepRef.current = null
    }
  }, [state.activeTask])

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}