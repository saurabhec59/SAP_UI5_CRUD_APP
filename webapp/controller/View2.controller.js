sap.ui.define([
    "projectlearning/controller/App.Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],function(Controller,MessageToast,JSONModel){
    return Controller.extend("projectlearning.controller.View2",{

        onInit: function(){
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onRouteMatched, this);
            // this.getOwnerComponent().getRouter() ==> will return the router object of the app.
            // getRoute("RouteView2") ==> will returns the SAPUI5 Route object that was created by the Router from the route configuration named "RouteView2" in manifest.json.
            // attachPatternMatched(this.onRouteMatched, this) ==>
            // just like press="onAddEmpPress" ==> here 'press' is the event and 'onAddEmpPress' is the event handler function,
            // similarly here 'patternMatched' is the event, 'onRouteMatched' is event handler function and 'attachPatternMatched' is the method which register listener.
            // so when the route is matched, the event handler function 'onRouteMatched' will be called. 
        },

        onRouteMatched: function(oEvent){
            console.log(oEvent.getParameter("arguments").id);
            // whenever a route is matched, that route object itself fires an event called 'patternMatched' which containes the info about paremeters passed in the route.
            // attachPatternMatched() job is to register a callback function like 'onRouteMatched' that should be called whenever the 'patternMatched' event is fired.
            // getParameter() => when patternMatched event contains the info about the parameters passed in the route via navTo() and getParameter("arguments") will return the object of all the parameters passed in the route. 
            MessageToast.show("Route matched with id: " + oEvent.getParameter("arguments").id);
        }
    })
})