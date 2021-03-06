let appsubCategoryInstance = null; 

class appsubCategory{    
    constructor(){          
        this.url = window.origin; 
        this.categorySelected = null; 
        this.tableElement =  
        document.querySelector('#body-subcategory');  
        this.catid =         
        document.querySelector('#cat-id');
        this.subcategory = 
        document.querySelector('#scat-id');
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
                fetch(this.url + "/api/Subcategory/delete", {
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
        fetch( this.url + "/api/Subcategory/"+category)
                .then((response) => response.json())
                .then((json) => {       
                this.catid.innerHTML = `<option value=${json[0].codeCategoria}>${json[0].codeCategoria}</option>`;
                this.subcategory.value = json[0].subcategoria;
                this.name.value  = json[0].nombresubCategoria;                         
                this.description.value = json[0].descripcionsubCategoria;
                this.large.value = json[0].descripcionLarga;
                this.title.innerHTML = 
                `Editar categoria ${json[0].code}.-${json[0].nombreCategoria}`;                
            })
        fetch( this.url + "/api/Category/list")
            .then((response) => response.json())
            .then((json) => {       
            json.items.forEach(element => {
                this.catid.innerHTML += `<option value=${element.code}>${element.code}.-${ element.nombreCategoria}</option>`;    
            });                                            
            $('#dialog-edit').modal();
        })
    }

    // Guardar una categoria editada.
    saveCategory(target){        
        try {
            this.verifyInputs();
            fetch(this.url + "/Subcategory/add", {
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
    //Verificar entrada de datos
    verifyInputs(){
        if (this.categorySelected == null || this.categorySelected.length == 0)
            throw new Error("La categoria no puede estar vacia");
        if (this.name.value == "" || this.name.value.length == 0)
            throw new Error("El nombre de la categoria es obligatorio");
        if (this.description.value == "" || this.description.length == 0)
            throw new Error("La categoria requiere una descripci??n");
        if (this.large.value == "" || this.large.length == 0)
            throw new Error("La categoria requiere una descripci??n larga");
    }
    
    //Cacecelar operaci??n
    cancelSave(target){
        $('#dialog-edit').modal('hide');
    }
  
    //Procesar eventos
    processEvents(event){
        switch(event.target.className){
            case "item-d-a":
                appsubCategoryInstance.deleteCategory(event.target,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1].cells[0].innerText, 
                    this.rows[event.target.parentElement.parentElement.rowIndex-1]);
                break;
            case "item-e-a":
                appsubCategoryInstance.editCategory(event.target,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1].cells[0].innerText,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1]);
                break;                     
        }
        switch(event.target.id){
            case "save-changes":
                appsubCategoryInstance.saveCategory(event.target);
            break;    
            case "cancel-save":
                appsubCategoryInstance.cancelSave(event.target);
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
    if (appsubCategoryInstance == null){
        appsubCategoryInstance = new appsubCategory();
    }
}, false);


