document.addEventListener('DOMContentLoaded', () => {

    const boton = document.getElementById("boton");
    const buscador = document.getElementById("buscador");
    const detalles = document.getElementById("movie");
    const apikey = "1a2d1493";
    const urlbase = "http://www.omdbapi.com/";
    document.getElementById("movie").style.display = "none";
    boton.addEventListener('click', async () => {
        document.getElementById("movie").style.display = "block";
        const query = encodeURIComponent(buscador.value);
        if (query.trim() === ''){
            alert("Ingrese el título de la película.");
            return;
        }
        const url = urlbase + "?t=" + query + "&apikey=" + apikey;
        detalles.innerHTML = '<p>Buscando...</p>';

        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();

            if (datos.Response != "False") {
                const director = datos.Director;
                const year = datos.Year;
                const title = datos.Title;

                detalles.innerHTML = `
                    <h2>${title}</h2>
                    <p><strong>Director: </strong>${director}</p>
                    <p><strong>Año: </strong>${year}</p>
                `;
            }
            else {
                detalles.innerHTML = `<p>"Película no encontrada"</p>`
            }
        }
        catch (error) {
            console.error('Error: ',error);
            alert(error);
        }
    })
})