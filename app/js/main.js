let sliderOne = document.querySelector(".value-slider-1");
let labelOne = document.querySelector(".label-slider-1");
let sliderAmount = 20;

let socket = io.connect( {secure: true})


let mySocket = socket;
socket.on("new-connection", (socket) => {
    console.log("iK ben conntectreed")
    console.log(socket)
    
    console.dir("mijn id= " +  mySocket.id);

})
socket.emit("slider-count", sliderAmount);


// sliderOne.addEventListener("input", () => {
//     console.log(sliderOne);
//     labelOne.innerHTML = sliderOne.value;
//     socket.emit("send-slider", sliderOne.value)

    
// }, false)

let parametersDiv = document.querySelector(".parameters")
let allSliders = []
let sliderValues = {}
for (let i = 0; i < sliderAmount; i++) {
    let slider = document.createElement("input")
    let label =  document.createElement("label")
    let parameterWrapper = document.createElement("div")
    parameterWrapper.classList.add(".parameter-wrapper")
    slider.id = "slider" + i;
    slider.classList.add("slider")
    slider.type = 'range';
    slider.min = 0;
    slider.max = 1;
    slider.value = 0.5;
    slider.step = 0.01;
    label.id = "label" + i;
    label.innerHTML = "0.5";
    parameterWrapper.appendChild(label)
    parameterWrapper.appendChild(slider)
    parametersDiv.appendChild(parameterWrapper)
    allSliders.push(slider)
    slider.addEventListener("input", () => {
        let keyName = "slider" + i;
        sliderValues[keyName] = slider.value;
        label.innerHTML = slider.value;
        // console.log("sliderID "+ i + " value: " + slider.value)
        console.log(sliderValues)
        socket.emit("send-slider", sliderValues)

    }, false)
}
console.log(allSliders)
let sliderIndex = 0;


// function onInput(sliderId) {
//     alert(sliderId)
//     let slider = document.querySelector("#slider" + sliderId)
//     console.log(slider.value)
//     console.log("slider" + sliderId + " - value: " + slider.value)
//     // labelOne.innerHTML = sliderOne.value;
//     // socket.emit("send-slider", sliderOne.value)

// }

