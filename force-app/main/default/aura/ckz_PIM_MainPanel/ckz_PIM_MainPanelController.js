/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {

        console.log('ckz_PIM_MainPanel - begin init()');

        var recordId = component.get("v.recordId");
        console.log('recordId: ' + recordId);

        helper.initialLoad(component);

    },
    renderPanel: function(component, event, helper) {
        var params = event.getParams();
        helper.renderPanel(component, params);
    },
    resetPanel : function(component, event, helper) {

        //var params = event.getParams();

        // same logic as this component's helper.initialLoad()
        // Send the initial component info about the underlying record.
        // That way, the initial component will know whether the underlying record is a Product or not, and display the [Edit Current Product] button.
        
        var productDataMap = {};

        var recordId = component.get("v.recordId");
        var isProduct = component.get("v.isProduct");

        productDataMap.recordId = recordId;
        productDataMap.isProduct = isProduct;

        console.log('recordId: ' + recordId);

        var params = {
            type: 'ckz_PIM_ProductChooser',
            attributes: productDataMap
        };

        helper.resetPanel(component, params);       
        
    },

})