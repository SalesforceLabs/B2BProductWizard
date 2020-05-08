/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    loadAttributes: function(component) {

        console.log('ckz_PIM_ProdDetail - inside loadAttributes');

        var productDataMap = component.get("v.productDataMap");
        var productDetails = productDataMap.productDetails;

        console.log('productDetails: ' + JSON.stringify(productDetails));

        component.set("v.selectedStorefronts", productDetails.selectedStorefronts);
        component.set("v.name", productDetails.name);
        component.set("v.sku", productDetails.sku);
        component.set("v.shortDesc", productDetails.shortDesc);
        component.set("v.longDesc", productDetails.longDesc);
        component.set("v.status", productDetails.status);
        component.set("v.seoTitle", productDetails.seoTitle);

        component.set("v.productType", productDetails.productType);
        component.set("v.startDate", productDetails.startDate);
        component.set("v.endDate", productDetails.endDate);

        var productAction = component.get("v.productAction");

        //if(productAction == 'new') {

            if(component.get("v.startDate") == null) {
                var startDate = new Date();
                startDate.setDate(startDate.getDate()-1);
                var fmtStartDate = util.getFormattedDate(startDate);
                component.find("startDateField").set("v.value", fmtStartDate);
            }

            if(component.get("v.endDate") == null) {
                var endDate = new Date("2099-12-31");
                var fmtEndDate = util.getFormattedDate(endDate);
                component.find("endDateField").set("v.value", fmtEndDate);
            }

            if(component.get("v.productType") == null) {
                component.set("v.productType", "Product");
            }
        //}

        console.log('ckz_PIM_ProdDetail - exit loadAttributes');

    },
    getStorefrontOptions: function(component) {
        console.log('inside getStorefrontOptions');

        var action = component.get("c.fetchStorefrontOptions");

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var returnValue = response.getReturnValue();

                component.set('v.storefrontOptions', returnValue);
                /*
                if(returnValue.length == 1) {

                    // Let DOM state catch up.
                    window.setTimeout(
                        $A.getCallback( function() {
                            // Now set our preferred value
                            component.find("selectStorefront").set("v.value", returnValue[0]);
                            component.set("v.selectedStorefront", returnValue[0]);

                        }));

                }
                */
            }
            else {
                console.log('Failed with state: ' + state);
            }
        });

        $A.enqueueAction(action);
    },
     saveAttributes: function(component) {
         var productDataMap = component.get("v.productDataMap");

          var productDetails = productDataMap.productDetails;

          productDetails.name = component.get("v.name");
          productDetails.sku = component.get("v.sku");
          productDetails.shortDesc = component.get("v.shortDesc");
          productDetails.longDesc = component.get("v.longDesc");
          productDetails.status = component.get("v.status");
          productDetails.seoTitle = component.get("v.seoTitle");
          productDetails.selectedStorefronts = component.get("v.selectedStorefronts");
          productDetails.productType = component.get("v.productType");
          productDetails.startDate = component.get("v.startDate");
          productDetails.endDate = component.get("v.endDate");

          productDataMap.productDetails = productDetails;

          component.set("v.productDataMap", productDataMap);
     },

})