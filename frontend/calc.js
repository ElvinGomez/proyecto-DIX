let drValues = []
let btValues = [];
let cuValues = [];
const username = localStorage.getItem("username");

let pc = ''
let dt = ''

function evaluarBalanceTotal(totalBalanceFinal){
  if (totalBalanceFinal <= 0) {
    return {
      alert: false,
      title: `Alerta`,
      body: `Balance Hídrico Favorable. Condición normal, no hay retención de líquidos`
    }
  } else if (totalBalanceFinal >= 1 && totalBalanceFinal <= 2000) {
    return {
      alert: false,
      title: `Alerta`,
      body: `Retención de líquidos considerable. En caso de presentarse esta situación por más de dos días consecutivos, llame y consulte con la unidad hospitalaria de Diálisis.\nBalance Final del día: ${totalBalanceFinal}`
    }
  } else if (totalBalanceFinal > 2000) {
    return {
      alert: true,
      title: 'Excesiva retención de líquidos',
      body: `Consulte de inmediato con su nefrólogo\nBalance Final del día ${totalBalanceFinal}`,
      medAlert: 'RIESGO PERITONITIS'
    }
  }
  
}

function evaluarPresionArterial(sistolica, diastolica) {
  var presion = Math.max(sistolica, diastolica);

  if (presion >= 80 && presion <= 129) {
    return "Presión arterial normal.";
  } else if (presion >= 130 && presion <= 139) {
    return `Presión arterial normal alta: ${sistolica}/${diastolica}`;
  } else if (presion >= 140 && presion <= 159) {
    return `Hipertensión leve (Grado 1): ${sistolica}/${diastolica}`;
  } else if (presion >= 160 && presion <= 179) {
    return `Hipertensión moderada (Grado 2): ${sistolica}/${diastolica}`;
  } else if (presion >= 180 && presion <= 209) {
    return "ALERTA: Hipertensión grave (Grado 3). Requiere ATENCIÓN HOSPITALARIA DE INMEDIATO.";
  } else if (presion >= 210) {
    return "ALERTA: Hipertensión crítica (Grado 4). Requiere ATENCIÓN HOSPITALARIA DE INMEDIATO.";
  } else {
    return "";
  }
}

function evaluarPulsaciones(_latidos) {
  const latidos = parseInt(_latidos)
  if(!isNaN(latidos)){
    if (latidos < 60) {
      return `Pulsaciones por debajo del rango promedio: ${latidos}`;
    } else if (latidos >= 60 && latidos <= 100) {
      return "De acuerdo a su última toma, el pulso es normal";
    } else {
      return `Pulsaciones por encima del rango promedio: ${latidos}`
    }
  }
  return ''
}

