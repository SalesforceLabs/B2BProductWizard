/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_SaveProductControllerTest {
    
    private static Id setupTestData(String priceListId, String categoryId, String productName, String sku, String description) {

        Id productId = ckz_PIM_TestUtils.createProduct(productName, sku, description);

        return productId;
    }

    /*
        Creates a new product via the component.
    */
    @IsTest
    public static void testCode1() {

        Id priceListId = ckz_PIM_TestUtils.createPriceList();

        Id categoryId = ckz_PIM_TestUtils.createCategoryRecord('All Products');

        Id specId = ckz_PIM_TestUtils.createSpecRecord('Warranty');

        // The product created here will be the related product.
        Id productId1 = setupTestData(priceListId, categoryId, 'Energy Meter', 'E-1000', 'This is a robust, high-performance product that optimizes efficiency while remaining economical.');

        ckz_PIM_TestUtils.createProductChildRecords(productId1, priceListId, categoryId, null, specId);

        // Create a new product using the component code
        String productJson = ckz_PIM_TestUtils.saveNewProductJson(priceListId, categoryId, productId1, specId);

        Map<String, Object> responseMap = ckz_PIM_SaveProductController.putProductData(productJson);

        Boolean productDataSaved = (Boolean)responseMap.get('productDataSaved');

        System.debug('productDataSaved: ' + productDataSaved);

        String productDataSavedMsg = (String)responseMap.get('productDataSavedMsg');

        System.debug('productDataSavedMsg: ' + productDataSavedMsg);

        System.assertEquals(true, productDataSaved);

    }

    /*
        Deletes the child records for an existing product via the component.
    */
    @IsTest
    public static void testCode2() {

        Id priceListId = ckz_PIM_TestUtils.createPriceList();

        Id categoryId = ckz_PIM_TestUtils.createCategoryRecord('All Products');

        Id specId = ckz_PIM_TestUtils.createSpecRecord('Warranty');

        // The product created here will be the related product.
        Id productId1 = setupTestData(priceListId, categoryId, 'Energy Meter', 'E-1000', 'This is a robust, high-performance product that optimizes efficiency while remaining economical.');

        ckz_PIM_TestUtils.createProductChildRecords(productId1, priceListId, categoryId, null, specId);

        Id productId2 = setupTestData(priceListId, categoryId, 'Connector Cables', 'C-300', 'Built with the highest-quality materials and compatible with all IEC-standard products.');

        ckz_PIM_TestUtils.createProductChildRecords(productId2, priceListId, categoryId, productId1, specId);

        // Create the back reference for the first product
        ckz_PIM_TestUtils.createRelatedProductRecord(productId1, productId2);

        // Create the back reference for the second product
        ckz_PIM_TestUtils.createRelatedProductRecord(productId2, productId1);


        // Delete the child products from the second product using the component code
        String productJson = ckz_PIM_TestUtils.deleteChildRecsProductJson(productId1);

        Map<String, Object> responseMap = ckz_PIM_SaveProductController.putProductData(productJson);

        Boolean deleteChldObjects = (Boolean)responseMap.get('deleteChldObjects');

        System.debug('deleteChldObjects: ' + deleteChldObjects);

        String deleteChldObjectsMsg = (String)responseMap.get('deleteChldObjectsMsg');

        System.debug('deleteChldObjectsMsg: ' + deleteChldObjectsMsg);

        System.assertEquals(true, deleteChldObjects);

    }

    /*
        Deletes only the related product back reference.
    */
    @IsTest
    public static void testCode3() {

        System.debug('begin testCode3()');

        Id priceListId = ckz_PIM_TestUtils.createPriceList();

        Id categoryId = ckz_PIM_TestUtils.createCategoryRecord('All Products');

        Id specId = ckz_PIM_TestUtils.createSpecRecord('Warranty');

        // The product created here will be the related product.
        Id productId1 = setupTestData(priceListId, categoryId, 'Energy Meter', 'E-1000', 'This is a robust, high-performance product that optimizes efficiency while remaining economical.');

        ckz_PIM_TestUtils.createProductChildRecords(productId1, priceListId, categoryId, null, specId);

        // Create the product and child records (this is the product where we'll remove the related product back reference)
        Id productId2 = setupTestData(priceListId, categoryId, 'Connector Cables', 'C-300', 'Built with the highest-quality materials and compatible with all IEC-standard products.');

        //ckz_PIM_TestUtils.createProductChildRecords(productId2, priceListId, categoryId, productId1, specId);

        Id priceListItemId = ckz_PIM_TestUtils.createPriceListItemRecord(productId2, priceListId);
        Id productMediaId = ckz_PIM_TestUtils.createProductMediaRecord(productId2);
        Id productCatId = ckz_PIM_TestUtils.createProductCategoryRecord(productId2, categoryId);
        //Id relatedProductId2 = createRelatedProductRecord(productId, relatedProductId);
        Id productSpecId = ckz_PIM_TestUtils.createProductSpecRecord(productId2, specId, '1 Year');

        // Create the back reference for the first product
        Id relatedProdId1 = ckz_PIM_TestUtils.createRelatedProductRecord(productId1, productId2);

        // Create the back reference for the second product
        Id relatedProdId2 = ckz_PIM_TestUtils.createRelatedProductRecord(productId2, productId1);

        System.debug('productId1: ' + productId1);
        System.debug('productId2: ' + productId2);
        System.debug('relatedProdId1: ' + relatedProdId1);
        System.debug('relatedProdId2: ' + relatedProdId2);
        
        // Remove the related product back reference from the second product using the component code
        String productJson = ckz_PIM_TestUtils.deleteRelatedProductBackRefJson(
            productId2, 
            priceListId, 
            categoryId, 
            productId1, // for the related product
            specId, 
            priceListItemId, 
            productMediaId, 
            productCatId, 
            productSpecId, 
            relatedProdId2, // for the related product
            relatedProdId1  // this is the back reference
            );

        System.debug(productJson);

        Map<String, Object> responseMap = ckz_PIM_SaveProductController.putProductData(productJson);

        Boolean relatedProductBackRefsDeleted = (Boolean)responseMap.get('relatedProductBackRefsDeleted');

        System.debug('relatedProductBackRefsDeleted: ' + relatedProductBackRefsDeleted);

        String relatedProductBackRefsDeletedMsg = (String)responseMap.get('relatedProductBackRefsDeletedMsg');

        System.debug('relatedProductBackRefsDeletedMsg: ' + relatedProductBackRefsDeletedMsg);

        System.assertEquals(true, relatedProductBackRefsDeleted);

    }

}
