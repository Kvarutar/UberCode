$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/LeftArrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/Right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $("input[name=phone]").mask("+7(999) 999-99-99");

});

//табы

document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.querySelectorAll('.catalog__tab div');
    let buttonsLi = document.querySelectorAll('.catalog__tab');
    let buttonsWrapper = document.querySelector('.catalog__tabs'),
        catalogContent = document.querySelectorAll('.catalog__content'),
        backButton = document.querySelectorAll('.catalog-item__back'),
        moreButton = document.querySelectorAll('.catalog-item__link'),
        catalogItemContent = document.querySelectorAll('.catalog-item__content'),
        catalogItemList = document.querySelectorAll('.catalog-item__list');

    function hideTabContent(a) {
        for (let i = a; i < buttons.length; i++){
            buttonsLi[i].classList.remove('catalog__tab_active');
            catalogContent[i].classList.remove('catalog__content_active');
        }
    }

    function showTabContent(a) {
        buttonsLi[a].classList.add('catalog__tab_active');
        catalogContent[a].classList.add('catalog__content_active');
    }

    showTabContent(0);

    buttonsWrapper.addEventListener('click', function(event){
        let target = event.target;
        for(let i = 0; i < buttons.length; i++){
            if(target == buttons[i]){
                hideTabContent(0);
                showTabContent(i);
                break;
            };
        };
    });

    function showMoreInfo(a){
        catalogItemContent[a].classList.remove('catalog-item__content_active');
        catalogItemList[a].classList.add('catalog-item__list_active');
    }

    function hideMoreInfo(a){
        catalogItemContent[a].classList.add('catalog-item__content_active');
        catalogItemList[a].classList.remove('catalog-item__list_active');
    }

    for (let i = 0; i < catalogContent.length; i++){
        catalogContent[i].addEventListener('click', function(event){
            let target = event.target;
            event.preventDefault();
            for (let i = 0; i < backButton.length; i++){
                if (target == backButton[i]) {
                    hideMoreInfo(i);
                    break;
                } else if (target == moreButton[i]){
                    showMoreInfo(i);
                    break;
                }
            }
        });
    }

    //модальные окна

    !function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

    /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
    let modalButtons = document.querySelectorAll('.modal__button'),
        overlay      = document.querySelector('.overlay'),
        closeButtons = document.querySelectorAll('.modal__close'),
        modalDescr = document.querySelectorAll('.modal__descr');

    /* Перебираем массив кнопок */
    modalButtons.forEach(function(item){
        /* Назначаем каждой кнопке обработчик клика */
        item.addEventListener('click', function(e) {
            /* Предотвращаем стандартное действие элемента. Так как кнопку разные
                люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
                Нужно подстраховаться. */
            e.preventDefault();
            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
                и будем искать модальное окно с таким же атрибутом. */
            let modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]'),
                form = modalElem.querySelector('.feed-form');
            /* После того как нашли нужное модальное окно, добавим классы
                подложке и окну чтобы показать их. */
            modalElem.classList.add('modal_active');
            overlay.classList.add('overlay_active');
            if (item.classList.contains('button_price')) {
                let descrId = this.getAttribute('data-desrc'),
                    descrElem = document.querySelector('.catalog-item__subtitle[data-desrc="' + descrId + '"]');
                modalDescr[2].innerHTML = descrElem.innerHTML;
            }

        //валидация
        let FormFields = modalElem.querySelectorAll('.feed-form__field');

        function addError(item, massage, count){
            let error = document.createElement('div');
            error.className = 'error';
            error.classList.add(`error${count}`);
            error.innerHTML = massage;
            item.after(error);
        }

        modalElem.addEventListener('submit', function(e){
            e.preventDefault();
            let errors = modalElem.querySelectorAll('.error');
    
            errors.forEach(item => {
                item.remove();
            })
            let count = 0;
            FormFields.forEach(item => {
                count++;
                if (!item.value) {
                    let massage = 'Поле не может быть пустым';
                    addError(item, massage, count);
                }else{
                    validationResult[count-1] = true;
                }
            })
            /* if (validationResult[0] && validationResult[1] && validationResult[2]) {
                form.submit();
            } */
        });

        let formName  = modalElem.querySelector('.name'),
            formPhone = modalElem.querySelector('.phone'),
            formEmail = modalElem.querySelector('.email'),
            validationResult = [false, false, false]

        formName.addEventListener('blur', function(){
            let error = modalElem.querySelector('.error1');
            if (!formName.value) {
                if (error) {error.remove();}
                let massage = 'Поле не может быть пустым';
                addError(formName, massage, 1);
            }
            else if (formName.value.length < 2){
                if (error) {error.remove();}
                massage = "Ваше имя должно быть больше 2 символов"
                addError(formName, massage, 1)
            } else if (!isNaN(formName.value)){
                if (error) {error.remove();}
                massage = "Ваше имя должно состоять из букв"
                addError(formName, massage, 1)
            }
            else if(!formName.value || error != null) {
                error.remove();
                validationResult[0] = true;
            }
        })

        formPhone.addEventListener('blur', function(){
            if (formPhone.value != '') {
                let error = modalElem.querySelector('.error2');
                if (error != null){
                    error.remove();
                    validationResult[1] = true;
                }
            }
        })

        formEmail.addEventListener('blur', function(){
            if (formEmail.value != '') {
                let error = modalElem.querySelector('.error3');
                if (error != null){
                    error.remove();
                    validationResult[2] = true;
                }
            }
        })
        }); // end click
    }); // end foreach


    closeButtons.forEach(function(item){
        item.addEventListener('click', function(e) {
            let parentModal = this.closest('.modal');
            parentModal.classList.remove('modal_active');
            overlay.classList.remove('overlay_active');
        });
    }); // end foreach

    document.body.addEventListener('keyup', function (e) {
        let key = e.keyCode;
        if (key == 27) {
            document.querySelector('.modal_active').classList.remove('modal_active');
            document.querySelector('.overlay_active').classList.remove('overlay_active');
        };
    }, false);
});


