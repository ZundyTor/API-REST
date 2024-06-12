// Script para el insertar.html
document.getElementById('infoType').addEventListener('change', function () {
    const infoType = this.value;
    const formFields = document.getElementById('formFields');
    formFields.innerHTML = '';

    if (infoType === 'estudiante') {
        formFields.innerHTML = `
            <label for="cod_e">Código:</label>
            <input type="number" id="cod_e" name="cod_e" required>
            <label for="nom_e">Nombre:</label>
            <input type="text" id="nom_e" name="nom_e" required>
            <label for="dir_e">Dirección:</label>
            <input type="text" id="dir_e" name="dir_e" required>
            <label for="tel_e">Teléfono:</label>
            <input type="number" id="tel_e" name="tel_e">
            <label for="fech_nac">Fecha de Nacimiento (aaaa-mm-dd):</label>
            <input type="text" id="fech_nac" name="fech_nac" required>
        `;
    } else if (infoType === 'profesor') {
        formFields.innerHTML = `
            <label for="id_p">ID:</label>
            <input type="number" id="id_p" name="id_p" required>
            <label for="nom_p">Nombre:</label>
            <input type="text" id="nom_p" name="nom_p" required>
            <label for="tel_p">Teléfono:</label>
            <input type="number" id="tel_p" name="tel_p" required>
            <label for="profesion">Profesión:</label>
            <input type="text" id="profesion" name="profesion" required>
            <label for="dir_p">Dirección:</label>
            <input type="text" id="dir_p" name="dir_p" required>
        `;
    } else if (infoType === 'asignatura') {
        formFields.innerHTML = `
            <label for="cod_a">Código de Asignatura:</label>
            <input type="number" id="cod_a" name="cod_a" required>
            <label for="nom_a">Nombre de Asignatura:</label>
            <input type="text" id="nom_a" name="nom_a" required>
            <label for="int_h">Intensidad Horaria:</label>
            <input type="number" id="int_h" name="int_h" required>
            <label for="creditos_a">Créditos:</label>
            <input type="number" id="creditos_a" name="creditos_a" required>
        `;
    }
});

document.getElementById('submit').addEventListener('click', async function (event) {
    event.preventDefault();
    const infoType = document.getElementById('infoType').value;
    const formData = new FormData(document.getElementById('infoForm'));
    const data = Object.fromEntries(formData.entries());

    let url = '';
    if (infoType === 'estudiante') {
        url = '/estudiantes';
    } else if (infoType === 'profesor') {
        url = '/profesores';
    } else if (infoType === 'asignatura') {
        url = '/asignaturas';
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Información de ' + infoType + ' enviada exitosamente');
            window.location.href = 'consultar.html';
        } else {
            const error = await response.json();
            alert('Error: ' + error.message); 
        }
    } catch (err) {
        alert('Error al enviar la solicitud.');
    }
});
