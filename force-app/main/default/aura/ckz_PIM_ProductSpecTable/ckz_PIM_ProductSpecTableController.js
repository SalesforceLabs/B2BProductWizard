/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {
        console.log('ckz_PIM_ProductSpecTable - inside doInit');

        var productDataMap = component.get("v.productDataMap");

        console.log('productDataMap: ' + JSON.stringify(productDataMap));

        var productDetails = productDataMap.productDetails;

        var productSpecEntries = productDataMap.productSpecEntries;
        component.set("v.productSpecEntries", productSpecEntries);

        if(productSpecEntries.length <= 0) {
            var productSpecEntries = helper.createNewProductSpecEntries(component, 3);
            component.set("v.productSpecEntries", productSpecEntries);
        }

    },
    handleAddRow: function(component, event, helper) {
        var productSpecEntry = helper.createNewProductSpecEntry();
        var productSpecEntries = component.get("v.productSpecEntries");
        productSpecEntries.push(productSpecEntry);
        component.set("v.productSpecEntries", productSpecEntries);
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