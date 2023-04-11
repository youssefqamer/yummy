let dataRow=document.getElementById('dataRow')
let searchContainer=document.getElementById('searchContainer')
let submitBtn;
$(document).ready(()=>{
  searchByName('').then(()=>{
    $('.loading').fadeOut(300)
    $('body').css('overflow',"auto")
  })
})
function openNav(){
  $('.side-nav-menu').css({
    transform:`translateX(0px)`,
    transition:'1s',
  })
  $('.side-nav-menu .open-close-icon').addClass('fa-xmark');
  $('.side-nav-menu .open-close-icon').removeClass('fa-bars');
  for (let i = 0;i<5; i++) {
    $('ul li a').eq(i).animate({
      top:'0px',
    },(i+6)*100);
    
  }
}
function closeNav(){
  let sidebarWidth=  $('.nav-tab').outerWidth();

  $('.side-nav-menu').css({
    transform:`translateX(${-sidebarWidth }px)`,
    transition:'1s',
  })
  $('.side-nav-menu .open-close-icon').removeClass('fa-xmark');
  $('.side-nav-menu .open-close-icon').addClass('fa-bars');
  $('ul li a').animate({top:500},500);
}
closeNav()
$('.side-nav-menu i.open-close-icon').click(function(){
  let sidebarOffset=$('.nav-tab').offset().left;
  if (sidebarOffset == 0) {
 closeNav();
  }else{
openNav();
  }
})
// start search by name
async function searchByName(meal){
  closeNav()
  $('.inner-loading').fadeIn(300)
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
  let data=await response.json();
 data.meals? displayMeal(data.meals):displayMeal([])
 $('.inner-loading').fadeOut(300)

}
async function searchByFirstLetter(letter){
  closeNav()
  $('.inner-loading').fadeIn(300)
  letter == "" ?letter="a":"";
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  let data=await response.json();
 data.meals? displayMeal(data.meals):displayMeal([])
 $('.inner-loading').fadeOut(300)

}
function displayMeal(array){
  let result='';
  for(let i=0;i< array.length; i++){
    result+=`
    <div class="col-md-3 ">
    <div onclick=' getMealDetails("${array[i].idMeal}")' class="meal position-relative  overflow-hidden cursor-pointer">
        <img src="${array[i].strMealThumb}" alt="" class="w-100 rounded-2">
        <div class="layer  position-absolute d-flex justify-content-center align-items-center rounded-2">
            <h3>${array[i].strMeal}</h3>
        </div>
    </div>
</div>
    `
  }
  dataRow.innerHTML=result
}

// start category

async function getCategory (){
  $('.inner-loading').fadeIn(300)
  searchContainer.innerHTML=''
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let data=await response.json()
  displayCategory(data.categories)
  $('.inner-loading').fadeOut(300)
}
function displayCategory(array){
  let result='';
  for(let i=0;i< array.length; i++){
    result+=`
    <div class="col-md-3 ">
    <div onclick="getCategoryMeals('${array[i].strCategory}')"  class="meal position-relative  overflow-hidden cursor-pointer">
        <img src="${array[i].strCategoryThumb}" alt="" class="w-100 rounded-2">
        <div class="layer  position-absolute text-center rounded-2">
            <h3>${array[i].strCategory}</h3>
            <P>${array[i].strCategoryDescription.split(' ').splice(0,20).join(' ')}</p>
        </div>
    </div>
</div>
    `
  }
  dataRow.innerHTML=result
}
 async function getCategoryMeals(category){
  $('.inner-loading').fadeIn(300)
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let data=await response.json()
  displayMeal(data.meals)
  $('.inner-loading').fadeOut(300)

}

