let allFilters = document.querySelectorAll('.filter');
let ticketsContainer = document.querySelector('.tickets-container');

let openModal = document.querySelector('.open-modal');
let closeModal = document.querySelector('.close-modal');


for(let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", selectFilter);
}

function selectFilter(e) {
    let selectedFilter = e.target.classList[1];
    if(ticketsContainer.classList.length > 1) {
        ticketsContainer.classList.remove(ticketsContainer.classList[1]);
    }
    ticketsContainer.classList.add(selectedFilter);
}

openModal.addEventListener("click", addTicketModal);

function addTicketModal(e) {
    let ticketModal = document.createElement("div");
    ticketModal.classList.add("ticket-modal");
    ticketModal.innerHTML = `<div class="ticket-text" contentEditable="true" spellcheck="false">Enter Your Text !</div>
    <div class="ticket-filters">
        <div class="ticket-filter red selected-filter"></div>
        <div class="ticket-filter blue"></div>
        <div class="ticket-filter green"></div>
        <div class="ticket-filter yellow"></div>
        <div class="ticket-filter black"></div>
    </div>`;
    document.querySelector("body").append(ticketModal);
}
