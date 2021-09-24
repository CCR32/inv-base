let appCategoryInstance = null; 

class appCategory{    
    constructor(){          
        this.url = window.origin; 
        this.categorySelected = null; 
        this.tableElement =  
        document.querySelector('#body-category');  
        this.name = 
        document.querySelector('#cat-name');
        this.description = 
        document.querySelector('#cat-description');
        this.large = 
        document.querySelector('#cat-des-large');
        this.title = 
        document.querySelector('.modal-title');
        this.saveChanges = 
        document.querySelector('#save-changes');

        if (this.tableElement !== null){
            this.addListenersClick(this.tableElement);            
        }                    
        if (this.saveChanges !== null){
            this.addListenersClick(this.saveChanges);
        }
    }

    refreshCategory(target, category){
        fetch(this.url +"/Category/" + category)
        .then((response) => response.json())
        .then((json) => {            
                this.currentRow.cells[1].innerText = json[0].nombreCategoria;                         
                this.currentRow.cells[2].innerText = json[0].descripcionCategoria;
                this.currentRow.cells[3].innerText = json[0].descripcionLarga;
        })
    }
    //Eliminar una categoria 
    deleteCategory(target, category,currentRow){
        this.categorySelected = category;
        this.currentRow = currentRow;
        if (target.parentElement.parentElement !== null){                
            target.parentElement.parentElement.remove();            
            try {
                fetch(this.url + "/Category/delete", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "cCode": category })
                }).then(response => {
                    if (response.statusText.includes("OK")) {
                        alert("Registro eliminado");                        
                    }
                }).catch(error => {
                    alert(error)
                })
            } catch (err) {
                alert(err);
            }
        }
    }
    // Devolver informacion para editar categoria. 
    editCategory(target,category,currentRow){
        this.categorySelected = category;
        this.currentRow = currentRow;
        fetch( this.url + "/Category/"+category)
                .then((response) => response.json())
                .then((json) => {         
                this.name.value = json[0].nombreCategoria;                         
                this.description.value = json[0].descripcionCategoria;
                this.large.value = json[0].descripcionLarga;
                this.title.innerHTML = 
                `Editar categoria ${json[0].code}.-${json[0].nombreCategoria}`;
                $('#dialog-edit').modal();
            })
    }

    // Guardar una categoria editada.
    saveCategory(target){
        try {
            fetch(this.url + "/Category/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    "cCodigo": this.categorySelected,   
                    "cNombreCategoria": this.name.value,
                    "cDescripcionCategoria":this.description.value,
                    "cDescripcionLarga": this.large.value   
                 })
            }).then(response => {
                if (response.statusText.includes("OK")) {
                    alert("Registro actualizado");                        
                    this.refreshCategory(target, 
                    this.categorySelected)
                    $('#dialog-edit').modal('hide');
                }
            }).catch(error => {
                alert(error)
            })
        } catch (err) {
            alert(err);
        }    
    }

    cancelSave(target){
        console.log('cancel');
    }
  
    //Procesar eventos
    processEvents(event){
        switch(event.target.className){
            case "item-d-a":
                appCategoryInstance.deleteCategory(event.target,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1].cells[0].innerText, 
                    this.rows[event.target.parentElement.parentElement.rowIndex-1]);
                break;
            case "item-e-a":
                appCategoryInstance.editCategory(event.target,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1].cells[0].innerText,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1]);
                break;                     
        }
        switch(event.target.id){
            case "save-changes":
                appCategoryInstance.saveCategory(event.target);
            break;    
            case "cancel-save":
                appCategoryInstance.cancelSave(event.target);
            break;
        }
    }
    //Inicializar listeners
    addListenersClick(item){
        if (item !== null && item!==undefined){            
            item.addEventListener('click', this.processEvents, false);
        }
    }        
};

window.addEventListener('load', function(event){
    if (appCategoryInstance == null){
        appCategoryInstance = new appCategory();
    }
}, false);