// start Area
async function getArea(){
  $('.inner-loading').fadeIn(300)
  searchContainer.innerHTML=''
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let data=await response.json();
  displayArea(data.meals)
  $('.inner-loading').fadeOut(300)
}
function displayArea(array){
  let result='';
  for(let i=0;i< array.length; i++){
    result+=`
    <div class="col-md-3 ">
    <div onclick="getAreaMeals('${array[i].strArea}')"class="meal shadow text-center rounded-2 cursor-pointer">
        <i class="fa-solid fa-globe area-icon py-3 fs-2"></i>
            <h3 class='text-white py-2'>${array[i].strArea}</h3>
        </div>
</div>
    `
  }
  dataRow.innerHTML=result
}
async function getAreaMeals(country){
  $('.inner-loading').fadeIn(300)
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
  let data=await response.json();
  displayMeal(data.meals)
  $('.inner-loading').fadeOut(300)
}
// start ingridents
async function getIngridents(){
  $('.inner-loading').fadeIn(300)
  searchContainer.innerHTML=''
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let data=await response.json();
  displayIngridents(data.meals.slice(0,20))
  $('.inner-loading').fadeOut(300)
}
function displayIngridents(array){
  let result='';
  for(let i=0;i< array.length; i++){
    result+=`
    <div class="col-md-3 ">
    <div onclick='getIngridentsMeals("${array[i].strIngredient}")' class="meal shadow text-center  rounded-2 cursor-pointer">
    <i class="fa-solid fa-bowl-food py-1 fs-2  text-warning"></i>
            <h3 class='text-white py-2'>${array[i].strIngredient}</h3>
            <p class='text-white pb-3 ingridentHeight fs-6' >${array[i].strDescription.split(' ').splice(0,20).join(' ')}</p>
        </div>
</div>
    `
  }
  dataRow.innerHTML=result
}
async function getIngridentsMeals(ingrident){
  $('.inner-loading').fadeIn(300)
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrident}`);
  let data=await response.json();
  displayMeal(data.meals)
  $('.inner-loading').fadeOut(300)
}
// 
async function getMealDetails(mealId){
  closeNav()
  $('.inner-loading').fadeIn(300)
  let response=await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  let data=await response.json()
  displayMealsDetails(data.meals[0])
  $('.inner-loading').fadeOut(300)
}
function displayMealsDetails(meal){
  let ingridents=''
  for(let i=1;i<=20;i++){
    if(meal[`strIngredient${i}`]){
    ingridents+=  `<li class="alert-info alert p-1 m-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }
  let tags=meal.strTags?.split(',')
  if(!tags) tags=[]
  let strTag=''
  for(let i=0;i<tags.length;i++){
strTag+=`<li class="alert-danger alert p-1 m-2">${tags[i]}</li>`
  }

  let result=`
  <div class="col-md-4">
  <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2">
  <h3 class="text-white  alert text-center mt-2">${meal.strMeal}</h3>
 </div>
 <div class="col-md-8">
  <h2 class="text-white">Instructions</h2>
  <p class="py-2 mb-2 text-white">${meal.strInstructions}</p>
  <h4 class="text-white fs-5"><span >Area :</span>${meal.strArea}</h4>
  <h4 class="text-white fs-5"><span >Category :</span>${meal.strCategory}</h4>
  <h4 class="text-white">Recipes :</h4>
  <ul class="list-unstyled text-white d-flex flex-wrap ">
    ${ingridents}
  </ul>
  <h4 class="text-white">Tags :</h4>
  <ul class="list-unstyled text-white d-flex flex-wrap ">
      ${strTag}
  </ul>
  <a href="${meal.strSource}" target='-blank' class="btn btn-success mx-1">source</a>
  <a href="${meal.strYoutube}" target='-blank' class="btn btn-danger mx-1">Youtube</a>
 </div>
  `
  dataRow.innerHTML=result
}
// start search
function showSearchInputs(){
  searchContainer.innerHTML=`
  <div class="row gx-2 gy-0">
            <div class="col-md-6 mb-5">
                <input  onkeyup="searchByName(this.value)" type="text" class="text-white bg-transparent form-control" placeholder="Search By Name">
            </div>
            <div class="col-md-6 mb-5">
                <input onkeyup="searchByFirstLetter(this.value)" maxlength='1' type="text" class="text-white bg-transparent form-control" placeholder="Search By First letter">
            </div>
        </div>
  `
  dataRow.innerHTML=""
}
// start contacts
let nameInputTouched=false;
let emailInputTouched=false;
let phoneInputTouched=false;
let ageInputTouched=false;
let passwordInputTouched=false;
let repasswordInputTouched=false;
function showContacts() {
  searchContainer.innerHTML=""
  dataRow.innerHTML=`
  <div class="contacts  mt-5 d-flex justify-content-center align-items-center">
  <div class="container w-75 mt-5 pt-5 text-center">
      <div class="row g-4 ">
          <div class="col-md-6 ">
          <div class="input ">
           <input onkeyup="inputsValidation()"  id="nameInput" type="text" placeholder="enter your name" name="name" class="text-white form-control w-100  m-auto uname bg-transparent"> 
          </div>
          <div id="nameAlert" class="alert alert-danger my-1 w-100 d-none">
          two letters at least ,number and special character are not allowed
          </div>
          </div>
          <div class="col-md-6">
              <div class="input ">
                  <input onkeyup='inputsValidation()' id="emailInput" type="email" placeholder="enter your email" name="email" class="text-white form-control w-100  m-auto uemail  bg-transparent">
              </div>
              <div id="emailAlert" class="alert alert-danger my-1 w-100 d-none">
                email not valid *example yyy@gmail.com 
              </div>
          </div>
          
          <div class="col-md-6">
              <div class="input">
                  <input onkeyup='inputsValidation()' id="phoneInput"  type="number" placeholder="enter your phone number" name="phone number" class="text-white form-control w-100  m-auto pnumber  bg-transparent">
              </div>
              <div id="phoneAlert" class="alert alert-danger my-1 w-100 d-none">
                  phone not valid 
                </div>
          </div>
          <div class="col-md-6">
              <div class="input ">
                  <input onkeyup='inputsValidation()' id="ageInput"  type="number" placeholder="Enter your Age" name="Age" class="text-white form-control w-100  m-auto  uage bg-transparent">
              </div>
              <div id="ageAlert" class="alert alert-danger my-1 w-100 d-none">
                  age not valid 
                </div>
          </div>
          <div class="col-md-6">
              <div class="input ">
                  <input onkeyup='inputsValidation()' id="passwordInput" type="password" placeholder="enter your password" name="password" class="text-white form-control w-100  m-auto upass bg-transparent">
              </div>
              <div id="passwordAlert" class="alert alert-danger my-1 w-100 d-none">
                  Enter valid password *Minimum eight charachters
                </div>
      </div>
          <div class="col-md-6">
              <div class="input ">
                  <input onkeyup='inputsValidation()' id="repasswordInput" type="password" placeholder="Enter repassword" name="repassword" class="text-white form-control w-100  m-auto urepass bg-transparent">
              </div>
              <div id="repasswordAlert" class="alert alert-danger my-1 w-100 d-none">
                  Enter valid repassword 
                </div>
          </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger m-auto mt-3 bg-transparent">Submit</button>
      </div>
</div>
</div>
`
  submitBtn=document.getElementById("submitBtn")
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})
  document.getElementById('emailInput').addEventListener('focus',()=>{
    emailInputTouched=true
  })
  document.getElementById('phoneInput').addEventListener('focus',()=>{
    phoneInputTouched=true
  })
  document.getElementById('ageInput').addEventListener('focus',()=>{
    ageInputTouched=true
  })
  document.getElementById('passwordInput').addEventListener('focus',()=>{
    passwordInputTouched=true
  })
  document.getElementById('repasswordInput').addEventListener('focus',()=>{
    repasswordInputTouched=true
  })
}

