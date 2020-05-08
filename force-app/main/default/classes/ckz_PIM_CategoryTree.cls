/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
public with sharing class ckz_PIM_CategoryTree {

    @AuraEnabled
    public static String getCategoryTree(String storefront) {

        String categoryTreeStr = null;

        try {

            ccrz.ccContext ctx = new ccrz.ccContext();
            ctx.storefront = storefront;
            ccrz.cc_CallContext.initContext(ctx);
            Map<String, Object> sfSettings = ccrz.cc_CallContext.storeFrontSettings;

            String rootCatId = (String)sfSettings.get('Root_Category_ID__c');

            System.debug('rootCatId: ' + rootCatId);

            Map<String, Object> inputData = new Map<String, Object>{
                ccrz.ccApi.API_VERSION => ccrz.ccApi.CURRENT_VERSION
                ,ccrz.ccAPICategory.ROOTCATEGORYID => rootCatId
                //,ccrz.ccAPICategory.CATEGORYLOCALE => 'en_US'
                ,ccrz.ccAPICategory.STOREFRONT => storefront
        
            };
        
            // SZ_REL is required when retrieving the category tree. The following sizing must be added as input parameters.
            inputData.put(ccrz.ccApi.SIZING, new Map<String, Object>{
                    ccrz.ccAPICategory.ENTITYNAME => new Map<String, Object>{
                            ccrz.ccApi.SZ_DATA => ccrz.ccApi.SZ_M
                            ,ccrz.ccApi.SZ_REL => new List<String>{'Categories__r', 'CategoryI18Ns__r'}
                    }
                    ,ccrz.ccApi.SZ_ASSC => false
            });
        
            Map<String, Object> outputData = ccrz.ccAPICategory.fetchCategoryTree(inputData);
            if (outputData.get(ccrz.ccAPICategory.CATEGORYTREE) != null) {

                List<Map<String, Object>> categoryTree = (List<Map<String, Object>>) outputData.get(ccrz.ccAPICategory.CATEGORYTREE);
        
                categoryTreeStr = JSON.serialize(categoryTree);

                System.debug(categoryTreeStr);
            }

        } catch (Exception e) {
            System.debug(System.LoggingLevel.ERROR, e.getMessage());
        }

        return categoryTreeStr;

    }
}