import { useCallback } from "react"
import { useContext } from "./ContextProvider"
import Link from "./Link"
import { TrashIcon } from "@heroicons/react/24/solid"

const Todo = (props) => {
  const { todo } = props
  const { currentList, deleteTodo, updateTodo } = useContext()

  const handleClickDelete = useCallback(
    (event) => {
      const todoId = Number.parseInt(
        event.currentTarget.getAttribute("data-todo-id"),
        10
      )
      deleteTodo(currentList, todoId)
    },
    [deleteTodo, currentList]
  )

  const handleClickFinish = useCallback(() => {
    const updatedTodo = {
      todoId: todo.todoId,
      todoName: todo.todoName,
      finish: !todo.finish,
    }
    updateTodo(currentList, updatedTodo)
  }, [currentList, updateTodo, todo])

  return (
    <div className="group flex w-50 align-center justify-start gap-5 p-5 border">
      <input
        onClick={handleClickFinish}
        type="checkbox"
        defaultChecked={todo.finish}
      />
      <Link href={`/todos/${todo.todoId}/editTodo`}>{todo.todoName}</Link>
      <TrashIcon
        className="invisible group-hover:visible w-6 ml-auto cursor-pointer"
        onClick={handleClickDelete}
        data-todo-id={todo.todoId}
      ></TrashIcon>
    </div>
  )
}

const TodosList = () => {
  const { lists, currentList, viewFinishedTodos } = useContext()
  const current = lists.find((list) => list.listId === currentList)

  let currentTodosList

  if (current) {
    if (!viewFinishedTodos) {
      currentTodosList = current.todos.filter(({ finish }) => finish === false)
    } else {
      currentTodosList = current.todos
    }
  }

  return (
    <div className="overflow-x-scroll">
      {current
        ? currentTodosList.map((todo, index) => (
            <Todo key={index} todo={todo}></Todo>
          ))
        : null}
    </div>
  )
}

export default TodosList
