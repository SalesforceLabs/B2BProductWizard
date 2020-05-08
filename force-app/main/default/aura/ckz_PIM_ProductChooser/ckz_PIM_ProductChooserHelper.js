/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    loadAttributes: function(component) {

        console.log('ckz_PIM_ProductChooser - inside loadAttributes');

        var productDataMap = component.get("v.productDataMap");
        
        //console.log('productDataMap: ' + JSON.stringify(productDataMap));

        var recordId = productDataMap.recordId;
        var isProduct = productDataMap.isProduct;

        console.log('recordId: ' + recordId);
        console.log('isProduct: ' + isProduct);

        component.set("v.recordId", recordId);
        component.set("v.isProduct", isProduct);

        console.log('ckz_PIM_ProductChooser - exit loadAttributes');

    },
    createNewProductDataMap: function(component) {

        console.log('ckz_PIM_ProductChooser - begin createNewProductDataMap()');

        var productDataMap = {};

        var productDetails = {};

        productDetails.name = "";
        productDetails.sku = "";
        productDetails.shortDesc = "";
        productDetails.longDesc = "";
        productDetails.status = "Released";
        productDetails.seoTitle = "";
        productDetails.sfid = null;
        productDetails.selectedStorefronts = [];
        productDetails.productType = "Product";
        productDetails.startDate = null;
        productDetails.endDate = null;

        productDataMap.productDetails = productDetails;

        var priceListEntries = [];
        productDataMap.priceListEntries = priceListEntries;

        var productMediaEntries = [];
        productDataMap.productMediaEntries = productMediaEntries;

        var productCategoryEntries = [];
        productDataMap.productCategoryEntries = productCategoryEntries;

        var relatedProductEntries = [];
        productDataMap.relatedProductEntries = relatedProductEntries;

        var productSpecEntries = [];
        productDataMap.productSpecEntries = productSpecEntries;

        component.set("v.productDataMap", productDataMap);

        var screen = util.getFirstScreen();
        component.set("v.screen", screen);

        util.openComponent(component);

        console.log('ckz_PIM_ProductChooser - exit createNewProductDataMap()');
    },
    
})