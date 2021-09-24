const personsData = data,
    tableBody = document.querySelector('#tableData'),
    dataEdit = document.querySelector('#data_edit'),
    butCloseDE = document.querySelector('#but_close'),
    butSendDE = document.querySelector('#but_send');

let idPersonData = '';

let maxRow = personsData.length,
    firstRow = 0,
    lastRow = maxRow,
    page = document.getElementById('page'),
    pages = document.getElementById('pages'),
    pageCount = 1,
    pagesMaxCount = 1;

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
    sort_list = document.querySelector('#sort_list');


document.addEventListener('DOMContentLoaded', createTable()); // Загружаем таблицу

function createTable(fRow = firstRow, lRow = lastRow) { // Функция создает таблицу в DIV с id=tableBody. 

    tableBody.innerHTML = ''; // очищаем содержимое элемента

    loadHeadTable(); // загружает заголовки столбцов таблицы

    createDataAfterSort(); // создаем данные

    while (fRow < lRow && fRow < personsDataAfterSort.length) { // выводим данные в количестве в соответствии с выбранным способом вывода данных
        loadBodyTable(personsDataAfterSort[fRow]); // загружаем в DOM очередной элемент из массива
        fRow++; // 
    }

    createPageList(); // т.к. после сортировки или изменения данных кол-во элементов может измениться необходимо пересчитать сколько страниц данных будет в выбранном способе вывода данных, а так же на какой странице находится таблица
}

function loadHeadTable() { // загружаем заголовки столбцов таблицы
    head_table.innerHTML = `                
    <tr>
        ${checkColumnHead()}
    </tr>`; // создает шапку с заголовками и проверяем есть ли он в списке тех заголовков которые должны отобразиться
}

function checkColumnHead() { // проверяем из списка какие заголовки должны отобразиться и возвращаем их
    let ans = '';
    if (id_column.checked) { // заголовок id
        ans += `<th id="id" class="id column_name">id</th>`;
    }
    if (firstName_column.checked) { // заголовок firstName
        ans += `<th id="firstName" class="other column_name">Имя (firstName)</th>`;
    }
    if (lastName_column.checked) { // заголовок lastName
        ans += ` <th id="lastName" class="other column_name">Фамилия (lastName)</th>`;
    }
    if (about_column.checked) { // заголовок about
        ans += `<th id="about" class="column_name">Описание (about)</th>`;
    }
    if (eyeColor_column.checked) { // заголовок eyeColor
        ans += `<th id="eyeColor" class="other column_name">Цвет глаз (eyeColor)</th>`;
    }
    if (phone_column.checked) { // заголовок phone
        ans += `<th id="phone" class="other column_name">Телефон (phone)</th>`;
    }
    return ans;
}

function createDataAfterSort() { // создаем данные после сортировки
    personsDataAfterSort = []; 

    for (person of personsData) { // перебираем элементы в массиве personsData
        if (check(person)) { // и проверяем фильтровались ли они по значению
            personsDataAfterSort.push(person); // добавляем в массив элемент
        }
    }
}

function check(person) { // проверяем какие заголовки и значение были выбраны
    if (sort_data.id) { // если таблица сортировалась по столбцу id
        if (sort_data.id.indexOf(person.id) == -1) { // в данном столбце выбранного значение нет
            return false;
        }
    }
    if (sort_data.firstName) { // если таблица сортировалась по столбцу firstName и т.д.
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
    return true; // если по столбцам сортировок не было или значение было найдено
}

function pageShowData() { // функция определяет 

    lastRow = maxRow * pageCount;
    firstRow = lastRow - maxRow;

    createTable();
}

function loadBodyTable(person) { // добавляем очередной элемент в тело таблицы

    tableBody.innerHTML += `
    <tr id=${person.id}>
    ${checkColumnBody(person)}
    </tr>`; // создаем строку и проверяем какие данные должны отобразиться
}

function checkColumnBody(person) { // проверяем столбцы и создаем элементы строки
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
        ans += `<td class="other"><div class="eyeColor">${person.eyeColor}<div style="background-color: ${person.eyeColor}"></div></div></td>`; // в этом элементе создаем DIV у которого в стилях присваиваем значение цвета
    }
    if (phone_column.checked) {
        ans += `<td class="other">${person.phone}</td>`;
    }
    return ans;
}

function createPageList() { // рассчитаем сколько страниц выбранном способе вывода данных будет и на какой страницы находится таблица

    if (personsDataAfterSort.length / maxRow > Math.floor(personsDataAfterSort.length / maxRow)) { // определяем будет ли остаток
        pagesMaxCount = Math.floor(personsDataAfterSort.length / maxRow) + 1;
    } else {
        pagesMaxCount = personsDataAfterSort.length / maxRow;
    }

    if (maxRow < personsDataAfterSort.length) { // если способ вывода данных меньше длины таблицы
        pages.style.display = 'flex'; // отображаем интерфейс перемежения по страницам
        page.innerHTML = `${pageCount} of ${pagesMaxCount}`; // отображает на какой страницы из общего кол-ва страниц
    } else {
        pages.style.display = 'none'; // в противном случае скрывает интерфейс т.к. взаимодействие с ним бессмысленна
    }
}

