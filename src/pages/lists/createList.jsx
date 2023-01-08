import { useRouter } from "next/router"
import { useCallback } from "react"
import { useContext } from "../../components/ContextProvider"
import PageForm from "../../components/PageForm"

const CreateListPage = () => {
  const router = useRouter()
  const { createList } = useContext()
  const handleSubmit = useCallback(
    ({ description }) => {
      createList(description)
      router.push("/")
    },
    [router, createList]
  )

  return (
    <PageForm
      title="Create a new list"
      onSubmit={handleSubmit}
      buttonSubmitName="Create"
      name="description"
    />
  )
}

export default CreateListPage
