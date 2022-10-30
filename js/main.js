const search=document.querySelector('.search')
const rowSearch=document.querySelector('.search-inputs')
const categorie=document.querySelector('.categories')
const area=document.querySelector('.area')
const ingredients=document.querySelector('.ingredients')
const contacts=document.querySelector('.contacts')
const sidebar=document.querySelector('.sidebar')
const toggle=document.querySelector('.toggle')
const rowCategory=document.querySelector('.category')
const rowcategoryDetails=document.querySelector('.category-details')
const rowArea=document.querySelector('.Area')
const searchInputs=document.querySelector('.search-inputs')
let nameInput=document.querySelector('.uname')
const emailInput=document.querySelector('.uemail')
const numberInput=document.querySelector('.pnumber')
const ageInput=document.querySelector('.uage')
const passInput=document.querySelector('.upass')
const rePassInput=document.querySelector('.urepass')
const notValidName=document.querySelector('.not-validname')
const notValidemail=document.querySelector('.not-validemail')
const notValidnumber=document.querySelector('.not-validnumber')
const notValidage=document.querySelector('.not-validage')
const notValidpass=document.querySelector('.not-validpass')
const notValidrepass=document.querySelector('.not-validrepass')
const submit=document.querySelector('.submit')
const allInputs=document.querySelectorAll('.contact .input input')
const contactUs=document.querySelector('.contact-us')
const rowIngredients=document.querySelector('.c-ingredients')
const rowAreaRecipe=document.querySelector('.area-filter')
const country=document.querySelector('.country')
const areaRecipeInfo=document.querySelector('.area-recipe-info')
const imgDetails=document.querySelector('.img-details')
const pDescription=document.querySelector('.description')
const recipeArea=document.querySelector('.recipe-area')
const recipeCategory=document.querySelector('.recipe-category')
const details=document.querySelectorAll('.details')
const tags=document.querySelectorAll('.tags li')
const youtubeBtn=document.querySelector('.youtube')
const source=document.querySelector('.source')
const  ingridentsRecipe=document.querySelector('.ingridentsrecipe')
let searchN=document.querySelector('.search-n')
let searchL=document.querySelector('.search-l')
let searchNameInput=document.querySelector('.search-by-name')
let searchLetterInput=document.querySelector('.search-by-letter')
let passInputvalue;
let ingrdeintsData;
let areaDetails;
let areaData;
let data;
let ingridentsDetails;
let AreaRecipeInfo;
let CategoryDetails;
let searchName;
let searchLetter;
// 
$(document).ready(function(){
   $('.loading').fadeOut(500)
})
   

// sidebar
$('.close-bar ,toggle').click(function(){
   let sidebarWidth=$('.sidebar').outerWidth()
   let sidebarOffset=$('.navigation').offset().left
   console.log(sidebarOffset);
   if(sidebarOffset==0){
      $('.navigation').css({
         transform:`translateX(${-sidebarWidth}px)`,
         transition:`all 1s`
      })
      $('.close-bar').addClass('d-none')
      $('.toggle').removeClass('d-none')
   }
})
$('.toggle').click(function(){
   $('.navigation').css({
            transform:`translateX(0px)`,
            transition:`all 1s`
         })
         $('.close-bar').removeClass('d-none')
         $('.toggle').addClass('d-none')
       
})
// search
search.addEventListener('click',function(){
rowCategory.classList.add('d-none');
rowArea.classList.add('d-none');
contactUs.classList.add('d-none');
rowAreaRecipe.classList.add('d-none')
rowIngredients.classList.add('d-none')
ingridentsRecipe.classList.add('d-none')
rowcategoryDetails.classList.add('d-none')
areaRecipeInfo.classList.add('d-none')
searchInputs.classList.remove('d-none')
})


async function getCategories(){
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
   let result=await response.json()
   data=result.categories
   showCategory()
}
getCategories()
function showCategory(){
 let div='';
 for(let i=0;i<data.length;i++){
    div+=`
    <div class="col-md-3 bg-dark shadow ">
             <div class="box " onclick="getCategoryDetails('${data[i].strCategory}')">
                <img src="${data[i].strCategoryThumb}" alt="category" class="w-100 rounded-2">
                 <div class="content ">
                <h4>${data[i].strCategory}</h4>
                <p class="fs-6">${data[i].strCategoryDescription.split(' ').splice(0,15).join(' ')}</p>
                </div> 
             </div>
            </div>
    `
 }
 rowCategory.innerHTML=div
}
categorie.addEventListener('click',function(){
  rowArea.classList.add('d-none')
  contactUs.classList.add('d-none')
  searchInputs.classList.add('d-none')
  rowIngredients.classList.add('d-none')
  rowAreaRecipe.classList.add('d-none')
  areaRecipeInfo.classList.add('d-none')
  ingridentsRecipe.classList.add('d-none')
  rowcategoryDetails.classList.add('d-none')
  searchN.classList.add('d-none')
  searchL.classList.add('d-none')
  rowSearch.classList.add('d-none')
  rowCategory.classList.remove('d-none')
   showCategory()
})
async function getCategoryDetails(cat){
   let respone=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
   let result=await respone.json()
   CategoryDetails=result.meals
   console.log(CategoryDetails);
   showCategoryDetails()
}

