sap.ui.define([
    "projectlearning/controller/App.Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function(Controller,MessageToast,JSONModel){
    return Controller.extend("projectlearning.controller.View1",{

        onInit: function(){
            // the previously defined local model is now moved and set to component level in Component.js
            // 2 changes are made for this in this file: 
            // 1. all the calls to "this.getView().getModel().." are changed to this.getView().getModel("empModel")..because now the View1 is inheriting 
            // multiple models from component level and we need to specify the name of model to be used.
            // 2. all the bindingContext().. are changed to bindingContext("empModel").. because
            // if a control is bound to a named model than to get the binding context of same model we should write " bindingContext("namedModel").."
            // Also instead of "this.getView().getModel("empModel").." we can write "this.getOwnerComponent().getModel("empModel").."
        },

        // Read
        onEmpListItemPress: function(oEvent){
            var data = oEvent.getSource().getBindingContext("empModel").getObject();
            // getSource() will return the object of control which fired this event, here it is list item.
            // getBindingContext() will return the exact path which was bound to the control like /employees/0
            // getObject() will return the data of that path like { name: "", age:0 }
            // so here variable data will have the exact json object which was bound to clicked control
            MessageToast.show("Name: " + data.name + "Age: " + data.age);
        },

        // Delete
        // modifying the press function of list item to delete the list item after clicking on it.
        onEmpListItemPress2: function(oEvent){
            var itemIndex = oEvent.getSource().getBindingContext("empModel").getPath().split("/").pop();
            // oEvent.getSource().getBindingContext().getPath() ==> till here it will return the path of the clicked element like /employees/0 as String
            // split("/") ==> means split the path string whereever u see "/" so eventually something like [ "", "employees", "0"]
            // pop() ==> will return the last element means the index of the clicked element

            // now find the array from where deletion is to be done which is "/employees" here in our case.
            var empArray = this.getView().getModel("empModel").getProperty("/employees");
            empArray.splice(itemIndex, 1);

            // this.getView().getModel().getProperty("/employees") ==> this part already understand that will return the array.
            // splice(i, j) ==> it use to delete and element from array. 
            // here 'i' is the index of element from where deletion has to be done and 'j' is the no of element from i to be deleted. 

            // now since modified array is in empArray so we need to set it back to model.
            this.getView().getModel("empModel").setProperty("/employees", empArray);
        },

        // update
        // Requirement is to increate the age of emp by 1 on clicking on list i
        onEmpListItemPress3: function(oEvent){
            // getting path till age of clicked emp
            var path = oEvent.getSource().getBindingContext("empModel").getPath() + "/age";
            // getting age value
            var age = this.getView().getModel("empModel").getProperty(path);
            // updating age value by 1
            this.getView().getModel("empModel").setProperty(path, age + 1);
            // using getProperty() we can get age value of clicked employee
            // using setProperty() we can set the new value of age to model
            // but both needs tha path till the "age" property of clicked emp and that
            // using oEvent.getSource().getBindingContext().getPath()+"/age" we can get path till age of clicked emp.
            // using getView().getModel().getProperty() or setProperty() we can fetch or set the value.
        },

        onEmpListItemPress4: function(oEvent){
            var data = oEvent.getSource().getBindingContext("empModel").getObject();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(
                "RouteView2",{
                    id: data.id
            })
            // here instead of passing just "name" (RouteView2) for the route, we are passing an additional parameter "id" of the clicked emp.
            // and in manifest.json I changed route pattern to "View2/{id}" so that we can pass the id of clicked emp to view2 and in view2 we can get the id of clicked emp and then fetch the data of that emp from model and display it in view2.
            // but notice onNavigateToVew2 handler of button is now broken because in that handler we are still passing the same name "RouteView2" which is fine but 
            // route pattern in now expecting an additional mandatory parameter "id" which is not being passed in 'onNavigateToVew2'.
            // so eventually onNavigateToVew2 handler is able to find the route with name but it is not able to resolve it.
            // because with name you find the route but the next step is building url which is done according to pattern and this is where 'onNavigateToVew2' is failing.
        },

        // Create
        onAddEmpPress: function(){
            var name = this.getView().byId("empNameInput").getValue();
            var age = this.getView().byId("empAgeInput").getValue();
            var empArray = this.getView().getModel("empModel").getProperty("/employees");
            empArray.push({ name: name, age: age});
            this.getView().getModel("empModel").setProperty("/employees", empArray); // setProerty() triggers the ui update as well so no extra worry.

            // here we 1st get both input fields via their id's and extracted the inputed values 
            // then get the existing employee array, pushed the new employee object to that array and set the updated array back to model,
            // this.getView().byId("empNameInput") ==> will return the input control object 
            // .getValue() ==> will return the value entered in that input field [ why not oEvent.getSource() because it will return the object of 'Add' button not input fields]
            //.push() ==> used to add a new element(object) at the end of an existing array.
            // so in sort, get the existing array from model, push the new array and set the updated array back to original model.

        },

        /* function to add fragment having root control VBox to view1
        significance of " var that = this; "  <<= here "this" is the object of controller and we are storing it in a local variable named "that" 
        reason : 
        1st inside the callback function of loadFragment() the "this" will not refer to controller object so keeping that reference in 'that' var will 
        help to get the view as "that.getView()" inside callback of loadFragment().
        2nd is the returned object of root control of fragment via loadFragment() is also available withing the callback scope only, 
        so later when this returned/ loaded fragment object is needed to remove it from the view than this will not be available in the controller object 'this'.
        so when we does "that.AddEmpVBox = oVBox;" we are storing the returned fragment object in controller object so that it can be used later to remove it from view.
        */
       /* #1
            after clicking cancel button on fragments, when tried reopening the fragment then it was not opening because
            once the fragment object created then the controls with the fixed id's like '<Label text = "Name" labelFor = "inputName2"></Label>'
            and when we are pressing cancel button and line 'this.getView().byId("addEmpVBox").removeItem(this.AddEmpVBox);' or 
            'this.AddEmpDialog.close();' is executed then these methods like removeItem() or close() are only removing or detaching the fragment object 
            from the view or ui tree but the fragment object and their controls with fixed id's are still present in memory, so when we are again trying to open the fragment
            then these handlers 'onAddEmpPress1' were trying to create the fragment again with same control id's which is not allowed and sapui5 throws error of Duplicate id's.
            Even if there are no id's in fragment or it's controls then the fragment may get created successfully and open again but remember previously created object still exists
            in memory so to avoid this we did check "#1" in both handlers.
            #2
            Another approch could be to destroy the fragment object after closing like in 'onAddEmpDialogCancelPress' we can do:
            "this.AddEmpDialog.destroy();  this.AddEmpDialog = null;"  instead of "this.AddEmpDialog.close();"
       */
        onAddEmpPress1: function(){
            if(this.AddEmpVBox){ // --- #1
                this.getView().byId("addEmpVBox").addItem(this.AddEmpVBox);
                return;
            }
            var that = this;
            this.loadFragment({
                name: "projectlearning.view.fragments.AddEmpVBox"
            }).then(function(oVBox){
                that.AddEmpVBox = oVBox; // storing returned fragment object in controller object so that it do not get lost after callback scope.
                that.getView().byId("addEmpVBox").addItem(oVBox);
            })
        },

        // function to add fragment having root control Dialog to view1
        onAddEmpPress2: function(){
            // if(this.AddEmpDialog){
            //     this.AddEmpDialog.open();
            //     return;
            // }
            var that = this;
            this.loadFragment({
                name: "projectlearning.view.fragments.AddEmpDialog"
            }).then(function(oDialog){
                that.AddEmpDialog = oDialog;
                oDialog.open();
            })
        },

        onAddEmpDialogCancelPress: function(oEvent){
            this.AddEmpDialog.close();
            // oEvent.getSource().getParent().getParent().close();
            /* this is another way to close the dialog. Lets decode it:
            oEvent.getSource() => will return the object of that cancle button which fired this event. (see in the AddEmpDialog.fragment.xml)
            .getParent() => will return the parent of cancle button which is HBox 
            next .getParent() => will return the parent of HBox which is 'Dialog' itself and since it is root control of fragment which was returned by 
            loadFragment() so we can call 'close()' method on it.
            But still storing the returned object of fragment is still better because .getParent() may be fragile if fragment structure is changed in future.
            */
            
        },

        onAddEmpVBoxCancelPress: function(oEvent){
            this.getView().byId("addEmpVBox").removeItem(this.AddEmpVBox);
            // this.getView().byId("addEmpVBox").removeItem(oEvent.getSource().getParent().getParent());
            // here also this .getParent() will work. see explanation in 'onAddEmpDialogCancelPress' function.
        },

        onNavigateToVew2: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView2");
            // this.getOwnerComponent() ==> will return the top level component object of the app, here it is Component.js
            // because Component.js is the top level component which initializes the router.
            // .getRouter() ==> will return the router object which is initialized in Component.js
            // .navTo("RouteView2") ==> will navigate to the route which is defined in manifest.json with name "RouteView2"
        },

        onNavigateToView1: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1");
        }


        
    })
})