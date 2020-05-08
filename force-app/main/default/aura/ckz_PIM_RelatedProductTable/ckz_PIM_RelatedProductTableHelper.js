/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    createNewRelatedProductEntries: function(component, total) {
        console.log('inside createNewRelatedProductEntries');

        var relatedProductEntries = [];

        for(var i = 0; i < total; i++) {
            var relatedProductEntry = this.createNewRelatedProductEntry(component);
            relatedProductEntries.push(relatedProductEntry);
        }
        return relatedProductEntries;
    },
    createNewRelatedProductEntry: function(component) {
        var relatedProductEntry = {};

        relatedProductEntry.enabled = false;
        relatedProductEntry.productType = null;
        relatedProductEntry.relatedProductId = null;
        relatedProductEntry.relatedProductName = null;
        relatedProductEntry.relatedProductSku = null;
        relatedProductEntry.sequence = null;
        relatedProductEntry.startDate = null;
        relatedProductEntry.endDate = null;

        relatedProductEntry.sfid = null;
        relatedProductEntry.remove = false;
        relatedProductEntry.hasBackRef = false;
        relatedProductEntry.backRefRelProdId = null;

        return relatedProductEntry;
    },
    saveAttributes: function(component) {
         var productDataMap = component.get("v.productDataMap");
         var relatedProductEntries = component.get("v.relatedProductEntries");

         productDataMap.relatedProductEntries = relatedProductEntries;

         component.set("v.productDataMap", productDataMap);
     },
})