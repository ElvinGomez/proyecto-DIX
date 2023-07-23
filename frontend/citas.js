let specialty = $('#especialidad').val()
let doctor = $('#medico').val()
let reason = $('#motivo-cita').val()

$('#especialidad').change(function () {
    specialty = $(this).val();
});

$('#medico').change(function () {
    doctor = $(this).val();
});

$('#motivo-cita').change(function () {
    reason = $(this).val();
});

function addRecord(){
    const patient = $('#paciente').val()
    const cedula = $('#cedula').val()

    if(reason === 'OTRO'){
        const other_reason = $('#otro-motivo').val()
        reason = `${reason}: ${other_reason}`
    }

    const data = {
        patient: patient,
        id_number: cedula,
        specialty: specialty,
        doctor: doctor,
        reason: reason
    }

    $.post({ url: `http://127.0.0.1:3000/api/v1/medical_appointment/add`, data: JSON.stringify(data), contentType: "application/json",
      success: function(response) {
        console.log("Response from the server:", response);
      },
      error: function(xhr, status, error) {
        console.error("Error:", error);
      }
    });
}