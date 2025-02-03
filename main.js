
let peliStarted = false;
let nopparotated = false;

let timer;
let rotateY = 0,
    rotateX = 0;
let goalrotateY = 0,
    goalrotateX = 0;

let rotateY_const = 0,
    rotateX_const = 0;

var results;
var pelimäärää;
let currentresult = 0;
let activeplayerid = 0;

window.onload = function () {

    document.getElementById('btn_aloita').addEventListener("click", btn_aloita);

}

function btn_heittää(pelaajaid) {
    activeplayerid = pelaajaid;
    let btn_heittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_heittää');
    btn_heittää.disabled = true;



    if (nopparotated) {
        clearInterval(timer);

    }

    if (rotateX > 360) {
        rotateX -= 360;

    }
    if (rotateY > 360) {
        rotateY -= 360;
    }

    nopparotated = true;
    currentresult = Math.floor(Math.random() * 6 + 1);
    switch (currentresult) {
        case 1: {
            goalrotateY = 360;
            goalrotateX = 360;
            break;
        }
        case 2: {
            goalrotateY = 270;
            goalrotateX = 360;
            break;
        }
        case 3: {
            goalrotateY = 360;
            goalrotateX = 270;
            break;
        }
        case 4: {
            goalrotateY = 90;
            goalrotateX = 360;
            break;
        }
        case 5: {
            goalrotateY = 360;
            goalrotateX = 90;
            break;
        }
        case 6: {
            goalrotateY = 180;
            goalrotateX = 360;
            break;
        }
    }
    if ((rotateX + 360) > goalrotateX) {
        goalrotateX += 360;
    }
    if ((rotateY + 360) > goalrotateY) {
        goalrotateY += 360;
    }


    rotateY_const = (goalrotateY - rotateY) / 120;
    rotateX_const = (goalrotateX - rotateX) / 120;

    timer = setInterval(peliisgoing, 20);

}
function btn_rittää(pelaajaid) {

    activeplayerid = pelaajaid;
    let btn_heittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_heittää');
    btn_heittää.disabled = true;
    let btn_rittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_rittää');
    btn_rittää.disabled = true;
    let parent = document.querySelector('.pelaajat');

    if (pelaajaid < parent.childElementCount - 1) {
        pelaajaid += 1;
        let btn_heittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_heittää');
        btn_heittää.disabled = false;
        let btn_rittää = document.querySelector('#pelaaja' + pelaajaid + ' #btn_rittää');
        btn_rittää.disabled = false;

    }
    else {
        maxresult =Math.max.apply(null, results);
        console.log()
        let Voittaja = "Voittaja:";
        for (let i = 0; i < parent.childElementCount; i++) {
            if (maxresult == results[i]) {
                Voittaja += " pelaaja" + (i + 1);
            }

            let pelaajanimi = document.querySelector('#messagewinner');
            pelaajanimi.innerHTML = Voittaja;

        }


    }

}
function btn_aloita() {
    let peliajcount = document.getElementById('pelaajacount').value;
    let parent = document.querySelector('.pelaajat');
    document.getElementById("btn_heittää").disabled = false;
    document.getElementById("btn_rittää").disabled = false;
    let pelaajanimi = document.querySelector('#messagewinner');
    pelaajanimi.innerHTML = "";

    while (parent.childElementCount > peliajcount) {
        parent.removeChild(parent.lastElementChild);

    }

    results = [];
    pelimäärää = [];
    for (let i = parent.childElementCount; i < peliajcount; i++) {
        let pelaaja = document.querySelector(".pelaaja").cloneNode(true);
        pelaaja.id = "pelaaja" + i;
        document.querySelector(".pelaajat").appendChild(pelaaja);
        
        let btn_heittää = document.querySelector('#' + pelaaja.id + ' #btn_heittää');
        btn_heittää.setAttribute('onclick', 'btn_heittää(' + i + ')');
        btn_heittää.disabled = true;
        let btn_rittää = document.querySelector('#' + pelaaja.id + ' #btn_rittää');
        btn_rittää.setAttribute('onclick', 'btn_rittää(' + i + ')');
        btn_rittää.disabled = true;
        
        let pelaajanimi = document.querySelector('#' + pelaaja.id + ' #pelaajanimi');
        pelaajanimi.innerHTML = "pelaaja " + (i + 1);
        console.log(pelaajanimi);
        
    }
    for (let i = 0; i < peliajcount; i++) {
        results.push(0);
        pelimäärää.push(0);


        let pelimäärääelement = document.querySelector('#pelaaja' + i + ' #pelimäärää');
        pelimäärääelement.innerHTML = "pelien määrää: ";
        let pelaajanimi = document.querySelector('#pelaaja' + i + ' #peliresult');
        pelaajanimi.innerHTML = "result: ";

    }
    

}

function peliisgoing() {
    if (rotateY >= goalrotateY && rotateX >= goalrotateX) {
        pelimäärää[activeplayerid] += 1;
        if (currentresult > 1) {
            results[activeplayerid] += currentresult;

            let btn_heittää = document.querySelector('#pelaaja' + activeplayerid + ' #btn_heittää');
            btn_heittää.disabled = false;

        }
        else {
            results[activeplayerid] = 0;
            btn_rittää(activeplayerid);
        }
        let pelimäärääelement = document.querySelector('#pelaaja' + activeplayerid + ' #pelimäärää');
        pelimäärääelement.innerHTML = "pelien määrää: " + pelimäärää[activeplayerid];
        let pelaajanimi = document.querySelector('#pelaaja' + activeplayerid + ' #peliresult');
        pelaajanimi.innerHTML = "result: " + results[activeplayerid];


        clearInterval(timer);
        return;
    }

    document.querySelector('.cube').style.transform =
        'rotateY(' + rotateY + 'deg)' +
        'rotateX(' + rotateX + 'deg)';

    rotateX += rotateX_const;
    rotateY += rotateY_const;

}