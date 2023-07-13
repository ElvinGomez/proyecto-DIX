function calcularBh(){
    var drValues = [];

    
    for (var i = 1; i <= 4; i++) {// iterar los valores de drenaje
      var drInput = document.getElementById('dr' + i);
      drValues.push(drInput.value);
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
      
     
        var totFinalValue = totIValue - totalDr;   // Calculo del total final

        var totDInput = document.getElementById('totD');// Cambia los valores por los totales calculados en Total drenaje y total final
        totDInput.value = totalDr;
        var totFinalInput = document.getElementById('totF');
        totFinalInput.value = totFinalValue;
    }   
    tots()// llamado de la funcion
}
