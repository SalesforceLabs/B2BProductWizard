/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    // Dialog
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "False"
        component.set("v.recordId", null);
        component.set("v.isOpen", false);
    },
    closeAndFinish: function(component, event, helper) {

        component.set("v.recordId", null);
        component.set("v.isOpen", false);

        var event = component.getEvent("newSpecDialogEvent");

        var specName = component.get('v.specName');
        var specId = component.get('v.specId');

        event.setParam("specId", specId);
        event.setParam("specName", specName);

        event.fire();

    },
    onLoad: function(component, event, helper) {
        var saved = component.get("v.saved");

        var myCheckbox = component.find('isComparable');
        myCheckbox.set("v.value",true);
    },
    onSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been Saved successfully."
        });
        toastEvent.fire();

        var payload = event.getParams();
        var objJSON = JSON.parse(JSON.stringify(payload));

        //var record = event.getParam("response");

        var specId = objJSON.response.id;
        var specName = objJSON.response.fields.Name.value;

        component.set("v.specId", specId);
        component.set("v.specName", specName);
        component.set("v.recordId", specId);

    },
    onSubmit : function(component, event, helper) {
        event.preventDefault(); // stop form submission

        var specName = component.find('Name');

        var eventFields = event.getParam("fields");
        eventFields["ccrz__DisplayName__c"] = eventFields["Name"];

        component.find('recordEditForm').submit(eventFields);
    },
    onError : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error!",
            "message": "Error."
        });
        toastEvent.fire();
    }
});