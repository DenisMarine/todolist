import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import { useField } from "formik"

const FormField = (props) => {
  const { label, name, ...otherProps } = props
  const [field, { touched, error }, { setValue }] = useField({ name })

  return (
    <div>
      <label className="flex flex-col">
        <span className="font-semibold">{label}</span>
        <input
          className="border-2 border-blue-700 rounded p-1"
          name={name}
          onChange={(event) => setValue(event.target.value)}
          {...otherProps}
          {...field}
        />
      </label>
      {error && touched ? (
        <span className="flex text-red-600 font-semibold">
          <ExclamationTriangleIcon className="w-8" />
          {error}
        </span>
      ) : null}
    </div>
  )
}

export default FormField
