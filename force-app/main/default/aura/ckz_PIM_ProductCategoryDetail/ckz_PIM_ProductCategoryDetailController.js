/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    openModel: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
      component.set("v.isOpen", true);
   },
    clearFields: function(component, event, helper) {
        console.log('inside clearFields');

        component.set('v.sfid', null);
        component.set('v.categoryId', null);
        component.set('v.categoryName', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
        component.set('v.sequence', null);
        component.set('v.selItem', null);
    },
    /*
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

        if(categoryId != null && categoryId != '') {
            var startDate = new Date();
            startDate.setDate(startDate.getDate()-1);
            var fmtStartDate = helper.getFormattedDate(startDate);

            var endDate = new Date("2099-12-31");
            var fmtEndDate = helper.getFormattedDate(endDate);

            component.find("startDateField").set("v.value", fmtStartDate);
            component.find("endDateField").set("v.value", fmtEndDate);
            component.set("v.sequence", 500);

        }
        else {
            component.find("startDateField").set("v.value", null);
            component.find("endDateField").set("v.value", null);
            component.set("v.sequence", null);
        }

    },
    */
    selectionChange: function(component, event, helper) {

        console.log('inside selectionChange');

        event.preventDefault();

        var categoryId = event.getParam("categoryId");  // the category Id
        var categoryName = event.getParam("categoryName");

        if(categoryId == null) {
            return false;
        }

        component.set('v.categoryId', categoryId);
        component.set('v.categoryName', categoryName);

        if(categoryId != null && categoryId != '') {
            var startDate = new Date();
            startDate.setDate(startDate.getDate()-1);
            var fmtStartDate = util.getFormattedDate(startDate);

            var endDate = new Date("2099-12-31");
            var fmtEndDate = util.getFormattedDate(endDate);

            component.find("startDateField").set("v.value", fmtStartDate);
            component.find("endDateField").set("v.value", fmtEndDate);
            component.set("v.sequence", 500);

        }
        else {
            component.find("startDateField").set("v.value", null);
            component.find("endDateField").set("v.value", null);
            component.set("v.sequence", null);
        }

    },
})