function showCategoryDetails(){
   rowCategory.classList.add('d-none')
   rowcategoryDetails.classList.remove('d-none')
   let div=''
   for(i=0;i<CategoryDetails.length;i++){
      div+=`
      <div class="col-lg-3 col-md-6">
      <div class="box" onclick="getAreaRecipeInfo(${CategoryDetails[i].idMeal})">
          <img src="${CategoryDetails[i].strMealThumb}" alt="" class="w-100">
          <p class="text-info">${CategoryDetails[i].strMeal}</p>
      </div>
  </div>
      `
   }
   rowcategoryDetails.innerHTML=div
}
// 
async function getArea(){
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`) 
   let result=await response.json()
   areaData=result.meals;
   showArea()
   console.log(areaData);
}
function showArea(){
   let div=''
for(let i=0;i<20;i++){
 div+=`<div class="col-lg-4 col-md-6  ">
 <div  class="country text-center bg-dark shadow">
 <i class="fa-solid fa-city fa-2x pt-3 text-danger w-100"></i>
     <p class="py-3 fs-3 text-white">${areaData[i].strArea}</p>
 </div>
</div>
`
}
rowArea.innerHTML=div
}
async function areaFilter(country){
   let respone=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
   let result=await respone.json()
   areaDetails=result.meals
   showRecipe()
   console.log(areaDetails);

}
function showRecipe(){
   let div=''
for(let i=0;i<areaDetails.length;i++){
div+=`
 <div class="col-lg-3 col-md-6 "  >
<div class="recipe" onclick="getAreaRecipeInfo(${areaDetails[i].idMeal})" >
    <img src="${areaDetails[i].strMealThumb}" alt="" class="w-100" >
    <p class="bg-info">${areaDetails[i].strMeal}</p>
</div>
</div>
`
}
rowAreaRecipe.innerHTML=div
}
area.addEventListener('click',function(){
   rowCategory.classList.add('d-none')
   contactUs.classList.add('d-none')
   rowIngredients.classList.add('d-none')
   searchInputs.classList.add('d-none')
   // rowAreaRecipe.classList.add('d-none')
   areaRecipeInfo.classList.add('d-none')
   ingridentsRecipe.classList.add('d-none')
   rowcategoryDetails.classList.add('d-none')
   searchN.classList.add('d-none')
   searchL.classList.add('d-none')
   rowSearch.classList.add('d-none')
   rowArea.classList.remove('d-none')
   getArea()
})
rowArea.addEventListener('click',function(e){
   if(e.target.innerHTML.length<=15){
      rowArea.classList.add('d-none')
      rowAreaRecipe.classList.remove('d-none')
      areaFilter(e.target.innerHTML)
      console.log(e.target.innerHTML.length);
      console.log(e.target.innerHTML);
      console.log(typeof(e.target.innerHTML));
   }
})
async function getAreaRecipeInfo(recipeId){
   let respone=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
   let result=await respone.json()
   AreaRecipeInfo=result.meals
   console.log(recipeId);
   
   showAreaRecipeInfo()
}
function showAreaRecipeInfo(){
   rowAreaRecipe.classList.add('d-none')
   rowcategoryDetails.classList.add('d-none')
   ingridentsRecipe.classList.add('d-none')
   searchN.classList.add('d-none')
   searchL.classList.add('d-none')
   rowSearch.classList.add('d-none')
  areaRecipeInfo.classList.remove('d-none')
//   
   imgDetails.setAttribute('src',AreaRecipeInfo[0].strMealThumb)
   pDescription.innerHTML=AreaRecipeInfo[0].strInstructions
   recipeArea.innerHTML=`Area: ${AreaRecipeInfo[0].strArea}`
   recipeCategory.innerHTML=` Category :${AreaRecipeInfo[0].strCategory}`
   tags.innerHTML=AreaRecipeInfo[0].strTags
   source.setAttribute('href',AreaRecipeInfo[0].strSource)
   youtubeBtn.setAttribute('href',AreaRecipeInfo[0].strYoutube)
}

// contacts
function validateName(){
   let nameInputRegex=/^[A-Z][a-z]/
   let nameValue=nameInput.value
   if(nameInputRegex.test(nameValue)){
      nameInput.classList.add('is-valid')
      nameInput.classList.remove('is-invalid')
      notValidName.classList.add('d-none')
      return true
   }else{
      nameInput.classList.remove('is-valid')
      nameInput.classList.add('is-invalid')
      notValidName.classList.remove('d-none')
      return false
   }
}
nameInput.addEventListener('blur',validateName)
function validateEmail(){
let emailInputRegex=/[a-zA-Z]@/
let emailInputValue=emailInput.value
if(emailInputRegex.test(emailInputValue)){
   emailInput.classList.add('is-valid')
   emailInput.classList.remove('is-invalid')
   notValidemail.classList.add('d-none')
   return true
}else{
   emailInput.classList.add('is-invalid')
   emailInput.classList.remove('is-valid')
   notValidemail.classList.remove('d-none')
   return false
}
}
emailInput.addEventListener('blur',validateEmail)
function validateNumber(){
   let numberInputRegex=/^01[0-9]{9}$/
   let numberInputValue=numberInput.value
   if(numberInputRegex.test(numberInputValue)){
      emailInput.classList.add('is-valid')
      emailInput.classList.remove('is-invalid')
      notValidnumber.classList.add('d-none')
      return true
   }else{
      emailInput.classList.add('is-invalid')
      emailInput.classList.remove('is-valid')
      notValidnumber.classList.remove('d-none')
      return false
   }
}
numberInput.addEventListener('blur',validateNumber)
function validateAge(){
   let ageInputRegex=/[0-9]/
   let ageInputValue=ageInput.value
   if(ageInputRegex.test(ageInputValue)){
      ageInput.classList.add('is-valid')
      ageInput.classList.remove('is-invalid')
      notValidage.classList.add('d-none')
      return true
   }else{
      ageInput.classList.add('is-invalid')
      ageInput.classList.remove('is-valid')
      notValidage.classList.remove('d-none')
      return false
   }
}
ageInput.addEventListener('blur',validateAge)
function validatePassword(){
   let passInputRegex=/[0-9]{8,}[a-zA-z]{1,}/
   passInputvalue=passInput.value
   if(passInputRegex.test(passInputvalue)){
      passInput.classList.add('is-valid')
      passInput.classList.remove('is-invalid')
      notValidpass.classList.add('d-none')
      return true
   }else{
      passInput.classList.add('is-invalid')
      passInput.classList.remove('is-valid')
      notValidpass.classList.remove('d-none')
      return false
   }
}
passInput.addEventListener('blur',validatePassword)
function validateRePassword(){
   let rePassInputRegex=/[0-9]{8,}[a-zA-z]{1,}/
   let rePassInputValue=rePassInput.value
   if(rePassInputRegex.test(rePassInputValue)){
      if(rePassInputValue==passInputvalue){
         rePassInput.classList.add('is-valid')
         rePassInput.classList.remove('is-invalid')
         notValidrepass.classList.add('d-none')
         return true
      }
   }else{
      rePassInput.classList.add('is-invalid')
      rePassInput.classList.remove('is-valid')
      notValidrepass.classList.remove('d-none')
      return false
   }
}
rePassInput.addEventListener('blur',validateRePassword)
function removeDisabled(){
   if(validateName() &&validateEmail() &&validateNumber() &&validateAge() &&validatePassword() &&validateRePassword ()){
      submit.classList.remove('disabled')
   }else{
      submit.classList.add('disabled')
   }
}
for (let index = 0; index<allInputs.length; index++) {
   const element = allInputs[index];
   element.addEventListener('keyup',removeDisabled)
}
submit.addEventListener('click',function(){
   nameInput.value=""
   emailInput.value=""
   numberInput.value=""
   ageInput.value=""
   passInput.value=""
   rePassInput.value=""
   submit.classList.add('disabled')
   emailInput.classList.remove('is-valid')
   nameInput.classList.remove('is-valid')
   numberInput.classList.remove('is-valid')
   ageInput.classList.remove('is-valid')
   passInput.classList.remove('is-valid')
   rePassInput.classList.remove('is-valid')
})
contacts.addEventListener('click',function(){
   rowArea.classList.add('d-none')
   rowAreaRecipe.classList.add('d-none')
   rowCategory.classList.add('d-none')
  rowIngredients.classList.add('d-none')
  searchInputs.classList.add('d-none')
  areaRecipeInfo.classList.add('d-none')
  ingridentsRecipe.classList.add('d-none')
  rowcategoryDetails.classList.add('d-none')
  searchN.classList.add('d-none')
  searchL.classList.add('d-none')
  rowSearch.classList.add('d-none')
   contactUs.classList.remove('d-none')
   
})
// ingridents
async function getIngridents(){
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list `)
 let result=await response.json()
 ingrdeintsData=result.meals
