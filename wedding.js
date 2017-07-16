$(document).ready(setUpPage); 

//all of the page modification and event registering
function setUpPage(){
    $(window).scroll(adjustBackground);
    $('a[href^="#"]').click(navigateInternally); //modify click behavior of anchors that refer to elements on the page
    $(window).on("popstate", popstate);
    adjustBackground();
    scrollToElementInFragment();
}

function popstate(event) {
    scrollToElementInFragment();
}

//provide a parallax perspective scrolling effect to page background
function adjustBackground() {
    document.body.style.backgroundPosition = "0px " + (- Math.max(document.documentElement.scrollTop, document.body.scrollTop) / 3) + "px";
}

//handle the click event of an anchor by updating the browser history and smooth scrolling to the element
function navigateInternally(event) {
    event.preventDefault();
    event.stopPropagation();
    navigateToInternalUrl(event.target.getAttribute('href'));
}

function navigateToInternalUrl(url) {
    if(url !== window.location.hash){
        window.history.pushState({}, window.document.title + " - " + event.target.textContent, url);
    }

    scrollToElementInFragment();
}

//smooth scroll to the element defined in the URL fragment, or to page top if there is no fragment.
function scrollToElementInFragment() {
    if(window.location.hash) {
        scrollTo($(window.location.hash));
    } else {
        scrollTo($(document.documentElement));
    }
}

//nice animated scroll to an element on the page
function scrollTo(target) {
    $('html, body').stop().animate({
        scrollTop: target.offset().top
    }, 1000);
}

function toggleExpand(element) {
    element.classList.toggle("expanded");
}
function collapse(element) {
    element.classList.remove("expanded");
}