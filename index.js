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
    sort_data = [];

let list_for_sort = [];

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
    but_sorting = document.querySelector('#sorting');

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

function createTable(fRow = firstRow, lRow = lastRow) {
    tableBody.innerHTML = '';

    loadHeadTable();

    // if (list_for_sort.length > 0) {
    //     sort_data = personsData.filter(el => {
    //         if (addit_person_param) {
    //             if (list_for_sort.indexOf(el[addit_person_param][person_param]) != -1) {
    //                 return el;
    //             }
    //         } else {
    //             if (list_for_sort.indexOf(el[person_param]) != -1) {
    //                 return el;
    //             }
    //         }
    //     })
    //     while (fRow < lRow) {
    //         loadBodyTable(sort_data[fRow]);
    //         fRow++;
    //     }
    // } else {
    while (fRow < lRow) {
        loadBodyTable(personsData[fRow]);
        fRow++;
    }
    //}

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

function openSortWindow(e, param, addit_param = '') {

    person_param = param,
        addit_person_param = addit_param;

    sortTarget();

    document.getElementById(`sort_${param}`).style.left = `${e.pageX - 5}px`;
    sort_table.style.top = `${e.pageY - 5}px`;
    sort_table.style.display = 'block';
}

function sortTargetTable() {
    for (child of sort_list.childNodes) {
        if (child.tagName == "DIV" && child.childNodes[1].checked) {
            target_list.push(child.childNodes[1].id);
        }
    }
}

function createSortTarget(element) {

    let div = document.createElement('div');
    div.id = `sort_${person_param}`;
    div.className = 'sort_table';
    div.innerHTML = '<div><button id = "sort_down">a-z 0-9</button><button id="sort_up">z-a 9-0</button></div><div id="sort_list"></div><div><button id="sorting">Сортировать</button><button id="close_sort_table">Закрыть</button></div>'
    document.getElementById(person_param).append(div);

    if (list_for_sort.indexOf(element) == -1) {

        list_for_sort.push(element);
        div.sort_list.innerHTML += `
            <div>${element} <input id="${element}" type="checkbox" checked></div>
        `;
    }
}

function sortTarget() {

    list_for_sort = [];
    sort_list.innerHTML = ''
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

    createTable();
}

function sortTableToUp() {

    personsData.sort((prev, next) => {
        if (addit_person_param) {
            return prev[addit_person_param][person_param] > next[addit_person_param][person_param] ? -1 : 1;
        } else {
            return prev[person_param] > next[person_param] ? -1 : 1;
        }
    });

    createTable();
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

    console.log(e.target.id);

    switch (e.target.id) {
        case 'firstName': openSortWindow(e, 'firstName', 'name');
            break;
        case 'lastName': openSortWindow(e, 'lastName', 'name');
            break;
        case 'about': openSortWindow(e, 'about');
            break;
        case 'eyeColor': openSortWindow(e, 'eyeColor');
            break;
        case 'id': openSortWindow(e, 'id');
            break;
        case 'phone': openSortWindow(e, 'phone');
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
    } else if (e.target == but_show_hide) {
        createTable();
    } else {
        if (e.target.tagName == 'TD') {
            idPersonData = e.target.parentNode.id;
            formDataOpen();
        } else if (e.target.id / 1) {
            lastRow = maxRow * e.target.id,
                firstRow = lastRow - maxRow;
            createTable();
        }
    }
});
