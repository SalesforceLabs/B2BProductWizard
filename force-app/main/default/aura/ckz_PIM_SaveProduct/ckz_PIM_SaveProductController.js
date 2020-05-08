/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
    doInit: function(component, event, helper) {
        console.log('ckz_PIM_SaveProduct.doInit()');

    },
    handleSave: function(component, event, helper) {
        console.log('inside handleSave()');

        component.set("v.isSaved", false);
        component.set("v.showSpinner", true);

        component.set("v.hasErrors", false);
        component.set("v.saveMessage", "Saving Product...")

        var productDataMap = component.get("v.productDataMap");

        var isValid = helper.validateProductMap(component, productDataMap);

        if(isValid == false) {
            component.set("v.hasErrors", true);
            component.set("v.saveMessage", component.get("v.saveErrorMsg"));
            component.set("v.showSpinner", false);
            return false;
        }

        var messages = [];

        component.set("v.pageMessages", messages);

        var productJson = JSON.stringify(productDataMap);

        var action = component.get("c.putProductData");

        action.setParams({
            "productJson" : productJson
        });

        action.setCallback(this, function (response) {

            component.set("v.showSpinner", false);

            var state = response.getState();
            if (state === 'SUCCESS') {
                var returnValue = response.getReturnValue();

                if('productDataSaved' in returnValue) {
                    if(returnValue.productDataSaved == true) {
                        component.set("v.isSaved", true);
                        messages.push({'severity' : 'confirm', 'message' : returnValue.productDataSavedMsg});
                    }
                    else {
                        component.set("v.hasErrors", true);
                        messages.push({'severity' : 'error', 'message' : returnValue.productDataSavedMsg});
                    }
                }

                if('productId' in returnValue) {
                    var productId = returnValue.productId;

                    component.set("v.productId", productId);
                }

                if('productObjSavedMsg' in returnValue) {
                    messages.push({'severity' : 'error', 'message' : returnValue.productObjSavedMsg});
                }

                if('priceListItemObjsSavedMsg' in returnValue) {
                    messages.push({'severity' : 'error', 'message' : returnValue.priceListItemObjsSavedMsg});
                }

                if('productCategoryItemObjsSavedMsg' in returnValue) {
                    messages.push({'severity' : 'error', 'message' : returnValue.productCategoryItemObjsSavedMsg});
                }

                if('productSpecObjsSavedMsg' in returnValue) {
                    messages.push({'severity' : 'error', 'message' : returnValue.productSpecObjsSavedMsg});
                }

                if('productMediaItemObjsSavedMsg' in returnValue) {
                    messages.push({'severity' : 'error', 'message' : returnValue.productMediaItemObjsSavedMsg});
                }

                if('relatedProductObjsSaved' in returnValue) {
                    if(returnValue.relatedProductObjsSaved) {

                        component.set("v.saveMessage", "Product saved!")

                        if('relatedProductObjsSavedMsg' in returnValue) {
                            messages.push({'severity' : 'info', 'message' : returnValue.relatedProductObjsSavedMsg});
                        }
                    }
                    else {
                        if('relatedProductObjsSavedMsg' in returnValue) {
                            messages.push({'severity' : 'error', 'message' : returnValue.relatedProductObjsSavedMsg});
                        }
                    }
                }

                if('deleteChldObjects' in returnValue) {
                    if(returnValue.deleteChldObjects) {
                        if(returnValue.deleteChldObjectsMsg) {
                            messages.push({'severity' : 'info', 'message' : returnValue.deleteChldObjectsMsg});
                        }
                    }
                    else {
                        messages.push({'severity' : 'error', 'message' : returnValue.deleteChldObjectsMsg});
                    }
                }

            }
            else {
                console.log('Failed with state: ' + state);
            }

            for(var i = 0; i < messages.length; i++) {
                var msg = messages[i];
                if(msg.severity === 'error') {
                    component.set("v.hasErrors", true);
                    component.set("v.saveMessage", component.get("v.saveErrorMsg"));
                    break;
                }
            }

            component.set("v.pageMessages", messages);
        });

        $A.enqueueAction(action);

    },
    // These are special cases since no data changes here, and there is no next screen
    handleScreenJump: function(component, event, helper) {

        var screen = event.getParam("screen");

        util.openTargetComponent(component, screen);
    },
    handleNavigatePrev: function(component, event, helper) {

        util.openPreviousComponent(component);

    },
    openRecord : function (component, event, helper) {
        var productId = component.get("v.productId");
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": productId,
          "slideDevName": "detail"
        });
        navEvt.fire();
    },
    waiting: function(component, event, helper) {
         component.set("v.showSpinner", true);
     },
     doneWaiting: function(component, event, helper) {
         component.set("v.showSpinner", false);
     },
     handleReset: function(component, event, helper) {
        var event = component.getEvent("reset");

        event.fire();
     },

})