function calcularBh(){
  pc = document.getElementById('pc').value
  dt = document.getElementById('date').value
  if(pc.trim() === ''){
    return alert('Ingrese un nombre del paciente')
  } else if(dt.trim() === ''){
    return alert('Ingrese una fecha')
  }
    drValues = [];
    cuValues = [];
    btValues = []
    for (var i = 1; i <= 4; i++) {// iterar los valores de drenaje
      var drInput = document.getElementById('dr' + i);
      var cuInput = document.getElementById('cu' + i);
      drValues.push(drInput.value !== '' ? parseInt(drInput.value) : 0);
      cuValues.push(cuInput.options[cuInput.selectedIndex].value);
    }
  
  
    for (var i = 0; i < drValues.length; i++) {  // Calcula los totales
      var drInputValue = drValues[i];
      var totOutput = document.getElementById('tot' + (i + 1));
  
      if (drInputValue === '') {
        totOutput.value = ''; // dejar blanco el tot
      } else {
        var drValue = parseFloat(drInputValue);
        var result = 2000 - drValue;
        totOutput.value = result; // update del tot
        btValues.push(result)
      }
    }
    function tots(){  // Calcular los ultimos dos totales
        var totIInput = document.getElementById('totI');
        var totIValue = parseFloat(totIInput.value);
      
        var totalDr = 0;
      
        
        for (var i = 1; i <= 4; i++) {// Iterar para sacar los totales
          var drInput = document.getElementById('dr' + i);
          var drValue = parseFloat(drInput.value);
          
          
          if (!isNaN(drValue)) {// sumatoria de tots
            totalDr += drValue;
          }
        }

        const medAlerts = []
      
     
        var totFinalValue = totIValue - totalDr;   // Calculo del total final

        var totDInput = document.getElementById('totD');// Cambia los valores por los totales calculados en Total drenaje y total final
        totDInput.value = totalDr;
        var totFinalInput = document.getElementById('totF');
        totFinalInput.value = totFinalValue;

        const analysis_result_title = document.getElementById('analysis-result');
        analysis_result_title.innerHTML = `Análisis de resultados para el paciente: ${pc}`

        const analysis_result_text1 = document.getElementById('analysis-result-text1');
        const analysis_result_text2 = document.getElementById('analysis-result-text2');
        const analysis_result_text3 = document.getElementById('analysis-result-text3');
        const analysis_result_text4 = document.getElementById('analysis-result-text4');
        const result_balance = evaluarBalanceTotal(totFinalValue)
        
        analysis_result_text1.innerHTML = `${result_balance.title}: ${result_balance.body}`
        const cuFilter = cuValues.filter((v) => v === 'Turbio')
        if(result_balance.alert){
          const msj = `${result_balance.title}: ${result_balance.body}`
          alert(msj);
          medAlerts.push(msj)
        }
        if(cuFilter.length >= 2){
          const msj = `ALERTA: Consulte de inmediato con su néfrologo y programe su cita en la unidad de diálisis`
          analysis_result_text1.innerHTML = msj
          alert(msj);
          console.log("🚀 ~ file: calc.js:139 ~ tots ~ username:", username)
          if(username === 'usuario_MD'){
            analysis_result_text4.innerHTML = 'ALERTA: RIESGO PERITONITIS'
          }
          medAlerts.push('RIESGO PERITONITIS\n\n')
        }

        const sistole_value = document.getElementById('pa').value;
        const diastole_value = document.getElementById('pa2').value
        analysis_result_text2.innerHTML = evaluarPresionArterial(sistole_value, diastole_value)
        
        const pulse_value = document.getElementById('pls').value;
        const result_pulse = evaluarPulsaciones(pulse_value)
        if(username === 'usuario_ENF'){
          analysis_result_text3.innerHTML = result_pulse
        }
        
        medAlerts.push(result_pulse)

        
        document.getElementById('analysis-result-container').style.display= 'block' ;
        enviarCorreo(medAlerts)
    }   
    tots()// llamado de la funcion


    // Paso 1: Incluir la biblioteca emailJS en tu proyecto
    // Asegúrate de haber incluido el archivo email.js en tu HTML antes de usar este código.

    // Paso 2: Configurar los datos de tu cuenta de emailJS
    emailjs.init('H7AvO3MrZG61jXR8h'); // Reemplaza 'TU_USER_ID' con tu User ID de emailJS

    // Paso 3: Definir la función para enviar el correo electrónico
    function enviarCorreo(alerts) {
      var now = new Date();
      var currentDate = now.toLocaleDateString();
      var currentTime = now.toLocaleTimeString();
      // Configurar el objeto de parámetros para enviar el correo
      const templateParams = {
        to_name: 'elvin.gomez@utp.ac.pa',
        patient_name:`${pc}`,
        date_and_time: `${currentDate} - ${currentTime}`,
        alerts_data: alerts.join('\n\n '),
        reply_to: 'no-reply@utp.ac.pa'
      };

      // // Enviar el correo utilizando emailJS
      emailjs.send('service_flty5rh', 'template_0pgubrd', templateParams, "H7AvO3MrZG61jXR8h")
        .then(function(response) {
          console.log('Correo enviado con éxito', response);
        }, function(error) {
          console.error('Error al enviar el correo', error);
        });
    }

}

let myChart;

function showChart(){
  const ctx = document.getElementById('myChart');
  if (myChart) {
      myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Recambio 1', 'Recambio 2', 'Recambio 3', 'Recambio 4'],
      datasets: [{
          label: 'Infusión (ML)',
          data: [2000, 2000, 2000, 2000],
          borderWidth: 1
      },
      {
          label: 'Drenaje (ML)',
          data: drValues,
          borderWidth: 1
      },
      {
          label: 'Balance (ML)',
          data: btValues,
          borderWidth: 1
      },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
