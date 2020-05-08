/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    initialLoad : function(component) {

        console.log('ckz_PIM_MainPanel - begin initialLoad()');

        var recordId = component.get("v.recordId");
        
        console.log('recordId: ' + recordId);

        if(recordId == null || recordId == '') {

            var productDataMap = {};

            productDataMap.recordId = null;
            productDataMap.isProduct = false;

            this.renderPanel(component, {
                type: 'ckz_PIM_ProductChooser',
                attributes: productDataMap
            });
        }
        else {
            // See if the component was loaded from a Product object
            
            var action = component.get("c.checkRecordId");

            action.setParams({
                "recordId" : recordId
            });

            action.setCallback(this, function (response) {

                var messages = [];

                component.set('v.showSpinner', false);

                var state = response.getState();

                if (state === 'SUCCESS') {

                    var returnValue = response.getReturnValue();
                    
                    var isProduct = false;
                    var recordId = null;
        
                    if(returnValue.isProduct) {
                        isProduct = returnValue.isProduct;
                        component.set("v.isProduct", isProduct);
                    }

                    if(returnValue.recordId) {
                        recordId = returnValue.recordId;
                    }

                    var productDataMap = {};

                    productDataMap.recordId = recordId;
                    productDataMap.isProduct = isProduct;

                    var componentName = 'ckz_PIM_ProductChooser';

                    if(returnValue.isProduct) {

                        componentName = util.getFirstScreen();

                        // If this component is loaded in a CC Product record page, automatically go into edit mode for that product.
                         if(recordId != null && recordId != '') {
                            util.getExistingProductDataMap(component, recordId, true);
                        }

                    }
                    else {

                        this.renderPanel(component, {
                            type: componentName,
                            attributes: productDataMap
                        });

                    }
                }

                component.set("v.pageMessages", messages);

            });

            $A.enqueueAction(action);
        }

    },
    VERBOSE: true,
    renderPanel : function(component, params) {
        let self = this;
        component.set('v.showSpinner', true);

        if(self.VERBOSE) console.log('Rendering ' + params.type, JSON.stringify(params.attributes));

        if (params.toast) {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams(params.toast);
            toastEvent.fire();
        }

        if ( params.type ) {
            try {

                var attrs = {};
                attrs.productDataMap = params.attributes;
                attrs.screen = params.type;

                var namespace = component.getType().split(':')[0];

                var componentName = namespace + ":" + params.type;

                $A.createComponent(componentName, attrs, function(newPanel) {
                    if (component.isValid()) {
                        component.set('v.body', [ newPanel ]);
                        self.hideSpinner(component)
                    }
                });
            }
            catch(err) {
                console.log('error message: ' + err.message);
            }
        } else {
            self.hideSpinner(component)
        }
    },
    resetPanel : function(component, params) {

        let self = this;
        component.set('v.showSpinner', true);

        if(self.VERBOSE) console.log('Rendering...');

        try {
            var attrs = {};
            attrs.productDataMap = params.attributes;

            var namespace = component.getType().split(':')[0];

            var componentName = namespace + ":" + params.type;

            $A.createComponent(componentName, attrs, function(newPanel) {
                if (component.isValid()) {
                    component.set('v.body', [ newPanel ]);
                    self.hideSpinner(component)
                }
            });
        }
        catch(err) {
            console.log('error message: ' + err.message);
        }
        
    },
    showSpinner: function(component){
        let self = this;
        return new Promise($A.getCallback(function(resolve,reject){
            try{
                component.set('v.showSpinner', true);
                resolve();
            } catch(err){
                reject(err);
            }

        }))
    },
    hideSpinner: function(component){
        let self = this;
        return new Promise($A.getCallback(function(resolve,reject){
            try{
                component.set('v.showSpinner', false);
                resolve();
            } catch(err){
                reject(err);
            }

        }))
    },
    

})