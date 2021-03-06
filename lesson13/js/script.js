window.addEventListener('DOMContentLoaded', function () {
// Табы
    let tab = document.getElementsByClassName('info-header-tab'),
        tabContent = document.getElementsByClassName('info-tabcontent'),
        info = document.getElementsByClassName('info-header')[0];

    function hideTabContent(a) {
        for( let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);
    function showTabContent(b) {
        if ( tabContent[b].classList.contains('hide')){
            hideTabContent(0);
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target.className == 'info-header-tab'){
            for(let i = 0; i < tab.length; i++){
                if (target == tab[i]){
                    showTabContent(i);
                    break;
                }
            }
        }
    });
// Таймер
    let deadline = '2018-11-7';
    function getTimerRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor( t/(1000*60*60) );
        return{
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    function setClock(id, endtime) {
        let timer = document.getElementById('timer'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
        function updateClock() {
            let t = getTimerRemaining(endtime),
                timeInterval = setInterval(updateClock, 1000);
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if (t.total <= 0 ){
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
                clearInterval(timeInterval);
            }
        }
        updateClock();
    }
    setClock('timer', deadline);
// Модальное окно
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.getElementsByClassName('description-btn');
    more.addEventListener('click', function () {
        this.classList.add('more-splash');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
    for (let i = 0; i < descriptionBtn.length; i++) {
        descriptionBtn[i].addEventListener('click', function () {
            this.classList.add('more-splash');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    //form
    let message = new Object();
    message.loading = "Загрузка...";
    message.success = "Спасибо! скоро с вами свяжутся";
    message.failure = "Что-то пошло не так";
    let form = document.getElementsByClassName('main-form')[0],
        formFooter = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        //AJAX
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4){
                if (request.status < 300){
                    statusMessage.innerHTML = message.success;
                    //обавляем контент на страницу
                }
                else {
                    statusMessage.innerHTML = message.failure;
                }
            }
        };
        for (let i=0; i<input.length; i++){
            input[i].value = '';
            //Очищаем поля ввода
        }
    });
    formFooter.addEventListener('submit', function(event) {
        event.preventDefault();
        formFooter.appendChild(statusMessage);

        //AJAX
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");

        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4){
                if (request.status < 300){
                    statusMessage.innerHTML = message.success;
                    //обавляем контент на страницу
                }
                else {
                    statusMessage.innerHTML = message.failure;
                }
            }
        };
        for (let i=0; i<input.length; i++){
            input[i].value = '';
            //Очищаем поля ввода
        }
    });
    //Slider
    let slideIndex = 1,
        slides = document.getElementsByClassName('slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dot = document.getElementsByClassName('dot');
    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length){
            slideIndex = 1;
        };
        if (n < 1){
            slideIndex = slides.length;
        };
        for ( let i = 0; i < slides.length; i++){
            slides[i].style.display = 'none';
        }
        for (let i = 0; i < dot.length; i++){
            dot[i].classList.remove('dot-active');
        }
        slides[slideIndex - 1].style.display = 'block';
        dot[slideIndex - 1].classList.add('dot-active');

    }
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlides(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function () {
        plusSlides(-1);
    });
    next.addEventListener('click', function () {
        plusSlides(1);
    });
    dotsWrap.addEventListener('click', function (event) {
        for  ( let i = 0; i < dot.length + 1; i++ ){
            if (event.target.classList.contains('dot') && event.target == dot[i-1]) {
                currentSlides(i);
            }
        }
    });
    setInterval( function (){
        plusSlides(1);
    }, 3000);

    //Calc

    let persons = document.getElementsByClassName('counter-block-input')[0],
        restDays = document.getElementsByClassName('counter-block-input')[1],
        place = document.getElementById('select'),
        totalVaiue = document.getElementById('total'),
        personSum = 0,
        daysSum = 0,
        total = 0;

    totalVaiue.innerHTML = 0;


    persons.addEventListener('change', function () {
        persons.value = Math.ceil(Math.abs(persons.value));
        personSum = +this.value;
        total = (daysSum + personSum)*4000;
        if (restDays.value <= 0 || persons.value <= 0 ){
            totalVaiue.innerHTML = 0;
        } else {
            totalVaiue.innerHTML = total;
        }
    });
    restDays.addEventListener('change', function () {
        restDays.value = Math.ceil(Math.abs(restDays.value));
        daysSum = +this.value;
        total = (daysSum + personSum)*4000;
        if (persons.value <= 0 || restDays.value <= 0){
            totalVaiue.innerHTML = 0;
        } else {
            totalVaiue.innerHTML = total;
        }
    });
    place.addEventListener('change', function () {
       if (restDays.value <= 0 || persons.value <= 0 ){
           totalVaiue.innerHTML = 0;
       } else {
           let a = total;
           totalVaiue.innerHTML = a * this.options[this.selectedIndex].value;
       }
    });

});
