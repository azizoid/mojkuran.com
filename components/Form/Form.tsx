import React, {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react"
import { FormContext } from "../../store/form-store"
import soorahList from "../../assets/soorahList"

import { useRouter } from "next/router"
import { FormProps } from "../../lib/types"
import { LoadingBoxes } from "../../ui/LoadingBoxes/LoadingBoxes"
import { getView } from "../../utility/getView/getView"

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
        setState((prev) => ({
          s: prev.s,
          a: Number(value),
          q: "",
          t: 1,
          view: name,
        }))
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

    const submitValue = getView(state)

    switch (submitValue.view) {
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
      className="space-y-2 mb-6 alert alert-gray"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
    >
      <div className="form-row">
        <select
          className="
            form-control
            col-span-7
            focus:outline-none 
            focus:bg-white 
            focus:border-gray-500
            active:outline-none 
            active:border-gray-500
          "
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
          className="form-control col-span-2"
          name="ayah"
          size={3}
          maxLength={3}
          min={0}
          max={286}
          value={state?.a || ""}
          onChange={onHandleChange}
        />

        <div className="col-span-3 text-center ">
          <small>Besim&nbsp;Korkut</small>
        </div>
      </div>

      <div className="form-row">
        <input
          type="text"
          placeholder="Pretraživač"
          className="form-control col-span-7"
          name="search"
          value={state?.q || ""}
          onChange={onHandleChange}
        />

        <button className="btn btn-success col-span-5" type="submit">
          Pretraži
        </button>
      </div>
    </form>
  )
}

export default Form
