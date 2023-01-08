import classNames from "classnames"
import Head from "next/head"
import { useCallback } from "react"
import { useContext } from "./ContextProvider"
import Link from "./Link"
import { PlusIcon } from "@heroicons/react/24/solid"

const FinishedTodos = (props) => {
  const { numberOfFinishedTodos, list } = props

  return (
    <div className="flex">
      {numberOfFinishedTodos > 0 ? (
        <div className="bg-lime-500 px-2 rounded-l-full">
          {numberOfFinishedTodos}
        </div>
      ) : null}
      <div
        className={classNames(
          "bg-sky-500 px-2",
          numberOfFinishedTodos > 0 ? "rounded-r-full" : "rounded-full"
        )}
      >
        {list.todos.length}
      </div>
    </div>
  )
}

const ProgressBar = (props) => {
  const { numberOfFinishedTodos, list } = props

  return (
    <div className="bg-gray-300 w-full h-1">
      <div
        style={{
          width: (numberOfFinishedTodos / list.todos.length) * 100 + "%",
        }}
        className="bg-lime-600 h-full duration-300"
      ></div>
    </div>
  )
}

const ListTab = (props) => {
  const { list } = props
  const { currentList, setCurrentList } = useContext()
  const numberOfFinishedTodos = list.todos.filter(
    ({ finish }) => finish === true
  ).length

  const handleClick = useCallback(
    (event) => {
      const targetListId = Number.parseInt(
        event.currentTarget.getAttribute("data-id"),
        10
      )
      document.querySelector(`[data-id="${list.listId}"]`).scrollIntoView()
      setCurrentList(targetListId)
    },
    [setCurrentList, list]
  )

  return (
    <div>
      <div
        data-id={list.listId}
        onClick={handleClick}
        className="flex gap-3 p-4 border-b-0 border rounded-t-md min-w-20 h-10 items-center font-bold cursor-pointer"
      >
        <h3>{list.listName}</h3>
        <FinishedTodos
          list={list}
          numberOfFinishedTodos={numberOfFinishedTodos}
        />
      </div>

      {currentList === list.listId ? (
        <ProgressBar
          list={list}
          numberOfFinishedTodos={numberOfFinishedTodos}
        />
      ) : null}
    </div>
  )
}

const Page = (props) => {
  const { title = "Todo list", children } = props

  const { lists } = useContext()

  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex mt-2 border-b w-full overflow-y-scroll">
        {lists.map((list, index) => (
          <ListTab key={index} list={list} />
        ))}
        <Link
          href="/lists/createList"
          className="flex justify-center align-center border border-b-0 rounded-t-md p-3 ml-auto mr-5 border-b-none"
        >
          <PlusIcon className="w-8"></PlusIcon>
        </Link>
      </div>
      <section>{children}</section>
    </main>
  )
}

export default Page
