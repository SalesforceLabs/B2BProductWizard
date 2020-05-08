/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    createNewProductSpecEntries: function(component, total) {
        console.log('inside createNewProductSpecEntries');

        var productSpecEntries = [];

        for(var i = 0; i < total; i++) {
            var productSpecEntry = this.createNewProductSpecEntry(component);
            productSpecEntries.push(productSpecEntry);
        }
        return productSpecEntries;
    },
    createNewProductSpecEntry: function(component) {
        var productSpecEntry = {};

        productSpecEntry.specId = null;
        productSpecEntry.specName = null;

        productSpecEntry.productSpecValue = null;

        productSpecEntry.sfid = null;
        productSpecEntry.remove = false;

        return productSpecEntry;
    },
    saveAttributes: function(component) {
         var productDataMap = component.get("v.productDataMap");
         var productSpecEntries = component.get("v.productSpecEntries");

         productDataMap.productSpecEntries = productSpecEntries;

         component.set("v.productDataMap", productDataMap);
     },

})