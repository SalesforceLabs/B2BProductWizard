/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    handleMediaTypeChange: function(component, event, helper) {

        try {
            var mediaType = component.find("selectMediaType").get("v.value");

            if(mediaType != null && mediaType != '') {
                var startDate = new Date();
                startDate.setDate(startDate.getDate()-1);
                var fmtStartDate = util.getFormattedDate(startDate);

                var endDate = new Date("2099-12-31");
                var fmtEndDate = util.getFormattedDate(endDate);

                component.find("startDateField").set("v.value", fmtStartDate);
                component.find("endDateField").set("v.value", fmtEndDate);
                component.set("v.locale", "en_US");
                component.set("v.sequence", 500);

            }
            else {
                component.find("startDateField").set("v.value", null);
                component.find("endDateField").set("v.value", null);
                component.set("v.locale", null);
                component.set("v.sequence", null);
            }
        }
        catch(ex) {
            console.log("exception: " + ex.message);
        }
    },
    handleMediaSourceChange: function(component, event, helper) {

       try {
           var mediaSource = component.find("selectMediaSource").get("v.value");

           if(mediaSource == 'URI') {
               component.set('v.staticResourceName', null);
               component.set('v.filePath', null);
           }
           else if (mediaSource == 'Static Resource') {
               component.set('v.uri', null);
           }
           else {
                component.set('v.staticResourceName', null);
                component.set('v.filePath', null);
                component.set('v.uri', null);
           }

        //    if(mediaSource != null && mediaSource != '') {
        //         component.set("v.enabled", true);
        //    }
       }
       catch(ex) {
           console.log("exception: " + ex.message);
       }
    },
    clearFields: function(component, event, helper) {
        console.log('inside clearFields');

        component.set('v.sfid', null);
        component.set('v.enabled', false);
        component.set('v.mediaType', null);
        component.set('v.mediaSource', null);
        component.set('v.startDate', null);
        component.set('v.endDate', null);
        component.set('v.locale', null);
        component.set('v.sequence', null);
        component.set('v.uri', null);
        component.set('v.staticResourceName', null);
        component.set('v.filePath', null);
    },
})