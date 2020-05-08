/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    validateProductMap : function(component, productDataMap) {

        var isValid = true;

        var messages = [];

        var productDetails = productDataMap.productDetails;

        // selectedStorefronts

        if(productDetails.selectedStorefronts == null || productDetails.selectedStorefronts.length == 0) {
            messages.push({'severity' : 'error', 'message' : 'Storefront not selected.'});
        }

        // product name

        if(productDetails.name == null || productDetails.name === '') {
            messages.push({'severity' : 'error', 'message' : 'Product name cannot be blank.'});
        }
        else {
            if(productDetails.name.length > 80) {
                messages.push({'severity' : 'error', 'message' : 'Product name cannot be > 80 characters.'});
            }
        }

        // sku
        if(productDetails.sku == null || productDetails.sku === '') {
            messages.push({'severity' : 'error', 'message' : 'SKU cannot be blank.'});
        }
        else {
            if(productDetails.sku.length > 100) {
                messages.push({'severity' : 'error', 'message' : 'SKU cannot be > 100 characters.'});
            }
        }

        // SEO Title
        if(productDetails.seoTitle != null && productDetails.seoTitle !== '') {
            if(productDetails.seoTitle.length > 100) {
                messages.push({'severity' : 'error', 'message' : 'SEO Title cannot be > 100 characters.'});
            }
        }

        // Status
        if(productDetails.status == null || productDetails.status === '') {
            messages.push({'severity' : 'error', 'message' : 'Product Status cannot be blank.'});
        }
        
        // Product Spec entries
        var productSpecEntries = productDataMap.productSpecEntries;

        for(var i = 0; i < productSpecEntries.length; i++) {
            var entry = productSpecEntries[i];

            if(entry.specName != null && entry.specName != '') {
                if(entry.productSpecValue.length > 255) {
                    messages.push({'severity' : 'error', 'message' : 'Product Spec value cannot be > 255 characters.'});
                }
            }
        }

        // Price List entries
        var priceListEntries = productDataMap.priceListEntries;

        for(var i = 0; i < priceListEntries.length; i++) {
            var entry = priceListEntries[i];

            if(entry.priceList != null && entry.priceList != '') {

                if(entry.startDate == null || entry.startDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Price List start date cannot be blank.'});
                }

                if(entry.endDate == null || entry.endDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Price List end date cannot be blank.'});
                }

                if(entry.price == null || entry.price === '') {
                    messages.push({'severity' : 'error', 'message' : 'Price List price cannot be blank.'});
                }

            }
        }

        // Product Media entries
        var productMediaEntries = productDataMap.productMediaEntries;

        for(var i = 0; i < productMediaEntries.length; i++) {
            var entry = productMediaEntries[i];

            if(entry.mediaType != null && entry.mediaType != '') {

                if(entry.startDate == null || entry.startDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Product media start date cannot be blank.'});
                }

                if(entry.endDate == null || entry.endDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Product media end date cannot be blank.'});
                }

                if(entry.sequence == null || entry.sequence === '') {
                    messages.push({'severity' : 'error', 'message' : 'Product media sequence cannot be blank.'});
                }

                if(entry.locale == null || entry.locale === '') {
                    messages.push({'severity' : 'error', 'message' : 'Product media locale cannot be blank.'});
                }
            }
        }

        // Product Categories
        var productCategoryEntries = productDataMap.productCategoryEntries;

        for(var i = 0; i < productCategoryEntries.length; i++) {
            var entry = productCategoryEntries[i];

            if(entry.categoryId != null && entry.categoryId != '') {

                if(entry.startDate == null || entry.startDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Product media start date cannot be blank.'});
                }

                if(entry.endDate == null || entry.endDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Product media end date cannot be blank.'});
                }

            }
        }

        // Related products

        var relatedProductEntries = productDataMap.relatedProductEntries;

        for(var i = 0; i < relatedProductEntries.length; i++) {
            var entry = relatedProductEntries[i];

            if(entry.relatedProductId != null && entry.relatedProductId != '') {

                if(entry.startDate == null || entry.startDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Related Product start date cannot be blank.'});
                }

                if(entry.endDate == null || entry.endDate === '') {
                    messages.push({'severity' : 'error', 'message' : 'Related Product end date cannot be blank.'});
                }

                if(entry.sequence == null || entry.sequence === '') {
                    messages.push({'severity' : 'error', 'message' : 'Related Product sequence cannot be blank.'});
                }

            }
        }

        if(messages.length > 0) {
            isValid = false;
        }

        component.set("v.pageMessages", messages);

        return isValid;
     }
})