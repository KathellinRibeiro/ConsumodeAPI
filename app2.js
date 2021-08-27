var dateLabel = [], tempLabelMax = [], tempLabelMin = [], diaSemanaLabel = []

async function chartData() {
    await getData()

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dateLabel,
            datasets: [{
                label: 'Temperatura Maxima',
                data: tempLabelMax,
                backgroundColor: 'red',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            },
            {
                label: 'Temperatura Minima',
                data: tempLabelMin,
                backgroundColor: 'blue',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            tooltips: {
                mode: 'index'
            },
            scales: {
                x: {
                    display: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Datas',
                        color: '#911',
                        font: {
                            family: 'Comic Sans MS',
                            size: 20,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },
                        padding: { top: 20, left: 0, right: 0, bottom: 0 }
                    }
                },
                y: {
                    display: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temperatura em Celsius',
                        color: '#191',
                        font: {
                            family: 'Times',
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.2
                        },
                        padding: { top: 30, left: 0, right: 0, bottom: 0 }
                    }
                }
            }

        }
    });
}
chartData()

//Fetch DATA Dummy Examples REST API
async function getData() {
    const apiUrl = "https://api.hgbrasil.com/weather?format=json-cors&key=ecc2976a"
    //const apiUrl = "https://api.hgbrasil.com/finance/stock_price?format=json-corskey=dd9bfd9b&symbol=bidi4,petr4,qual3,ciel3"

   let response = await fetch(apiUrl, {
        method: "GET",
        mode: "cors"})
    let barChartData = await response.json()

    const tempMax = barChartData.results.forecast.map((x) => x.max)
    const tempMin = barChartData.results.forecast.map((x) => x.min)
    const data = barChartData.results.forecast.map((x) => x.date)
    const diaSemana = barChartData.results.forecast.map((x) => x.weekday)

    console.log(data, tempMax, tempMin, diaSemana)

    dateLabel = data
    tempLabelMax = tempMax
    tempLabelMin = tempMin
    diaSemanaLabel = diaSemana
}

getData()