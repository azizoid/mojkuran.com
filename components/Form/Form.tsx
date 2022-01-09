import React, {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react"
import { useRouter } from "next/router"
import classNames from "classnames"
import { FormContext } from "../../store/form-store"
import soorahList from "../../assets/soorahList"

import styles from "./Form.module.scss"

export const Form = (): JSX.Element => {
  const router = useRouter()
  const { form: formContext, setForm: setFormContext } = useContext(FormContext)

  const onHandleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    switch (name) {
      case "soorah":
        setFormContext({
          s: Number(value),
          a: "",
          q: "",
          view: name,
        })
        break
      case "ayah":
        setFormContext({
          s: formContext.s,
          a: Number(value),
          q: "",
          view: name,
        })
        break
      case "search":
        setFormContext({
          s: 0,
          a: "",
          q: value,
          view: name,
        })
        break
      default:
        throw new Error("Invalid Form Element")
    }
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    switch (formContext.view) {
      case "search":
        router.push(`/search/${formContext.q}`)
        break
      case "soorah":
        router.push(`/${formContext.s}`)
        break
      case "ayah":
        router.push(`/${formContext.s}/${formContext.a}`)
        break
      case "empty":
      default:
        router.push(`/`)
    }
  }

  useEffect(() => {
    console.warn(formContext)
  }, [formContext])

  return (
    <form
      id="search"
      className={classNames("card", "card-header", styles.searchForm)}
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
    >
      <div className="row">
        <div className="col-4 mb-3">
          <select
            className="form-select"
            name="soorah"
            value={formContext?.s}
            onChange={onHandleChange}
          >
            {soorahList.map((soorah, index) => (
              <option value={index} key={index}>
                {soorah}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <input
            type="number"
            placeholder="Ajet"
            className="form-control"
            size={3}
            maxLength={3}
            min={1}
            max={286}
            name="ayah"
            value={formContext?.a}
            onChange={onHandleChange}
          />
        </div>
        <div className="input-group-prepend col-5 text-center">
          <small className="nav-link">Besim&nbsp;Korkut</small>
        </div>
      </div>

      <div className="form-group row">
        <div className="input-group-prepend col-7">
          <input
            type="text"
            placeholder="Pretraživač"
            className="form-control"
            name="search"
            value={formContext?.q}
            onChange={onHandleChange}
          />
        </div>
        <div className="input-group-append col-5">
          <button className="btn btn-success form-control" type="submit">
            Pretraži
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
