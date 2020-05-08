/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
public with sharing class ckz_PIM_ProductPricingController {

    @AuraEnabled
    public static List<Map<String, String>> fetchPriceListOptions(List<String> selectedStorefronts) {

        List<Map<String, String>> priceListOptions = new List<Map<String, String>>();

        List<ccrz__E_PriceList__c> priceLists = null;

        final String [] objFields = new String[]{'Id'
                                                    ,'Name'
                                                    ,'ccrz__Enabled__c'
                                                    ,'ccrz__Storefront__c'
                                                };

        if (ckz_PIM_SecurityUtils.checkIsAccessible('ccrz__E_PriceList__c', objFields)) {
            priceLists = [SELECT Id, Name
            FROM ccrz__E_PriceList__c
            WHERE ccrz__Enabled__c = TRUE
            AND ccrz__Storefront__c IN :selectedStorefronts
            ORDER BY Name];

        }
        else {
            throw new CustomException('You are not authorized to access the CC Price List records');
        }

        for(ccrz__E_PriceList__c priceList : priceLists) {
            priceListOptions.add(new Map<String, String>{'value' => priceList.Id, 'label' => priceList.Name});
        }

        return priceListOptions;

    }

    public class CustomException extends Exception {}

}