showIngrediants()
}
function showIngrediants(){
   let div=''
   for(let i=0;i<20;i++){
      div+=` <div class="col-md-3 " >
      <div class="type bg-dark shadow m-auto text-center"onclick="getMainIngredient('${ingrdeintsData[i].strIngredient}')">
          <i class="fa-solid fa-bowl-food fa-2x text-center text-warning py-1"></i>
          <span class="d-block text-white fs-3" >${ingrdeintsData[i].strIngredient}</span>
          <p class="text-white pb-3">${ingrdeintsData[i].strDescription.split(' ').splice(0,15).join(' ')}</p>
      </div>
  </div>
      `
   }
   rowIngredients.innerHTML=div
}
ingredients.addEventListener('click',function(){
   rowArea.classList.add('d-none')
   rowAreaRecipe.classList.add('d-none')
   rowCategory.classList.add('d-none')
   contactUs.classList.add('d-none')
   areaRecipeInfo.classList.add('d-none')
   ingridentsRecipe.classList.add('d-none')
   rowcategoryDetails.classList.add('d-none')
   searchN.classList.add('d-none')
   searchL.classList.add('d-none')
   rowSearch.classList.add('d-none')
   rowIngredients.classList.remove('d-none')
   getIngridents()
})


async function getMainIngredient(mealName) {
   let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
   meal = await meal.json()
   ingridentsDetails=meal.meals
   console.log(ingridentsDetails);
   showIngridentsDetails()
 }
