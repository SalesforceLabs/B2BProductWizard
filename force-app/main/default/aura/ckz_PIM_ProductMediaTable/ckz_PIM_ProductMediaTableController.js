/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {
        console.log('ckz_PIM_ProductMediaTable - inside doInit');

        var productDataMap = component.get("v.productDataMap");

        console.log('productDataMap: ' + JSON.stringify(productDataMap));

        var productDetails = productDataMap.productDetails;

        var productMediaEntries = productDataMap.productMediaEntries;
        component.set("v.productMediaEntries", productMediaEntries);

        if(productMediaEntries.length <= 0) {
            var productMediaEntries = helper.createNewProductMediaEntries(component, 3);
            component.set("v.productMediaEntries", productMediaEntries);
        }
    },
    handleDefaultURI: function(component, event, helper) {
        var productMediaDefaultURI = component.get("v.productMediaDefaultURI");

        if(productMediaDefaultURI != null && productMediaDefaultURI != '') {
            var productMediaEntries = component.get("v.productMediaEntries");

            var productSearchImage = false;
            var productImage = false;
            var productThumbnail = false;

            for(var i = 0; i < productMediaEntries.length; i++) {
                if(productMediaEntries[i].mediaType == 'Product Image') {
                    productMediaEntries[i].mediaType = productMediaDefaultURI;
                    productImage = true;
                    continue;
                }
                if(productMediaEntries[i].mediaType == 'Product Search Image') {
                    productMediaEntries[i].mediaType = productMediaDefaultURI;
                    productSearchImage = true;
                    continue;
                }
                if(productMediaEntries[i].mediaType == 'Product Image Thumbnail') {
                    productMediaEntries[i].mediaType = productMediaDefaultURI;
                    productThumbnail = true;
                    continue;
                }
                if(productMediaEntries[i].mediaType == null) {
                    if(productImage == false) {
                        helper.updateBlankProductMediaEntry(component, productMediaEntries[i], 'Product Image', 'URI', productMediaDefaultURI);
                        productImage = true;
                        continue;
                    }
                    if(productSearchImage == false) {
                        helper.updateBlankProductMediaEntry(component, productMediaEntries[i], 'Product Search Image', 'URI', productMediaDefaultURI);
                        productSearchImage = true;
                        continue;
                    }
                    if(productThumbnail == false) {
                        helper.updateBlankProductMediaEntry(component, productMediaEntries[i], 'Product Image Thumbnail', 'URI', productMediaDefaultURI);
                        productThumbnail = true;
                        continue;
                    }
                }
            }

            if(productImage == false) {
                var productMediaEntry = helper.createDefaultProductMediaEntry(component, 'Product Image', 'URI', productMediaDefaultURI);
                productMediaEntries.push(productMediaEntry);
            }

            if(productThumbnail == false) {
                var productMediaEntry = helper.createDefaultProductMediaEntry(component, 'Product Image Thumbnail', 'URI', productMediaDefaultURI);
                productMediaEntries.push(productMediaEntry);
            }

            if(productSearchImage == false) {
                var productMediaEntry = helper.createDefaultProductMediaEntry(component, 'Product Search Image', 'URI', productMediaDefaultURI);
                productMediaEntries.push(productMediaEntry);
            }

            component.set("v.productMediaEntries", productMediaEntries);

        }
    },
    handleAddRow: function(component, event, helper) {
        var productMediaEntry = helper.createNewProductMediaEntry();
        var productMediaEntries = component.get("v.productMediaEntries");
        productMediaEntries.push(productMediaEntry);
        component.set("v.productMediaEntries", productMediaEntries);
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
    }
})