var hbs = require("hbs");

function ifUser(user) {    
    if(user)
    {
      // if(user.isAdmin === true)
      // {
      //   return new hbs.SafeString('<div class="dropdown">'+
      //   '<button onclick="myCabinet()" class="dropbtn">Адмін кабінет</button>'+
      //   '<div id="myDropdown" class="dropdown-content">'+
      //   '<a href="/addService">Додати послугу</a>'+
      //   '<a href="/adminNews">Новини</a>'+
      //   '<a href="/logout">Вийти</a>'+
      //   '</div></div>'
      //   );    
      // }
      return new hbs.SafeString('<div class="dropdown">'+
        '<button onclick="myCabinet()" class="dropbtn">Мій кабінет</button>'+
        '<div id="myDropdown" class="dropdown-content">'+
        '<a href="/history">Історія</a>'+
        '<a href="/logout">Вийти</a>'+
        '</div></div>'
        );  
    }
    else
    {
      return new hbs.SafeString('<div class="dropdown">'+
        '<button class="dropbtn"onclick="enter()">Вхід</button>'+
        '</div>'
        );     
    }   
};

function getHistory(history) { 
  
     if(history)
     {

        var temp='';
        temp+='<table id="historyTable">';

        for (var i = history.length-1; i >= 0; i--) {         
          temp+='<table class="historyBlock"> <tr><td class="dateHistory" colspan="3">'+
          history[i].created.getDate()+'.'+parseInt(history[i].created.getMonth()+1) +'.'+history[i].created.getFullYear()+'</td></tr>'

          temp+='<tr><td>'+history[i].result+'</td></tr>'
          temp+='</table>';
          /*temp+=
          '<tr>'+
          '<td colspan="2">Сума: '+ orders.totalPrice +'грн </td>'+
          '<td><button type="submit" class="buttons" onclick="toOrder()">Замовити</button></td>'+
          '</tr>';*/
        }
        temp+='</table>';
         return new hbs.SafeString(temp);
     } 
     else
     {
      return new hbs.SafeString("<h2>Ви ще не сформували жодного резуьтату!</h2>")
     }   
};

module.exports = {
  ifUser,
  getHistory
};