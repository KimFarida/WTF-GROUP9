// get - process - out
// client insert card
// get card
// get pin

// Function Accept two parameters get name and pin
// verify against alreday established card number and pincode
const CARDPIN = 123
const CARDNUMBER = 123

let cardNumber = parseInt(prompt("Please enter your card Number\n"))
let cardPin = parseInt(prompt("Please enter your card pin"))
function verifyCardDetails(cardNumber, cardPin){
    // PROCESS 
    if (cardNumber == CARDNUMBER && cardPin == CARDPIN){
        console.log("VERIFIED")
    }
    else{
        console.log("UNVERIFIED")
    }
}

// menu diisplay
// get transaction
verifyCardDetails(cardNumber, cardPin)