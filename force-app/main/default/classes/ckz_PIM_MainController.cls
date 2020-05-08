/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
public with sharing class ckz_PIM_MainController {

    @AuraEnabled
    public static Map<String, Object> checkRecordId(String recordId) {

        Map<String, Object> responseMap = new Map<String, Object>();

        Boolean isProduct = false;

        System.debug('recordId: ' + recordId);

        if(recordId != null && recordId.equals('') == false) {
            isProduct = isRecordIdProductId(recordId);
        }

        responseMap.put('recordId', recordId);
        responseMap.put('isProduct', isProduct);

        return responseMap;

    }

    private static Boolean isRecordIdProductId(String recordId) {

        Boolean isProduct = false;

        try {
            if (Schema.sObjectType.ccrz__E_Product__c.fields.Name.isAccessible() ){
                List<ccrz__E_Product__c> objList = [Select 
                    Id, 
                    Name 
                    from ccrz__E_Product__c where Id = :recordId];

                if(objList != null && objList.size() > 0) {

                    isProduct = true;
                }
            }
        else {
            throw new CustomException('You are not authorized to access CC Product records');
        }

        } catch (Exception e) {
           System.debug(System.LoggingLevel.ERROR, e.getMessage());
        }

        return isProduct;
    }

    // Originally in ckz_PIM_ProductChooserController
    @AuraEnabled
    public static Map<String, Object> fetchProductData(String recordId) {

        Map<String, Object> productDataMap = new Map<String, Object>();

        System.debug('recordId: ' + recordId);

        Map<String, Object> productDetails = getProductObjData(recordId);

        if(productDetails == null) {
            productDataMap.put('errorMsg', 'Product could not be found');
        }
        else {
            productDataMap.put('productDetails', productDetails);

            // Get product price list data

            List<Object> priceListEntries = getPriceListObjData(recordId);

            productDataMap.put('priceListEntries', priceListEntries);

            // Get product media data

            List<Object> productMediaEntries = getProductMediaObjData(recordId);

            productDataMap.put('productMediaEntries', productMediaEntries);

            // Get product category data

            List<Object> productCategoryEntries = getProductCategoryObjData(recordId);

            productDataMap.put('productCategoryEntries', productCategoryEntries);

            // Get product spec data

            List<Object> productSpecEntries = getProductSpecObjData(recordId);

            productDataMap.put('productSpecEntries', productSpecEntries);

            // Get related product data

            List<Object> relatedProductEntries = getRelatedProductObjData(recordId);

            productDataMap.put('relatedProductEntries', relatedProductEntries);

        }

        return productDataMap;

    }

    private static Map<String, Object> getProductObjData(String recordId) {

        Map<String, Object> productDetails = null;

        final String [] objFields = new String[]{'Id'
                                                    ,'Name'
                                                    ,'ccrz__SKU__c'
                                                    ,'ccrz__ShortDescRT__c'
                                                    ,'ccrz__LongDescRT__c'
                                                    ,'ccrz__ProductStatus__c'
                                                    ,'ccrz__SEOTitle__c'
                                                    ,'ccrz__Storefront__c'
                                                    ,'ccrz__ProductType__c'
                                                    ,'ccrz__UnitOfMeasure__c'
                                                    ,'ccrz__StartDate__c'
                                                    ,'ccrz__EndDate__c'
                                                };

        try {
            ccrz__E_Product__c obj = null;

            if(ckz_PIM_SecurityUtils.checkIsAccessible('ccrz__E_Product__c', objFields)) {
                obj = [Select
                    Id,
                    Name,
                    ccrz__SKU__c,
                    ccrz__ShortDescRT__c,
                    ccrz__LongDescRT__c,
                    ccrz__ProductStatus__c,
                    ccrz__SEOTitle__c,
                    ccrz__Storefront__c,
                    ccrz__ProductType__c,
                    ccrz__UnitOfMeasure__c,
                    ccrz__StartDate__c,
                    ccrz__EndDate__c
            from ccrz__E_Product__c where Id = :recordId];
            }
            else {
                throw new CustomException('You are not authorized to access the CC Product object');
            }

            if(obj != null) {

                productDetails = new Map<String, Object>();

                productDetails.put('sfid', obj.Id);
                productDetails.put('name', obj.Name);
                productDetails.put('sku', obj.ccrz__SKU__c);
                productDetails.put('shortDesc', obj.ccrz__ShortDescRT__c);
                productDetails.put('longDesc', obj.ccrz__LongDescRT__c);
                productDetails.put('status', obj.ccrz__ProductStatus__c);
                productDetails.put('seoTitle', obj.ccrz__SEOTitle__c);

                String[] selectedStorefronts = obj.ccrz__Storefront__c.split(';');
                productDetails.put('selectedStorefronts', selectedStorefronts);

                productDetails.put('productType', obj.ccrz__ProductType__c);
                productDetails.put('uom', obj.ccrz__UnitOfMeasure__c);
                productDetails.put('startDate', obj.ccrz__StartDate__c);
                productDetails.put('endDate', obj.ccrz__EndDate__c);
            }

        } catch (Exception e) {
            System.debug(System.LoggingLevel.ERROR, e.getMessage());
        }

        return productDetails;
    }

    private static List<Object> getPriceListObjData(String recordId) {

        List<Object> entries = new List<Object>();

        List<ccrz__E_PriceListItem__c> objList = null;

        final String [] objFields = new String[]{'Id'
                                                    ,'Name'
                                                    ,'ccrz__Pricelist__c'
                                                    ,'ccrz__Price__c'
                                                    ,'ccrz__StartDate__c'
                                                    ,'ccrz__EndDate__c'
                                                    ,'ccrz__Product__c'
                                                };

        if (ckz_PIM_SecurityUtils.checkIsAccessible('ccrz__E_PriceListItem__c', objFields)) {
            objList = [Select Id, Name,
                ccrz__Pricelist__c,
                ccrz__Price__c,
                ccrz__StartDate__c,
                ccrz__EndDate__c
        from ccrz__E_PriceListItem__c where ccrz__Product__c = :recordId];
        }
        else {
            throw new CustomException('You are not authorized to access the CC Price List Item object');
        }

        if(objList != null && objList.size() > 0) {

            for(ccrz__E_PriceListItem__c obj : objList) {

                Map<String, Object> entry = new Map<String, Object>();

                entry.put('sfid', obj.Id);
                entry.put('priceList', obj.ccrz__Pricelist__c);
                entry.put('price', obj.ccrz__Price__c);
                entry.put('startDate', obj.ccrz__StartDate__c);
                entry.put('endDate', obj.ccrz__EndDate__c);

                entries.add(entry);
            }

        }

        return entries;

    }

    private static List<Object> getProductMediaObjData(String recordId) {
        List<Object> entries = new List<Object>();

        List<ccrz__E_ProductMedia__c> objList = null;

        final String [] objFields = new String[]{'Id'
                                                    ,'Name'
                                                    ,'ccrz__Enabled__c'
                                                    ,'ccrz__MediaType__c'
                                                    ,'ccrz__ProductMediaSource__c'
                                                    ,'ccrz__Sequence__c'
                                                    ,'ccrz__Locale__c'
                                                    ,'ccrz__URI__c'
                                                    ,'ccrz__StaticResourceName__c'
                                                    ,'ccrz__FilePath__c'
                                                    ,'ccrz__StartDate__c'
                                                    ,'ccrz__EndDate__c'
                                                    ,'ccrz__Product__c'
                                                };

        if (ckz_PIM_SecurityUtils.checkIsAccessible('ccrz__E_ProductMedia__c', objFields)) {
            objList = [Select Id, Name,
                ccrz__Enabled__c,
                ccrz__MediaType__c,
                ccrz__ProductMediaSource__c,
                ccrz__Sequence__c,
                ccrz__Locale__c,
                ccrz__URI__c,
                ccrz__StaticResourceName__c,
                ccrz__FilePath__c,
                ccrz__StartDate__c,
                ccrz__EndDate__c
        from ccrz__E_ProductMedia__c where ccrz__Product__c = :recordId];
        }
        else {
            throw new CustomException('You are not authorized to access the CC Product Media object');
        }

        if(objList != null && objList.size() > 0) {

            for(ccrz__E_ProductMedia__c obj : objList) {

                Map<String, Object> entry = new Map<String, Object>();

                entry.put('sfid', obj.Id);
                entry.put('enabled', obj.ccrz__Enabled__c);
                entry.put('mediaType', obj.ccrz__MediaType__c);
                entry.put('mediaSource', obj.ccrz__ProductMediaSource__c);
                entry.put('sequence', obj.ccrz__Sequence__c);
                entry.put('locale', obj.ccrz__Locale__c);
                entry.put('uri', obj.ccrz__URI__c);
                entry.put('staticResourceName', obj.ccrz__StaticResourceName__c);
                entry.put('filePath', obj.ccrz__FilePath__c);
                entry.put('startDate', obj.ccrz__StartDate__c);
                entry.put('endDate', obj.ccrz__EndDate__c);

                entries.add(entry);
            }

        }

        return entries;

    }

    private static List<Object> getProductCategoryObjData(String recordId) {
        List<Object> entries = new List<Object>();

        List<ccrz__E_ProductCategory__c> objList = null;

        final String [] objFields = new String[]{'Id'
                                                    ,'Name'
                                                    ,'ccrz__Category__c'
                                                    ,'ccrz__Sequence__c'
                                                    ,'ccrz__StartDate__c'
                                                    ,'ccrz__EndDate__c'
                                                    ,'ccrz__Product__c'
                                                };

        if (ckz_PIM_SecurityUtils.checkIsAccessible('ccrz__E_ProductCategory__c', objFields)){
            objList = [Select Id, Name,
                    ccrz__Category__r.Name,
                    ccrz__Category__c,
                    ccrz__Sequence__c,
                    ccrz__StartDate__c,
                    ccrz__EndDate__c
            from ccrz__E_ProductCategory__c where ccrz__Product__c = :recordId];
        }
        else {
            throw new CustomException('You are not authorized to access the CC Product Category object');
        }

        if(objList != null && objList.size() > 0) {

            for(ccrz__E_ProductCategory__c obj : objList) {

                Map<String, Object> entry = new Map<String, Object>();

                entry.put('sfid', obj.Id);
                entry.put('categoryId', obj.ccrz__Category__c);
                entry.put('sequence', obj.ccrz__Sequence__c);
                entry.put('startDate', obj.ccrz__StartDate__c);
                entry.put('endDate', obj.ccrz__EndDate__c);
                entry.put('categoryName', obj.ccrz__Category__r.Name);

                entries.add(entry);
            }

        }

        return entries;

    }

    private static List<Object> getProductSpecObjData(String recordId) {
        List<Object> entries = new List<Object>();

        List<ccrz__E_ProductSpec__c> objList = null;

        final String [] objFields = new String[]{'Id'
                                                    ,'Name'
                                                    ,'ccrz__Product__c'
                                                    ,'ccrz__Spec__c'
                                                    ,'ccrz__SpecValue__c'
                                                };

        if (ckz_PIM_SecurityUtils.checkIsAccessible('ccrz__E_ProductSpec__c', objFields)){
            objList = [Select Id, Name,
                    ccrz__Product__r.Name,
                    ccrz__Spec__r.Name,
                    ccrz__Spec__c,
                    ccrz__SpecValue__c
            from ccrz__E_ProductSpec__c where ccrz__Product__c = :recordId
            order by ccrz__Spec__r.ccrz__Sequence__c, ccrz__Spec__r.Name];
        }
        else {
            throw new CustomException('You are not authorized to access the CC Product Spec object');
        }

        if(objList != null && objList.size() > 0) {

            for(ccrz__E_ProductSpec__c obj : objList) {

                Map<String, Object> entry = new Map<String, Object>();

                entry.put('sfid', obj.Id);
                entry.put('specId', obj.ccrz__Spec__c);
                entry.put('productSpecValue', obj.ccrz__SpecValue__c);
                entry.put('specName', obj.ccrz__Spec__r.Name);

                entries.add(entry);
            }

        }

        return entries;

    }

    private static List<Object> getRelatedProductObjData(String recordId) {

        System.debug('--- begin getRelatedProductObjData');

        List<Object> entries = new List<Object>();
        List<ccrz__E_RelatedProduct__c> objList = null;

        final String [] objFields = new String[]{'Id'
                                                    ,'Name'
                                                    ,'ccrz__Product__c'
                                                    ,'ccrz__RelatedProduct__c'
                                                    ,'ccrz__Enabled__c'
                                                    ,'ccrz__RelatedProductType__c'
                                                    ,'ccrz__Sequence__c'
                                                    ,'ccrz__StartDate__c'
                                                    ,'ccrz__EndDate__c'
                                                };

        if (Schema.sObjectType.ccrz__E_RelatedProduct__c.isAccessible() ){
            objList = [Select Id, Name,
                    ccrz__Product__c,
                    ccrz__RelatedProduct__r.Name,
                    ccrz__RelatedProduct__r.ccrz__SKU__c,
                    ccrz__Enabled__c,
                    ccrz__RelatedProductType__c,
                    ccrz__Sequence__c,
                    ccrz__RelatedProduct__c,
                    ccrz__StartDate__c,
                    ccrz__EndDate__c
            from ccrz__E_RelatedProduct__c where ccrz__Product__c = :recordId];
        }
        else {
            throw new CustomException('You are not authorized to access the CC Product Spec object');
        }

        if(objList != null && objList.size() > 0) {

            Set<Id> backRefProdIds = new Set<Id>();

            for(ccrz__E_RelatedProduct__c obj : objList) {

                Map<String, Object> entry = new Map<String, Object>();

                entry.put('sfid', obj.Id);
                entry.put('enabled', obj.ccrz__Enabled__c);
                entry.put('productType', obj.ccrz__RelatedProductType__c);
                entry.put('sequence', obj.ccrz__Sequence__c);
                //entry.put('productId', obj.ccrz__Product__c);
                entry.put('relatedProductId', obj.ccrz__RelatedProduct__c);
                entry.put('startDate', obj.ccrz__StartDate__c);
                entry.put('endDate', obj.ccrz__EndDate__c);
                entry.put('relatedProductName', obj.ccrz__RelatedProduct__r.Name);
                entry.put('relatedProductSku', obj.ccrz__RelatedProduct__r.ccrz__SKU__c);

                entries.add(entry);

                // 2020-02-03  msobczak: put all of the related products into a Set.
                backRefProdIds.add(obj.ccrz__RelatedProduct__c);
            }

            System.debug('backRefProdIds: ' + backRefProdIds);

            // Get all of the related products, including their related product child records
            List<ccrz__E_Product__c> backRefProdist = null;

            final String [] objFields2 = new String[]{'Id'
                                                    ,'Name'
                                                };

            if (ckz_PIM_SecurityUtils.checkIsAccessible('ccrz__E_Product__c', objFields2)){
                backRefProdist = [Select Id, Name, (Select Id, Name, ccrz__Product__c, ccrz__RelatedProduct__c from ccrz__E_RelatedProducts__r) from ccrz__E_Product__c where Id in :backRefProdIds];
            }
            else {
                throw new CustomException('You are not authorized to access CC Product records');
            }

            // Put all of the related products into a Map
            Map<Id, ccrz__E_Product__c> backRefProdMap = new Map<Id, ccrz__E_Product__c>();

            for(ccrz__E_Product__c backRefProd : backRefProdist) {

                System.debug('backRefProd Name: ' + backRefProd.Name);

                System.debug('backRefProd.ccrz__E_RelatedProducts__r.size() = ' + backRefProd.ccrz__E_RelatedProducts__r.size());

                backRefProdMap.put(backRefProd.Id, backRefProd);
            }

            System.debug('backRefProdMap: ' + backRefProdMap);

            System.debug('- checking back references...');

            // Loop through all of the related product entries.  See if there is a back reference present
            for(Object temp : entries) {

                Boolean hasBackRef = false;
                Id backRefRelProdId = null;

                Map<String, Object> entry = (Map<String, Object>)temp;

                String relatedProductName = (String)entry.get('relatedProductName');
                System.debug('current relatedProductName: ' + relatedProductName);

                //String productId = (String)entry.get('productId');
                
                String relatedProductId = (String)entry.get('relatedProductId');
                System.debug('current relatedProductId: ' + relatedProductId);

                if(backRefProdMap.containsKey(relatedProductId)) {

                    System.debug('- backRefProdMap contains relatedProductId');

                    ccrz__E_Product__c backRefProd = backRefProdMap.get(relatedProductId);

                    // Loop through all of the related products for the back ref product
                    // See if the back ref product contains a related product for the current product
                    for(ccrz__E_RelatedProduct__c relProdObj : backRefProd.ccrz__E_RelatedProducts__r) {

                        System.debug('relProdObj: ' + relProdObj);

                        //if(relProdObj.ccrz__RelatedProduct__c == backRefProd.Id) {
                        if(relProdObj.ccrz__RelatedProduct__c == recordId) {
                            System.debug('back reference found!');
                            hasBackRef = true;
                            backRefRelProdId = relProdObj.Id;
                            break;
                        }
                    }
                    
                }
                else {
                    System.debug('- backRefProdMap does not contain relatedProductId');
                }

                System.debug('hasBackRef = ' + hasBackRef);
                entry.put('hasBackRef', hasBackRef);
                entry.put('backRefRelProdId', backRefRelProdId);
            }

        }

        System.debug('--- end getRelatedProductObjData');

        return entries;

    }

    public class CustomException extends Exception {}

}