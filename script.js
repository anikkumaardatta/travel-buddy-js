let carObject = {
    vehicle : "Car",
    imageUrl : "https://images.wallpaperscraft.com/image/single/land_rover_range_rover_sport_white_jeep_95237_1280x720.jpg",
    farePerKilo : 20,
    capacity : 4,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro doloribus temporib mollitia expedita aspernatur ab eaque sunt sed quaerat veritatis?"
}
let bikeObject = {
    vehicle : "Bike",
    imageUrl : "https://images.wallpaperscraft.com/image/single/kawasaki-ninja_motorcycle_sports_74170_1280x720.jpg",
    farePerKilo : 10,
    capacity : 2,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro doloribus temporib mollitia expedita aspernatur ab eaque sunt sed quaerat veritatis?"
}
let busObject = {
    vehicle : "Bus",
    imageUrl : "https://coolwallpapers.me/th700/5749757-bus-wallpapers.jpg",
    farePerKilo : 60,
    capacity : 50,
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro doloribus temporib mollitia expedita aspernatur ab eaque sunt sed quaerat veritatis?"
}
const servicesArray = [carObject, bikeObject, busObject];

const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search_input');
const searchInputValue = searchInput.value;

searchBtn.addEventListener('click', ()=>{

    const searchInput = document.getElementById('search_input');
    const searchInputValue = searchInput.value;

    for(let i = 0; i<servicesArray.length; i++){
        const element = servicesArray[i];
        if(searchInputValue.toLowerCase() == element.vehicle.toLowerCase()){
            document.getElementById('main_section').innerHTML= "";
            getObject(element);
            return 
        }
    }

    alert("Your search did not match any documents.")

})

function getObject(obj){
    const mainSection = document.getElementById('main_section');
    const div = document.createElement("div");
    const stringifyed = JSON.stringify(obj);
    div.innerHTML = `
    <div class="card mt-5 mx-auto " style="max-width: 900px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src=${obj.imageUrl} class="img-fluid rounded-start card_image" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title text-danger">Transport vehicle : ${obj.vehicle}</h5>
                    <p class="card-text">${obj.description}</p>
                    <p class="card-text">
                    <small class="d-block text-muted">Fare per kilo : ${obj.farePerKilo}</small>
                    <small class="d-block text-muted"> Capacity : ${obj.capacity}</small>
                    </p>
                    <button type="button" class="btn btn-danger px-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='handleBooking(${stringifyed})'>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
    mainSection.appendChild(div);
}
function handleBooking(obj){
    const modalBody = document.getElementById('modal_body');
    const stringifyed = JSON.stringify(obj);
    modalBody.innerHTML = `
    <div class="card mx-auto" style="width: 100%;">
        <img src=${obj.imageUrl} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Transport vehicle : ${obj.vehicle}</h5>
            <div class="mb-3">
                <small class=text-muted">Fare per kilo : ${obj.farePerKilo};</small>
                <small class=text-muted"> Capacity : ${obj.capacity};</small>
            </div>
            <div class="d-flex flex-column mb-3">
                <p class="fw-semibold border-bottom">Fare: <small class="" id="fare"></small><small> Tk.</small></p>
                <p class="fw-semibold border-bottom">Tax: <small class="" id="tax"></small><small> Tk.</small></p>
                <p class="fw-semibold border-bottom">Cost: <small class="" id="cost"></small><small> Tk.</small></p>
                <p id="total_cost_element" class="fw-semibold border-bottom d-none">Total cost: <small class="fs-5 fw-semibold text-danger" id="total_cost"></small><small> Tk.</small></p>
            </div>
            <div class="d-flex mb-3">
                <input class="form-control me-2" type="number" id="distance_input" placeholder="Travel distance :">
                <input class="form-control me-2" type="number" id="quantity_input" placeholder="Quantity :">
                <button class="btn btn-outline-danger" onclick='calculateCost(${stringifyed})' type="submit">Submit</button>
            </div>
            <div id="">
                <h2 id="discount_massage" class=" text-center d-none">Wow! You got <span id="discount_parsentage" class="text-danger fs-1"></span> discount.</h2>
                <small class="d-flex mb-3 fw-semibold">Use cupon (g20) get up to 20% discount :</small>
                <div id="cupon_input_section" class="d-flex mb-3">
                    <input class="form-control me-2" type="text" id="cupon_input" placeholder="Use cupon (g20) :">
                    <button id="cupon_button" class="form-control btn btn-warning" onclick='getDiscount()' type="submit">Get Discount</button>
                </div>
            </div>
            
        </div>
    </div>
    `
}
function calculateCost(obj){
    const fareElementText = document.getElementById('fare');
    const fare = obj.farePerKilo;
    
    const taxElementText = document.getElementById('tax');

    const distance = document.getElementById('distance_input');
    const distanceValueString = distance.value;
    const distanceValue = parseInt(distanceValueString);


    const quantity = document.getElementById('quantity_input');
    const quantityValueString = quantity.value;
    const quantityValue = parseInt(quantityValueString);

    const calculateDistanceFare = fare * distanceValue;
    const calculateTotalFare = calculateDistanceFare * quantityValue;

    const totalTax = (calculateTotalFare * 2.5) / 100;

    const costField = document.getElementById('cost');

    fareElementText.innerHTML = calculateTotalFare;
    taxElementText.innerText = totalTax;
    
    const cost = calculateTotalFare + totalTax;
    console.log(1, cost);
    costField.innerText = calculateTotalFare + totalTax;
}
function getDiscount(){
    const discountMassage = document.getElementById('discount_massage');
    const discountParsentage = document.getElementById('discount_parsentage');
    const cuponInputSec = document.getElementById('cupon_input_section');

    const costField = document.getElementById('cost');
    const costElementString = costField.innerText;
    const costElementValue = parseFloat(costElementString);
    
    const totalCostElement = document.getElementById('total_cost_element');

    const cuponInput = document.getElementById('cupon_input');
    const cuponInputValue = cuponInput.value;

    const totalCostField = document.getElementById('total_cost');

    if(cuponInputValue === "g20"){
        cuponInputSec.classList.add("d-none")
        discountMassage.classList.remove('d-none');
        totalCostElement.classList.remove('d-none');
        costField.classList.add("text-decoration-line-through")

        const randomNumber = Math.floor((Math.random() * 15) + 5);
        const discountAmount =  (costElementValue * randomNumber) / 100;
        const discountPrice = costElementValue - discountAmount;
        totalCostField.innerText = discountPrice;
        
        discountParsentage.innerText = randomNumber + "%";



    }
}

function displayAllServices(arr){
    for(let i = 0; i<arr.length; i++){
        const element = arr[i];
        getObject(element);
    }

}

displayAllServices(servicesArray);




// 1:36:00