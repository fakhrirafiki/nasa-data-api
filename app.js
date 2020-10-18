const xlabels = [];
const ylabels = [];
chartIt();

async function chartIt() {
    await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Global Temperature by Year',
                fill: false,
                data: ylabels,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '°';
                        },
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}

async function getData() {
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    // const response = await fetch('test.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1)
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0]
        xlabels.push(year)
        const temp = columns[1]
        ylabels.push(parseFloat(temp) + 14)
        console.log(year, temp);
    });

    // console.log(data);
}

getData()