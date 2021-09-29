let drawerManger = null; 

class MenuDrawer{
    constructor(){
        this.wrapper = document.querySelector('.wrapper');
        this.buttonMenu = document.querySelector('.img-menu');
        this.containerMenu = document.querySelector('.container-menu');
        this.finder = document.querySelector('.wrapper-search');
        this.path = document.querySelector('.menu-url');        
        this.statusDrawer = "open";
        this.RequestMenu();
    }  

    BindItems(data){
            console.log(data);
            this.containerMenu.innerHTML = data;
            // Menu
            this.items = document.querySelectorAll('.menu-item');
            // Botón de configuración
            this.settings = document.querySelector('.img-settings');
            // Sub menu 
            this.childs = document.querySelectorAll('.menu-item-c');
            // Buscador
            this.closefinder = document.querySelector('.close-x-finder');
            
            if (this.wrapper != null){              
                if (this.buttonMenu != null){
                    this.buttonMenu.addEventListener('click', 
                    this.ProcessEvents, false);
                }              
                if (this.items != null){
                    this.containerMenu.addEventListener('click', 
                    this.ProcessEvents, false);
                }
                if (this.settings != null){
                    this.settings.addEventListener('click', 
                    this.ProcessEvents, false);
                }            
                if (this.closefinder != null){
                    this.closefinder.addEventListener('click', 
                    this.ProcessEvents, false);
                }
                if (this.finder != null){
                    this.finder.addEventListener('click',   
                    this.ProcessEvents, false);
                }
            }
        }


    RequestMenu(){
        if (document.URL.indexOf('login') == -1){            
            try {
                fetch(window.location.origin + "/permissions", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ "cCode": 'data' })
                }).then(response => response.json())
                .then((json)=>{                    
                    this.BindItems(json);
                })
                .catch((e)=>{
                    throw new Error(e);
                })                
            }catch(e){
                alert(e);
            }
        }
    }


    ProcessEvents(event){
        if (event.target.className.indexOf('s-link')!=-1){
            drawerManger.OpenUrl(event.target, event);
            return;
        }
        if (event.target.className.indexOf('close-x-finder')!=-1){
            drawerManger.CloseFinder(event.target, event);
            return;
        }
        if (event.target.className.indexOf('img-settings')!=-1){
            drawerManger.ShowSettings(event.target, event);
            return;
        }
        if(event.target.className.indexOf("container-image")!=-1){
            return;
        }
        if ((event.target.className.indexOf("menu-item") != -1) ||
            (event.target.className.indexOf("item") != -1)){
            drawerManger.SelectMenuItem(event.target, event);
            return;
        }        
        if (drawerManger.statusDrawer == "closed"){
            drawerManger.OpenDrawer();
            return;
        }
        if (drawerManger.statusDrawer == "open"){
            drawerManger.CloseDrawer();
            return;
        }        
    }


    OpenUrl(item, event){
        if (item != null){
            if (item.getAttribute('data') != undefined){                
                document.location.href = window.origin + item.getAttribute('data');
            }
        }
    }
    CloseFinder(item, event){
        this.finder.className = "wrapper-search search-hidden";
    }


    ShowSettings(item, event){
        alert('clicked on settings button');
    }


    BindItemSubmenu(container, item, event){
        if (container != null){
            if (document.URL.indexOf('login') == -1){            
                try {
                    fetch(window.location.origin + "/options", {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ "cData": item.getAttribute('data') })
                    }).then(response => response.json())
                    .then((json)=>{                    
                        container.innerHTML = json;
                    })
                    .catch((e)=>{
                        throw new Error(e);
                    })                
                }catch(e){
                    alert(e);
                }
            }
        }
    }

    SelectMenuItem(item, event){    
        if (item.className.indexOf("child") == -1){    
            this.items.forEach((item)=>{            
                item.className ="menu-item";            
            });
        }
        if (item.className.indexOf("child") != -1){
            this.path.innerHTML = `>${item.innerHTML}`;
            this.finder.className="wrapper-search search-show"
            this.BindItemSubmenu(this.finder,item, event);            
        }
        if (item.className == "menu-item"){      
            this.path.innerHTML = item.innerHTML;      
            item.className= "menu-item selected";                        
            // Muestra elementos hijos 
            this.childs.forEach((target)=>{
                if (target.getAttribute("target") != null){
                    if (item.getAttribute("target") != null){
                        if (target.getAttribute("target") == item.getAttribute("target")){                            
                            if (target.className.indexOf('child-open')!=-1){
                                target.className ="child menu-item-c child-closed"; 
                            }else{
                                target.className ="child menu-item-c child-open";
                            }
                        }
                    }else{                        
                        target.className ="child menu-item-c child-closed";  
                    }
                }                
            });          
        }
        if (item.className=="item"){
            item.parentElement.className = "menu-item selected";            
            this.childs.forEach((target)=>{                
                if (target.getAttribute("target") != null){
                    if (item.getAttribute("target") != null){
                        if (target.getAttribute("target") == item.getAttribute("target")){                            
                            if (target.className.indexOf('child-open')!=-1){
                                target.className ="child menu-item-c child-closed"; 
                            }else{
                                target.className ="child menu-item-c child-open";
                            }
                        }
                    }else{                        
                        target.className ="child menu-item-c child-closed";  
                    }
                }                
            });          
        }
    }


    OpenDrawer(){
         if(this.statusDrawer.indexOf("closed")!= -1) {
        this.statusDrawer = "open";
        this.wrapper.className = "wrapper open-drawer";
        this.containerMenu.className = "container-menu";          
      }
    }


    CloseDrawer(){
      if (this.statusDrawer.indexOf("open") != -1){
        this.statusDrawer = "closed"
        this.wrapper.className = "wrapper"
        this.containerMenu.className = "container-menu closed-menu";
        this.CloseFinder();
      }
    }  
  }


window.addEventListener('load', function() {
    if (drawerManger == null){
        drawerManger = new MenuDrawer();
    }
}, false);