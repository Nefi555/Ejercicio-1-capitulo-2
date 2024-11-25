function calcularReparticion() {
    // Obtener el número de camellos y las fracciones
    const numCamellos = parseInt(document.getElementById('numCamellos').value);
    const fracciones = document.getElementById('fracciones').value.split(',').map(f => f.trim());

    // Añadir un camello adicional para facilitar la división
    const totalCamellos = numCamellos + 1;

    // Calcular la cantidad de camellos para cada fracción y redondear
    let sumaFracciones = 0;
    let resultado = fracciones.map(f => {
        let [numerador, denominador] = f.split('/').map(Number);
        if (isNaN(numerador) || isNaN(denominador) || denominador === 0) {
            // Validar fracciones incorrectas
            throw new Error("Fracción inválida: " + f);
        }
        let cantidad = Math.floor((totalCamellos * numerador) / denominador); // Redondeo hacia abajo
        sumaFracciones += cantidad;
        return cantidad;
    });

    // Verificar y mostrar los resultados
    if (sumaFracciones <= totalCamellos) {
        let resultadosHTML = '<ul>';
        resultado.forEach((cantidad, index) => {
            resultadosHTML += `<li>Persona ${index + 1}: ${cantidad} camellos</li>`;
        });
        resultadosHTML += `</ul><p>Camello adicional regresado: ${totalCamellos - sumaFracciones}</p>`;
        document.getElementById('resultados').innerHTML = resultadosHTML;
    } else {
        document.getElementById('resultados').innerHTML = "<p>Error en la repartición. Por favor, revisa las fracciones ingresadas.</p>";
    }
}

document.getElementById('calcular').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe
    try {
        calcularReparticion();
    } catch (error) {
        document.getElementById('resultados').innerHTML = `<p>${error.message}</p>`;
    }
});
