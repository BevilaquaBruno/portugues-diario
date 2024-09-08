// seta o header do axios
axios = axios.create({
  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
});

var patternForDatatable = {
  sortable: true,
  searchable: true,
  labels: {
    placeholder: "Procurando...",
    perPage: "{select} registros por página",
    noRows: "Nenhum registro encontrado",
    info: "Mostrando de {start} até {end} de {rows} registros" //
  }
}

async function isSessionValid() {
  let token = localStorage.getItem('token');
  if (token != null) {
    return await axios.get('/auth/isvalid')
      .then(function (response) {
        if (response.status === 200)
          return true;
        else
          return false
      })
      .catch(function () {
        return false;
      });
  } else return false;
}
