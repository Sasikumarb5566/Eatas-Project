import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { calculateBMI,calculateChange,macro_g,macro_k,fun1,firebaseConfig } from "./script0.js";



var gid;


  
// Initialize Firebase
const app = initializeApp(firebaseConfig);


import {getDatabase, set, get, ref, update, remove, child} 
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
const db = getDatabase();






var carb_g,pro_g,fat_g;
var carb_k,pro_k,fat_k;



function myfirebase(){
    const app = initializeApp(firebaseConfig);
    var uname = document.getElementById("name").value;
    var uphone = document.getElementById("phone").value;
    var umail = document.getElementById("mail").value;
    var ulocation = document.getElementById("location").value;
    var ujob = document.getElementById("job").value;
    var uhealth = document.getElementById("health").value;

    set(ref(db,"Contact_details/"+gid),{
        City:ulocation,
        Health:uhealth,
        Job:ujob,
        Email:umail,
        Phone:uphone,
        Name:uname,
    })
    .then(()=>{
        console.log("Details 1 submitted successfully")
    })
    .catch((error)=>{
        console.log(error)
    });

    var uheight = document.getElementById("height").value;
    var uweight = document.getElementById("weight").value;
    var uage = document.getElementById("age").value;
    var ugender = document.getElementById("gender").value;
    var uactivity = document.getElementById("activity").value;
    var ugoalweight = document.getElementById("gweight").value;
    
    var ugoal, ubmi, umaintainance, upace, ucarb, upro, ufat;

    var temp = macro_k();
    ucarb = parseFloat(temp[0]).toFixed(1);
    upro = parseFloat(temp[1]).toFixed(1);
    ufat = parseFloat(temp[2]).toFixed(1);

    var temp1 = fun1();
    ubmi = temp1[0];
    umaintainance = parseFloat(temp1[1]).toFixed(1);
    upace = temp1[2];
    ugoal = temp1[3];

    set(ref(db,"Health_details/"+ gid),{
        Name:uname,
        Height:uheight,
        Weight:uweight,
        Age:uage,
        Gender:ugender,
        Activity:uactivity,
        BMI:ubmi,
        Maintainance:umaintainance,
        Goal:ugoal,
        Goal_weight:ugoalweight,
        Pace:upace,
        Carbs:ucarb,
        Protein:upro,
        Fat:ufat,
        Health:uhealth
    })
    .then(()=>{
        console.log("Details 2 submitted successfully")
    })
    .catch((error)=>{
        console.log(error)
    });

    updateid();

}

    
$("body").on("keyup", "form", function(e){
    if (e.which == 13){
        if ($("#next").is(":visible") && $("fieldset.current").find("input, textarea").valid() ){
            e.preventDefault();
            nextSection();
            return false;
          }
        }
});
       
       
$("#next").on("click", function(e){
    console.log(e.target);
    nextSection();
});
      
      
      
$("form").on("submit", function(e){
    if ($("#next").is(":visible") || $("fieldset.current").index() < 4){
        e.preventDefault();
      
    }
});
       
function goToSection(i){
    $("fieldset:gt("+i+")").removeClass("current").addClass("next");
    $("fieldset:lt("+i+")").removeClass("current");
    $("li").eq(i).addClass("current").siblings().removeClass("current");
    setTimeout(function(){
        $("fieldset").eq(i).removeClass("next").addClass("current active");
        if ($("fieldset.current").index() == 4){
            $("#next").hide();
            $("input[type=submit]").show();
        } else {
            $("#next").show();
            $("input[type=submit]").hide();
            }
    }, 80);
       
}
       
function nextSection(){
    var i = $("fieldset.current").index();
    if(i==0){
        if(check1()){
            goToSection(i+1);
        }
    }
    else if(i==1){
        if(check2()){
            goToSection(i+1);
        }
    }
    else if(i==3){
        if(check4()){
            alert("Complete all details");}
        else{
            getid();
            assessement();
            goToSection(i+1);
        }
    }  
    else if (i < 4){
        $("li").eq(i+1).addClass("active");
        goToSection(i+1);
    }
    calculateBMI();
    calculateChange();
}
       
$("li").on("click", function(e){
    var i = $(this).index();
    if ($(this).hasClass("active")){
        goToSection(i);
    } else {
          alert("Please complete previous sections first.");
        }
});
    

function assessement(){
    let temp = macro_g();
    //alert(temp);
    carb_g = temp[0];
    pro_g = temp[1];
    fat_g = temp[2];
    let x = document.getElementById("xyz");

    x.innerHTML = '<table class="table table-striped">'+
    '<thead>'+
        '<tr>'+
            '<th>Macros</th>'+
            '<th>Value (in g)</th>'+
        '</tr>'+
    '</thead>'+
    '<tbody>'+
        '<tr>'+
            '<td>Carbohydrates</td>'+
            '<td>'+carb_g+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Protein</td>'+
            '<td>'+pro_g+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Fat</td>'+
            '<td>'+fat_g+'</td>'+
        '</tr>'+
    '</tbody>'+
'</table>';
}

function check4(){
    var uname = document.getElementById("name").value;
    var uphone = document.getElementById("phone").value;
    var umail = document.getElementById("mail").value;
    var ulocation = document.getElementById("location").value;
    var ujob = document.getElementById("job").value;

    var l = [uname,uphone,umail,ulocation,ujob];

    for(let i=0;i<l.length;i++){
        if(!(l[i])){
            return true;
        }
    }

    return false;
}

function check1(){
    var b1 = document.getElementById("height");
    var b2 = document.getElementById("weight");
    var b3 = document.getElementById("age");
    var b4 = document.getElementById("gender");
    var l = [b1,b2,b3,b4];
    for(let i=0;i<l.length;i++){
        if(!(l[i].value)){
            l[i].focus();
            alert("Complete all fields");
            return false;
        }
    }

    return true;
}

function check2(){
    var b1 = document.getElementById("gweight");
    if(!(b1.value)){
        alert("set a weight goal");
        return false;
    }
    return true;
}

function getid(){
    const app = initializeApp(firebaseConfig);
    const dbref = ref(db);
    var tid;

    get(child(dbref,"ssr/ref"))
    .then((snapshot)=>{
        if(snapshot.exists()){
            tid = snapshot.val().id;
            setid(tid);
        }
        else{
            console.log("id not found")
        }
    })
    .catch((e)=>{
        console.log("id get error"+e)
    });

}

function updateid(){
    update(ref(db,"ssr/ref"),{
        id:in_id()
    })
    .then(()=>{
        console.log("id updated successfully successfully")
    })
    .catch((error)=>{
        console.log("id update error"+error)
    });
}

function setid(id){
    gid=id;
    myfirebase();
}

function in_id(){
    return (gid+1);
}
