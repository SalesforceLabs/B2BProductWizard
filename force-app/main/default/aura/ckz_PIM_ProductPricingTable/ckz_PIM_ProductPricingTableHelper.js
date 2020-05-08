/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    getPriceListOptions: function(component) {
        console.log('inside getPriceListOptions');

        var action = component.get("c.fetchPriceListOptions");

        var selectedStorefronts = component.get("v.selectedStorefronts");

        console.log('selectedStorefronts: ' + JSON.stringify(selectedStorefronts));

        action.setParams({
            "selectedStorefronts" : selectedStorefronts
        });

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (state === 'SUCCESS') {
                var returnValue = response.getReturnValue();

                console.log('returnValue = ' + JSON.stringify(returnValue));

                component.set('v.priceListOptions', returnValue);

            }
            else {
                console.log('Failed with state: ' + state);
            }
        });

        $A.enqueueAction(action);
    },

    createNewPriceListEntries: function(component, total) {
        console.log('inside createNewPriceListEntries');

        var priceListEntries = [];

        for(var i = 0; i < total; i++) {
            var priceListEntry = this.createNewPriceListEntry(component);
            priceListEntries.push(priceListEntry);
        }
        return priceListEntries;
    },
    createNewPriceListEntry: function(component) {
        var priceListEntry = {};

        priceListEntry.price = null;
        priceListEntry.minQty = 1;
        priceListEntry.priceList = null;

        priceListEntry.startDate = null;
        priceListEntry.endDate = null;

        priceListEntry.sfid = null;
        priceListEntry.remove = false;

        return priceListEntry;
    },
    saveAttributes: function(component) {
         var productDataMap = component.get("v.productDataMap");
         var priceListEntries = component.get("v.priceListEntries");

         productDataMap.priceListEntries = priceListEntries;

          component.set("v.productDataMap", productDataMap);
     },
     validate: function(component) {

        var messages = [];

        var selectedStorefronts = component.get("v.selectedStorefronts");

        if(selectedStorefronts == null || selectedStorefronts.length == 0) {
            messages.push({'severity' : 'error', 'message' : 'Storefront not selected.  Price list options will not be displayed.'});
        }

        component.set("v.pageMessages", messages);
     }

})