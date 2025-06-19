// Element Selector
const loginForm = document.getElementById('loginForm');
const mobileNumInput = document.getElementById('mobileNumberInput');
const pinInput = document.getElementById('pinInput');
const loginBoard = document.getElementById('loginBoard');
const dashboard = document.getElementById('openDashboard');
const logoutButton = document.getElementById('logOut');
const walletElement = document.getElementById('wallet');
const addMoneyButton = document.getElementById('addMoney');
const moneyHandlerBox = document.getElementById('moneHandallerBox');
const transitionTab = document.getElementById('transitions');
const addMoneyForm = document.getElementById('addMoneyForm');
const cashOutForm = document.getElementById('cashOutForm');
const cashOutButton = document.getElementById('cashOutBtn');
const getBonusForm = document.getElementById('getBonusForm')
const getBonus = document.getElementById('getBonus')
const getBonusBtn = document.getElementById('getBonusBtn')
const transitionsBtn = document.getElementById('transitionsBtn')

// Initial Wallet Amount
let walletAmount = 4000;
walletElement.innerText = `$${walletAmount}`;

// Login Process
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const mobileNumber = mobileNumInput.value.trim();
    const pin = pinInput.value.trim();

    if (mobileNumber.length === 11 && pin.length === 4) {
        if (mobileNumber === '12345678901' && pin === '1234') {
            alert('Login Successful');
            setTimeout(showDashboard, 200);
        } else {
            alert('Invalid Mobile Number or PIN');
        }
    } else {
        alert('Invalid Number or PIN length');
    }
});

// Show Dashboard
function showDashboard() {
    loginBoard.style.display = 'none';
    dashboard.style.display = 'flex';
}

// Logout Process
logoutButton.addEventListener('click', () => {
    dashboard.style.display = 'none';
    loginBoard.style.display = 'flex';
});

// Add Money Process
addMoneyButton.addEventListener('click', () => {
    addMoneyForm.style.display = 'flex'
    transitionTab.style.display = 'none'
    cashOutForm.style.display = 'none'
    addMoneyButton.classList.add('activeTab')
    cashOutButton.classList.remove('activeTab')
    getBonusBtn.classList.remove('activeTab')
    getBonusForm.style.display = 'none'
    transitionsBtn.classList.remove('activeTab')

});

addMoneyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const bankAccount = document.getElementById('bankAccount').value.trim();
    const addAmount = parseFloat(document.getElementById('addAmmount').value.trim());
    const bankPin = document.getElementById('bankPin').value.trim();

    if (bankAccount.length === 11 && bankAccount === '12345678901') {
        if (addAmount < 20) {
            alert('💸 Minimum Add Money Amount $20');
        } else if (addAmount > 1000000) {
            alert('💸 Maximum Add Money Amount Is $100000000000000000');
        } else if (bankPin.length === 4 && bankPin === '1234') {
            walletAmount += addAmount;
            walletElement.innerText = `$${walletAmount}`;
            alert('Your Balance Added Successfully');
            addMoneyForm.reset();
            document.getElementById('noTransitions').style.display = 'none';
            createTransition('Add Money', addAmount);
        } else {
            alert('🔐 Invalid Pin');
        }
    } else {
        alert('Invalid Bank Account');
    }
});

// Cash Out Money Process
cashOutButton.addEventListener('click', () => {
    cashOutForm.style.display = 'flex'
    transitionTab.style.display = 'none'
    addMoneyForm.style.display = 'none'
    cashOutButton.classList.add('activeTab')
    addMoneyButton.classList.remove('activeTab')
    getBonusBtn.classList.remove('activeTab')
    getBonusForm.style.display = 'none'
    transitionsBtn.classList.remove('activeTab')

});

cashOutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const agentAccount = document.getElementById('agentAccount').value.trim();
    const withdrawAmount = parseFloat(document.getElementById('ammountWithdraw').value.trim());
    const agentPin = document.getElementById('piNumberAgent').value.trim();

    if (agentAccount.length === 11) {
        if (withdrawAmount <= walletAmount) {
            if (agentPin.length === 4 && agentPin === '1234') {
                walletAmount -= withdrawAmount;
                walletElement.innerText = `$${walletAmount}`;
                alert('✅ Cashout Successful');
                cashOutForm.reset();
                document.getElementById('noTransitions').style.display = 'none';
                createTransition('Cash Out', withdrawAmount);
            } else {
                alert('🔐 Invalid Pin');
            }
        } else {
            alert('💸 Insufficient Balance');
        }
    } else {
        alert('Invalid Agent Number');
    }
});

// get bonus 
getBonusBtn.addEventListener("click", function(){
    getBonusForm.style.display = 'flex'
    getBonusBtn.classList.add('activeTab')
    addMoneyButton.classList.remove('activeTab')
    cashOutButton.classList.remove('activeTab')
    transitionTab.style.display = 'none'
    addMoneyForm.style.display = 'none'
    cashOutForm.style.display = 'none'
    transitionsBtn.classList.remove('activeTab')
})

