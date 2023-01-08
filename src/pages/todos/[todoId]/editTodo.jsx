import { useRouter } from "next/router"
import { useCallback } from "react"
import { useContext } from "../../../components/ContextProvider"
import PageForm from "../../../components/PageForm"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      todoId: Number.parseInt(params.todoId, 10),
    },
  },
})

const TodoEditPage = (props) => {
  const {
    params: { todoId },
  } = props

  const { updateTodo, currentList, lists } = useContext()
  const currentTodoFinish = lists[currentList].todos.find(
    (todo) => todo.todoId === todoId
  ).finish
  const router = useRouter()
  const handleSubmit = useCallback(
    ({ description }) => {
      updateTodo(currentList, {
        todoId: todoId,
        todoName: description,
        finish: currentTodoFinish,
      })
      router.push("/")
    },
    [router, updateTodo, currentList, todoId, currentTodoFinish]
  )

  return (
    <PageForm
      title="Edit todo"
      onSubmit={handleSubmit}
      buttonSubmitName="Save"
      name="description"
    />
  )
}

export default TodoEditPage
