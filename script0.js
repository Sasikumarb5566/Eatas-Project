var gbmi = 0;
var gmaintainance = 0;
var gweightstate = 0;
var gspeed = 0;
var gsign = 0;
var gender;
var age;

var cal=0;
var m_weight;
var l_weight;

var pro_g;
var pro_k;
var fat_g;
var fat_k;
var carb_k;
var carb_g;

var bg1 = document.getElementById('b1');
var bg2 = document.getElementById('b2');
var bg3 = document.getElementById('b3');

bg1.addEventListener('click',()=>{
    gspeed=(200*gsign);
});
bg2.addEventListener('click',()=>{
    gspeed=(400*gsign);
});
bg3.addEventListener('click',()=>{
    gspeed=(600*gsign);
});


export function calculateBMI(weight){

  let w1 = document.getElementById("w1");
  let w2 = document.getElementById("w2");
  let w3 = document.getElementById("w3");
  let g = document.getElementById("gweight");
  g.disabled = true;

  let bodyweightInKg = document.getElementById("weight").value;
  m_weight = bodyweightInKg;
  let bodyweightInLbs = bodyweightInKg * 2.2;
  let heightInCm = document.getElementById("height").value;
  let heightInInches = heightInCm * 0.393701;
  if (bodyweightInLbs !=0 ){
    w1.style.display = "block";
    w2.style.display = "block";
    w3.style.display = "block";
  let BMI = (703 * bodyweightInLbs) / (heightInInches * heightInInches);
  gbmi = BMI.toFixed(2);
  if (BMI <= 18.5) {
    document.getElementById("BMI").innerHTML = "Your BMI : " + BMI.toFixed(2)+ "[ which means you are underweight, it's good to gain muscle mass to look your better version.]";
    gweightstate = 1;
    w1.disabled = true;
    w3.disabled = false;
  } 
  else if (BMI > 18.5 && BMI <= 25.0) {
    document.getElementById("BMI").innerHTML = "Your BMI : " + BMI.toFixed(2)+ " [which means you are at a healthy weight, it's good to maintain your weight and you can gain muscle mass to look your better self.]";
    gweightstate = 2;
    w1.disabled = false;
    w2.disabled = false;
    w3.disabled = false;
  } 
  else if (BMI > 25.0 && BMI <= 30.0) {
    document.getElementById("BMI").innerHTML = "Your BMI : " + BMI.toFixed(2)+ "[ which means you are overweight, it's good to loss fat to see your wonderful celebrity version.]";
    gweightstate = 3;
    w1.disabled = false;
    w3.disabled = true;
  }
else if (BMI > 30) {
  document.getElementById("BMI").innerHTML = "Your BMI : " + BMI.toFixed(2)+ "[ which means you are obese, it's recommended to lose weight to prevent health complications.]";
  gweightstate = 3;
  w1.disabled = false;
  w2.disabled = true;
  w3.disabled = true;
  }
let bmr = calculateBMR(bodyweightInKg,heightInCm);
let activityMultiplier = calculateActivityMultiplier();
let maintainance_calorie = bmr * activityMultiplier;

  gmaintainance = maintainance_calorie.toFixed(2);

document.getElementById("calorie").innerHTML = "Your Calorie requirement: " + maintainance_calorie.toFixed(2);
  }
  else{
    document.getElementById("BMI").innerHTML = "Fill the height and weight in previous section to calculate BMI";
    w1.style.display = "none";
    w2.style.display = "none";
    w3.style.display = "none";
    g.disabled = true;
  }

}

function calculateBMR(weight,height){
  //Mifflin-St Jeor equation 
  //BMR (kcal/day) = 10 × weight (kg) + 6.25 × height (cm) – 5 × age (y) + s (kcal/day)
  age = document.getElementById("age").value;
  gender = document.getElementById("gender").value;
  let s = (gender=="male") ? 5 : -161;
  let bmr = (10*weight)+(6.25*height)-(5*age)+s;
  return bmr;
}

function calculateActivityMultiplier() {
  let activity = document.getElementById("activity").value;
  let activityMultiplier = 0;
  if (activity === "sedentary") {
  activityMultiplier = 1.17;
  } else if (activity === "light_active") {
  activityMultiplier = 1.37;
  } else if (activity === "active") {
  activityMultiplier = 1.57;
  } else if (activity === "very_active") {
  activityMultiplier = 1.67;
  } else if (activity === "extreme") {
      activityMultiplier = 1.85;
  }
  return activityMultiplier;
}

