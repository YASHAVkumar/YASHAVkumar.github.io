const apidata={
  apiId:"2007664f99715cca9f2e3dffc7966d76",
  i:0,
  search:{
   city:[],
   cityCard:[]
  }
}

function deleteAlert(){
  document.getElementById('cross').parentNode.removeChild(); 
}

fetchData=function(event)
{
   const search=document.getElementById('cityInput');
   if(event.keyCode==13)
    {
      var permisson=checkList(search.value);
      if(permisson==true)
      data(search.value);
    }
}

checkList=(value)=>{
      if(apidata.search.city.includes(value)==false)
      {
       apidata.search.city[apidata.i]=value;
       return true;
       }
       else
       {
         var alert=document.getElementById('alert');
         alert.style="height:30px;margin-top:4px;";
         alert.setAttribute('class','searchAlert');
         alert.innerHTML="<h2>You already Searched This City  <h1 id='cross' onClick='deleteAlert()'>&times;</h1> </h2>";
         console.log("you already searched this before");
       }
   return false;
}

function data(query)
{

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apidata.apiId)
          .then((response)=>
               {
               return response.json();
               })
          .then((weatherdata)=>
               {

//  console.log(weatherdata.name);
//  console.log(weatherdata.sys.country);
//  console.log(new Date().toDateString());
//
//  console.log(Math.floor(temp)+"°c");
//  console.log(weatherdata.weather[0].main);
//  console.log(weatherdata.weather[0].description);
              let temp=weatherdata.main.temp-273.15;
              const date=new Date().toDateString();
              const tempInCel=Math.floor(temp);
/**********HTML Data *************/
               let mainBlock=document.getElementById('main');

//  let cardBlock=document.createElement('DIV');
//  cardBlock.setAttribute('class','card');
//  let cardBlockUl=document.createElement('UL');
//   cardBlockUl.setAttribute('class','cardUl');
               let cardBlockDiv=document.createElement('div');
               cardBlockDiv.innerHTML="<div><br><br><span class='head'>"+weatherdata.name+", "+weatherdata.sys.country+"</span><br><span class='date'>"+date+"</span><br><br><span class='temp'>"+tempInCel+"&#176;C</span><br><span class='weather'>"+weatherdata.weather[0].main+"||</span><span class='weatherDesc'>"+weatherdata.weather[0].description+" <br><br><hr></div>";
               cardBlockDiv.setAttribute('class','card');
               mainBlock.append(cardBlockDiv);
  /**************card end here************/
  /************local storage work*********/
 /* apidata.search.cityCard[apidata.i]=cardBlockDiv.innerHTML;
   localStorage.setItem('searchCity',apidata.search.cityCard);
 var local=localStorage.getItem('searchCity');
  console.log(local);
*/
              apidata.i=apidata.i+1;
               })
              .catch((err)=>
                 {
                  throw err;
                 })

}



