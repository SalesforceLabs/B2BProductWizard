/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {
        console.log('ckz_PIM_ProductCategoryTable - inside doInit');

        var productDataMap = component.get("v.productDataMap");

        console.log('productDataMap: ' + JSON.stringify(productDataMap));

        var productDetails = productDataMap.productDetails;

        var productCategoryEntries = productDataMap.productCategoryEntries;
        component.set("v.productCategoryEntries", productCategoryEntries);

        if(productCategoryEntries.length <= 0) {
            var productCategoryEntries = helper.createNewProductCategoryEntries(component, 3);
            component.set("v.productCategoryEntries", productCategoryEntries);
        }

        helper.getStorefrontOptions(component);

    },
    handleAddRow: function(component, event, helper) {
        var productCategoryEntry = helper.createNewProductCategoryEntry();
        var productCategoryEntries = component.get("v.productCategoryEntries");
        productCategoryEntries.push(productCategoryEntry);
        component.set("v.productCategoryEntries", productCategoryEntries);
    },
    handleShowHideFields: function(component, event, helper) {
        var showHideExtraFields = component.get("v.showHideExtraFields");

        var source = event.getSource();

        var messages = [];

        if(showHideExtraFields) {
            component.set("v.showHideExtraFields", false);
            source.set("v.label", "Show Extra Fields");
        }
        else {
            component.set("v.showHideExtraFields", true);
            source.set("v.label", "Hide Extra Fields");
        }
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