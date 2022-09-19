class Api {
  getData() {
    return fetch('http://localhost:8080/api/users', {
      method: 'GET',
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
};

const api = new Api();

export default api;
