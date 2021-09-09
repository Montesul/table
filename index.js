const myData = data;

const table = {
    fName: document.querySelector('#first_name'),
    lName: document.querySelector('#last_name'),
    about: document.querySelector('#about'),
    eye: document.querySelector('#eye_color'),
}


function appendEl(col, word) {
    let div = document.createElement('div');
    div.innerText = word;
    col.append(div);
}



myData.forEach(el => {
    appendEl(table.fName, el.name.firstName);
    appendEl(table.lName, el.name.lastName);
    appendEl(table.about, el.about);
    appendEl(table.eye, el.eyeColor);
});