import { useCallback } from "react"
import { useContext } from "../components/ContextProvider.jsx"
import Page from "../components/Page.jsx"
import {
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/solid"
import Link from "../components/Link.jsx"
import TodosList from "../components/TodosList.jsx"

const ActionListsBar = () => {
  const { deleteList, viewFinishedTodos, setViewFinishedTodos, currentList } =
    useContext()

  const handleClickDelete = useCallback(() => {
    deleteList(currentList)
  }, [deleteList, currentList])

  const handleClickViewFinishedTodos = useCallback(() => {
    setViewFinishedTodos(!viewFinishedTodos)
  }, [setViewFinishedTodos, viewFinishedTodos])

  return (
    <div className="flex gap-5 p-3 border-b">
      <Link href="/todos/createTodo">
        <PlusIcon className="w-8"></PlusIcon>
      </Link>
      <Link href={`/lists/${currentList}/editList`}>
        <PencilSquareIcon className="w-8"></PencilSquareIcon>
      </Link>
      <TrashIcon onClick={handleClickDelete} className="w-8"></TrashIcon>

      <button onClick={handleClickViewFinishedTodos} className="ml-auto">
        {viewFinishedTodos ? (
          <CheckCircleIcon className="w-8"></CheckCircleIcon>
        ) : (
          <CheckIcon className="w-8"></CheckIcon>
        )}
      </button>
    </div>
  )
}

const IndexPage = () => {
  return (
    <Page title="Todo list">
      <ActionListsBar />
      <TodosList />
    </Page>
  )
}

export default IndexPage
