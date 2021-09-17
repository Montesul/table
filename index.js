const personsData = data,
    tableBody = document.querySelector('#tableData'),
    dataEdit = document.querySelector('#data_edit'),
    butCloseDE = document.querySelector('#but_close'),
    butSendDE = document.querySelector('#but_send');

let idPersonData = '';

let lastSort = '';

let maxRow = personsData.length,
    firstRow = 0,
    lastRow = maxRow,
    page = document.getElementById('pages');


function loadTable(person) {

    tableBody.innerHTML += `
    <tr id=${person.id}>
    <td>${person.name.firstName}</td>
    <td>${person.name.lastName}</td>
    <td class="about">${person.about}</td>
    <td><div style=" display: flex; height: auto; width: auto; justify-content: space-evenly;"> ${person.eyeColor} <div style=" background-color: ${person.eyeColor}; width: 15px; height: 15px;"></div></div></td>
    </tr>`;
}

function createTable(fRow = firstRow, lRow = lastRow) {
    tableBody.innerHTML = '';

    while (fRow < lRow) {
        loadTable(personsData[fRow]);
        fRow++;
    }
}

function modeShowData() {

    let pages = 0;

    if (personsData.length / maxRow > Math.floor(personsData.length / maxRow)) {
        pages = Math.floor(personsData.length / maxRow) + 1;
    } else {
        pages = personsData.length / maxRow;
    }

    page.innerHTML = '';

    if (maxRow != personsData.length) {
        for (let i = 0; i < pages; i++) {
            page.innerHTML += `<a id="${i + 1}" href="#">${i + 1}</a> `;
        }
    }

    firstRow = 0;

    createTable();
}

function sortController(pI, pIG) {

    if (lastSort == 'down') {
        sortTableToUp(pI, pIG);
        lastSort = 'up';
    } else {
        sortTableToDown(pI, pIG);
        lastSort = 'down';
    }

    createTable();
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

    if (idPersonData) {
        let personData = personsData.find(el => el.id == idPersonData);

        document.getElementById('data_firstName').value = personData.name.firstName;
        document.getElementById('data_lastName').value = personData.name.lastName;
        document.getElementById('data_about').value = personData.about;
        document.getElementById('data_eyeColor').value = personData.eyeColor;
        document.getElementById('data_phone').value = personData.phone;

        butSendDE.disabled = false;
    } else {
        butSendDE.disabled = true;
    }
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

document.addEventListener('DOMContentLoaded', createTable());

document.addEventListener('click', function (e) {

    switch (e.target.id) {
        case 'firstName': sortController('firstName', 'name');
            break;
        case 'lastName': sortController('lastName', 'name');
            break;
        case 'about': sortController('about');
            break;
        case 'eyeColor': sortController('eyeColor');
            break;

        case 'show_10_row':
            maxRow = 10;
            lastRow = maxRow;
            modeShowData();
            break;
        case 'show_25_row':
            maxRow = 25;
            lastRow = maxRow;
            modeShowData();
            break;
        case 'show_50_row':
            maxRow = 50;
            lastRow = maxRow;
            modeShowData();
            break;
        case 'show_all_row':
            maxRow = personsData.length;
            lastRow = maxRow;
            modeShowData(personsData.length);
            break;
    }

    if (e.target == document.body) {
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
        } else if (e.target.id / 1 > 0) {
            lastRow = maxRow * e.target.id,
                firstRow = lastRow - maxRow;
            createTable();
        }
    }
});
