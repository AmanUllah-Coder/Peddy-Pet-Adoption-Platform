const categoriesAll = async() =>{
    const res =await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const peta = await res.json();
    displayBtn(peta.categories)
  }
  const displayBtn = (pets) => {
    pets.forEach(pet => {
      const btnSection = document.getElementById('buttonofanimal')
      const newbtn = document.createElement('div')
      newbtn.innerHTML =`
      <button id="btn-${pet?.category || 'defaultCategory'}" onclick="categoryName('${pet?.category || 'defaultCategory'}')" 
      class="btn  category-btn">
      
      <img class="w-8" src="${pet.category_icon}" alt="">
      ${pet.category}
  </button>
      `
      btnSection.append(newbtn)
    
    });
  }
  
  const categoryName = (categoryname) => {
    document.getElementById('loading').classList.remove('hidden')
    document.getElementById('card-container').classList.add('hidden')
    document.getElementById('aa').classList.add('hidden')
      removeBtn()
      const activeBtn = document.getElementById(`btn-${categoryname}`); 
      activeBtn.classList.add('active')
    setTimeout(() => {
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryname}`)
      .then((res) => res.json())
      .then((peta) => displayAllCard(peta.data))
      .catch((error) => console.log(error)) 
      document.getElementById('loading').classList.add('hidden')
      document.getElementById('card-container').classList.remove('hidden')
      document.getElementById('aa').classList.remove('hidden')
   
    },1500);
  }

  const removeBtn =() =>{
    const btns = document.getElementsByClassName('category-btn')
    for(let btn of btns){
    btn.classList.remove('active')
     }
  }
  
  const showPets = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const peta = await response.json();
    displayAllCard(peta.pets);  
  }
  
  const displayAllCard = (cards) => {
  const cardCcontainer = document.getElementById('card-container')
  cardCcontainer.innerHTML =''
  if(cards.length == 0){
    cardCcontainer.classList.remove('grid')
    cardCcontainer.innerHTML =`
    <div class=" min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img src="images/error.webp" alt="">
    <h2 class="font-bold text-xl text-center">No Information Available</h2>
    <p class="text-[gray] w-2/3 text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    </div>
    `
  }else{
    cardCcontainer.classList.add('grid')
  }
    cards.forEach((card) => {
      const {breed,petId,category,date_of_birth,price,image,gender,vaccinated_status,pet_name,}= card;
         const div = document.createElement("div")    
         div.innerHTML =`
         <div class="card  bg-base-100  border border-[#0E7A8126] ">
           <figure class="lg:px-6 px-4 pt-2 lg:pt-8">
             <img class="w-full rounded-lg" src=${image}  />
           </figure>
           <div class="p-2 lg:p-5 space-y-4 lg:space-y-5">
             <h3 class="text-[20px] font-bold text-[#131313]">${pet_name?pet_name: 'N/A'}      
             <p class="text-start text-base font-normal text-black">
               <i class="fa-solid fa-cubes"></i> Breed:${breed}
             </p>
             <p class="text-start text-base font-normal text-black">
               <i class="fa-solid fa-calendar-days"></i> Birth: ${date_of_birth?date_of_birth: 'N/A'}
             </p>
             <p class="text-start text-base font-normal text-black">
               <i class="fa-solid fa-venus"></i> Gender: ${gender?gender: "N/A"}
             </p>
             <p class="text-start text-base font-normal text-black">
               <i class="fa-solid fa-dollar-sign"></i> Price: ${price?price: "N/A"}
             </p>
             <hr class="w-full" />
             <div class="card-actions grid grid-cols-3 gap-2 mt-2">
               <button onclick="createNewPart('${image}')" class="btn bg-white border-[#0E7A8126] outline-1">
                 <i class="fa-regular fa-thumbs-up text-2xl "></i>
               </button>
               <button onclick="adoptCongratulations('${petId}')" class="btn border-[#0E7A8126] btn-adopt bg-white text-[18px] font-bold text-[#0E7A81] p-1">Adopt</button>
               <button onclick="createModal('${petId}')" class="btn border-[#0E7A8126] bg-white text-[18px] font-bold text-[#0E7A81] p-1">Details</button>
               <div></div>
             </div>
           </div>
         </div>
         `
         cardCcontainer.appendChild(div)
    });
  }
  
  const createNewPart = (imagee) => {
    const createNEWSection = document.getElementById('createNEWSection')
    const div = document.createElement('div')
    div.innerHTML=`
    <img class="rounded-xl shadow-md p-2" src="${imagee}" alt="" />
    ` 
    createNEWSection.append(div)
  }
  
  const createModal = async(petId)=>{
    console.log(petId)
        const res = await fetch (`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        const data = await res.json()
        MODAL(data.petData)
  }
  // create a modal
  const MODAL = (details) =>{
    const {breed,petId,category,date_of_birth,price,image,gender,pet_details,vaccinated_status,pet_name,}= details;
    const modalContainer = document.getElementById('modal-Container')
    modalContainer.innerHTML=`
    <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
     <figure class="p-2 ">
             <img class="w-full rounded-lg" src=${image}  />
           </figure>
        <div class="p-2 ">
        <h3 class="text-[22px] font-bold text-[#131313]">${pet_name?pet_name: 'N/A'}      
        <div class="flex space-x-9">
            <div>
                  <p class="text-start text-base font-normal text-[#131313B3]">
                    <i class="fa-solid fa-cubes mr-2"></i> Breed:${breed}
                  </p>
                 
                  <p class="text-start text-base font-normal text-[#131313B3]">
                    <i class="fa-solid fa-venus mr-2"></i> Gender: ${gender?gender: "N/A"}
                  </p>
                  <p class="text-start text-base font-normal text-[#131313B3]">
                    <i class="fa-solid fa-venus mr-2"></i> Gender: ${vaccinated_status?vaccinated_status: "N/A"}
                  </p>
                 
            </div>
          <div>
              <p class="text-start text-base font-normal text-[#131313B3]">
                    <i class="fa-solid fa-calendar-days mr-2"></i> Birth: ${date_of_birth?date_of_birth: 'N/A'}
              </p>
               <p class="text-start text-base font-normal text-[#131313B3]">
                    <i class="fa-solid fa-dollar-sign mr-2"></i> Price: ${price?price: "N/A"}
              </p>
          </div>
        </div>
        <hr/>
        <h1 class="font-bold mt-3">Details Information</h1>
        <p>${pet_details}</p>
      <div id="modalBtn" class="text-center  mt-2 mx-auto ">
        <form method="dialog">
          <div><button class="text-white rounded-lg w-full bg-btnclr text-2xl py-3">Close</button></div>
        </form>
      </div>
    </div>
    </dialog>
    `
  my_modal_1.showModal()
  }
  // create congretuletions Button
  const adoptCongratulations = (petId) =>{
    my_modal_2.showModal()
    const countContainer = document.getElementById('count');
    let count = 3;
    const intervalId = setInterval(() => {
      count--;
      countContainer.innerHTML = count;
      if( count <= 0){
        clearInterval(intervalId);
        my_modal_2.close()  
      }
    }, 1000);
    
  }
  const sortPrice =async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displaySort(data.pets)
    pets = data.pets 
  }
  const displaySort = (pets) => {
    console.log(pets)
    const sortedPets = pets.sort((a,b)=> b.price - a.price);
    console.log(sortedPets)
    displayAllCard(sortedPets)
  }
  showPets()
  categoriesAll()
  