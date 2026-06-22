sap.ui.define([
    "projectlearning/controller/App.Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function(Controller,MessageToast,JSONModel){
    return Controller.extend("projectlearning.controller.View1",{

        onInit: function(){
            var data = { 
                employees: [
                    {
                        name: "Aman",
                        age: 25
                    },
                    {
                        name: "Rahul",
                        age: 30
                    },
                    {
                        name: "Priya",
                        age: 28
                    }
                ]
            }
            var model = new JSONModel(data);
            this.getView().setModel(model);
        },

        onEmpListItemPress: function(oEvent){
            var data = oEvent.getSource().getBindingContext().getObject();
            // getSource() will return the object of control which fired this event, here it is list item.
            // getBindingContext() will return the exact path which was bound to the control like /employees/0
            // getObject() will return the data of that path like { name: "", age:0 }
            // so here variable data will have the exact json object which was bound to clicked control
            MessageToast.show("Name: " + data.name + "Age: " + data.age);
        },

        // modifying the press function of list item to delete the list item after clicking on it.
        onEmpListItemPress2: function(oEvent){
            var itemIndex = oEvent.getSource().getBindingContext().getPath().split("/").pop();
            // oEvent.getSource().getBindingContext().getPath() ==> till here it will return the path of the clicked element like /employees/0 as String
            // split("/") ==> means split the path string whereever u see "/" so eventually something like [ "", "employees", "0"]
            // pop() ==> will return the last element means the index of the clicked element

            // now find the array from where deletion is to be done which is "/employees" here in our case.
            var empArray = this.getView().getModel().getProperty("/employees");
            empArray.splice(itemIndex, 1);

            // this.getView().getModel().getProperty("/employees") ==> this part already understand that will return the array.
            // splice(i, j) ==> it use to delete and element from array. 
            // here 'i' is the index of element from where deletion has to be done and 'j' is the no of element from i to be deleted. 

            // now since modified array is in empArray so we need to set it back to model.
            this.getView().getModel().setProperty("/employees", empArray);
        },

        onAddEmpPress: function(){
            var name = this.getView().byId("empNameInput").getValue();
            var age = this.getView().byId("empAgeInput").getValue();
            var empArray = this.getView().getModel().getProperty("/employees");
            empArray.push({ name: name, age: age});
            this.getView().getModel().setProperty("/employees", empArray); // setProerty() triggers the ui update as well so no extra worry.

            // here we 1st get both input fields via their id's and extracted the inputed values 
            // then get the existing employee array, pushed the new employee object to that array and set the updated array back to model,
            // this.getView().byId("empNameInput") ==> will return the input control object 
            // .getValue() ==> will return the value entered in that input field [ why not oEvent.getSource() because it will return the object of 'Add' button not input fields]
            //.push() ==> used to add a new element(object) at the end of an existing array.
            // so in sort, get the existing array from model, push the new array and set the updated array back to original model.

        },


        
    })
})