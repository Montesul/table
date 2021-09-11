const personData = data,
    tableBody = document.querySelector('#tableData'),
    dataEdit = document.querySelector('#data_edit'),
    butCloseDE = document.querySelector('#but_close'),
    butSendDE = document.querySelector('#but_send');

let lastSort = '';

function loadTable(person) {
    tableBody.innerHTML += `
    <tr id=${person.id}>
    <td>${person.name.firstName}</td>
    <td>${person.name.lastName}</td>
    <td class="about">${person.about}</td>
    <td>${person.eyeColor}</td>
    </tr>`;
}

function createTable() {
    personData.forEach(person => {
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
    return personData.sort((prev, next) => {
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
    return personData.sort((prev, next) => {
        if (personInfoGroup) {
            return prev[personInfoGroup][personInfo] > next[personInfoGroup][personInfo] ? -1 : 1;
        } else {
            return prev[personInfo] > next[personInfo] ? -1 : 1;
        }
    });
}

function formDataEdit(id) {
    console.log(id);
}


document.addEventListener('DOMContentLoaded', createTable);

document.addEventListener('click', function (e) {
    switch (e.target.id) {
        case 'firstName': sortController('firstName', 'name');
            tableBody.innerHTML = '';
            createTable();
            break;
        case 'lastName': sortController('lastName', 'name');
            tableBody.innerHTML = '';
            createTable();
            break;
        case 'about': sortController('about');
            tableBody.innerHTML = '';
            createTable();
            break;
        case 'eyeColor': sortController('eyeColor');
            tableBody.innerHTML = '';
            createTable();
            break;
    }

    if (e.target == document.body || e.target == document.html) {
        data_edit.style.display = 'block';
        
    } else if (e.target == butCloseDE) {
        data_edit.style.display = 'none';
    } else {
        formDataEdit(e.target);
    }
});
