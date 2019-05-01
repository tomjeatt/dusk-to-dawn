export default dataUrl =>
  fetch(dataUrl)
    .then(response =>
      response.json().then(data => ({ error: null, responseData: data }))
    )
    .catch(error => {
      console.error("Data API error", error);
      return { error, responseData: [] };
    });
