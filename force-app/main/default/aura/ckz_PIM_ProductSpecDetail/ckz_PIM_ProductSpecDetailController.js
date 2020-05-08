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

        var specId = value.val;
        var specName = value.text;
        component.set('v.specId', specId);
        component.set('v.specName', specName);

    },
    clearFields: function(component, event, helper) {
        console.log('inside clearFields');

        component.set('v.sfid', null);
        component.set('v.specName', null);
        component.set('v.specId', null);
        component.set('v.productSpecValue', null);
        component.set('v.selItem', null);
    },
    openModel: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
      component.set("v.isNewSpecOpen", true);
   },
    handleNewSpec: function(component, event, helper) {
        var specId = event.getParam("specId");
        var specName = event.getParam("specName");

        var productSpecEntry = component.get("v.productSpecEntry");
        productSpecEntry.specId = specId;
        productSpecEntry.specName = specName;

        // Clear out existing SFID
        productSpecEntry.sfid = null;

        // Clear out the former product spec value
        productSpecEntry.productSpecValue = null;

        component.set("v.productSpecEntry", productSpecEntry);
    }
})