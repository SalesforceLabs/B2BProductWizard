/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
  displaySelectedCategoryTree: function (component) {

    component.set("v.storefrontCategoryTree", []);

    var storefront = component.find("selectStorefront").get("v.value");

    console.log("displaySelectedCategoryTree: " + storefront);

    if(storefront === '') {
      component.set("v.storefrontCategoryTree", {});
      return;
    }

    var action = component.get("c.getCategoryTree");

    action.setParams({
      "storefront" : storefront
    });

    try {

      this.waiting(component);

      action.setCallback(this, function (response) {

        this.doneWaiting(component);
        
        var state = response.getState();
        if (state === 'SUCCESS') {
            var returnValue = response.getReturnValue();

            console.log('category json returned: ' + returnValue);

            var json = JSON.parse(returnValue);

            console.log('all category trees retrieved');
            
            if(json.length > 0) {

              var categoryList = [];

              for(var i = 0; i < json.length; i++) {

                var apiCategory = json[i];
                var category = {};

                category.label = apiCategory.name;
                category.name = apiCategory.sfid;
                category.sequence = apiCategory.sequence;
                category.expanded = false;
                category.items = [];

                if(apiCategory.children) {
                  category.items = this.getChildCategories(category, apiCategory.children);
                }

                categoryList.push(category);

              }

              console.log('categoryList: ' + JSON.stringify(categoryList));

              component.set("v.storefrontCategoryTree", categoryList);

            }
            
        }
        else {
            console.log('Failed with state: ' + state);
        }
    });

    $A.enqueueAction(action);

    }
    catch (err) {
      console.log('error message: ' + err.message);
    }

  },
  getChildCategories : function(category, apiChildCategories) {

    var items = [];

    if(apiChildCategories.length > 0) {

        for(var i = 0; i < apiChildCategories.length; i++) {

            var apiCategory = apiChildCategories[i];

            var category = {};

            category.label = apiCategory.name;
            category.name = apiCategory.sfid;
            category.sequence = apiCategory.sequence;
            category.expanded = false;
            category.items = [];

            if(apiCategory.children) {
              category.items = this.getChildCategories(category, apiCategory.children);
            }

            items.push(category);

        }

        return items;

    }

},
  getSelectedCategoryName: function (component, categoryId) {
    var storefrontCategoryTree = component.get("v.storefrontCategoryTree");
    var categoryName = null;
    for(var i = 0; i < storefrontCategoryTree.length; i++) {
      var category = storefrontCategoryTree[i];
      categoryName = this.lookForCategory(categoryId, category);
      if(categoryName && categoryName != null) {
        break;
      }
    }

    console.log('categoryName found: ' + categoryName);
    return categoryName;
  },
  lookForCategory: function(categoryId, category) {

    if(category.name === categoryId) {
      return category.label;
    }
    else {
      var items = category.items;
      if(items && items.length > 0) {
        for(var i = 0; i < items.length; i++) {
          var childCategory = items[i];
          var categoryName = this.lookForCategory(categoryId, childCategory);
          if(categoryName) {
            return categoryName;
          }
        }
      }
    }
  },
  waiting: function(component) {
    component.set("v.showSpinner", true);
  },
  doneWaiting: function(component) {
      component.set("v.showSpinner", false);
  },

})