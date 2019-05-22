// import (libName or fileName) from "(libName or fileName)";
var checkAllCheckbox = document.querySelector(".all-checkbox");
var resButton = document.querySelector(".reset-button");
var delButton = document.querySelector(".trash-button");

// Reset page button

resButton.addEventListener('click', function () {

    window.location.reload();

});

// Delete row vs checked ckeckbox

delButton.addEventListener('click', function () {

    var allRowCheckboxesChecked = document.querySelectorAll("input.one-checkbox[type='checkbox']:checked");

    console.log(allRowCheckboxesChecked);

    for(var i = 0; i < allRowCheckboxesChecked.length; i++){

        allRowCheckboxesChecked[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();

        setCheckBoxChecked(checkAllCheckbox, false, 'check');
    }

    var allRowCheckboxes = document.querySelectorAll(".one-checkbox");

    var columDataHeader = document.querySelector('.statistic-table__colum-data-header')

    if(allRowCheckboxes.length === 0){

        checkAllCheckbox.disabled = true;

        columDataHeader.classList.add('border-bottom');

    }else{

        if(columDataHeader.classList.contains('border-bottom')){
            columDataHeader.classList.remove('border-bottom');
        }

        checkAllCheckbox.disabled = false;
    }

});

// Style for checked checkbox

function setCheckBoxChecked(element, isChecked, className){

    if(isChecked){

        element.parentElement.classList.add(className);

    }else{

        element.parentElement.classList.remove(className);
    }

    element.checked = isChecked;

}

// Get all checkbox

var allRowCheckboxes = document.querySelectorAll(".one-checkbox");

checkAllCheckbox.addEventListener('click', function () {

    var isAllChecked = this.checked;

    setCheckBoxChecked(this, isAllChecked, 'check');

    var allRowCheckboxes = document.querySelectorAll(".one-checkbox");

    for(var i = 0; i < allRowCheckboxes.length; i++){

        setCheckBoxChecked(allRowCheckboxes[i], isAllChecked, 'check');
    }

});

for(var i = 0; i < allRowCheckboxes.length; i++){

    allRowCheckboxes[i].addEventListener('click', function () {

        setCheckBoxChecked(this, this.checked, 'check');

        var allRowCheckboxes = document.querySelectorAll(".one-checkbox");

        var allRowCheckboxesChecked = document.querySelectorAll("input.one-checkbox[type='checkbox']:checked");

        var checkAllCheckbox = document.querySelector(".all-checkbox");

        if(allRowCheckboxesChecked.length == allRowCheckboxes.length){

            if(!checkAllCheckbox.checked){

                setCheckBoxChecked(checkAllCheckbox, true, 'check');
            }
        }else{

            if(checkAllCheckbox.checked){

                setCheckBoxChecked(checkAllCheckbox, false, 'check');

            }
        }

    });

}

// Add row in like, click at star

var allRowStars = document.querySelectorAll(".input-star");

for(var i = 0; i < allRowStars.length; i++){

    allRowStars[i].addEventListener('click', function () {

        setCheckBoxChecked(this, this.checked, 'star-check');

    });

}

// Drop down block

var allDropDownBlock = document.querySelectorAll(".statistic-table__column-name");

for(var i = 0; i < allDropDownBlock.length; i++){

    allDropDownBlock[i].addEventListener('click', function () {

        this.classList.toggle('border-bottom');

        this.nextElementSibling.classList.toggle('border-bottom');

        var arrowIcon = this.querySelector('.column-name__like-arrow');

        if(arrowIcon.classList.contains('dropdown-btn')){

            arrowIcon.classList.remove('dropdown-btn');

        }else{
          
            arrowIcon.classList.add('dropdown-btn');
        }

        var dropDownBlock = this.parentNode.nextElementSibling;

        if(dropDownBlock.classList.contains('on')){

            dropDownBlock.classList.remove('on');

        }else{

            dropDownBlock.classList.add('on');
        }


        var allDropDownBlockActive = document.querySelectorAll(".statistic-table__column__drop-down.on");

        if(allDropDownBlockActive.length === 0){

            removeIconOutlineStyle();
        }

    });

}

// Button TOP 10

var allButtonTop10 = document.querySelectorAll('.drop-down-name__button-top10');

for(var i = 0; i < allButtonTop10.length; i++){

    allButtonTop10[i].addEventListener('click', function(){

        this.classList.add('hide');

        this.nextElementSibling.classList.add('show');

        this.parentNode.parentNode.classList.add('top10');

    })

}

// Button TOP 5

var allButtonTop5 = document.querySelectorAll('.drop-down-name__button-top5');

for(var i = 0; i < allButtonTop5.length; i++){

    allButtonTop5[i].addEventListener('click', function(){

        this.classList.remove('show');

        this.previousElementSibling.classList.remove('hide');

        this.parentNode.parentNode.classList.remove('top10');

    })

}

// Horisontally Scroll statistic on hover

var staticticTableblock = document.getElementById('statistic-table')

function scrollHorizontallyWithWheel(e) {

    e = window.event || e;

    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    staticticTableblock.scrollLeft -= (delta*10);

    e.preventDefault();
}

var statisticInfoBlocks = document.querySelectorAll('.statistic-table__colum-data');

var statisticInnerInfoBlocks = document.querySelectorAll('.drop-down-data');

scrollHorizontallyOnHover(statisticInfoBlocks);

scrollHorizontallyOnHover(statisticInnerInfoBlocks);

function scrollHorizontallyOnHover(elements){

    for(var i = 0; i < elements.length; i++){

        elements[i].addEventListener('mouseover', function () {

            document.getElementById('statistic-table').addEventListener("mousewheel", scrollHorizontallyWithWheel, false);
            // Firefox
            document.getElementById('statistic-table').addEventListener("DOMMouseScroll", scrollHorizontallyWithWheel, false);
            // IE9, Chrome, Safari, Opera

        });

        elements[i].addEventListener('mouseout', function () {

            document.getElementById('statistic-table').removeEventListener("mousewheel", scrollHorizontallyWithWheel, false);
            // Firefox
            document.getElementById('statistic-table').removeEventListener("DOMMouseScroll", scrollHorizontallyWithWheel, false);
            // IE9, Chrome, Safari, Opera

        });

    }
}

//Forbid content selection in a block with a table

function preventSelection(element){
    var preventSelection = false;

    function addHandler(element, event, handler){
        if (element.attachEvent)
            element.attachEvent('on' + event, handler);
        else
        if (element.addEventListener)
            element.addEventListener(event, handler, false);
    }
    function removeSelection(){
        if (window.getSelection) { window.getSelection().removeAllRanges(); }
        else if (document.selection && document.selection.clear)
            document.selection.clear();
    }
    function killCtrlA(event){
        var event = event || window.event;
        var sender = event.target || event.srcElement;

        if (sender.tagName.match(/INPUT|TEXTAREA/i))
            return;

        var key = event.keyCode || event.which;
        if (event.ctrlKey && key == 'A'.charCodeAt(0))  // 'A'.charCodeAt(0) можно заменить на 65
        {
            removeSelection();

            if (event.preventDefault)
                event.preventDefault();
            else
                event.returnValue = false;
        }
    }

    addHandler(element, 'mousemove', function(){
        if(preventSelection)
            removeSelection();
    });
    addHandler(element, 'mousedown', function(event){
        var event = event || window.event;
        var sender = event.target || event.srcElement;
        preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
    });

    addHandler(element, 'mouseup', function(){
        if (preventSelection)
            removeSelection();
        preventSelection = false;
    });

    addHandler(element, 'keydown', killCtrlA);
    addHandler(element, 'keyup', killCtrlA);
}

preventSelection(staticticTableblock);

//scroll content horizontally inside the block with the mouse

function mouseMoveScroll(element, scrollElement){

    element.onmousemove = mousemove;

    var down = 0;
    var right = 0;

    element.onmouseleft = function(e) {
        e = e || scrollElement.event;
        right = 1;
        x = e.clientX;
        y = e.clientY;
    }

    element.onmouseright = function(e){
        e = e || scrollElement.event;
        right = 0;
    }
    element.onmousedown = function(e) {
        e = e || window.event;
        down = 1;
        x = e.clientX;
        y = e.clientY;
    }

    element.onmouseup = function(e){
        e = e || window.event;
        down = 0;
    }

    function mousemove(e) {
        if(down == 1){
            if (x && y) {
                scrollElement.scrollBy(x - e.clientX, y - e.clientY);
            }
            x = e.clientX;
            y = e.clientY;
        }else{}
    }
}

mouseMoveScroll(staticticTableblock, staticticTableblock);

// Choose img icon

function removeIconOutlineStyle(){

    var allIcons = document.querySelectorAll('.statistic-table__column__drop-down .drop-down-data__colum-data__item img.icon-outline');

    for(var e = 0; e < allIcons.length; e++){

        allIcons[e].classList.remove('icon-outline');

    }
}

var allImageIcons = document.querySelectorAll('.drop-down-data__colum-data__item img');

for(var i = 0; i < allImageIcons.length; i++){

    /*
    * Предусмотрел функцию чтобы подсветка картинок
    * срабатывала при клике
    * оставляю её в комментарии
    *

    allImageIcons[i].addEventListener('click', function(){

        if(this.classList.contains('icon-outline')){

            removeIconOutlineStyle();

        }else{

            removeIconOutlineStyle();

            var appIconId = this.getAttribute("data-id");

            var allAppIcons = document.querySelectorAll('.statistic-table__column__drop-down .drop-down-data__colum-data__item img[data-id="' + appIconId + '"]');

            for(var j = 0; j < allAppIcons.length; j++){

                allAppIcons[j].classList.add('icon-outline');
            }
        }
    });

    * */

    allImageIcons[i].addEventListener('mouseover', function(){

        var appIconId = this.getAttribute("data-id");

        var allAppIcons = document.querySelectorAll('.statistic-table__column__drop-down .drop-down-data__colum-data__item img[data-id="' + appIconId + '"]');

        for(var j = 0; j < allAppIcons.length; j++){

            allAppIcons[j].classList.add('icon-outline');
        }

    })

    allImageIcons[i].addEventListener('mouseout', function(){

            removeIconOutlineStyle();
    })
}