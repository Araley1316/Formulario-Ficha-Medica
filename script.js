function guardar() {
    const rut = document.getElementById("rut").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const estadoCivil = document.getElementById("estadoCivil").value;
    const comentarios = document.getElementById("comentarios").value.trim();

    if (!rut || !nombres || !apellidos || !email || !fechaNacimiento || !estadoCivil) {
        alert("Por favor, complete los campos obligatorios.");
        return;
    }

    const nuevoRegistro = {
        rut,
        nombres,
        apellidos,
        direccion,
        ciudad,
        telefono,
        email,
        fechaNacimiento,
        estadoCivil,
        comentarios
    };

   let registros = [];

try {
  registros = JSON.parse(localStorage.getItem("registros")) || [];
} catch (error) {
  console.error("Error al leer desde localStorage:", error);
  registros = [];
}

    const indice = registros.findIndex(r => r.rut === rut);
    if (indice !== -1) {
        if (confirm("Este RUT ya existe. ¿Desea sobreescribir?")) {
            registros[indice] = nuevoRegistro;
        } else {
            return;
        }
    } else {
        registros.push(nuevoRegistro);
    }

    localStorage.setItem("registros", JSON.stringify(registros));
    alert("Registro guardado correctamente.");
    document.getElementById("fichaForm").reset();
}

function buscar() {
    const apellido = document.getElementById("buscarApellido").value.trim().toLowerCase();
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";

    if (!apellido) {
        alert("Por favor, ingrese un apellido para buscar.");
        return;
    }

    const registros = JSON.parse(localStorage.getItem("registros")) || [];

    const resultados = registros.filter(r =>
        r.apellidos.toLowerCase().includes(apellido)
    );

    if (resultados.length === 0) {
        resultadoDiv.innerHTML = "No se encontraron coincidencias.";
    } else {
        resultados.forEach(r => {
            const p = document.createElement("p");
            p.innerHTML = `<strong>RUT:</strong> ${r.rut}<br>
                           <strong>Nombre:</strong> ${r.nombres} ${r.apellidos}<br>
                           <strong>Ciudad:</strong> ${r.ciudad}<br>
                           <strong>Email:</strong> ${r.email}<br><br>`;
            resultadoDiv.appendChild(p);
        });
        //limpia campo de búsqueda
        document.getElementById("buscarApellido").value = "";

        // Desaparecer resultados después de 5 segundos
        setTimeout(() => {
            resultadoDiv.innerHTML = "";
        }, 5000);
    }
}

function limpiar() {
    document.getElementById("fichaForm").reset();
}

function cerrar() {
  const confirmar = confirm("¿Desea cerrar el formulario?");
  if (confirmar) {
    if (window.opener != null) {
      // La ventana fue abierta con window.open()
      window.close();
    } else {
      // Fue abierta directamente (no se puede cerrar), redirige a una página en blanco
      window.location.href = "about:blank";
    }
  }
}


