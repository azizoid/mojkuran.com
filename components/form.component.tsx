import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"

import soorahList from "../assets/soorahList"

import { FormContext } from "../store/form-store"
import { getView } from "../utils/getView/getView"

const Form = () => {
  const router = useRouter()
  const context = useContext(FormContext)

  useEffect(() => {
    const form = getView({
      s: Number(router.query?.s?.toString()) || 0,
      a: Number(router.query?.za?.toString()) || undefined,
      q: router.query?.search?.toString() || "",
      view: "empty",
    })
    context.setForm(form)
  }, [router])

  const onHandleChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case "soorah":
        context.setForm((prev) => ({
          ...prev,
          s: Number(value),
          a: undefined,
          q: "",
          view: name,
        }))
        break
      case "ayah":
        context.setForm((prev) => ({
          ...prev,
          a: Number(value),
          q: "",
          view: name,
        }))
        break
      case "query":
        context.setForm((prev) => ({
          ...prev,
          s: 0,
          a: undefined,
          q: value,
          view: name,
        }))
        break
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const form = getView(context.form)

    switch (form.view) {
      case "search":
        router.push(`/search/${form.q}`)
        break
      case "soorah":
        router.push(`/${form.s}`)
        break
      case "ayah":
        router.push(`/${form.s}/${form.a}`)
        break
      case "empty":
      default:
        router.push(`/`)
        break
    }
  }

  return (
    <form
      id="search"
      className="card card-header searchForm"
      acceptCharset="UTF-8"
      onSubmit={onSubmit}
    >
      <div className="row">
        <div className="col-4 mb-3">
          <select
            className="form-select"
            name="soorah"
            value={context.form?.s}
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
            value={context.form?.a}
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
            name="query"
            value={context.form?.q}
            onChange={onHandleChange}
            defaultValue={router.query.search?.toString()}
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
