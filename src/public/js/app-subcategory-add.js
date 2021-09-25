
let appSubCategoryInstance = null; 

class appSubCategoryCreate{    
    constructor(){          
        this.url = window.origin;           
        this.catid = 
        document.querySelector('#cat-id');
        this.scatid = 
        document.querySelector('#scat-id');
        this.name = 
        document.querySelector('#scat-name');
        this.description = 
        document.querySelector('#scat-description');
        this.large = 
        document.querySelector('#scat-des-large');        
        this.saveChanges = 
        document.querySelector('#save-changes');
        this.cancel = 
        document.querySelector('#cancel-save');
                      
        if (this.saveChanges !== null){
            this.addListenersClick(this.saveChanges);
            this.addListenersClick(this.cancel);
        }
    }
    
    // Guardar una categoria editada.
    savesubCategory(target,event){        
        try {
            this.verifyInputs();         
        } catch (err) {
            alert(err);
            event.preventDefault();
        }    
    }
    //Verificar entrada de datos
    verifyInputs(){
        if (this.catid.value == "" || this.catid.length == 0)
            throw new Error("La categoria no puede estar vacia");
        if (this.name.value == "" || this.name.value.length == 0)
            throw new Error("El nombre de la categoria es obligatorio");
        if (this.description.value == "" || this.description.length == 0)
            throw new Error("La categoria requiere una descripción");
        if (this.large.value == "" || this.large.length == 0)
            throw new Error("La categoria requiere una descripción larga");
    }
    
    //Cacecelar operación
    cancelSave(target){
        document.location.href = window.origin+"/Subcategory";
    }
  
    //Procesar eventos
    processEvents(event){      
        switch(event.target.id){
            case "save-changes":
                appSubCategoryInstance.savesubCategory(event.target,event);
            break;    
            case "cancel-save":
                appSubCategoryInstance.cancelSave(event.target);
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
    if (appSubCategoryInstance == null){
        appSubCategoryInstance = new appSubCategoryCreate();
    }
}, false);


