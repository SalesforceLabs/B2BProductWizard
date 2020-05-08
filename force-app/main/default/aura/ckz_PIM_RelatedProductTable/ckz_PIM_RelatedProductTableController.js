/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {
        console.log('ckz_PIM_RelatedProductTable - inside doInit');

        var productDataMap = component.get("v.productDataMap");

        console.log('productDataMap: ' + JSON.stringify(productDataMap));

        var productDetails = productDataMap.productDetails;

        var relatedProductEntries = productDataMap.relatedProductEntries;
        component.set("v.relatedProductEntries", relatedProductEntries);

        if(relatedProductEntries.length <= 0) {
            var relatedProductEntries = helper.createNewRelatedProductEntries(component, 3);
            component.set("v.relatedProductEntries", relatedProductEntries);
        }
    },
    handleAddRow: function(component, event, helper) {
        var relatedProductEntry = helper.createNewRelatedProductEntry();
        var relatedProductEntries = component.get("v.relatedProductEntries");
        relatedProductEntries.push(relatedProductEntry);
        component.set("v.relatedProductEntries", relatedProductEntries);
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
    handleNavigateSave: function(component, event, helper) {
        helper.saveAttributes(component);
        util.openLastComponent(component);
    }
})