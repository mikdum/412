
let peliStarted = false;
let nopparotated = false;

let timer;
let timestarted;
let timeduration = 1 * 1000;
let rotateY = 0,
    rotateX = 0;
let goalrotateY = 0,
    goalrotateX = 0;

let rotateY_const = 0,
    rotateX_const = 0;


window.onload = function () {

    document.getElementById('btn_aloita').addEventListener("click", btn_aloita);

}

function btn_heittää(player) {
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
    timestarted = Date.now();
    let result = Math.floor(Math.random() * 6 + 1);
    switch (result) {
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

    console.log(result, goalrotateY, goalrotateX);

    rotateY_const = (goalrotateY - rotateY) / 120;
    rotateX_const = (goalrotateX - rotateX) / 120;

    timer = setInterval(peliisgoing, 20);

}
function btn_rittää(pelijaid) {


    let btn_heittää = document.querySelector('#pelija' + pelijaid + ' #btn_heittää');
    btn_heittää.disabled = true;
    let btn_rittää = document.querySelector('#pelija' + pelijaid + ' #btn_rittää');
    btn_rittää.disabled = true;
    let parent = document.querySelector('.pelijat');

    if (pelijaid<parent.childElementCount-1){
        pelijaid+=1;
        let btn_heittää = document.querySelector('#pelija' + pelijaid + ' #btn_heittää');
        btn_heittää.disabled = false;
        let btn_rittää = document.querySelector('#pelija' + pelijaid + ' #btn_rittää');
        btn_rittää.disabled = false;
        let parent = document.querySelector('.pelijat');
    

    }

}
function btn_aloita() {
    let peliajcount = document.getElementById('pelijacount').value;
    let parent = document.querySelector('.pelijat');
    document.getElementById("btn_heittää").disabled = false;
    document.getElementById("btn_rittää").disabled = false;

    while (parent.childElementCount > peliajcount) {
        parent.removeChild(parent.lastElementChild);

    }

    for (let i = parent.childElementCount; i < peliajcount; i++) {
        let pelija = document.querySelector(".pelija").cloneNode(true);
        pelija.id = "pelija" + i;
        document.querySelector(".pelijat").appendChild(pelija);

        let btn_heittää = document.querySelector('#' + pelija.id + ' #btn_heittää');
        btn_heittää.setAttribute('onclick', 'btn_heittää(' + i + ')');
        btn_heittää.disabled = true;
        let btn_rittää = document.querySelector('#' + pelija.id + ' #btn_rittää');
        btn_rittää.setAttribute('onclick', 'btn_rittää(' + i + ')');
        btn_rittää.disabled = true;

        let pelijanimi = document.querySelector('#' + pelija.id + ' #pelijanimi');
        pelijanimi.innerHTML = "Pelijä " + (i + 1);
        console.log(pelijanimi);

    }



}

function peliisgoing() {
    let timePassed = Date.now() - timestarted;



    if (rotateY >= goalrotateY && rotateX >= goalrotateX) {

        clearInterval(timer);
        return;
    }

    document.querySelector('.cube').style.transform =
        'rotateY(' + rotateY + 'deg)' +
        'rotateX(' + rotateX + 'deg)';

    rotateX += rotateX_const;
    rotateY += rotateY_const;

}