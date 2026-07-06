/* formatters are generally created to format the data before it is displayed in the view.
   usually the syntax is used in view like { path: "empModel>age", formatter: ".formatter.formatAge" }
   formatter file need to imported in controller file to use it in view
   for example in View2.controller.js we have imported this file inside the define([]) section as "projectlearning/model/formatter" and then 
   we have exposed it to view by defining a property named 'formatter' as " formatter: formatter, "
 */  
/* why formatters should be avoided for editable fields like <Input> 
    because A formatter function is strictly one-way. It takes data from your backend model, changes its appearance (e.g., converting 1000 to $1,000.00), 
    and pushes it to the UI. If a user edits that field to $2,000.00, SAPUI5 tries to push that text back to the model. 
    And remember since the data appearence is changed by formatter so pushing it back to model by SAPUI5 may corrupt the data in model.
    Because the formatter doesn't work in reverse, the framework breaks, or you corrupt your backend data model with formatted text instead of raw data.
*/
sap.ui.define([

],function(){
    return {
        
        formatAge: function(age){
            return age + " years";
        },

        formatInputFieldForMinor: function(age){
            if(age < 18){
                return (18-age) + " years left to become eligible for voting";
            }
        }

    }
})