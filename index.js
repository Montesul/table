const personsData = data,
    tableBody = document.querySelector('#tableData'),
    dataEdit = document.querySelector('#data_edit'),
    butCloseDE = document.querySelector('#but_close'),
    butSendDE = document.querySelector('#but_send');

let idPersonData = '';

let maxRow = personsData.length,
    firstRow = 0,
    lastRow = maxRow,
    page = document.getElementById('pages');

let person_param = '',
    addit_person_param = '';

const target_list = [],
    sort_data = {};

let list_for_sort = [],
    personsDataAfterSort = [];

const id_column = document.querySelector('#id_column'),
    firstName_column = document.querySelector('#firstName_column'),
    lastName_column = document.querySelector('#lastName_column'),
    about_column = document.querySelector('#about_column'),
    eyeColor_column = document.querySelector('#eyeColor_column'),
    phone_column = document.querySelector('#phone_column'),
    head_table = document.querySelector('#head_table'),
    but_show_hide = document.querySelector('#show_hide'),

    sort_down = document.querySelector('#sort_down'),
    sort_up = document.querySelector('#sort_up'),
    sort_list = document.querySelector('#sort_list'),
    close_sort_table = document.querySelector('#close_sort_table'),
    but_sorting = document.querySelector('#sorting'),
    select_all = document.querySelector('#select_all'),
    clear_all = document.querySelector('#clear_all');

function checkColumnHead() {
    let ans = '';
    if (id_column.checked) {
        ans += `<th id="id" class="id column_name">id</th>`;
    }
    if (firstName_column.checked) {
        ans += `<th id="firstName" class="other column_name">Имя (firstName)</th>`;
    }
    if (lastName_column.checked) {
        ans += ` <th id="lastName" class="other column_name">Фамилия (lastName)</th>`;
    }
    if (about_column.checked) {
        ans += `<th id="about" class="column_name">Описание (about)</th>`;
    }
    if (eyeColor_column.checked) {
        ans += `<th id="eyeColor" class="other column_name">Цвет глаз (eyeColor)</th>`;
    }
    if (phone_column.checked) {
        ans += `<th id="phone" class="other column_name">Телефон (phone)</th>`;
    }
    return ans;
}

function loadHeadTable() {
    head_table.innerHTML = `                
    <tr>
        ${checkColumnHead()}
    </tr>`;
}

function checkColumnBody(person) {
    let ans = '';
    if (id_column.checked) {
        ans += `<td class="id">${person.id}</td>`;
    }
    if (firstName_column.checked) {
        ans += `<td class="other">${person.name.firstName}</td>`;
    }
    if (lastName_column.checked) {
        ans += `<td class="other">${person.name.lastName}</td>`;
    }
    if (about_column.checked) {
        ans += `<td class="about">${person.about}</td>`;
    }
    if (eyeColor_column.checked) {
        ans += `<td class="other"><div style=" display: flex; height: auto; width: auto; justify-content: space-evenly;"> ${person.eyeColor} <div style=" background-color: ${person.eyeColor}; width: 15px; height: 15px;"></div></div></td>`;
    }
    if (phone_column.checked) {
        ans += `<td class="other">${person.phone}</td>`;
    }
    return ans;
}

function loadBodyTable(person) {

    tableBody.innerHTML += `
    <tr id=${person.id}>
    ${checkColumnBody(person)}
    </tr>`;
}

function check(person) {
    if (sort_data.id) {
        if (sort_data.id.indexOf(person.id) == -1) {
            return false;
        }
    }
    if (sort_data.firstName) {
        if (sort_data.firstName.indexOf(person.name.firstName) == -1) {
            return false;
        }
    }
    if (sort_data.lastName) {
        if (sort_data.lastName.indexOf(person.name.lastName) == -1) {
            return false;
        }
    }
    if (sort_data.about) {
        if (sort_data.about.indexOf(person.about) == -1) {
            return false;
        }
    }
    if (sort_data.eyeColor) {
        if (sort_data.eyeColor.indexOf(person.eyeColor) == -1) {
            return false;
        }
    }
    if (sort_data.phone) {
        if (sort_data.phone.indexOf(person.phone) == -1) {
            return false;
        }
    }
    return true;
}

function createDataAfterSort() {
    personsDataAfterSort = [];

    for (person of personsData) {
        if (check(person)) {
            personsDataAfterSort.push(person);
        }
    }
}

