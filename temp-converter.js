/*
Sophia Scholl
*/

function updateFormula() {
    const conversionType = document.getElementById("conversion-type").value;
    const formulaElement =document.getElementById ("formula");

    if (conversionType==='ftoc'){
        formulaElement.textContent= "°C = (°F - 32) × 5/9";
    } else {
        formulaElement.textContent= "°F = (°C × 9/5) + 32";
    }    
}

function assessTemperature(temp, scale) {
    const tempElement = document.getElementById("temp-assessment");
    let assessment= "";
    let color ="" ;

    if (scale === "celsius") {
        if (temp <= 0) {
            assessment = "Very Cold";
            color = "#3498db"; // Blue
        } else if (temp < 10) {
            assessment = "Cold";
            color = "#7fb3d5"; // Light blue
        } else if (temp < 20) {
            assessment = "Cool";
            color = "#a9cce3"; // Very light blue
        } else if (temp < 30) {
            assessment = "Moderate";
            color = "#2ecc71"; // Green
        } else if (temp < 40) {
            assessment = "Warm";
            color = "#f39c12"; // Orange
        } else {
            assessment = "Hot";
            color = "#e74c3c"; // Red
        }
    } else {
        if (temp<=32){
            assessment="Very Cold";
            color="#3498db";
        } else if (temp<49) {
            assessment= "Cold";
            color = "#7fb3d5";
        } else if (temp<67) {
            assessment="Cool";
            color="#a9cce3";
        } else if (temp<85) {
            assessment = "Moderate";
            color ="#2ecc71";
        } else if (temp<103) {
            assessment = "Warm";
            color ="#f39c12";
        } else if (temp>=104) {
            assessment = "Hot";
            color ="#e74c3c";
        } 
    }
    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";
}

function convertTemperature() {
    const temperatureInput= document.getElementById("temperature");
    const temperatureValue= parseFloat(temperatureInput.value);
    const conversionType = document.getElementById("conversion-type").value;
        const resultElement = document.getElementById("conversion-result");
        if (isNaN(temperatureValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        document.getElementById("temp-assessment").textContent = "";
        return;
    }
    let result;
    if(conversionType ==="ftoc"){
        result = (temperatureValue-32)*5/9;
        resultElement.textContent = `${temperatureValue}°F=${result.toFixed(2)}°C`;
        assessTemperature(result,"celsius");
    } else {
        result = (temperatureValue*9/5)+32;
        resultElement.textContent = `${temperatureValue}°C=${result.toFixed(2)}°F`;
        assessTemperature(result,"fahrenheit");
    }
}
function clearConverter() {
    document.getElementById("temperature").value = "";
    document.getElementById("conversion-result").textContent = "";
    document.getElementById("temp-assessment").textContent = "";
}