function modeShowData(value = maxRow) { // устанавливаем параметры отображения данных
    firstRow = 0; // индекс первого элемента
    pageCount = 1; // номер страницы
    maxRow = value; // максимальное кол-во элементов на странице
    lastRow = maxRow; // индекс последнего элемента
    createTable(); // пересоздаем таблицу
}

function openSortWindow(param, addit_param = '') { // открывает окно для сортировки столбца. Функция принимает 2 значения: ключ и дополнительный ключ

    person_param = param,
        addit_person_param = addit_param;

    sortTarget(); // создаем список значений

    sort_table.style.display = 'block';
}

function sortTargetTable() { // создаем массив сортированных данных по значению

    sort_data[person_param] = []; // по ключу столбца создаем массив 
    for (child of sort_list.childNodes) { // перебираем список элементов
        if (child.tagName == "DIV" && child.childNodes[1].checked) { // находим checkbox и проверяем поставлен ли в нем флажок
            sort_data[person_param].push(child.childNodes[1].id); // добавляем id элемента в массив. id идентичен значению 
        }
    }

    modeShowData(); 
}

function sortTarget() { // список значений для сортировки

    list_for_sort = [];
    sort_list.innerHTML = '';
    if (addit_person_param) { // если доп. ключ есть
        personsData.forEach(element => {
            createSortTarget(element[addit_person_param][person_param]);
        });
    } else {
        personsData.forEach(element => {
            createSortTarget(element[person_param]);
        });
    }
}

function createSortTarget(element) { // создаем список значений

    if (list_for_sort.indexOf(element) == -1) { // что бы значения в списке не повторялись, создаем массив значений
        list_for_sort.push(element); 
        sort_list.innerHTML += `
            <div>${element} <input id="${element}" type="checkbox"></div>
        `;
    }
}

function selectAll() { // выбор всех значений
    for (child of sort_list.childNodes) {
        if (child.tagName == "DIV" && !child.childNodes[1].checked) {
            child.childNodes[1].checked = true;
        }
    }
}

function clearAll() { // убрать флажки
    for (child of sort_list.childNodes) {
        if (child.tagName == "DIV" && child.childNodes[1].checked) {
            child.childNodes[1].checked = false;
        }
    }
}

function sortTableToDown() { // сортировать по нисходящей а-я

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

function sortTableToUp() { // сортировать по восходящей я-а

    personsData.sort((prev, next) => {
        if (addit_person_param) {
            return prev[addit_person_param][person_param] > next[addit_person_param][person_param] ? -1 : 1;
        } else {
            return prev[person_param] > next[person_param] ? -1 : 1;
        }
    });

    createTable();
}

function formDataOpen() { // загружаем форму редактирования данных

    if (idPersonData) { // если ранее строка таблицы была выбрано т.е. по ней был клик то в поле input выводится значения строки
        let personData = personsData.find(el => el.id == idPersonData);

        document.getElementById('data_firstName').value = personData.name.firstName;
        document.getElementById('data_lastName').value = personData.name.lastName;
        document.getElementById('data_about').value = personData.about;
        document.getElementById('data_eyeColor').value = personData.eyeColor;
        document.getElementById('data_phone').value = personData.phone;

        butSendDE.disabled = false;
    } else {
        butSendDE.disabled = true; // если строка выбрана кнопка "сохранить" блокируется
    }
}

function formDataEdit() { // сохраняет данные

    let personData = personsData.find(el => el.id == idPersonData);

    personData.name.firstName = document.getElementById('data_firstName').value;
    personData.name.lastName = document.getElementById('data_lastName').value;
    personData.about = document.getElementById('data_about').value;
    personData.eyeColor = document.getElementById('data_eyeColor').value;
    personData.phone = document.getElementById('data_phone').value;

    createTable(); // создаем таблицу с обновленными данными
}

document.addEventListener('click', function (e) { // отслеживаем клик мыши

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
        
            // способы отображения данных таблицы
        case 'show_10_row': modeShowData(10); 
            break;
        case 'show_25_row': modeShowData(25);
            break;
        case 'show_50_row': modeShowData(50);
            break;
        case 'show_all_row': modeShowData(personsDataAfterSort.length);
            break;

        case 'but_close': data_edit.style.display = 'none'; // при клике на кнопку "закрыть" форма редактирования данных будет скрыта
            break;
        case 'but_send': formDataEdit(); // при клике на кнопку "сохранить" в форме редактирования данных будут сохранены в таблицу
            break;
        case 'show_hide': createTable(); // перезагружаем таблицу для того, что бы отобразить выбранные столбцы
            break;

        case 'arrow_down': // стрелка возврата на предыдущую страницу
            if (pageCount - 1 > 0) {
                pageCount--;
                pageShowData();
            }
            break;
        case 'arrow_up': // стрелка перехода на следующую страницу
            if (pageCount + 1 <= pagesMaxCount) {
                pageCount++;
                pageShowData();
            }
            break;
    }

    if (e.target == document.body) { // при клике на body отображается форма редактирования данных
        data_edit.style.display = 'block';
        formDataOpen(); // загружаем форму
    }

    if (e.target.tagName == 'TD') { // при клике на строку данные загружаются, но форма редактирования данных не отображается
        idPersonData = e.target.parentNode.id;
        formDataOpen(); // загружаем форму
    }
});
