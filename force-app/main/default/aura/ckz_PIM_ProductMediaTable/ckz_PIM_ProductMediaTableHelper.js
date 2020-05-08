/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    createNewProductMediaEntries: function(component, total) {
        console.log('inside createNewProductMediaEntries');

        var productMediaEntries = [];

        for(var i = 0; i < total; i++) {
            var productMediaEntry = this.createNewProductMediaEntry(component);
            productMediaEntries.push(productMediaEntry);
        }
        return productMediaEntries;
    },
    createNewProductMediaEntry: function(component) {
        var productMediaEntry = {};

        //productMediaEntry.enabled = true;
        productMediaEntry.enabled = false;
        productMediaEntry.mediaType = null;
        productMediaEntry.mediaSource = null;
        productMediaEntry.sequence = null;

        productMediaEntry.uri = null;
        productMediaEntry.staticResourceName = null;
        productMediaEntry.filePath = null;

        productMediaEntry.startDate = null;
        productMediaEntry.endDate = null;
        productMediaEntry.locale = null;

        productMediaEntry.sfid = null;
        productMediaEntry.remove = false;

        return productMediaEntry;
    },
    updateBlankProductMediaEntry: function(component, productMediaEntry, mediaType, mediaSource, uri) {

        productMediaEntry.enabled = true;
        productMediaEntry.mediaType = mediaType;
        productMediaEntry.mediaSource = mediaSource;
        productMediaEntry.sequence = 500;
        productMediaEntry.locale = 'en_US';

        productMediaEntry.uri = uri;
        productMediaEntry.staticResourceName = null;
        productMediaEntry.filePath = null;

        // TODO need to put this in a generic utility file
        var startDate = new Date();
        startDate.setDate(startDate.getDate()-1);
        var fmtStartDate = util.getFormattedDate(startDate);

        var endDate = new Date("2099-12-31");
        var fmtEndDate = util.getFormattedDate(endDate);

        productMediaEntry.startDate = fmtStartDate;
        productMediaEntry.endDate = fmtEndDate;

        productMediaEntry.sfid = null;
        productMediaEntry.remove = false;

    },
    createDefaultProductMediaEntry: function(component, mediaType, mediaSource, uri) {
        var productMediaEntry = {};

        productMediaEntry.enabled = true;
        productMediaEntry.mediaType = mediaType;
        productMediaEntry.mediaSource = mediaSource;
        productMediaEntry.sequence = 500;
        productMediaEntry.locale = 'en_US';

        productMediaEntry.uri = uri;
        productMediaEntry.staticResourceName = null;
        productMediaEntry.filePath = null;

        var startDate = new Date();
        startDate.setDate(startDate.getDate()-1);

        var endDate = new Date("2099-12-31");

        productMediaEntry.startDate = startDate;
        productMediaEntry.endDate = endDate;

        productMediaEntry.sfid = null;
        productMediaEntry.remove = false;

        return productMediaEntry;
    },
    saveAttributes: function(component) {
         var productDataMap = component.get("v.productDataMap");
         var productMediaEntries = component.get("v.productMediaEntries");

         productDataMap.productMediaEntries = productMediaEntries;

         component.set("v.productDataMap", productDataMap);
     },

})