export function calculateChange(){
  let currentWeight = document.getElementById("weight").value;
  let targetWeight = document.getElementById("gweight").value;
  let b1 = document.getElementById("b1");
  let b2 = document.getElementById("b2");
  let b3 = document.getElementById("b3");
  if(targetWeight !=0){
  
  if(targetWeight>currentWeight){
      calculateGain(currentWeight,targetWeight,b1,b2,b3);
  }
  else if(targetWeight<currentWeight){
      calculateLoss(currentWeight,targetWeight,b1,b2,b3);
  }
  else if(currentWeight==targetWeight){
    b1.style.display = "none";
    b2.style.display = "none";
    b3.style.display = "none";
    gsign = 0;
    gspeed = 0;
      document.getElementById("result").innerHTML= "You preferred to maintain weight so take food as per calorie requirement"
  }
}
else{
  b1.style.display = "none";
  b2.style.display = "none";
  b3.style.display = "none";
  document.getElementById("result").innerHTML = "Complete the previous sections";
}
}

function calculateGain(current,target,b1,b2,b3){
  //Calories for gaining weight = (target weight in kg - weight in kg) * (1100 / goal date in weeks)
  gsign = 1;
  let g1 = parseInt(((target-current)*1100)/200);
  let g2 = parseInt(((target-current)*1100)/400);
  let g3 = parseInt(((target-current)*1100)/600);
  b1.style.display = "block";
  b2.style.display = "block";
  b3.style.display = "block";
  document.getElementById("result").innerHTML = "You choosen to gain weight";
  b1.innerHTML = "Economy <br>"+ "+200 colories <br>" + "Duration:"+g1+" weeks";
  b2.innerHTML = "Premium <br>"+ "+400 colories <br>" + "Duration:"+g2+" weeks";
  b3.innerHTML = "Express <br>"+ "+600 colories <br>" + "Duration:"+g3+" weeks";
}

function calculateLoss(current,target,b1,b2,b3){
  //Calories for gaining weight = (weight in kg - target weight in kg) * (1100 / goal date in weeks)
  gsign = -1;
  let g1 = parseInt(((current-target)*1100)/200);
  let g2 = parseInt(((current-target)*1100)/400);
  let g3 = parseInt(((current-target)*1100)/600);
  b1.style.display = "block";
  b2.style.display = "block";
  b3.style.display = "block";
  document.getElementById("result").innerHTML = "You choosen to lose weight";
  b1.innerHTML = "Economy <br>"+ "-200 colories <br>" + "Duration:"+g1+" weeks";
  b2.innerHTML = "Premium <br>"+ "-400 colories <br>" + "Duration:"+g2+" weeks";
  b3.innerHTML = "Express <br>"+ "-600 colories <br>" + "Duration:"+g3+" weeks";
}

function BFP(){

    //BFP = 1.20 × BMI + 0.23 × Age - 16.2 (male)
    let BFPv;
    if(gender == "male"){
        BFPv = (1.20 * gbmi) + (0.23 * age) - 16.2;
    }
    //BFP = 1.20 × BMI + 0.23 × Age - 5.4 (female)
    else{
        BFPv = (1.20 * gbmi) + (0.23 * age) - 5.4;
    }
    l_weight = (m_weight - ((m_weight*BFPv)/100)).toFixed(2);
}

function protein(){
    pro_g = l_weight;
    pro_k = pro_g * 4;
    return pro_g;
}

function fat(){
    fat_g = l_weight * 0.4;
    fat_k = fat_g * 9;
}

function carb(){
    cal = parseFloat(gmaintainance) + parseInt(gspeed);
    //alert(cal);
    carb_k = cal - (fat_k+pro_k);
    carb_g = (carb_k/4).toFixed(2);
}

export function macro_g(){
    BFP();
    protein();
    fat();
    carb();
    return [carb_g,pro_g,fat_g];
}

export function macro_k(){
    BFP();
    protein();
    fat();
    carb();
    return [carb_k,pro_k,fat_k];
}

export function gs(){
    return gsign;
}

export function fun1(){
    let ggoal;
    if(gsign==0){
        ggoal = "Maintain";
    }
    else if(gsign==1){
        ggoal = "Gain";
    }
    else if(gsign==-1){
        ggoal = "Loss";
    }
    return[gbmi,gmaintainance,gspeed,ggoal];
}

export const firebaseConfig = {
    apiKey: "AIzaSyCUfMZ6aMApSV6mgE_soGXe6IgoMp6UBQ0",
    authDomain: "eats-beta.firebaseapp.com",
    databaseURL: "https://eats-beta-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eats-beta",
    storageBucket: "eats-beta.appspot.com",
    messagingSenderId: "247629503389",
    appId: "1:247629503389:web:8bb6c62b11a295dfc66d74"
  };

