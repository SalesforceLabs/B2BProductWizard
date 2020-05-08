/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    selectionChange: function(component, event, helper) {

        console.log('inside selectionChange');

        var value = event.getParam("value");

        var relatedProductId = null;
        var relatedProductName = null;
        var relatedProductSku = null;

        if(value != null) {
            relatedProductId = value.Id;
            relatedProductName = value.Name;
            relatedProductSku = value.ccrz__SKU__c;
        }

        component.set('v.relatedProductId', relatedProductId);
        component.set('v.relatedProductName', relatedProductName);
        component.set('v.relatedProductSku', relatedProductSku);

        if(relatedProductId != null && relatedProductId != '') {
            var startDate = new Date();
            startDate.setDate(startDate.getDate()-1);
            var fmtStartDate = util.getFormattedDate(startDate);

            var endDate = new Date("2099-12-31");
            var fmtEndDate = util.getFormattedDate(endDate);

            component.find("startDateField").set("v.value", fmtStartDate);
            component.find("endDateField").set("v.value", fmtEndDate);
            component.set("v.sequence", 500);
            component.set("v.enabled", true);

        }
        else {
            component.find("startDateField").set("v.value", null);
            component.find("endDateField").set("v.value", null);
            component.set("v.sequence", null);
            component.set("v.enabled", null);
        }

    },
    clearFields: function(component, event, helper) {
        console.log('inside clearFields');

        component.set('v.sfid', null);
        component.set('v.relatedProductId', null);
        component.set('v.relatedProductName', null);
        component.set('v.productType', null);
        component.set('v.enabled', false);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
        component.set('v.sequence', null);
        component.set('v.selItem', null);
    },
})