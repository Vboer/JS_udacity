document.getElementById("submit").addEventListener("click", getTimeRow);

function getTimeRow (){
    const dates = datesArr();
    const timeRow = [];
    dates.forEach(element =>{
    const timePoint = [];    
    const processedDate = element.toISOString().split('T')[0].replace(/-/g,'');
    timePoint.push(processedDate);
    const url =`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${processedDate}&json`;
    fetch(url)
        .then(res=> res.json())
        .then(output =>{
            timePoint.push(output[0].rate);
            timeRow.push(timePoint);
        });
    }) 
        console.log(timeRow);
}
function datesArr (){
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    return betweenDates(from, to);
}
function betweenDates (from, to){
    const dateArray = [];
    let fromDate = new Date(from);
    const toDate = new Date(to);
    while (fromDate <= toDate){
        if(fromDate.getDay() > 0 && fromDate.getDay() < 6 ){
            dateArray.push(new Date(fromDate));
        }
        fromDate.setDate(fromDate.getDate() + 1);
        
    }
    return dateArray;
}


