let dashboardInstance = null; 
class Dashboard{
    constructor(){     
      if (document.location.href.indexOf('Dashboard') != -1){
        this.dashboard = document.querySelector('.dashboard-container');
        this.indicator = document.querySelector('.indicator-container');
        this.reports = document.querySelector('.report-container');
        this.bodyreport = document.querySelector('.body-report');
        this.contInd = this.indicator.querySelector('.item-indicator');        
        this.contDashboard = document.querySelector('.container-dashboard');
        this.UpdateReports();
        this.UpdateIndicators();
        this.UpdateDashboard();
      }
    }
    BindIndicator(json){
        this.contInd.innerHTML = json;
    }
    BindReports(json){
        this.bodyreport.innerHTML=json;
    }
    BindDashboard(json){
      this.contDashboard.innerHTML = json;
    }
    UpdateDashboard(){
      if (this.dashboard != null){
        try {
            fetch(window.location.origin + "/vdashboard", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ "cCode": 'data' })
            }).then(response => response.json())
            .then((json)=>{                    
              this.BindDashboard(json);        
            })
            .catch((e)=>{
                throw new Error(e);
            })                
        }catch(e){
            alert(e);
        }
      }
    }
    UpdateReports(){
      if (this.reports != null){
        try {
            fetch(window.location.origin + "/vreports", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ "cCode": 'ADM' })
            }).then(response => response.json())
            .then((json)=>{                    
                this.BindReports(json);
            })
            .catch((e)=>{
                throw new Error(e);
            })                
        }catch(e){
            alert(e);
        }
      }
    }
    UpdateIndicators(){
      if (this.indicator != null){
        try {
            fetch(window.location.origin + "/vindicators", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ "cCode": 'data' })
            }).then(response => response.json())
            .then((json)=>{                    
                this.BindIndicator(json);
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
    }

  }

  window.addEventListener('load', function(){
    if (dashboardInstance == null){
        dashboardInstance = new Dashboard();                 
    }
  },false);