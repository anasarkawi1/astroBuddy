/**
 * NASA API Requests
 * By Anas Arkawi, 2022
 */


// Import modules
const axios = require('axios');


// API key usage example
// https://api.nasa.gov/planetary/apod?api_key=0LwCpSFODdb9opazF3jqJny2lkWRcE7eVYNwpoI2

// Configure API communication
let baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`;


// API Functions

// Retrieve todays picture of the day
async function todaysPic(callback) {
    let res = await axios.get(baseUrl);
    callback(res.data);
}

// Check if the date is in the correct format
// TODO: Implement date check as well
function checkDate(date) {
    let dateSplit = date.split('-');
    // Check if the string is in the expected length
    if (dateSplit.length != 3 || dateSplit[0].length != 4 || dateSplit[1].length != 2 || dateSplit[2].length != 2) {
        return false;
    } else {
        // Check if the string only contains numbers, if not, return false.
        for(let i = 0; i < dateSplit.length; i++) {
            let typeCheck = /^\d+$/.test(dateSplit[i]);
            if (!typeCheck) {
                return false;
            }
        }
        return true;
    }
}

// Retrieve a specfic date's picture of the day
// TODO: Implement error handling here
async function getDate(date, callback) {
    if (!checkDate(date)) { callback(false); return false; } // Check if date is in the correct format

    // Execute API request
    let url = `${baseUrl}&date=${date}`;
    try {
        let res = await axios.get(url);
        callback(res.data);
    }
    catch {
        callback(false);
    }
}

module.exports = {
    today: todaysPic,
    date: getDate
}