/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_TypeaheadControllerTest {

    private static Id setupTestData(String priceListId, String categoryId, String productName, String sku, String description) {

        Id productId = ckz_PIM_TestUtils.createProduct(productName, sku, description);

        return productId;
    }
    
    @IsTest
    public static void testCode() {

        Id priceListId = ckz_PIM_TestUtils.createPriceList();

        Id categoryId = ckz_PIM_TestUtils.createCategoryRecord('All Products');

        setupTestData(priceListId, categoryId, 'Energy Meter', 'E-1000', 'This is a robust, high-performance product that optimizes efficiency while remaining economical.');

        setupTestData(priceListId, categoryId, 'Battery, High Capacity', 'B-1000', 'This product is easy to integrate and provides enhanced performance for an open solution with no compromises.');

        String queryString = 'ene';
        String objectName = 'ccrz__E_Product__c'; 
        String fieldsToReturn = 'Id,Name,ccrz__SKU__c';
        String fieldsToSearch = 'Name,ccrz__SKU__c';
        String orderBy = 'ccrz__SKU__c';
        Integer recordLimit = 50;
 
        List<sObject> results = ckz_PIM_TypeaheadController.selectRecords( queryString, objectName, fieldsToReturn, fieldsToSearch, orderBy, recordLimit );

        System.debug(results);

        ccrz__E_Product__c obj = (ccrz__E_Product__c)results.get(0);

        System.debug('Name: ' + obj.Name);
        System.debug('ccrz__SKU__c: ' + obj.ccrz__SKU__c);

        System.assertEquals('Energy Meter', obj.Name);

    }

}
