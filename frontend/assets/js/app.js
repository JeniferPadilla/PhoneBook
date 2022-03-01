const API = "http://localhost:3001/api/";

/* Directory */

let spaceAvailable = document.getElementById("btnSpaceAvailable");
let fullAgenda = document.getElementById("btnFullAgenda");
let btninitDirectory = document.getElementById("btnInitDirectory");
let initDirectory = document.getElementById("initDirectory");
let initContacts = document.getElementById("initContacts");
let messageDirectory = document.getElementById("message");
let tableContac = document.getElementById("tableContac");
let tbodyContact = document.getElementById("tbodyContact");
let listContact = document.getElementById("btnListContact");
let deleteContac = document.getElementById("btndeleteContact");
let searchContact = document.getElementById("btnSearchContact");
let registerContact = document.getElementById("btnAddContact");
let existContact = document.getElementById("btnExistContact");
let updateContact = document.getElementById("btnUpdateContact");
let upContact = document.getElementById("btnUpContact");
let registrarMe = document.getElementById("registrarMe");
let registrarData = document.getElementById("registrarData");

const getDirectory = (api) => {
  return fetch(api, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => {
      messageDirectory.innerHTML = "";
      if (json.message) {
        tableContac.classList.remove("tableShow");
        tableContac.classList.add("tableNone");
        messageDirectory.innerHTML = `<p>${json.message}</p>`;
      } else {
        fillDataContact(json);
      }
    })
    .catch((error) => {
      console.log("Error en la api: ", error);
    });
};

const deleteData = async (url) => {
  return await fetch(url, {
    method: "DELETE",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => {
      tableContac.classList.remove("tableShow");
      tableContac.classList.add("tableNone");
      messageDirectory.innerHTML = `<p>${json.message}</p>`;
    })
    .catch((error) => {
      console.log("Error en la api: ", error);
    });
};

const searchContactUp = async (api) => {
  return await fetch(api, {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin",
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => {
      mesajeUpdate.innerHTML = "";
      if (json.message) {
        registrarMe.classList.remove("registrarMe");
        registrarMe.classList.add("registrarMeShow");
        registrarData.classList.add("registrarData");
        registrarData.classList.remove("registrarDataShow");
        mesajeUpdate.innerHTML = `${json.message}`;
      } else {
        registrarData.classList.remove("registrarData");
        registrarData.classList.add("registrarDataShow");
        registrarMe.classList.remove("registrarMeShow");
        registrarMe.classList.add("registrarMe");
        fillContactUpdate(json.contacts);
      }
    })
    .catch((error) => {
      console.log("Error en la api: ", error);
    });
};

const fillDataContact = (data) => {
  tableContac.classList.remove("tableNone");
  tableContac.classList.add("tableShow");
  tbodyContact.innerHTML = "";
  let cantidad = 1;

  if (data.results) {
    messageDirectory.innerHTML = `<p>Contact registered successfully</p>`;
    let html = "";
    html += `
      <tr>
      <th scope="row">${cantidad}</th>
      <td> ${data.results.name}</td>
      <td>`;
    if (data.results.tel) html += `${data.results.tel}`;
    if (data.results.tel && data.results.cel) html += ` - `;
    if (data.results.cel) html += `${data.results.cel}`;
    html += `</td></tr>`;

    tbodyContact.innerHTML += html;
  } else if (data.contacts[0]) {
    data.contacts.forEach((api) => {
      let html = "";
      html += `
        <tr>
          <th scope="row">${cantidad}</th>
          <td> ${api.name}</td>
          <td>`;
      if (api.tel) html += `${api.tel}`;

      if (api.tel && api.cel) html += ` - `;
      if (api.cel) html += `${api.cel}`;
      if (!api.cel && !api.tel) html += `-`;
      html += `</td></tr>`;

      tbodyContact.innerHTML += html;

      cantidad++;
    });
  } else {
    let html = "";
    html += `
        <tr>
          <th scope="row">${cantidad}</th>
          <td> ${data.contacts.name}</td>
          <td>`;
    if (data.contacts.tel) html += `${data.contacts.tel}`;
    if (data.contacts.tel && data.contacts.cel) html += ` - `;
    if (data.contacts.cel) html += `${data.contacts.cel}`;
    if (!data.contacts.cel && !data.contacts.tel) html += `-`;
    html += `</td></tr>`;

    tbodyContact.innerHTML += html;
  }
};

const postData = async (url, data) => {
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then((json) => {
      messageDirectory.innerHTML = "";
      if (json.message) {
        tableContac.classList.remove("tableShow");
        tableContac.classList.add("tableNone");
        messageDirectory.innerHTML = `<p>${json.message}</p>`;
      } else {
        fillDataContact(json);
      }
    })
    .catch((error) => {
      console.log("Error en la api: ", error);
    });
};

const putData = async (url, data) => {
  return await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then((json) => {
      messageDirectory.innerHTML = "";
      tableContac.classList.remove("tableShow");
      tableContac.classList.add("tableNone");
      messageDirectory.innerHTML = `${json.message}`;
    })
    .catch((error) => {
      console.log("Error en la api: ", error);
    });
};

const fillContactUpdate = (data) => {
  document.getElementById("idUp").value = data._id;
  document.getElementById("nameUp").value = data.name;
  document.getElementById("celUp").value = data.cel;
  document.getElementById("landlineUp").value = data.tel;
};

updateContact.onclick = () => {
  let html = document.getElementById("nameUpdate").value;
  searchContactUp(API + "contact/searchContact/" + html.trim());
};

upContact.onclick = () => {
  let nameC = document.getElementById("nameUp").value;
  let celC = document.getElementById("celUp").value;
  let telC = document.getElementById("landlineUp").value;
  let idUpdate = document.getElementById("idUp").value;
  let data = {};

  if (nameC != "") {
    data.name = nameC.trim();
    if (telC != "") data.tel = telC.trim();
    if (celC != "") data.cel = celC.trim();
    data._id = idUpdate;
    putData(API + "contact/updateContact", data);
  } else {
    alert("Data incomplete");
  }
};

registerContact.onclick = () => {
  let nameC = document.getElementById("nameAdd").value;
  let celC = document.getElementById("celAdd").value;
  let telC = document.getElementById("landlineAdd").value;

  let data = {};

  if (nameC != "") {
    data.name = nameC.trim();
    if (telC != "") data.tel = telC.trim();
    if (celC != "") data.cel = celC.trim();

    postData(API + "contact/registerContact", data);
  } else {
    alert("Data incomplete");
  }
};

listContact.onclick = () => {
  getDirectory(API + "contact/listContact");
};

searchContact.onclick = () => {
  let html = document.getElementById("nameFind").value;
  getDirectory(API + "contact/searchContact/" + html.trim());
};

existContact.onclick = () => {
  let exist = document.getElementById("nameExist").value;
  getDirectory(API + "contact/existContact/" + exist.trim());
};

deleteContac.onclick = () => {
  let name = document.getElementById("nameDelete").value;
  deleteData(API + "contact/delete/" + name.trim());
};

spaceAvailable.onclick = () => {
  getDirectory(API + "phoneBook/espaciosLibres");
};

fullAgenda.onclick = () => {
  getDirectory(API + "phoneBook/directorioLleno");
};

btninitDirectory.onclick = () => {
  initDirectory.classList.add("initDirectoryNone");
  initContacts.classList.remove("initContacts");
  initContacts.classList.add("contactsShow");
  getDirectory(API + "phoneBook/initPhoneBook");
};
