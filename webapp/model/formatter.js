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