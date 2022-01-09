export const getData = async (url: string) =>
  await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json()
    }) //  workaround the catch 

