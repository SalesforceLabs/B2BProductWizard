/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {

        console.log('ckz_PIM_ProductChooser - begin init()');

        helper.loadAttributes(component);

    },
    handleNewProduct: function(component, event, helper) {

        helper.createNewProductDataMap(component);

    },
    handleEditProduct: function(component, event, helper) {

        var recordId = component.get("v.recordId");

        util.getExistingProductDataMap(component, recordId, true);

    },
    handleCloneProduct: function(component, event, helper) {

            var recordId = component.get("v.recordId");

            util.getExistingProductDataMap(component, recordId, false);

        },
    selectionChange: function(component, event, helper) {

        console.log('inside selectionChange');

        var value = event.getParam("value");

        var productId = null;
        var productName = null;
        var sku = null;

        if(value != null) {
            productId = value.Id;
            productName = value.Name;
            sku = value.ccrz__SKU__c;
        }

        component.set('v.selectedProductId', productId);
        component.set('v.productName', productName);
        component.set('v.sku', sku);

    },
    handleEditSelectedProduct: function(component, event, helper) {
        var selectedProductId = component.get("v.selectedProductId");

        util.getExistingProductDataMap(component, selectedProductId, true);
    },
    handleCloneSelectedProduct: function(component, event, helper) {
        var selectedProductId = component.get("v.selectedProductId");

        util.getExistingProductDataMap(component, selectedProductId, false);
    },
    
})