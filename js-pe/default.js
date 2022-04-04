const valideer_btn = document.querySelector("#knopValideer")

function validateForm() {
    let errors = [];
    let melding;
    

    //inputvelden controleren
    checkEmptyField('voornaam', 'voornaam');
    checkEmptyField('naam', 'naam');
    checkEmptyField('gebruikersnaam', 'gebruikersnaam');
    checkEmptyField('adres', 'adres');
    checkEmptyField('land', 'land');
    checkEmptyField('provincie', 'provincie');

    function checkEmptyField(veld, melding) {
        if (document.getElementById(veld).value.length == 0)
            errors.push(`Het veld ${melding} is vereist.`);
    }
    
    //email controleren
    email = document.querySelector("#email").value;

    //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    function validateEmail(emailadres){
         let eersteKarakter = emailadres.charAt(0);
         let domein = emailadres.substring(emailadres.indexOf("@") + 1, emailadres.length);
         if (eersteKarakter == "." || eersteKarakter == "-" || emailadres.length < 1){
            return false;
         } else if (domein.charAt(0).match(/[a-z]/) || domein.charAt(0).match(/[1-9]/)){
             return true;
         }else{
             return false;
         }
    }
    if (!validateEmail(email)){
        errors.push("E-mailadres is niet correct.");
    }

    //wachtwoorden controleren
    let paswoord1 = document.getElementById('wachtwoord').value;
    let paswoord2 = document.getElementById('herhaalwachtwoord').value;

    if (paswoord1.length < 8 || paswoord2.length < 8) {
        errors.push('De wachtwoorden moeten minstens 8 tekens lang zijn.');
    }
    if (paswoord1 != paswoord2) {
        errors.push('De wachtwoorden moeten identiek zijn.');
    }

    //gebruikersnaam testen op lengte + eerste karakter
    if (document.getElementById('gebruikersnaam').value == "") {
        errors.push('Gebruikersnaam moet langer zijn dan één karakter.');
    }

    if (document.getElementById('gebruikersnaam').value.indexOf('.') > -1 || document.getElementById('gebruikersnaam').value.indexOf('-') > -1) {
        errors.push("Gebruikersnaam mag niet met '.' of '-' beginnen.");
    }

    //betalingswijze controleren
    let radioButtons = document.querySelector("#rbBetaling").checked;
        
    function validatePayment(veld){
        let betalingswijze;

        veld.forEach(radio => {
            if (radio.checked){
                switch (radio.value) {
                    case 'bankingapp':
                        betalingswijze = "bankingapp";
                    break;
                    case 'overschrijving':
                        betalingswijze = "overschrijving";
                    break;
                    case 'visa':
                        betalingswijze = "Visa";
                    break;
                    case 'paypal':
                        betalingswijze = "Paypal";
                    break;
                }
            }
        });
        return betalingswijze;
    }
    let betalingswijze = validatePayment(document.querySelectorAll("#rbBetaling"));

    //postcode controleren
    function checkPC(veld){
        if (veld == ""){
            errors.push("Het veld postcode is vereist.");
        } else if (veld < 1000 || veld >= 10000){
            errors.push("De waarde van postcode moet tussen 1000 en 9999 liggen.");
        }
    }
    checkPC(document.querySelector("#postcode").value);
    
    //algemene voorwaarden checken
    if (!document.querySelector("#voorwaarden").checked){
        errors.push("Je moet de algemene voorwaarden accepteren.");
    }

    //errors of ok tonen op webpagina
    let foutmeldingen = errors.join("</p><p>");
    //https://stackoverflow.com/questions/4321041/javascript-newline-character
    let toonResultaat = document.querySelector("#toonAlerts");
    if (errors.length > 0){
        toonResultaat.innerHTML = `<div class='alert alert-danger' role='alert'><p><h4>Yikes, errors..</h4>${foutmeldingen}</p>`;
    } else { 
        toonResultaat.innerHTML = "<div class='alert alert-success' role='alert'><h4>Goed gedaan</h4><p>Aww yeah, je werd geregistreerd!<p></div>";
        toonResultaat.innerHTML += `<div class='alert alert-info' role='alert'><h4>Betalingswijze</h4><p>Je betalingswijze is ${betalingswijze}</p></div>`;
    }
}

valideer_btn.addEventListener("click", validateForm);