/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {
        console.log('ckz_PIM_ProductPricingTable - inside doInit');

        var productDataMap = component.get("v.productDataMap");

        console.log('productDataMap: ' + JSON.stringify(productDataMap));

        var productDetails = productDataMap.productDetails;
        var selectedStorefronts = productDetails.selectedStorefronts;

        component.set("v.selectedStorefronts", selectedStorefronts);

        var priceListEntries = productDataMap.priceListEntries;
        component.set("v.priceListEntries", priceListEntries);

        if(priceListEntries.length <= 0) {
            var priceListEntries = helper.createNewPriceListEntries(component, 3);
            component.set("v.priceListEntries", priceListEntries);
        }

        helper.getPriceListOptions(component);

        helper.validate(component);
        
    },
    handleAddRow: function(component, event, helper) {
        var priceListEntry = helper.createNewPriceListEntry();
        var priceListEntries = component.get("v.priceListEntries");
        priceListEntries.push(priceListEntry);
        component.set("v.priceListEntries", priceListEntries);
    },
    handleScreenJump: function(component, event, helper) {

        helper.saveAttributes(component);
        var screen = event.getParam("screen");

        util.openTargetComponent(component, screen);
    },
    handleNavigatePrev: function(component, event, helper) {

        helper.saveAttributes(component);
        util.openPreviousComponent(component);

    },
    handleNavigateNext: function(component, event, helper) {

        helper.saveAttributes(component);
        util.openNextComponent(component);
    },
})