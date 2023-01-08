import { useRouter } from "next/router"
import { useCallback } from "react"
import { useContext } from "../../components/ContextProvider"
import PageForm from "../../components/PageForm"

const CreateTodoPage = () => {
  const router = useRouter()
  const { createTodo, currentList } = useContext()
  const handleSubmit = useCallback(
    ({ description }) => {
      createTodo(currentList, description)
      router.push("/")
    },
    [router, createTodo, currentList]
  )

  return (
    <PageForm
      title="Add todo"
      onSubmit={handleSubmit}
      buttonSubmitName="Create"
      name="description"
    />
  )
}

export default CreateTodoPage
