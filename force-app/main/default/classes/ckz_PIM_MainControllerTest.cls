/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_MainControllerTest {

    private static Id setupTestData(String priceListId, String categoryId, String productName, String sku, String description) {

        Id productId = ckz_PIM_TestUtils.createProduct(productName, sku, description);

        return productId;
    }

    @IsTest
    public static void testCode() {

        Id priceListId = ckz_PIM_TestUtils.createPriceList();

        Id categoryId = ckz_PIM_TestUtils.createCategoryRecord('All Products');

        Id specId = ckz_PIM_TestUtils.createSpecRecord('Warranty');

        Id productId1 = setupTestData(priceListId, categoryId, 'Energy Meter', 'E-1000', 'This is a robust, high-performance product that optimizes efficiency while remaining economical.');

        ckz_PIM_TestUtils.createProductChildRecords(productId1, priceListId, categoryId, null, specId);

        Id productId2 = setupTestData(priceListId, categoryId, 'Battery, High Capacity', 'B-1000', 'This product is easy to integrate and provides enhanced performance for an open solution with no compromises.');

        ckz_PIM_TestUtils.createProductChildRecords(productId2, priceListId, categoryId, productId1, specId);

        // Create the back reference for the first product
        ckz_PIM_TestUtils.createRelatedProductRecord(productId1, productId2);

        ckz_PIM_MainController.checkRecordId(productId1);

        // Verify the first product

        Map<String, Object> product1 = ckz_PIM_MainController.fetchProductData(productId1);

        Map<String, Object> productDetails1 = (Map<String, Object>)product1.get('productDetails');

        String productName1 = (String)productDetails1.get('name');

        System.assertEquals('Energy Meter', productName1);

        // Verify the second product

        Map<String, Object> product2 = ckz_PIM_MainController.fetchProductData(productId2);

        Map<String, Object> productDetails2 = (Map<String, Object>)product2.get('productDetails');

        String productName2 = (String)productDetails2.get('name');

        System.assertEquals('Battery, High Capacity', productName2);

    }
}
