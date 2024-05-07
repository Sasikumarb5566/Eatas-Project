
var weight = 0;
var gselect=0;

function goalSelect(g){
  let button1 = document.getElementById("b1");
  let button2 = document.getElementById("b2");
  let button3 = document.getElementById("b3");
  //let buttons = document.querySelectorAll('button');
  //alert(button.classList.value);
  if(g=="g1"){
  button1.classList.remove("btn-primary");
  button1.classList.add("btn-success");
  button2.classList.remove("btn-warning","btn-success");
  button3.classList.remove("btn-danger","btn-success");}
  //buttons.forEach(button => button.classList.remove("highlighted"));
  else if(g=="g2"){
    button2.classList.remove("btn-warning");
    button2.classList.add("btn-success");
    button1.classList.remove("btn-primary","btn-success");
    button3.classList.remove("btn-danger","btn-success");}
  //button.classList.add("highlighted");
  if(g=="g3"){
    button3.classList.remove("btn-danger");
    button3.classList.add("btn-success");
    button1.classList.remove("btn-primary","btn-success");
    button2.classList.remove("btn-warning","btn-success");}

}

function weightplan(g){
  weight = document.getElementById("weight").value;
  let button1 = document.getElementById("w1");
  let button2 = document.getElementById("w2");
  let button3 = document.getElementById("w3");
  let b = document.getElementById("gweight");

  //let buttons = document.querySelectorAll('button');
  //alert(button.classList.value);
  if(g=="l"){
  button1.classList.remove("btn-primary");
  button1.classList.add("btn-success");
  button2.classList.remove("btn-warning","btn-success");
  button3.classList.remove("btn-danger","btn-success");
  b.disabled = false;
  b.value='';
  b.focus();
  gselect = 1;
}
  //buttons.forEach(button => button.classList.remove("highlighted"));
  else if(g=="m"){
    button2.classList.remove("btn-warning");
    button2.classList.add("btn-success");
    button1.classList.remove("btn-primary","btn-success");
    button3.classList.remove("btn-danger","btn-success");
    b.value = weight;
    gselect = 2;
    b.disabled = true;
  }
  //button.classList.add("highlighted");
  if(g=="g"){
    button3.classList.remove("btn-danger");
    button3.classList.add("btn-success");
    button1.classList.remove("btn-primary","btn-success");
    button2.classList.remove("btn-warning","btn-success");
    b.disabled = false;
    b.value='';
    b.focus();
    gselect = 3;
  }

}

function validate1(){
  var box = document.getElementById("gweight");
  var check = document.getElementById("check1");
  var w = document.getElementById("weight").value;
  
  if(box.value>10){
    if(gselect==1){
      if(box.value>=w){
      box.style.borderColor = "red";
      check.innerHTML = "Enter value less than "+w;
      }
      else{
        box.style.borderColor = "green";
        check.innerHTML = "Looks good!"
      }
    }
    else if(gselect==3){
     
      if(box.value<=w){
        box.style.borderColor = "red";
        check.innerHTML = "Enter value greater than "+w;
        }
        else{
          box.style.borderColor = "green";
          check.innerHTML = "Looks good!"
        }
    }
  }
  else{
    box.style.borderColor = "red";
    check.innerHTML = "";
  }
}
