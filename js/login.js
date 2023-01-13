
const my_dic = {"uncertainty":"USEbw9Wa19WeDJw","obligation":"F2wh3Z3uWy7mZ9h","literacy":"X0ws2LDadc8JF5b","discrimination":"0Z4nUOWFMBeS5gp","publication":"2i0fwG0mBTwxVB8","confrontation":"fiWyQjbHDgvebUf","electronics":"Rr5fbIgKYMDxgST","execution": "VtRVZPGoUpGYzER","constitutional": "4onn8BuSjDkgZYv","discovery": "B7iHUzbMKK9ydxS","dictionary": "qO90JwRtI2WNhC0","autonomy": "0EDpNxS46pOC69O","articulate": "waTtEZZyulGXkAd","examination": "ZZGkoRKcYTjd27E","calculation": "aMxe8mhGUOZF5Aq","activity":"pqIR9wnPh6lNhgP","radiation":"O1qMd0JCL2X6GR2","expectation":"551yaxb0wZYKI9y","nationalism":"5hvMZFk0Lrb5UvQ","society":"921RopYzPavNQ4U","stereotype":"Y7jj5aHp5E9BzoK","superintendent":"hjETU3qF35QQyiX","diplomatic": "7PjOS3d8ftR2YQy","continuous":"N9l5WEW75XDPt9L","exaggerate":"NhJ8YyChefFEBZG","cemetery":"UnXOs7jGkuNMNgE","constellation":"MdAB9tMSN7XBUr4","original": "chXHW28R9ZdCi1t","application":"XtkqrZY2Q4ldcc8","qualification":"JPEs8gEOQbw1tnU"}

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;


if ( password == my_dic[username]){
alert ("Login successfully");
window.location = "Home.html"; // Redirecting to other page.
return false;
}
else{
attempt --;// Decrementing by one.
alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}

function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
   }

function sendEmail(email) {
      Email.send({
        SecureToken : "Cfe0b5a26-9b0a-4b3a-918e-b38e7ba753ae",
        To : 'ue8yp1io@duck.com',
        From : "margaret.molefe50@gmail.com",
        Subject : "Request for access to portfolio website",
        Body : email
    }).then(
      message => alert(message)
    );
  }
function request(){
    var email = prompt("Email", "Input the email address to receive login credentials")

    if (isEmail(email)){
      sendEmail(email)
    }
    else{
      alert("Email invalid. Please try again later. Or send your request via email!")
    }
}


  function appear(elm, i, step, speed){
    var t_o;
    //initial opacity
    i = i || 0;
    //opacity increment
    step = step || 5;
    //time waited between two opacity increments in msec
    speed = speed || 50; 

    t_o = setInterval(function(){
        //get opacity in decimals
        var opacity = i / 100;
        //set the next opacity step
        i = i + step; 
        if(opacity > 1 || opacity < 0){
            clearInterval(t_o);
            //if 1-opaque or 0-transparent, stop
            return; 
        }
        //modern browsers
        elm.style.opacity = opacity;
        //older IE
        elm.style.filter = 'alpha(opacity=' + opacity*100 + ')';
    }, speed);
}


