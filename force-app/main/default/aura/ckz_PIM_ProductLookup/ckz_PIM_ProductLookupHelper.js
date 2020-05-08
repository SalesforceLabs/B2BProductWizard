/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    itemSelected : function(component, event, helper) {
        var target = event.target;
        var SelIndex = helper.getIndexFrmParent(target, helper, "data-selectedIndex");
        if(SelIndex){
            var serverResult = component.get("v.server_result");
            var selItem = serverResult[SelIndex];
            if(selItem.Id){
               component.set("v.selItem", selItem);
               component.set("v.last_ServerResult", serverResult);
            }
            component.set("v.server_result",null);
        }
	},
    serverCall : function(component, event, helper) {

        console.log('inside serverCall');

        var target = event.target;
        var searchText = target.value;

        console.log('searchText = ' + searchText);

        var last_SearchText = component.get("v.last_SearchText");
        //Escape button pressed
        if (event.keyCode == 27 || !searchText.trim()) {
            helper.clearSelection(component, event, helper);
        }else if(searchText.trim() != last_SearchText && searchText.length >= 3 ){
            //Save server call, if last text not changed
            //Search only when space character entered

            var objectName = component.get("v.objectName");
            var fieldsToSearch = component.get("v.fieldsToSearch");
            var fieldsToReturn = component.get("v.fieldsToReturn");
            var orderBy = component.get("v.orderBy");
            var limit = component.get("v.limit");

            var action = component.get('c.selectRecords');
            //action.setStorable();

            action.setParams({
                queryString : searchText,
                objectName : objectName,
                fieldsToReturn : fieldsToReturn,
                fieldsToSearch : fieldsToSearch,
                orderBy : orderBy,
                recordLimit : limit
            });

            action.setCallback(this,function(a){
                this.handleResponse(a,component,helper);
            });

            component.set("v.last_SearchText",searchText.trim());
            console.log('Server call made');
            $A.enqueueAction(action);
        }else if(searchText && last_SearchText && searchText.trim() == last_SearchText.trim()){
            component.set("v.server_result",component.get("v.last_ServerResult"));
            console.log('Server call saved');
        }
	},
    handleResponse : function (response, component, helper){
        if (response.getState() === 'SUCCESS') {

            var returnValue = response.getReturnValue();

            //var retObj = JSON.parse(res.getReturnValue());
            if(returnValue.length <= 0){
                //var noResult = JSON.parse('[{"text":"No Results Found"}]');
                var noResult = [];
                noResult.push({'Id':null, 'Name':'No Results Found', 'ccrz__SKU__c': null})

                component.set("v.server_result", noResult);
            	component.set("v.last_ServerResult", noResult);
            }else{
                component.set("v.server_result", returnValue);
            	component.set("v.last_ServerResult", returnValue);
            }
        }else if (response.getState() === 'ERROR'){
            var errors = response.getError();
            if (errors) {
                if (errors[0] && errors[0].message) {
                    alert(errors[0].message);
                }
            }
        }
    },
    getIndexFrmParent : function(target,helper,attributeToFind){
        //User can click on any child element, so traverse till intended parent found
        var SelIndex = target.getAttribute(attributeToFind);
        while(!SelIndex){
            target = target.parentNode ;
			SelIndex = helper.getIndexFrmParent(target, helper, attributeToFind);
        }
        return SelIndex;
    },
    clearSelection: function(component, event, helper){
        component.set("v.selItem", null);
        component.set("v.server_result", null);
    },
})