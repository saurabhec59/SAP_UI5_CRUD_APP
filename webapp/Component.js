sap.ui.define([
    "sap/ui/core/UIComponent",
    "projectlearning/model/models",
    "sap/ui/model/json/JSONModel"     // added this dependency for JSONModel
], (UIComponent, models, JSONModel) => {
    "use strict";

    return UIComponent.extend("projectlearning.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
            
            // setting a model at component level so that it can be used in all views of the app.
            var data = { 
                employees: [
                    {
                        id: 1,
                        name: "Aman",
                        age: 25
                    },
                    {
                        id: 2,
                        name: "Rahul",
                        age: 30
                    },
                    {
                        id: 3,
                        name: "Priya",
                        age: 28
                    },
                    {
                        id: 4,
                        name: "zara",
                        age:17
                    }
                ],

                // updating model to demonstrate two way binding
                employeeForm: {
                    name: "julia"
                }
            }
            var model = new JSONModel(data);
            this.setModel(model, "empModel"); // using named model to prevent overwriting of default model

            // enable routing
            this.getRouter().initialize();
        }
    });
});