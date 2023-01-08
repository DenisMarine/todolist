import Head from "next/head"
import { Form, Formik } from "formik"
import * as yup from "yup"
import FormField from "./FormField"
import Button from "./Button"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Link from "./Link"

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .required("This field cannot be empty")
    .label("Description"),
})

const initialValues = {
  description: "",
}

const PageForm = (props) => {
  const { name, title, onSubmit, buttonSubmitName } = props

  return (
    <main className="flex flex-col">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex align-center p-4 border-b">
        <h1 className="font-bold text-xl">{title}</h1>
        <Link href="/" className="ml-auto">
          <XMarkIcon className="w-5"></XMarkIcon>
        </Link>
      </header>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col p-4 h-[80vh]">
          <FormField name={name} type="text" label="Description" />
          <div className="flex gap-5 align-center ml-auto mt-auto">
            <Link className="flex items-center font-bold" href="/">
              Cancel
            </Link>
            <Button
              className="rounded bg-sky-600 w-16 p-2 text-white"
              type="submit"
            >
              {buttonSubmitName}
            </Button>
          </div>
        </Form>
      </Formik>
    </main>
  )
}

export default PageForm