// getIngridentsDetails('Salmon')
function showIngridentsDetails(){
   rowIngredients.classList.add('d-none')
   ingridentsRecipe.classList.remove('d-none')
let div=''
for(let i=0;i<ingridentsDetails.length;i++){
   div+=`
   <div class="col-lg-3 col-md-6">
                    <div class="box" onclick="getAreaRecipeInfo(${ingridentsDetails[i].idMeal})">
                        <img src="${ingridentsDetails[i].strMealThumb}" alt="" class="w-100">
                        <p class="text-info">${ingridentsDetails[i].strMeal}</p>
                    </div>
                </div>
   `
}
ingridentsRecipe.innerHTML=div
}
// 


async function searchByName(meal){
let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
let result=await response.json()
searchName=result.meals
console.log(searchName);
showSearchName()
}
// searchByName()
function showSearchName(){
   let div=''
   for(let i=0;i<searchName.length;i++){
      div+=`
      <div class="col-lg-3 col-md-6">
            <div class="box" onclick="getAreaRecipeInfo(${searchName[i].idMeal})">
                <img src="${searchName[i].strMealThumb}" alt="" class="w-100">
                <p class="text-info">${searchName[i].strMeal}</p>
            </div>
        </div>
      `
   }
   searchN.innerHTML=div
}
searchNameInput.addEventListener('keyup',function(){
   searchL.classList.add('d-none')
   searchN.classList.remove('d-none')
searchByName(searchNameInput.value)
})
// 

async function searchWithLetter(letter){
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
   let result=await response.json()
   searchLetter=result.meals
   console.log(searchLetter);
   showSearchLetter()
   }
function showSearchLetter(){
   let div=''
   for(let i=0;i<searchLetter.length;i++){
      div+=`
      <div class="col-lg-3 col-md-6">
            <div class="box" onclick="getAreaRecipeInfo(${searchLetter[i].idMeal})">
                <img src="${searchLetter[i].strMealThumb}" alt="" class="w-100">
                <p class="text-info">${searchLetter[i].strMeal}</p>
            </div>
        </div>
      `
   }
 searchL.innerHTML=div
}
searchLetterInput.addEventListener('keyup',function(){
   searchN.classList.add('d-none')
searchL.classList.remove('d-none')
searchWithLetter(searchLetterInput.value)
})
// onclick="getAreaRecipeInfo(${searchLetter[i].idMeal})"