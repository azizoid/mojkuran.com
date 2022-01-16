import React, {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react"
import classNames from "classnames"
import { FormContext } from "../../store/form-store"
import soorahList from "../../assets/soorahList"

import styles from "./Form.module.scss"
import { useRouter } from "next/router"
import { FormProps } from "../../lib/types"
import { LoadingBoxes } from "../../ui/LoadingBoxes/LoadingBoxes"

export const Form = (): JSX.Element => {
  const router = useRouter()
  const formContext = useContext(FormContext)

  const [state, setState] = useState<FormProps>()

  useEffect(() => setState(formContext), [formContext])

  const onHandleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    switch (name) {
      case "soorah":
        setState({
          s: Number(value),
          a: "",
          q: "",
          t: 1,
          view: name,
        })
        break
      case "ayah":
        setState({
          s: formContext.s,
          a: Number(value),
          q: "",
          t: 1,
          view: name,
        })
        break
      case "search":
        setState({
          s: 0,
          a: "",
          q: value,
          t: 1,
          view: name,
        })
        break
      default:
        throw new Error("Invalid Form Element")
    }
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    switch (state?.view) {
      case "search":
        router.push(`/search/${state.q}`)
        break
      case "soorah":
        router.push(`/${state.s}`)
        break
      case "ayah":
        router.push(`/${state.s}/${state.a}`)
        break
      case "empty":
      default:
        router.push(`/`)
    }
  }

  if (state?.view === "init") {
    return <LoadingBoxes />
  }

  return (
    <form
      id="search"
      className={classNames("card", "card-header", styles.searchForm)}
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
    >
      <div className={styles.formFirstLine}>
        <select
          className="form-select"
          name="soorah"
          value={state?.s}
          onChange={onHandleChange}
        >
          {soorahList.map((soorah, index) => (
            <option value={index} key={index}>
              {soorah}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Ajet"
          className={classNames("form-control", styles.ayah)}
          name="ayah"
          size={3}
          maxLength={3}
          min={0}
          max={286}
          value={state?.a || ""}
          onChange={onHandleChange}
        />

        <div className={styles.translator}>
          <small className="nav-link">Besim&nbsp;Korkut</small>
        </div>
      </div>

      <div className={styles.formSecondLine}>
        <input
          type="text"
          placeholder="Pretraživač"
          className="form-control"
          name="search"
          value={state?.q || ""}
          onChange={onHandleChange}
        />

        <button className="btn btn-outline-success form-control" type="submit">
          Pretraži
        </button>
      </div>
    </form>
  )
}

export default Form
