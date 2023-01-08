import { useRouter } from "next/router"
import { useCallback } from "react"
import { useContext } from "../../../components/ContextProvider"
import PageForm from "../../../components/PageForm"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      listId: Number.parseInt(params.listId, 10),
    },
  },
})

const ListEditPage = (props) => {
  const {
    params: { listId },
  } = props

  const { updateList } = useContext()
  const router = useRouter()
  const handleSubmit = useCallback(
    ({ description }) => {
      updateList(listId, description)
      router.push("/")
    },
    [router, updateList, listId]
  )

  return (
    <PageForm
      title="Edit list"
      onSubmit={handleSubmit}
      buttonSubmitName="Save"
      name="description"
    />
  )
}

export default ListEditPage
