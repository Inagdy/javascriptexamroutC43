const rowData =document.querySelector("#rowData");
const search = document.querySelector("#search");


let getArrayWithData =[];

closeNav();
function openNav() {
  $(".open-close").removeClass("d-block").addClass("d-none");
  $(".close").removeClass("d-none").addClass("d-block");
  $(".slider").animate({ left: 0 }, 500);

  for (let i = 0; i < 6; i++) {
    $(".links ul li").eq(i).animate({ top: 0 }, (i + 5) * 100);
  }
}
function closeNav() {
  $(".open-close").removeClass("d-none").addClass("d-block");
  $(".close").removeClass("d-block").addClass("d-none");
  let width = $(".slider .navBody").outerWidth();
  $(".slider").animate({ left: -width }, 500);
  $(".links ul li").animate({ top: 300 }, 500);
  $(".inner-loading-screen").fadeIn(100);
}


$(".open-close").on("click",function(){
  if ($(".slider").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
})
// scroll  //

$(document).ready(function() {
  $('#contactUs').click(function() {
      $('html, body').animate({
          scrollTop: $('#contact').offset().top
      }, 500); 
  });
});
// fetshing trending  Data //

async function gettrendingmovies(){
  let data = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44");
  data =await data.json();
  function allMoviesinfoData(data) {
      return {
        results: data.results,

      };
    }
    
  const result = allMoviesinfoData(data);
   displayData(result.results)
}

// -------------------------------------------------------------------------------------------------------------------------
// fetching top rated movies
async function getTopRatedMovies(){
  let data = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44");
  data =await data.json();
  function allMoviesinfoData(data) {
      return {
        results: data.results,

      };
    }
    
  const result = allMoviesinfoData(data);
   displayData(result.results)
}
// -------------------------------------------------------------------------------------------------------------------------
// fetching All movies
async function getAllMovies(){
  let data = await fetch("https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44");
  data =await data.json();
  function allMoviesinfoData(data) {
      return {
        results: data.results,

      };
    }
    
  const result = allMoviesinfoData(data);
   displayData(result.results)
}
getAllMovies()

// -------------------------------------------------------------------------------------------------------------------------
// fetching serch movies
async function getSerachMovies(value){
  let data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&api_key=a295c2fda0d44898d34830970fce7edc&language=en-US&include_adult=false`);
  data =await data.json();
  function allMoviesinfoData(data) {
      return {
        results: data.results,

      };
    }
    
  const result = allMoviesinfoData(data);
   displayData(result.results)
}



function displayData(data){
  let cartona =``
  data.forEach(element => {
  getMoviesStarts(element.vote_average)
  let prag =slice_pragraph(element.overview)
    cartona +=`
  <div class="col-lg-4 col-md-6 col-sm-12 ">
    <div class="item overflow-hidden position-relative ">
        <div class="cardImage ">
            <img src=https://image.tmdb.org/t/p/w500/${element.poster_path} class="img-fluid">
        </div>
        <div class="overlay " >
            <h1 class="py-2  title ">${element.name != undefined?element.name:element.title }</h1>    
            <p class=" py-2  description ">${prag}...</p>
            <p class=" py-2  productionDate "><span class="fst-normal">Release Date<span> : ${element.release_date != undefined?element.release_date:element.first_air_date}</span></span></p>
            <h3 class=" py-2 rate starts ">${stars}</h3>
            <h3 class=" py-2 rate position-relative vote ">${(element.vote_average).toFixed(1)}</h3>
        </div>
    </div>
</div>
`
rowData.innerHTML=cartona;
$(".item").mouseenter(moveOnCard);
$('.item').mouseleave(moveOutCard);

  });  
}


function moveOnCard()
    {
      $(this).find($('.overlay')).css({"opacity":"1","visibility":"visible"});
      $(this).find($('.overlay .title')).addClass("slide-down");
      $(this).find($('.overlay .title')).removeClass("move_to_Left");
      $(this).find($('.item img')).addClass("image-animation");
      $(this).find($('.overlay .description')).addClass("pragraph-animation");
      $(this).find($('.overlay .productionDate')).removeClass("move_to_Left");
      $(this).find($('.overlay .rate')).removeClass("move_to_Left");
      
      


  }

function moveOutCard()
    {
      $(this).find($('.overlay')).css({"opacity":"0","visibility":"hidden"});
      $(this).find($('.overlay .title')).removeClass("slide-down");
      $(this).find($('.overlay .title')).addClass("move_to_Left");
      $(this).find($('.item img')).removeClass("image-animation");
      $(this).find($('.overlay .description')).removeClass("pragraph-animation");
      $(this).find($('.overlay .description')).addClass("move_to_Left");
      $(this).find($('.overlay .productionDate')).addClass("move_to_Left");
      $(this).find($('.overlay .rate')).addClass("move_to_Left");

  }
// how many starts view in cardd?
  function getMoviesStarts(x)
  {
      if(x < 1)
      {
          stars = `<i class="fa-solid fa-star text-muted fs-6"></i>`;
      }
      else if(x < 2)
      {
          let term = '';
          stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
      }
      else if(x < 3)
      {
          stars =  `<i class="fa-solid fa-star text-warning fs-6"></i>`;
      }
      else if(x <4)
      {
          let term = '';
          for (let i = 0; i < 1; i++) {
          term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
      }
      else if(x <5)
      {
          let term = '';
          for (let i = 0; i < 2; i++) {
          term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term;
      }
      else if(x <6)
      {
          let term = '';
          for (let i = 0; i < 2; i++) {
          term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
      }
      else if(x < 7)
      {
          let term = '';
          for (let i = 0; i < 3; i++) {
          term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term;
      }
      else if(x < 8)
      {
          let term = '';
          for (let i = 0; i < 3; i++) {
          term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
      }
      else if(x < 9)
      {
          let term = '';
          for (let i = 0; i < 4; i++) {
          term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term;
      }
      else if(x < 10)
      {
          let term = '';
          for (let i = 0; i < 4; i++) {
          term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
      }
      else
      {
          let term = '';
          for (let i = 0; i < 5; i++) {
              term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
          }
          stars = term;
      }

  }

  // slice pragraph to 40 word only 
  function slice_pragraph(x){
    words = x.split(" ");
    let first_40_elements=  words.slice(0,40)
    let str = first_40_elements.join(' ')  
     return str 
  }



// form 
function togglePassword() {
  const passwordField = document.getElementById('password');
  const showPassIcon = document.querySelector('.showPass i');

  if (passwordField.type === 'password') {
      passwordField.type = 'text';
      showPassIcon.classList.remove('fa-eye-slash');
      showPassIcon.classList.add('fa-eye');
  } else {
      passwordField.type = 'password';
      showPassIcon.classList.remove('fa-eye');
      showPassIcon.classList.add('fa-eye-slash');
  }
}

// Form validation
document.getElementById('registrationForm').addEventListener('submit', function(event) {

  const nameInput = document.getElementById('name');
  if (!nameInput.value.trim()) {
      setErrorFor(nameInput, 'Name cannot be blank');
  } else {
      setSuccessFor(nameInput);
  }


  const emailInput = document.getElementById('email');
  if (!isEmail(emailInput.value)) {
      setErrorFor(emailInput, 'Invalid email format');
  } else {
      setSuccessFor(emailInput);
  }

  const phoneInput = document.getElementById('phone');
  if (!phoneInput.value.match(/[0-9]{10}/)) {
      setErrorFor(phoneInput, 'Enter a 10-digit phone number');
  } else {
      setSuccessFor(phoneInput);
  }

  const ageInput = document.getElementById('age');
  if (isNaN(ageInput.value) || ageInput.value < 18 || ageInput.value > 120) {
      setErrorFor(ageInput, 'Enter a valid age (between 18 and 120)');
  } else {
      setSuccessFor(ageInput);
  }


  const passwordInput = document.getElementById('password');
  if (passwordInput.value.length < 8) {
      setErrorFor(passwordInput, 'Password must be at least 8 characters long');
  } else {
      setSuccessFor(passwordInput);
  }


  const repasswordInput = document.getElementById('repassword');
  if (repasswordInput.value !== passwordInput.value) {
      setErrorFor(repasswordInput, 'Passwords do not match');
  } else {
      setSuccessFor(repasswordInput);
  }

  const errors = document.querySelectorAll('.error');
  if (errors.length > 0) {
      event.preventDefault();
  }
});

function setErrorFor(input, message) {
  const formGroup = input.parentElement;
  const errorSpan = formGroup.querySelector('.error');
  errorSpan.innerText = message;
  formGroup.classList.add('has-error');
}

function setSuccessFor(input) {
  const formGroup = input.parentElement;
  const errorSpan = formGroup.querySelector('.error');
  errorSpan.innerText = '';
  formGroup.classList.remove('has-error');
}

function isEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}