/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {

//        console.log('ckz_PIM_ProductPriceDetail - inside doInit');

    },
    handlePriceListChange: function(component, event, helper) {

        try {
            var priceList = component.find("selectPriceList").get("v.value");

            if(priceList != null && priceList != '') {
                var startDate = new Date();
                //startDate = startDate.getDate() - 1;
                startDate.setDate(startDate.getDate()-1);
                var fmtStartDate = util.getFormattedDate(startDate);

                var endDate = new Date("2099-12-31");
                var fmtEndDate = util.getFormattedDate(endDate);

                component.find("startDateField").set("v.value", fmtStartDate);
                component.find("endDateField").set("v.value", fmtEndDate);
            }
            else {
                component.find("startDateField").set("v.value", null);
                component.find("endDateField").set("v.value", null);
            }
        }
        catch(ex) {
            console.log("exception: " + ex.message);
        }
    },
    clearFields: function(component, event, helper) {
        console.log('inside clearFields');

        component.set('v.sfid', null);
        component.set('v.priceList', null);
        component.set('v.price', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);

    },
})