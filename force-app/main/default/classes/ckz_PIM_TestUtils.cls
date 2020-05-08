/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_TestUtils {

    public static String configJson = '[{' +
        '"ConfigurationMetas":[' +
           '{' +
              '"Name":"piname",' +
              '"APIName":"piname",'+
              '"Description":"Header Include End Page Include",' +
              '"ExternallySafe":false,' +
              '"Configurations":[' +
                 '{' +
                    '"TextValue":"cc_EmptyPage",' +
                    '"Storefront":"Global",' +
                    '"PageName":"all",' +
                    '"Name":"a0M360000015nqH"' +
                 '},' +
                 '{' +
                    '"TextValue":"cc_EmptyPage",' +
                    '"Storefront":"DefaultStore",' +
                    '"PageName":"all",' +
                    '"Name":"a0M360000015nqH"' +
                 '}' +
              ']' +
           '}' +
        '],' +
        '"APIName":"hie",' +
        '"Name":"Header Include End"' +
     '}]';
    
    public Static Id createProduct(String productName, String sku, String description) {

        ccrz__E_Product__c obj = new ccrz__E_Product__c(
            Name = productName
            ,ccrz__SKU__c = sku
            ,ccrz__ProductStatus__c = 'Released'
            ,ccrz__ProductType__c = 'Product'
            ,ccrz__Storefront__c = 'DefaultStore'
            ,ccrz__ShortDescRT__c = description
            ,ccrz__LongDescRT__c = description
            ,ccrz__StartDate__c = System.today().addYears(-1)
            ,ccrz__EndDate__c = System.today().addYears(+1)
            ,ccrz__SEOTitle__c = productName.replaceAll('(\\s+)', '')
            ,ccrz__UnitOfMeasure__c = 'Each'
        );
        
        insert obj;

        return obj.Id;

    }

    public static Id createPriceList() {
        ccrz__E_PriceList__c obj = new ccrz__E_PriceList__c(
            Name = 'Ohana Price List'
            ,ccrz__Storefront__c = 'DefaultStore'
            ,ccrz__StartDate__c = System.today().addYears(-1)
            ,ccrz__EndDate__c = System.today().addYears(+1)
            ,ccrz__CurrencyISOCode__c = 'USD'
            ,ccrz__Enabled__c = true
            ,ccrz__CustomerTypeCode__c = 'General'
            ,ccrz__PricelistId__c = '1'
        );

        insert obj;

        return obj.Id;
    }

    public static Id createCategoryRecord(String categoryName) {
        ccrz__E_Category__c obj = new ccrz__E_Category__c(

            Name = categoryName
            ,ccrz__CategoryID__c = categoryName
            ,ccrz__SEOId__c = categoryName.replaceAll('(\\s+)', '')
            ,ccrz__StartDate__c = System.today().addYears(-1)
            ,ccrz__EndDate__c = System.today().addYears(+1)
            ,ccrz__Sequence__c = 500
        );

        insert obj;

        return obj.Id;
    }

    public static Id createSpecRecord(String specName) {
        ccrz__E_Spec__c obj = new ccrz__E_Spec__c(

            Name = specName
            ,ccrz__DisplayName__c = specName
            ,ccrz__IsVisibleInCatalog__c = true
            ,ccrz__IsComparable__c = true
            ,ccrz__UseForFilter__c = true
            ,ccrz__Locale__c = 'en_US'
            ,ccrz__SelectType__c = 'Multiple'
            ,ccrz__Sequence__c = 500
            ,ccrz__SpecGroup__c = 'General'
            ,ccrz__FilterType__c = 'Checkbox'
            ,ccrz__FilterDisplayName__c = specName

        );

        insert obj;

        return obj.Id;
    }

    public static void createProductChildRecords(Id productId, Id priceListId, Id categoryId, Id relatedProductId, Id specId) {
        createPriceListItemRecord(productId, priceListId);
        createProductMediaRecord(productId);
        createProductCategoryRecord(productId, categoryId);
        createRelatedProductRecord(productId, relatedProductId);
        createProductSpecRecord(productId, specId, '1 Year');
    }

    public static Id createPriceListItemRecord(Id productId, Id priceListId) {
        ccrz__E_PriceListItem__c obj = new ccrz__E_PriceListItem__c(
            ccrz__Product__c = productId
            ,ccrz__Pricelist__c = priceListId
            ,ccrz__StartDate__c = System.today().addYears(-1)
            ,ccrz__EndDate__c = System.today().addYears(+1)
            ,ccrz__Price__c = 1.98
        );

        insert obj;

        return obj.Id;
    }

    public static Id createProductMediaRecord(Id productId) {
        ccrz__E_ProductMedia__c obj = new ccrz__E_ProductMedia__c(
            ccrz__Product__c = productId
            ,ccrz__StartDate__c = System.today().addYears(-1)
            ,ccrz__EndDate__c = System.today().addYears(+1)
            ,ccrz__Enabled__c = true
            ,ccrz__MediaType__c = 'Product Image'
            ,ccrz__ProductMediaSource__c = 'URI'
            ,ccrz__Sequence__c = 500
            ,ccrz__Locale__c = 'en_US'
            ,ccrz__URI__c = 'https://salesforce.com/logo.jpg'
            ,ccrz__StaticResourceName__c = null
            ,ccrz__FilePath__c = null
        );

        insert obj;

        return obj.Id;
    }

    public static Id createProductCategoryRecord(Id productId, Id categoryId) {
        ccrz__E_ProductCategory__c obj = new ccrz__E_ProductCategory__c(
            ccrz__Product__c = productId
            ,ccrz__Category__c = categoryId
            ,ccrz__StartDate__c = System.today().addYears(-1)
            ,ccrz__EndDate__c = System.today().addYears(+1)
            ,ccrz__Sequence__c = 500
        );

        insert obj;

        return obj.Id;
    }

    public static Id createRelatedProductRecord(Id productId, Id relatedProductId) {

        if (relatedProductId == null) {
            return null;
        }

        ccrz__E_RelatedProduct__c obj = new ccrz__E_RelatedProduct__c (
            ccrz__Product__c = productId
            ,ccrz__RelatedProduct__c = relatedProductId
            ,ccrz__Enabled__c = true
            ,ccrz__RelatedProductType__c = 'CrossSell'
            ,ccrz__Sequence__c = 500
            ,ccrz__StartDate__c = System.today().addYears(-1)
            ,ccrz__EndDate__c = System.today().addYears(+1)
        );

        insert obj;

        return obj.Id;
    }

    public static Id createProductSpecRecord(Id productId, Id specId, String specValue) {
        ccrz__E_ProductSpec__c obj = new ccrz__E_ProductSpec__c(
            ccrz__Product__c = productId
            ,ccrz__Spec__c = specId
            ,ccrz__SpecValue__c = specValue
        );

        insert obj;

        return obj.Id;
    }

    public static ccrz__E_Product__c retrieveProduct(Id productId) {
        ccrz__E_Product__c obj = [Select Id, Name 
            ,ccrz__SKU__c
            ,ccrz__ProductStatus__c
            ,ccrz__ProductType__c
            ,ccrz__Storefront__c
            ,ccrz__ShortDescRT__c
            ,ccrz__LongDescRT__c
            ,ccrz__StartDate__c
            ,ccrz__EndDate__c
            ,ccrz__SEOTitle__c
            ,ccrz__UnitOfMeasure__c
            ,(Select Id, Name 
                ,ccrz__Product__c
                ,ccrz__Pricelist__c
                ,ccrz__StartDate__c
                ,ccrz__EndDate__c
                ,ccrz__Price__c from ccrz__E_PriceListItems__r)
            ,(Select Id, Name 
                ,ccrz__Category__r.Name
                ,ccrz__Category__c
                ,ccrz__StartDate__c
                ,ccrz__EndDate__c
                ,ccrz__Sequence__c
                from ccrz__Product_Categories__r)
            ,(
                Select Id, Name
                ,ccrz__Enabled__c
                ,ccrz__MediaType__c
                ,ccrz__ProductMediaSource__c
                ,ccrz__Sequence__c
                ,ccrz__Locale__c
                ,ccrz__URI__c
                ,ccrz__StaticResourceName__c
                ,ccrz__FilePath__c
                ,ccrz__StartDate__c
                ,ccrz__EndDate__c
                from ccrz__E_ProductMedias__r
            )
            ,(Select Id, Name
                ,ccrz__Product__r.Name
                ,ccrz__Spec__r.Name
                ,ccrz__Spec__c
                ,ccrz__SpecValue__c
                from ccrz__Product_Specs__r)
            ,(Select Id, Name
                ,ccrz__Product__c
                ,ccrz__RelatedProduct__r.Name
                ,ccrz__RelatedProduct__r.ccrz__SKU__c
                ,ccrz__Enabled__c
                ,ccrz__RelatedProductType__c
                ,ccrz__Sequence__c
                ,ccrz__RelatedProduct__c
                ,ccrz__StartDate__c
                ,ccrz__EndDate__c
                from ccrz__E_RelatedProducts__r
                )
            
            from ccrz__E_Product__c where Id = :productId];

        return obj;
    }

    public static String saveNewProductJson(Id priceListId, Id categoryId, Id relatedProductId, Id specId) {
        Map<String, Object> productMap = new Map<String, Object> {
            'productDetails'=> new Map<String, Object>{
                'name'=> 'Connector Cables',
                'sku'=> 'C-300',
                'shortDesc'=> 'Built with the highest-quality materials and compatible with all IEC-standard products.',
                'longDesc'=> '',
                'status'=> 'Released',
                'seoTitle'=> 'Connector Cables',
                'sfid'=> null,
                'selectedStorefronts' => new List<String>{
                    'DefaultStore'
                },
                'productType'=> 'Product',
                'startDate'=> '2020-03-16',
                'endDate'=> '2099-12-30'
            },
            'priceListEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'price' => '20.99',
                    'minQty'=> 1,
                    'priceList'=> priceListId,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'sfid'=> null,
                    'remove'=> false
                }
            },
            'productMediaEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'enabled'=> true,
                    'mediaType'=> 'Product Image',
                    'mediaSource'=> 'URI',
                    'sequence'=> 500,
                    'uri'=> 'https://images.com/cables.jpg',
                    'staticResourceName'=> null,
                    'filePath'=> null,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'locale'=> 'en_US',
                    'sfid'=> null,
                    'remove'=> false
                },
                new Map<String, Object>{
                    'enabled'=> true,
                    'mediaType'=> 'Product Search Image',
                    'mediaSource'=> 'URI',
                    'sequence'=> 500,
                    'uri'=> 'https://images.com/cables.jpg',
                    'staticResourceName'=> null,
                    'filePath'=> null,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'locale'=> 'en_US',
                    'sfid'=> null,
                    'remove'=> false
                },
                new Map<String, Object>{
                    'enabled'=> true,
                    'mediaType'=> 'Product Image Thumbnail',
                    'mediaSource'=> 'URI',
                    'sequence'=> 500,
                    'uri'=> 'https://images.com/cables.jpg',
                    'staticResourceName'=> null,
                    'filePath'=> null,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'locale'=> 'en_US',
                    'sfid'=> null,
                    'remove'=> false
                }
            },
            'productCategoryEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'categoryId'=> categoryId,
                    'categoryName'=> 'All Products',
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'sequence'=> 500,
                    'sfid'=> null,
                    'remove'=> false
                }
            },
            'relatedProductEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'enabled'=> true,
                    'productType'=> 'CrossSell',
                    'relatedProductId'=> relatedProductId,
                    'relatedProductName'=> 'Energy Meter',
                    'relatedProductSku'=> 'E-1000',
                    'sequence'=> 500,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'sfid'=> null,
                    'remove'=> false,
                    'hasBackRef'=> true,  // set to true so that the code will automatically create the back ref
                    'backRefRelProdId'=> null  // leave as null to tell the code to create the back ref
                }
            },
            'productSpecEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'specId'=> specId,
                    'specName'=> 'Warranty',
                    'productSpecValue'=> '90 Days',
                    'sfid'=> null,
                    'remove'=> false
                }
            }
            
        };

        return JSON.serialize(productMap);
    }

    public static String deleteChildRecsProductJson(Id productId) {
        Map<String, Object> productMap = new Map<String, Object> {
            'productDetails'=> new Map<String, Object>{
                'name'=> 'Connector Cables',
                'sku'=> 'C-300',
                'shortDesc'=> 'Built with the highest-quality materials and compatible with all IEC-standard products.',
                'longDesc'=> '',
                'status'=> 'Released',
                'seoTitle'=> 'Connector Cables',
                'sfid'=> productId,
                'selectedStorefronts' => new List<String>{
                    'DefaultStore'
                },
                'productType'=> 'Product',
                'startDate'=> '2020-03-16',
                'endDate'=> '2099-12-30'
            },
            'priceListEntries' => new List<Map<String, Object>>{
                new Map<String, Object>()
            },
            'productMediaEntries' => new List<Map<String, Object>>{
                new Map<String, Object>()
            },
            'productCategoryEntries' => new List<Map<String, Object>>{
                new Map<String, Object>()
            },
            'relatedProductEntries' => new List<Map<String, Object>>{
                new Map<String, Object>()
            },
            'productSpecEntries' => new List<Map<String, Object>>{
                new Map<String, Object>()
            }
            
        };

        return JSON.serialize(productMap);
    }

    public static String deleteRelatedProductBackRefJson(
        Id productId1, 
        Id priceListId, 
        Id categoryId, 
        Id productId2, // for the related product
        Id specId, 
        Id priceListItemId, 
        Id productMediaId, 
        Id productCatId, 
        Id productSpecId, 
        Id relatedProdId,  // for the related product
        Id relatedProductBackRefId) {

        Map<String, Object> productMap = new Map<String, Object> {
            'productDetails'=> new Map<String, Object>{
                'name'=> 'Connector Cables',
                'sku'=> 'C-300',
                'shortDesc'=> 'Built with the highest-quality materials and compatible with all IEC-standard products.',
                'longDesc'=> '',
                'status'=> 'Released',
                'seoTitle'=> 'Connector Cables',
                'sfid'=> productId1,
                'selectedStorefronts' => new List<String>{
                    'DefaultStore'
                },
                'productType'=> 'Product',
                'startDate'=> '2020-03-16',
                'endDate'=> '2099-12-30'
            },
            'priceListEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'price' => '20.99',
                    'minQty'=> 1,
                    'priceList'=> priceListId,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'sfid'=> priceListItemId,
                    'remove'=> false
                }
            },
            'productMediaEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'enabled'=> true,
                    'mediaType'=> 'Product Image',
                    'mediaSource'=> 'URI',
                    'sequence'=> 500,
                    'uri'=> 'https://images.com/cables.jpg',
                    'staticResourceName'=> null,
                    'filePath'=> null,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'locale'=> 'en_US',
                    'sfid'=> productMediaId,
                    'remove'=> false
                }
            },
            'productCategoryEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'categoryId'=> categoryId,
                    'categoryName'=> 'All Products',
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'sequence'=> 500,
                    'sfid'=> productCatId,
                    'remove'=> false
                }
            },
            'relatedProductEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'enabled'=> true,
                    'productType'=> 'CrossSell',
                    'relatedProductId'=> productId2,
                    'relatedProductName'=> 'Energy Meter',
                    'relatedProductSku'=> 'E-1000',
                    'sequence'=> 500,
                    'startDate'=> '2020-03-16',
                    'endDate'=> '2099-12-30',
                    'sfid'=> relatedProdId,
                    'remove'=> false,
                    'hasBackRef'=> false,
                    'backRefRelProdId'=> relatedProductBackRefId
                }
            },
            'productSpecEntries' => new List<Map<String, Object>>{
                new Map<String, Object>{
                    'specId'=> specId,
                    'specName'=> 'Warranty',
                    'productSpecValue'=> '90 Days',
                    'sfid'=> productSpecId,
                    'remove'=> false
                }
            }
            
        };

        return JSON.serialize(productMap);
    }

}
