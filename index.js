const personData = data,
    tableBody = document.querySelector('#tableData');

function loadTable(person) {
    tableBody.innerHTML += `
    <tr>
    <td>${person.name.firstName}</td>
    <td>${person.name.lastName}</td>
    <td class="about">${person.about}</td>
    <td>${person.eyeColor}</td>
    </tr>`;
}

personData.forEach(person => {
    loadTable(person);
});

function sortTableMin() {
    return personData.sort((prev, next) => {
        if (prev.name.firstName > next.name.firstName) {
            return 1;
        } else {
            return -1;
        }
    });
}

console.log(sortTableMin());