function inputsValidation() {
 if(nameInputTouched){
  if(nameValidation()){
    document.getElementById('nameAlert').classList.add('d-none')
    document.getElementById('nameInput').classList.remove('is-invalid')
    document.getElementById('nameInput').classList.add('is-valid')
  }
  else{
    document.getElementById('nameAlert').classList.remove('d-none')
    document.getElementById('nameInput').classList.remove('is-valid')
    document.getElementById('nameInput').classList.add('is-invalid')

  }
 }
  if(emailInputTouched){
    if(emailValidation()){
      document.getElementById('emailAlert').classList.add('d-none')
      document.getElementById('emailInput').classList.remove('is-invalid')
      document.getElementById('emailInput').classList.add('is-valid')
    }
    else{
      document.getElementById('emailAlert').classList.remove('d-none')
      document.getElementById('emailInput').classList.remove('is-valid')
      document.getElementById('emailInput').classList.add('is-invalid')
    }
  }
 
  if(phoneInputTouched){
    if(phoneValidation()){
      document.getElementById('phoneAlert').classList.add('d-none')
      document.getElementById('phoneInput').classList.remove('is-invalid')
      document.getElementById('phoneInput').classList.add('is-valid')
    }
    else{
      document.getElementById('phoneAlert').classList.remove('d-none')
      document.getElementById('phoneInput').classList.remove('is-valid')
      document.getElementById('phoneInput').classList.add('is-invalid')
    }
  }
  if(ageInputTouched){
    if(ageValidation()){
      document.getElementById('ageAlert').classList.add('d-none')
      document.getElementById('ageInput').classList.remove('is-invalid')
      document.getElementById('ageInput').classList.add('is-valid')
    }
    else{
      document.getElementById('ageAlert').classList.remove('d-none')
      document.getElementById('ageInput').classList.remove('is-valid')
      document.getElementById('ageInput').classList.add('is-invalid')
    }
  }
  if(passwordInputTouched){
    if(passwordValidation()){
      document.getElementById('passwordAlert').classList.add('d-none')
      document.getElementById('passwordInput').classList.remove('is-invalid')
      document.getElementById('passwordInput').classList.add('is-valid')
    }
    else{
      document.getElementById('passwordAlert').classList.remove('d-none')
      document.getElementById('passwordInput').classList.remove('is-valid')
      document.getElementById('passwordInput').classList.add('is-invalid')
    }
  }
  if(repasswordInputTouched){
      if(repasswordValidation()){
        document.getElementById('repasswordAlert').classList.add('d-none')
        document.getElementById('repasswordInput').classList.remove('is-invalid')
      document.getElementById('repasswordInput').classList.add('is-valid')
      }
      else{
        document.getElementById('repasswordAlert').classList.remove('d-none')
        document.getElementById('repasswordInput').classList.remove('is-valid')
        document.getElementById('repasswordInput').classList.add('is-invalid')
      }
    }


 if(nameValidation()&&emailValidation()&&phoneValidation()&&ageValidation()&&
 passwordValidation()&&repasswordValidation()){
  submitBtn.removeAttribute('disabled')
 }else{
  submitBtn.setAttribute("disabled",true)
 }
}
function nameValidation() {
  return (/^[a-zA-Z ]{2,10}$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  .test(document.getElementById("emailInput").value))
}
function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
  return (/^(20?[1-9]|[1-9][0-9]|[1][1-9][1-9]|80)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
  return (/^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,9}$/.test(document.getElementById("passwordInput").value))
}
function repasswordValidation() {
  return document.getElementById("repasswordInput").value==document.getElementById("passwordInput").value
}
