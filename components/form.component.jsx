import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import soorahList from "../assets/soorahList.js";
import { AppContext } from "../assets/context";

const Form = () => {
  const router = useRouter();
  const context = useContext(AppContext);

  const formData = { ...context.form };

  const soorahRef = useRef(formData.s);
  const ayahRef = useRef(formData.a);
  const queryRef = useRef(formData.q);
  const viewRef = useRef("empty");
  // const translatorRef = useRef(formData.t);

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "soorah":
        soorahRef.current.value = value;
        ayahRef.current.value = null;
        queryRef.current.value = "";
        viewRef.current = name;
        break;
      case "ayah":
        ayahRef.current.value = value;
        queryRef.current.value = "";
        viewRef.current = name;
        break;
      case "query":
        if (value.length > 3) {
          soorahRef.current.value = 0;
          ayahRef.current.value = "";
          queryRef.current.value = value;
          viewRef.current = name;
        }
        break;
      // case "translator":
      //   translatorRef.current.value = value;
      //   break;
      // default:
    }
  };

  const onSubmit = (form) => {
    if (form.s > 0 && form.s < 115) {
      form.view = "soorah";
      if (form.a > 0 && form.a < 287) {
        form.view = "ayah";
      }
    } else if (form.q.length > 2) {
      form.view = "search";
    } else form.view = "empty";

    switch (form.view) {
      case "search":
        router.push(`/search/${form.q}`);
        break;
      case "soorah":
        router.push(`/${form.s}`);
        break;
      case "ayah":
        router.push(`/${form.s}/${form.a}`);
        break;
      case "empty":
      default:
        router.push(`/`);
        break;
    }
  };

  const onSearch = (event) => {
    event.preventDefault();

    const form = {
      s: soorahRef.current.value,
      a: ayahRef.current.value,
      // t: translatorRef.current.value,
      q: queryRef.current.value,
      view: viewRef.current,
    };

    onSubmit(form);
  };

  useEffect(() => {
    if (router.query.search) {
      soorahRef.current.value = 0;
      ayahRef.current.value = null;
      queryRef.current.value = router.query.search;
    } else {
      if (router.query.s) {
        soorahRef.current.value = router.query.s;
      }
      if (router.query.za) {
        ayahRef.current.value = router.query.za;
      }
    }
  }, [router.query]);

  return (
    <form
      id='search'
      className='card card-header'
      acceptCharset='UTF-8'
      onSubmit={onSearch}
    >
      <div className='row'>
        <div className='col-4 mb-3'>
          <select
            className='form-select'
            name='soorah'
            defaultValue={formData.s}
            onChange={onHandleChange}
            ref={soorahRef}
          >
            {soorahList.map((soorah, index) => (
              <option value={index} key={index}>
                {soorah}
              </option>
            ))}
          </select>
        </div>
        <div className='col-3'>
          <input
            type='number'
            placeholder='Ajet'
            className='form-control'
            size={3}
            maxLength={3}
            min={1}
            max={286}
            name='ayah'
            defaultValue={formData.a}
            onChange={onHandleChange}
            ref={ayahRef}
          />
        </div>
        <div className='input-group-prepend col-5 text-center'>
          <small className='nav-link'>Besim&nbsp;Korkut</small>
        </div>
      </div>

      <div className='form-group row'>
        <div className='input-group-prepend col-7'>
          <input
            type='text'
            placeholder='Pretraživač'
            className='form-control kelme-form-input'
            name='query'
            defaultValue={formData.q}
            onChange={onHandleChange}
            ref={queryRef}
          />
        </div>
        <div className='input-group-append col-5'>
          <button className='btn btn-success form-control' type='submit'>
            Pretraži
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
