import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"

const initialList = [
  {
    listId: 0,
    listName: "Your first list !",
    todos: [
      {
        todoId: 0,
        todoName: "Your first todo !",
        finish: false,
      },
    ],
  },
  {
    listId: 1,
    listName: "Your second list !",
    todos: [
      {
        todoId: 0,
        todoName: "Your second todo !",
        finish: false,
      },
    ],
  },
]

export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextListId, setNextListId] = useState(2)
  const [lists, setLists] = useState(initialList)
  const [currentList, setCurrentList] = useState(0)
  const [viewFinishedTodos, setViewFinishedTodos] = useState(true)

  const getNextListId = useCallback(() => {
    setNextListId(nextListId + 1)

    return nextListId
  }, [nextListId])

  const createList = useCallback(
    (name) => {
      const newListId = getNextListId()
      setLists((lists) => [
        ...lists,
        {
          listId: newListId,
          listName: name,
          todos: [],
        },
      ])
    },
    [getNextListId]
  )

  const deleteList = useCallback((listId) => {
    setLists((lists) => lists.filter((list) => list.listId !== listId))
  }, [])

  const updateList = useCallback((updatedListId, description) => {
    setLists((lists) =>
      lists.map((list) =>
        list.listId === updatedListId
          ? { listId: updatedListId, listName: description, todos: list.todos }
          : list
      )
    )
  }, [])

  const getNextTodoId = useCallback((list) => {
    if (list.todos.length > 0) {
      return list.todos[list.todos.length - 1].todoId + 1
    } else {
      return 0
    }
  }, [])

  const createTodo = useCallback(
    (listId, description) => {
      const list = lists.find((list) => list.listId === listId)
      list.todos = [
        ...list.todos,
        {
          todoId: getNextTodoId(list),
          todoName: description,
          finish: false,
        },
      ]
    },
    [getNextTodoId, lists]
  )

  const deleteTodo = useCallback(
    (listId, todoId) => {
      const resultLists = lists.slice()
      resultLists[listId].todos = resultLists[listId].todos.filter(
        (todo) => todo.todoId !== todoId
      )
      setLists(resultLists)
    },
    [lists]
  )

  const updateTodo = useCallback(
    (listId, todoUpdate) => {
      const resultLists = lists.slice()
      resultLists[listId].todos = resultLists[listId].todos.map((todo) =>
        todo.todoId === todoUpdate.todoId ? todoUpdate : todo
      )
      setLists(resultLists)
    },
    [lists]
  )

  return (
    <Context.Provider
      {...props}
      value={{
        lists,
        createList,
        deleteList,
        updateList,
        createTodo,
        updateTodo,
        deleteTodo,
        currentList,
        setCurrentList,
        viewFinishedTodos,
        setViewFinishedTodos,
      }}
    />
  )
}

export default ContextProvider
