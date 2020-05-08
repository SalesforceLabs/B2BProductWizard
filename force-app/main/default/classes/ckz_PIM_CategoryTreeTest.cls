/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_CategoryTreeTest {

    private static Id setupTestData(String productName, String sku, String description) {

        //List<ccrz__E_Category__c> eCatList = new List<ccrz__E_Category__c>();

        ccrz__E_Category__c eCat = new ccrz__E_Category__c(
				Name='All Products'
				,ccrz__LongDescRT__c = 'All Products'
				,ccrz__ShortDescRT__c = 'All Products'
				,ccrz__CategoryID__c = 'AllProducts'
				,ccrz__StartDate__c = Date.today().addDays(-1)
                ,ccrz__EndDate__c = Date.today().addDays(+2)
                ,ccrz__Sequence__c = 500
			);
        //eCatList.add(eCat);
            
        //insert eCatList;
        insert eCat;

        Id categoryId = eCat.Id;

        Id productId = ckz_PIM_TestUtils.createProduct(productName, sku, description);

        Id productCatId = ckz_PIM_TestUtils.createProductCategoryRecord(productId, categoryId);

        return productId;

    }
    
    @IsTest
    public static void testCode1() {

        setupTestData('Energy Meter', 'E-1000', 'This is a robust, high-performance product that optimizes efficiency while remaining economical.');

        ccrz.cc_CallContext.storefront = 'DefaultStore';
		ccrz.cc_CallContext.storeFrontSettings = new Map<String, Object>{
            'DefaultLocale__c' => 'en_US'
            ,'Root_Category_ID__c' => 'AllProducts'
        };

        Map<String,Object> retData =
                ccrz.ccApiTestData.setupData(new Map<String,Map<String,Object>>{
                        ccrz.ccApiTestData.DATAOPTIONS => new Map<String,Object>{
                        ccrz.ccApiTestData.INSERTDATA => false,
                        ccrz.ccApiTestData.LOADDEFAULTS => true
                        }
                });

        String categoryTreeStr = ckz_PIM_CategoryTree.getCategoryTree('DefaultStore');

        System.assertNotEquals(null, categoryTreeStr);

    }
}
