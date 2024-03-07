const medicines = [];

// Selecting the elements from the DOM
const medicineRegistrationForm = document.querySelector(".medicine-registration-form");
const displayMedicineList = document.querySelector(".display-medicine-list");

const productName = document.querySelector('.medicine-name');
//const productId = document.querySelector('.medicine-id');
const manufacturer = document.querySelector('.medicine-manufacturer');
const expirationDate = document.querySelector('.expiration-date');
const quantity = document.querySelector('.quantity');

// Adding the event listener
medicineRegistrationForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    const newMedicine = new Tablet(productName.value, manufacturer.value, expirationDate.value, quantity.value);
    Pharmacy.addTablet(newMedicine);
    medicineRegistrationForm.reset();
});

// Declaring the Medicine class
class Medicine {
    constructor(name, manufacturer, expirationDate) {
        this.name = name;
        //this.id = id;
        this.manufacturer = manufacturer;
        this.expirationDate = expirationDate;
        this.ID = Date.now();
    }
}

// Declaring the Paracet class that inherits from Medicine
class Tablet extends Medicine {
    constructor(name, manufacturer, expirationDate, quantity) {
        super(name, manufacturer, expirationDate);
        this.quantity = quantity;//Initializing new property in inheritance class
    }
}

// Declaring the Pharmacy class
class Pharmacy {
    static addTablet(product) {
        medicines.push(product);
        this.saveTabletToStorage();
        this.displayTablet();
    }

    static deleteTablet(id) {
        const index = medicines.findIndex(product => product.ID.toString() === id.toString());
        if (index !== -1) {
            console.log("Found product at index:", index);
            medicines.splice(index, 1);
            this.saveTabletToStorage();
            this.displayTablet();
        }
    }

    static displayTablet() {
        displayMedicineList.innerHTML = '';
        medicines.forEach(product => {
            const listItem = document.createElement('li');
            const nameSpan = document.createElement('span');
            const manufacturerSpan = document.createElement('span');
            const expirationDateSpan = document.createElement('span');
            const quantitySpan = document.createElement('span');
            const deleteButtonContainer = document.createElement('span');
            const deleteButton = document.createElement('button');
        
            nameSpan.textContent = product.name;
            manufacturerSpan.textContent = product.manufacturer;
            expirationDateSpan.textContent = product.expirationDate;
            quantitySpan.textContent = product.quantity;
            deleteButton.textContent = 'Delete X';
        
            listItem.classList.add('product-row');
            deleteButton.classList.add('delete-button');
        
            listItem.dataset.id = product.ID; // Ensure dataset.id is set to product.ID
        
            deleteButton.addEventListener('click', (e) => {
                const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
                console.log("Row ID:", rowID); // debugging
                if (rowID) {
                    Pharmacy.deleteTablet(rowID);
                } else {
                    console.error("Row ID is undefined!");
                }
            });
        
            displayMedicineList.appendChild(listItem);
            listItem.append(nameSpan, manufacturerSpan, expirationDateSpan, quantitySpan, deleteButtonContainer);
            deleteButtonContainer.append(deleteButton);
        });
    }

    static saveTabletToStorage() {
        localStorage.setItem('medicines', JSON.stringify(medicines));
    }

    static loadTabletFromStorage() {
        const storedProducts = JSON.parse(localStorage.getItem('medicines'));
        return storedProducts ? storedProducts : [];
    }
}

// Initialize pharmacy 
Pharmacy.loadTabletFromStorage();
Pharmacy.displayTablet();