let couponLimit = 1
getBonusForm.addEventListener("submit", function(event){
    event.preventDefault()
    const getBonusValue = getBonus.value.toString().toUpperCase();

    if(couponLimit > 0){
        if(getBonusValue === 'PAYOO'){
            alert('Congratulation You $200 Reward')
            walletAmount += 200;
            walletElement.innerText = `$${walletAmount}`;
            couponLimit -= 1;
            createTransition('Bonus', 200)
        } else {
            alert('Invalid coupon');
        }    
    }
    else{
        alert('The Coupon Alredy Used')
    }
})

// Transition Box 
transitionsBtn.addEventListener("click", function(){
    transitionTab.style.display = 'flex'
    addMoneyForm.style.display = 'none'
    cashOutForm.style.display = 'none'
    getBonusForm.style.display = 'none'
    transitionsBtn.classList.add('activeTab')
    addMoneyButton.classList.remove('activeTab')
    cashOutButton.classList.remove('activeTab')
    getBonusBtn.classList.remove('activeTab')

})

// Create Transition Entry
function createTransition(method, amount) {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const month = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const session = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const timeSet = `${monthNames[month]} ${displayHour}:${min}:${sec} ${session}`;

    const transitionHTML = `
        <div class="bg-slate-100 rounded-lg flex p-5 gap-5 items-center">
            <svg width="30" height="30" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_11_2727)">
                    <path d="M19.45 1.09995C19.6 1.04995 19.75 1.09995 19.85 1.14995C20.1 1.29995 20.25 1.54995 20.3 1.89995L20.8 4.59995H21.65L21.15 1.74995C21.05 1.14995 20.75 0.699951 20.3 0.399951C19.95 0.199951 19.55 0.149951 19.2 0.249951L5.29999 4.54995L7.89999 4.59995L19.45 1.09995Z" fill="#F04B36"/>
                    <path d="M22.95 4.60005H21.7H20.85H7.95001L5.30001 4.55005C4.95001 4.65005 4.60001 4.90005 4.40001 5.30005C4.25001 5.55005 4.20001 5.80005 4.20001 6.10005V13C4.75001 12.85 5.35001 12.75 5.95001 12.75C9.40001 12.75 12.2 15.4501 12.2 18.7501C12.2 19.3001 12.15 19.8 12 20.3H22.95C23.65 20.3 24.25 19.6501 24.25 18.8501V15.6H18.15C17.9 15.6 17.75 15.4001 17.75 15.2V9.85005C17.75 9.60005 17.95 9.45005 18.15 9.45005H24.25V6.10005C24.25 5.30005 23.65 4.60005 22.95 4.60005Z" fill="#F7A93B"/>
                    <path d="M18.55 14.75H24.25V10.25H18.55V14.75ZM21.15 11.65C21.55 11.65 21.9 12.05 21.9 12.5C21.9 13 21.55 13.35 21.15 13.35C20.75 13.35 20.4 12.95 20.4 12.5C20.4 12.05 20.75 11.65 21.15 11.65Z" fill="#E77528"/>
                    <path d="M6 13.7C3.1 13.7 0.75 15.95 0.75 18.7C0.75 21.45 3.1 23.7 6 23.7C8.15 23.7 10.15 22.4 10.9 20.45C11.1 19.9 11.25 19.3 11.25 18.7C11.25 15.95 8.9 13.7 6 13.7ZM8 19.2H6.5V20.7C6.5 20.95 6.3 21.2 6 21.2C5.75 21.2 5.5 21 5.5 20.7V19.2H4C3.75 19.2 3.5 19 3.5 18.7C3.5 18.45 3.7 18.2 4 18.2H5.5V16.7C5.5 16.45 5.7 16.2 6 16.2C6.25 16.2 6.5 16.4 6.5 16.7V18.2H8C8.25 18.2 8.5 18.4 8.5 18.7C8.5 19 8.3 19.2 8 19.2Z" fill="#0DB89A"/>
                </g>
                <defs>
                    <clipPath id="clip0_11_2727">
                        <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                </defs>
            </svg>
            <div class="flex flex-col justify-center">
                <p class="font-medium">${method} $<span>${amount}</span></p>
                <p class="text-xs text-stone-700">${timeSet}</p>
            </div>
        </div>
    `;
    
    document.getElementById('transitions').insertAdjacentHTML('afterbegin', transitionHTML);
}

// Do Modal
const docModal = document.getElementById('docModal')
const docModalBtn = document.getElementById('docModalBtn')
const callModal = document.getElementById('callModal')

callModal.addEventListener("click", function(){
    docModal.style.display = 'flex'
})

docModalBtn.addEventListener("click", function(){
    docModal.style.display = 'none'
})

document.getElementById('hidebar').addEventListener("click", function(){
    document.getElementById('docBar').style.display = 'none'
})
// Copy Doc Value
function copyValue(value){
    navigator.clipboard.writeText(value);
    alert(`${value} copy to clipboard`)
}