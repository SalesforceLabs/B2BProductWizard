/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
// ckz_PIM_Utilities
window.util = (function() {

    var screenOptions = [
                                       { 'label' : 'Details', 'value' : 'ckz_PIM_ProdDetail' },
                                       { 'label' : 'Price List Items', 'value' : 'ckz_PIM_ProductPricingTable' },
                                       { 'label' : 'Media', 'value' : 'ckz_PIM_ProductMediaTable' },
                                       { 'label' : 'Categories', 'value' : 'ckz_PIM_ProductCategoryTable' },
                                       { 'label' : 'Specs', 'value' : 'ckz_PIM_ProductSpecTable' },
                                       { 'label' : 'Related Products', 'value' : 'ckz_PIM_RelatedProductTable' },
                                       { 'label' : 'Save', 'value' : 'ckz_PIM_SaveProduct' }

                               ];

    return {
      getFormattedDate: function (date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        //return month + '/' + day + '/' + year;
        return year + '-' + month + '-' + day;
      },

      getScreenOptions: function () {
          return screenOptions;
      },

      getScreenOptionsSize: function () {
            return screenOptions.length;
        },
       getLastScreenOption: function() {
           if(screenOptions && screenOptions.length > -1) {
            return screenOptions[screenOptions.length - 1].value;
           }
           else {
               return null;
           }
       },
       getFirstScreen: function() {
           return screenOptions[0].value;
       },
      getNextScreen: function (currentScreen) {
          if(currentScreen == null || currentScreen == '') {
              return null;
          }

          var index = -1;

          for(var i = 0; i < screenOptions.length; i++) {
              if(screenOptions[i].value === currentScreen) {
                  index = i;
                  break;
              }
          }

          if((i > -1) && screenOptions[i + 1]) {
              return screenOptions[i + 1].value;
          }
      },
      getPreviousScreen: function (currentScreen) {
        if(currentScreen == null || currentScreen == '') {
            return null;
        }

        var index = -1;

        for(var i = 0; i < screenOptions.length; i++) {
            if(screenOptions[i].value === currentScreen) {
                index = i;
                break;
            }
        }

        if((i > -1) && screenOptions[i - 1]) {
            return screenOptions[i - 1].value;
        }
    },
    openPreviousComponent: function(component) {

        var productDataMap = component.get("v.productDataMap");
        var currentScreen = component.get("v.screen");

        var event = component.getEvent("renderPanel");

        var screen = this.getPreviousScreen(currentScreen);
        event.setParam("type", screen);
        event.setParam("attributes", productDataMap);

        event.fire();
    },
    openNextComponent: function(component) {

        var productDataMap = component.get("v.productDataMap");
        var currentScreen = component.get("v.screen");

        var event = component.getEvent("renderPanel");

        var screen = this.getNextScreen(currentScreen);
        event.setParam("type", screen);
        event.setParam("attributes", productDataMap);

        event.fire();
    },
    openLastComponent: function(component) {

        var productDataMap = component.get("v.productDataMap");

        var event = component.getEvent("renderPanel");

        var screen = this.getLastScreenOption();
        event.setParam("type", screen);
        event.setParam("attributes", productDataMap);

        event.fire();
    },
    openTargetComponent: function(component, screen) {

        var productDataMap = component.get("v.productDataMap");

        var event = component.getEvent("renderPanel");

        event.setParam("type", screen);
        event.setParam("attributes", productDataMap);

        event.fire();
    },
    getExistingProductDataMap: function(component, recordId, retainIds) {

        console.log('ckz_PIM_Utilities - begin getExistingProductDataMap()');

        component.set('v.showSpinner', true);

        component.set("v.pageMessages", []);

        var action = component.get("c.fetchProductData");

        action.setParams({
            "recordId" : recordId
        });

        action.setCallback(this, function (response) {

            var messages = [];

            var state = response.getState();

            if (state === 'SUCCESS') {

                var returnValue = response.getReturnValue();

                var errorMsg = null;

                if(returnValue.errorMsg) {
                    errorMsg = returnValue.errorMsg;
                    messages.push({'severity' : 'error', 'message' : errorMsg});
                }
                else {
                    var productDataMap = {};

                    var productDetails = {};
                    var priceListEntries = [];
                    var productMediaEntries = [];
                    var productCategoryEntries = [];
                    var relatedProductEntries = [];
                    var productSpecEntries = [];

                    if(returnValue.productDetails) {
                        productDetails = returnValue.productDetails;
                    }

                    if(returnValue.priceListEntries) {
                        priceListEntries = returnValue.priceListEntries;
                    }

                    if(returnValue.productMediaEntries) {
                        productMediaEntries = returnValue.productMediaEntries;
                    }

                    if(returnValue.productCategoryEntries) {
                        productCategoryEntries = returnValue.productCategoryEntries;
                    }

                    if(returnValue.relatedProductEntries) {
                        relatedProductEntries = returnValue.relatedProductEntries;
                    }

                    if(returnValue.productSpecEntries) {
                        productSpecEntries = returnValue.productSpecEntries;
                    }

                    productDataMap.productDetails = productDetails;
                    productDataMap.priceListEntries = priceListEntries;
                    productDataMap.productMediaEntries = productMediaEntries;
                    productDataMap.productCategoryEntries = productCategoryEntries;
                    productDataMap.relatedProductEntries = relatedProductEntries;
                    productDataMap.productSpecEntries = productSpecEntries;

                    if(productDetails == {}) {
                        errorMsg = 'Product details not returned.  Something fishy going on.';
                        messages.push({'severity' : 'error', 'message' : errorMsg});
                    }

                    if(productDetails != {}) {
                        if(retainIds == false) {
                            this.clearObjectIds(productDataMap);
                        }
                    }

                    component.set("v.productDataMap", productDataMap);

                    if(messages.length == 0) {
                        var screen = this.getFirstScreen();
                        component.set("v.screen", screen);
                        this.openComponent(component);
                    }
                }

            }
            else {
                var errorMsg = 'Failed with state: ' + state
                console.log(errorMsg);
                messages.push({'severity' : 'error', 'message' : errorMsg});
            }

            component.set("v.pageMessages", messages);

        });

        $A.enqueueAction(action);

         console.log('ckz_PIM_Utilities - exit getExistingProductDataMap()');
    },
    clearObjectIds: function(productDataMap) {
        if(productDataMap.productDetails) {
            var productDetails = productDataMap.productDetails;
            productDetails.sfid = null;
        }

        if(productDataMap.priceListEntries) {
            var priceListEntries = productDataMap.priceListEntries;

            for(var i = 0; i < priceListEntries.length; i++) {
                priceListEntries[i].sfid = null;
            }
        }

        if(productDataMap.productMediaEntries) {
            var productMediaEntries = productDataMap.productMediaEntries;

            for(var i = 0; i < productMediaEntries.length; i++) {
                productMediaEntries[i].sfid = null;
            }
        }

        if(productDataMap.productCategoryEntries) {
            var productCategoryEntries = productDataMap.productCategoryEntries;

            for(var i = 0; i < productCategoryEntries.length; i++) {
                productCategoryEntries[i].sfid = null;
            }
        }

        if(productDataMap.relatedProductEntries) {
            var relatedProductEntries = productDataMap.relatedProductEntries;

            for(var i = 0; i < relatedProductEntries.length; i++) {
                relatedProductEntries[i].sfid = null;
            }
        }

        if(productDataMap.productSpecEntries) {
            var productSpecEntries = productDataMap.productSpecEntries;

            for(var i = 0; i < productSpecEntries.length; i++) {
                productSpecEntries[i].sfid = null;
            }
        }

    },
    openComponent: function(component) {

        var productDataMap = component.get("v.productDataMap");

        var screen = component.get("v.screen");

        var event = component.getEvent("renderPanel");

        event.setParam("type", screen);
        event.setParam("attributes", productDataMap);

        event.fire();
    }

  };
}());