
export default {
  deleteById: (id) => 
    fetch(`http://localhost:3001/products/delete/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    }).then(res => res.json()),
  save: () =>
    fetch(`http://localhost:3001/products/create`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state), // body data type must match "Content-Type" header
    }).then(res => res.json())
} 








    