function createTable(fRow = firstRow, lRow = lastRow) {

    tableBody.innerHTML = '';

    loadHeadTable();

    createDataAfterSort();

    while (fRow < lRow) {
        loadBodyTable(personsDataAfterSort[fRow]);
        fRow++;
    }
}

function modeShowData() {

    let pages = 0;

    if (personsDataAfterSort.length / maxRow > Math.floor(personsDataAfterSort.length / maxRow)) {
        pages = Math.floor(personsDataAfterSort.length / maxRow) + 1;
    } else {
        pages = personsDataAfterSort.length / maxRow;
    }

    page.innerHTML = '';

    if (maxRow < personsDataAfterSort.length) {
        for (let i = 0; i < pages; i++) {
            page.innerHTML += `<a id="${i + 1}" href="#">${i + 1}</a> `;
        }
    }

    firstRow = 0;

    createTable();
}

function openSortWindow(param, addit_param = '') {

    person_param = param,
        addit_person_param = addit_param;

    sortTarget();

    sort_table.style.display = 'block';
}

function sortTargetTable() {
    sort_data[person_param] = [];
    for (child of sort_list.childNodes) {
        if (child.tagName == "DIV" && child.childNodes[1].checked) {
            sort_data[person_param].push(child.childNodes[1].id);
        }
    }
    modeShowData();
}

function createSortTarget(element) {

    if (list_for_sort.indexOf(element) == -1) {

        list_for_sort.push(element);
        sort_list.innerHTML += `
            <div>${element} <input id="${element}" type="checkbox"></div>
        `;
    }
}

function sortTarget() {

    list_for_sort = [];
    sort_list.innerHTML = '';
    if (addit_person_param) {
        personsData.forEach(element => {
            createSortTarget(element[addit_person_param][person_param]);
        });
    } else {
        personsData.forEach(element => {
            createSortTarget(element[person_param]);
        });
    }
}

function selectAll() {
    for (child of sort_list.childNodes) {
        if (child.tagName == "DIV" && !child.childNodes[1].checked) {
            child.childNodes[1].checked = true;
        }
    }
}

function clearAll() {
    for (child of sort_list.childNodes) {
        if (child.tagName == "DIV" && child.childNodes[1].checked) {
            child.childNodes[1].checked = false;
        }
    }
}

function sortTableToDown() {

    personsData.sort((prev, next) => {
        if (addit_person_param) {
            if (prev[addit_person_param][person_param] > next[addit_person_param][person_param]) {
                return 1;
            } else {
                return -1;
            }
        } else {
            if (prev[person_param] > next[person_param]) {
                return 1;
            } else {
                return -1;
            }
        }
    });

    modeShowData();
}

function sortTableToUp() {

    personsData.sort((prev, next) => {
        if (addit_person_param) {
            return prev[addit_person_param][person_param] > next[addit_person_param][person_param] ? -1 : 1;
        } else {
            return prev[person_param] > next[person_param] ? -1 : 1;
        }
    });

    modeShowData();
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

    modeShowData();
}

document.addEventListener('DOMContentLoaded', modeShowData());

document.addEventListener('click', function (e) {

    console.log(e.target.id);

    switch (e.target.id) {
        case 'firstName': openSortWindow('firstName', 'name');
            break;
        case 'lastName': openSortWindow('lastName', 'name');
            break;
        case 'about': openSortWindow('about');
            break;
        case 'eyeColor': openSortWindow('eyeColor');
            break;
        case 'id': openSortWindow('id');
            break;
        case 'phone': openSortWindow('phone');
            break;

        case 'sort_down': sortTableToDown();
            break;
        case 'sort_up': sortTableToUp();
            break;
        case 'sorting': sortTargetTable();
            sort_table.style.display = 'none';
            break;
        case 'close_sort_table': sort_table.style.display = 'none';
            break;
        case 'select_all': selectAll();
            break;
        case 'clear_all': clearAll();
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
            maxRow = personsDataAfterSort.length;
            lastRow = maxRow;
            modeShowData(personsDataAfterSort.length);
            break;
    }

    if (e.target == document.body) {
        data_edit.style.display = 'block';
        formDataOpen();
    } else if (e.target == butCloseDE) {
        data_edit.style.display = 'none';
    } else if (e.target == butSendDE) {
        formDataEdit();
    } else if (e.target == but_show_hide) {
        modeShowData();
    } else {
        if (e.target.tagName == 'TD') {
            idPersonData = e.target.parentNode.id;
            formDataOpen();
        } else if (e.target.id / 1) {
            lastRow = maxRow * e.target.id,
                firstRow = lastRow - maxRow;
                modeShowData();
        }
    }
});
