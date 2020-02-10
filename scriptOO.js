document.getElementById("submit").addEventListener("click", getTimeRow);

function getTimeRow (){
    const datesObj = new dates (document.getElementById("from").value, document.getElementById("to").value,).getDates().datesToString().getPrices();
       console.log(datesObj);

}

function dates (from, to){
    this.from = from;
    this.to = to;
    this.dateArray = [];
    this.priceArray = [];
};
dates.prototype.getDates = function (){
    
    let fromDate = new Date(this.from);
    let toDate = new Date(this.to);
    if (fromDate > Date() ){
        fromDate = new Date();
     }
     if (toDate > Date() ){
        toDate = new Date();
     }
        while (fromDate <= toDate){
            if(fromDate.getDay() > 0 && fromDate.getDay() < 6 ){
                this.dateArray.push(new Date(fromDate));
            }
        fromDate.setDate(fromDate.getDate() + 1);  
        };
    return this;
}
dates.prototype.datesToString = function(){
    for (let i = 0; i < this.dateArray.length; i++) {
        this.dateArray[i] = this.dateArray[i].toISOString().split('T')[0].replace(/-/g,'');
    }
    return this;
}
dates.prototype.getPrices = function(){
    this.dateArray.forEach(element => {
        const url =`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${element}&json`;
      fetch(url)
            .then(res => res.json())
            .then(output => {
                this.priceArray.push(output[0].rate);
                });
        });
    return this;
}
