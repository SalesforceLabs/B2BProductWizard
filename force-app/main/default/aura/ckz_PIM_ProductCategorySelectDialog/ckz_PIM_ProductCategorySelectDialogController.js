/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    // Dialog
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"
        component.set("v.isOpen", false);
    },

    closeAndFinish: function(component, event, helper) {
        // Display alert message on the click on the "Like and Close" button from Model Footer
        // and set set the "isOpen" attribute to "False for close the model Box.
        //alert('OK, will close soon!');
        component.set("v.isOpen", false);

        var event = component.getEvent("productCategoryDialogEvent");

         var categoryId = component.get('v.categoryId');  // the category Id
         var categoryName = component.get('v.categoryName');

        event.setParam("categoryId", categoryId);
        event.setParam("categoryName", categoryName);

        event.fire();

    },
    // Category selection
    handleStorefrontChange : function(component, event, helper) {

        helper.displaySelectedCategoryTree(component);
    },
    selectionChange: function(component, event, helper) {

        console.log('inside selectionChange');

        event.preventDefault();

        var categoryId = event.getParam("name");  // the category Id
        var categoryName = helper.getSelectedCategoryName(component, categoryId);

        if(categoryId == null) {
            return false;
        }

        component.set('v.categoryId', categoryId);
        component.set('v.categoryName', categoryName);

    },
    waiting: function(component, event, helper) {
        helper.waiting(component);
    },
    doneWaiting: function(component, event, helper) {
        helper.doneWaiting(component);
    },
})