const personsData = data,
    tableBody = document.querySelector('#tableData'),
    dataEdit = document.querySelector('#data_edit'),
    butCloseDE = document.querySelector('#but_close'),
    butSendDE = document.querySelector('#but_send');

let idPersonData = '';

let lastSort = '';

function loadTable(person) {

    tableBody.innerHTML += `
    <tr id=${person.id}>
    <td>${person.name.firstName}</td>
    <td>${person.name.lastName}</td>
    <td class="about">${person.about}</td>
    <td><div style=" display: flex; height: auto; width: auto; justify-content: space-evenly;"> ${person.eyeColor} <div style=" background-color: ${person.eyeColor}; width: 15px; height: 15px;"></div></div></td>
    </tr>`;
}

function createTable() {

    tableBody.innerHTML = '';

    personsData.forEach(person => {
        loadTable(person);
    });
}

function sortController(pI, pIG) {

    if (lastSort == 'down') {
        sortTableToUp(pI, pIG);
        lastSort = 'up';
    } else {
        sortTableToDown(pI, pIG);
        lastSort = 'down';
    }
}

function sortTableToDown(personInfo, personInfoGroup) {

    return personsData.sort((prev, next) => {
        if (personInfoGroup) {
            if (prev[personInfoGroup][personInfo] > next[personInfoGroup][personInfo]) {
                return 1;
            } else {
                return -1;
            }
        } else {
            if (prev[personInfo] > next[personInfo]) {
                return 1;
            } else {
                return -1;
            }
        }
    });
}

function sortTableToUp(personInfo, personInfoGroup) {

    return personsData.sort((prev, next) => {
        if (personInfoGroup) {
            return prev[personInfoGroup][personInfo] > next[personInfoGroup][personInfo] ? -1 : 1;
        } else {
            return prev[personInfo] > next[personInfo] ? -1 : 1;
        }
    });
}

function formDataOpen() {

    let personData = personsData.find(el => el.id == idPersonData);

    document.getElementById('data_firstName').value = personData.name.firstName;
    document.getElementById('data_lastName').value = personData.name.lastName;
    document.getElementById('data_about').value = personData.about;
    document.getElementById('data_eyeColor').value = personData.eyeColor;
    document.getElementById('data_phone').value = personData.phone;
}

function formDataEdit() {

    let personData = personsData.find(el => el.id == idPersonData);

    personData.name.firstName = document.getElementById('data_firstName').value;
    personData.name.lastName = document.getElementById('data_lastName').value;
    personData.about = document.getElementById('data_about').value;
    personData.eyeColor = document.getElementById('data_eyeColor').value;
    personData.phone = document.getElementById('data_phone').value;

    createTable();
}

document.addEventListener('DOMContentLoaded', createTable);

document.addEventListener('click', function (e) {

    switch (e.target.id) {
        case 'firstName': sortController('firstName', 'name');
            createTable();
            break;
        case 'lastName': sortController('lastName', 'name');
            createTable();
            break;
        case 'about': sortController('about');
            createTable();
            break;
        case 'eyeColor': sortController('eyeColor');
            createTable();
            break;
    }

    if (e.target == document.body || e.target == document.html) {
        data_edit.style.display = 'block';
        formDataOpen();
    } else if (e.target == butCloseDE) {
        data_edit.style.display = 'none';

    } else if (e.target == butSendDE) {
        formDataEdit();
    } else {
        if (e.target.tagName == 'TD') {
            idPersonData = e.target.parentNode.id;
            formDataOpen();
        }
    }
});
