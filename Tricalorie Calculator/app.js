// Local Storage Module
// const LocalStorageCtrl = function() {

// }();

// Item Module
const ItemCtrl = (function(){
    // Item Constructor 
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [
            // {id:0, name: 'Steak Dinner', calories: 1200},
            // {id:1, name: 'Cookie', calories: 400}, 
            // {id:2, name: 'Eggs Dinner', calories: 300}
        ], 
        currentItem: null, 
        totalCalories: 0
    }


    // Public methods
    return {
        getItems: function() {
           return data.items;
        },
        addItem: function(name, calories) {
            let ID;

            // Create ID
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID =0;
            }


            // Calories to number 
            calories = parseInt(calories);

            // Create new Item
            newItem = new Item(ID, name, calories)

            // Add to item array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            data.items.forEach(item => {
                if(item.id === id){
                    found = item;
                }
            });

            return found
        },
        updateItem: function(name, calories) {
            // Calories to number
            calories = parseInt(calories);

            let found = null; 


            data.items.forEach(item => {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;

                    found = item;
                }
            });

            return found;
        },
        deleteItem: function() {
            let deletedItem = data.currentItem; 

            data.items = data.items.filter(item => item.id != data.currentItem.id);

            return deletedItem;
        },
        clearItems: function() {

            data.items = [];
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;

            data.items.forEach(item => {
                total += item.calories;
            })

            data.totalCalories = total;

            return data.totalCalories;

        },
        logData: function() {
            return data;
        }
    }
})();

// UI Module
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories', 
        totalCalories: '.total-calories',
        clearBtn: '.clear-btn'
    }
    
    // Public methods
    return {
        populateItemList: (items) => {
            let html = '';
            items.forEach((item) => {
                html +=`
                <li class="collection-item" id=${item.id}>
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `
            });

            // Insert List items
            document.querySelector(UISelectors.itemList).innerHTML = html
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            // Show the list 
            document.querySelector(UISelectors.itemList).style.display = 'block'

            // Create li element
            const li = document.createElement('li');
            // Add Class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`
            // Add HTML
            li.innerHTML =`
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = 
                    `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                    `
                }
            })
        },
        deleteListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                   listItem.parentNode.removeChild(listItem);
                }
            })
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        clearEditState: function() {
            UICtrl.clearInput();

            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
        },
        clearItems: function() {
            UICtrl.hideList();

            document.querySelector(UISelectors.itemList).innerHTML = '';
        }, 
        getBackState: function() {
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
        },
        showEditState: function() {
            document.querySelector(UISelectors.addBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

            UICtrl.showEditState();
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent =totalCalories;
        },
        getSelectors: function() {
            return UISelectors;
        }
    }
})();

//App Module
const App = function(ItemCtrl, UICtrl) {
   // Load Event listeners
    const loadEventListeners = () => {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();


        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter 
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();

                return false;
            }
        });

        // Add Update Item event 
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);


        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Get Back to initial state
        document.querySelector(UISelectors.backBtn).addEventListener('click', getBackClick);


        // Clear item event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearItemClick);
    }

    // Add item submit
    const itemAddSubmit = function(e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            // Add Item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add Item to UI List 
            UICtrl.addListItem(newItem);

            // Get Total Calories 
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Show total calories 
            UICtrl.showTotalCalories(totalCalories);

            // Clear Input
            UICtrl.clearInput();

        }

        e.preventDefault();
    }

    // Update Item Submit 
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;

            // Break into array
            const listIdArr = listId.split('-');

            // Get actual id 
            const id = parseInt(listIdArr[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set CurrentItem
            ItemCtrl.setCurrentItem(itemToEdit);

            //Add item to form
            UICtrl.addItemToForm(); 
        }
        e.preventDefault()
    }

    const itemUpdateSubmit = function(e){

        // get Item Input 
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update Item from UI
        UICtrl.updateListItem(updatedItem);

        // Clear Edit state
        UICtrl.clearEditState();

        // Get Total Calories 
        const totalCalories = ItemCtrl.getTotalCalories();
            
        // Show total calories 
        UICtrl.showTotalCalories(totalCalories);

        e.preventDefault();
    }

    const itemDeleteSubmit = function(e) {

        // get Item Input 
        const input  = UICtrl.getItemInput();

        // Delete Item
        const deletedItem = ItemCtrl.deleteItem(input.name, input.calories); 

        // Delete Item from UI
        UICtrl.deleteListItem(deletedItem);

        // Clear Edit state
        UICtrl.clearEditState();

        // Get Total Calories 
        const totalCalories = ItemCtrl.getTotalCalories();
             
        // Show total calories 
        UICtrl.showTotalCalories(totalCalories);

        e.preventDefault();
    }

    const getBackClick = function(e) {
        // Clear Edit state
        UICtrl.getBackState();


        e.preventDefault();
    }

    const clearItemClick = function(e) {

        // Clear Items
        ItemCtrl.clearItems();

        // Clear Items from Ui
        UICtrl.clearItems();

        // Get Total Calories 
        const totalCalories = ItemCtrl.getTotalCalories();
             
        // Show total calories 
        UICtrl.showTotalCalories(totalCalories);

        e.preventDefault()
    }


     // Public Methods 
     return {
         init: function () {

            UICtrl.clearEditState();

            const items = ItemCtrl.getItems();

            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }

            // Get Total Calories 
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Show total calories 
            UICtrl.showTotalCalories(totalCalories);

            // Load Event Listeners
            loadEventListeners();
         } 
     }
}(ItemCtrl, UICtrl);

//Initialize App
App.init();