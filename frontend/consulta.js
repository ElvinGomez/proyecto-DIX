let searchType = ''

$('#tipo-consulta').change(function () {
    searchType = $(this).val();

    if (searchType === 'fecha') {
        $('#grupo-fecha').show();
        $('#grupo-cedula').hide();
        $('#grupo-seguro-social').hide();
    } else if (searchType === 'cedula') {
        $('#grupo-fecha').hide();
        $('#grupo-cedula').show();
        $('#grupo-seguro-social').hide();
    } else if (searchType === 'seguro-social') {
        $('#grupo-fecha').hide();
        $('#grupo-cedula').hide();
        $('#grupo-seguro-social').show();
    }
});
function searchRecord() {
    let searchQuery = ''
    
    switch(searchType){
        case 'cedula':
            const idNumber = $('#cedula').val()
            console.log("🚀 ~ file: consulta.js:26 ~ searchRecord ~ idNumber:", idNumber)
            searchQuery = `idNumber=${idNumber}`
        break;

        case 'seguro-social':
            const socialNumber = $('#seguro-social').val()
            searchQuery = `socialNumber=${socialNumber}`
        break;

        default:
            const startDate = $('#fecha-inicio').val()
            const endDate = $('#fecha-fin').val()
            searchQuery = `startDate=${startDate}&endDate=${endDate}`
        break;
    }
    $.ajax({
        type: 'GET',
        dataType:"json",
        crossDomain: true,
        contentType: 'application/json',
        url: `http://localhost:3000/api/v1/hydricbalance/find?${searchQuery}`,
        "headers": {
          "accept": "application/json",
          "Access-Control-Allow-Origin":"*"
        },
        success: function ({data}, status, xhr) {
            let table = '<tbody id="table-data"></tbody>'
            if(data && data.length > 0){
                let row = ''
                data.forEach(element => {
                    let item = '';
                    item = item + `<th>${element.date}</th>`
                    if(element.balance && element.balance.length > 0){
                        element.balance.forEach((e, i) => {
                            item = item + `<th>${e}</th>`
                        })
                    }
                    item = item + `<th>${element.total_balance}</th>`
                    row = row + `<tr>${item}</tr>`
                });
                table = `<tbody id="table-data">${row}</tbody>`
            }
            $("#table-data").replaceWith(table)
        }
    });
}