/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    createNewProductCategoryEntries: function(component, total) {
        console.log('inside createNewProductCategoryEntries');

        var productCategoryEntries = [];

        for(var i = 0; i < total; i++) {
            var productCategoryEntry = this.createNewProductCategoryEntry(component);
            productCategoryEntries.push(productCategoryEntry);
        }
        return productCategoryEntries;
    },
    createNewProductCategoryEntry: function(component) {
        var productCategoryEntry = {};

        productCategoryEntry.categoryId = null;
        productCategoryEntry.categoryName = null;

        productCategoryEntry.startDate = null;
        productCategoryEntry.endDate = null;

        productCategoryEntry.sequence = null;

        productCategoryEntry.sfid = null;
        productCategoryEntry.remove = false;

        return productCategoryEntry;
    },
    saveAttributes: function(component) {
         var productDataMap = component.get("v.productDataMap");
         var productCategoryEntries = component.get("v.productCategoryEntries");

         productDataMap.productCategoryEntries = productCategoryEntries;

         component.set("v.productDataMap", productDataMap);
     },
     getStorefrontOptions: function(component) {
        var productDataMap = component.get("v.productDataMap");
        var productDetails = productDataMap.productDetails;

        component.set("v.storefrontOptions", productDetails.selectedStorefronts);
     },
})