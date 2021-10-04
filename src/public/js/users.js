let instanceUsers = null; 

class Users{
    constructor(){
        this.url = window.origin; 
        this.categorySelected = null; 
        this.tableElement =  
        document.querySelector('#body-users');  
        this.user = 
        document.querySelector('#username');
        this.name = 
        document.querySelector('#name');
        this.lastname = 
        document.querySelector('#lastname');
        this.password = 
        document.querySelector('#pwd');
        this.cpassword = 
        document.querySelector('#pwdconfirm');
        this.usertype = 
        document.querySelector('#usertype');

        this.saveChanges = 
        document.querySelector('#save-changes');

        if (this.tableElement !== null){
            this.addListenersClick(this.tableElement);            
        }                    
        if (this.saveChanges !== null){
            this.addListenersClick(this.saveChanges);
        }
    }

    //Procesar eventos
    processEvents(event){
        switch(event.target.className){
            case "item-d-a":
                instanceUsers.deleteUser(event.target,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1].cells[2].innerText, 
                    this.rows[event.target.parentElement.parentElement.rowIndex-1]);
                break;
            case "item-e-a":
                instanceUsers.editUser(event.target,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1].cells[2].innerText,
                    this.rows[event.target.parentElement.parentElement.rowIndex-1]);
                break;                     
        }
        switch(event.target.id){
            case "save-changes":
                instanceUsers.processUser(event.target);
            break;    
            case "cancel-save":
                instanceUsers.cancelSave(event.target);
            break;
        }
    }


    deleteUser(target, user,currentRow){
        this.userSelected = user;
        this.currentRow = currentRow;
        if (target.parentElement.parentElement !== null){                
            target.parentElement.parentElement.remove();            
            try {
                fetch(this.url + "/Users/delete", {
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


    processInfoUser(json){
        if (json != null){
            this.user.value = json[0].usrinterno; 
            this.name.value = json[0].nombre; 
            this.lastname.value = `${json[0].amaterno} ${json[0].apaterno}`;
            
        }
    }

        // Devolver informacion para editar categoria. 
        editUser(target,user,currentRow){            
            this.userSelected = user;            
            try {
                fetch(window.location.origin + "/users/find", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ 
                        "username":  this.userSelected
                    })
                }).then(response => response.json())
                .then((json)=>{                    
                    this.processInfoUser(json);
                    $('#dialog-edit').modal();
                })
                .catch((e)=>{
                    throw new Error(e);
                })                
            }catch(e){
                alert(e);
            }
        }

    cancelSave(target){
        $('#dialog-edit').modal('hide');
    }
    //Inicializar listeners
    addListenersClick(item){
        if (item !== null && item!==undefined){            
            item.addEventListener('click', this.processEvents, false);
        }
    }        
}


window.addEventListener('load', function(event){
    if (instanceUsers == null){
        instanceUsers = new Users();         
    }
}, false);