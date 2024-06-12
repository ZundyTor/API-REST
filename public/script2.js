// Script para el consultar.html
document.getElementById('consultaSubmit').addEventListener('click', async function (event) {
    event.preventDefault();
    const consultaType = document.getElementById('consultaType').value;
    const codigo = document.getElementById('codigo').value;
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    let url = '';
    if (consultaType === 'estudiantes') {
        url = codigo ? `/estudiantes/${codigo}` : '/estudiantes';
    } else if (consultaType === 'profesores') {
        url = codigo ? `/profesores/${codigo}` : '/profesores';
    } else if (consultaType === 'asignaturas') {
        url = codigo ? `/asignaturas/${codigo}` : '/asignaturas';
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            displayResults(result, consultaType);
        } else {
            const error = await response.json();
            alert('Error: ' + error.message); 
        }
    } catch (err) {
        alert('Error al realizar la consulta.');
    }
});

function displayResults(data, type) {
    const resultadosDiv = document.getElementById('resultados');
    if (Array.isArray(data)) {
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.border = '1px solid #ccc';
            itemDiv.style.margin = '10px 0';
            itemDiv.style.padding = '10px';
            itemDiv.style.borderRadius = '5px';
            itemDiv.innerHTML = formatItem(item, type);
            resultadosDiv.appendChild(itemDiv);
        });
    } else {
        const itemDiv = document.createElement('div');
        itemDiv.style.border = '1px solid #ccc';
        itemDiv.style.margin = '10px 0';
        itemDiv.style.padding = '10px';
        itemDiv.style.borderRadius = '5px';
        itemDiv.innerHTML = formatItem(data, type);
        resultadosDiv.appendChild(itemDiv);
    }
}

function formatItem(item, type) {
    let formatted = '';
    if (type === 'estudiantes') {
        formatted = `
            <p><strong>Código:</strong> ${item.cod_e}</p>
            <p><strong>Nombre:</strong> ${item.nom_e}</p>
            <p><strong>Dirección:</strong> ${item.dir_e}</p>
            <p><strong>Teléfono:</strong> ${item.tel_e}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${item.fech_nac}</p>
        `;
    } else if (type === 'profesores') {
        formatted = `
            <p><strong>ID:</strong> ${item.id_p}</p>
            <p><strong>Nombre:</strong> ${item.nom_p}</p>
            <p><strong>Teléfono:</strong> ${item.tel_p}</p>
            <p><strong>Profesión:</strong> ${item.profesion}</p>
            <p><strong>Dirección:</strong> ${item.dir_p}</p>
        `;
    } else if (type === 'asignaturas') {
        formatted = `
            <p><strong>Código de Asignatura:</strong> ${item.cod_a}</p>
            <p><strong>Nombre de Asignatura:</strong> ${item.nom_a}</p>
            <p><strong>Intensidad Horaria:</strong> ${item.int_h}</p>
            <p><strong>Créditos:</strong> ${item.creditos_a}</p>
        `;
    }
    return formatted;
}
