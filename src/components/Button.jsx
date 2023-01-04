import classNames from "classnames"

const variants = {
  inProgress: "",
  finish: "",
  delete: "",
}

const Button = (props) => {
  const { variant = "inProgress", className, ...otherProps } = props

  return (
    <button
      className={classNames(variants[variant], className)}
      {...otherProps}
    ></button>
  )
}

export default Button
