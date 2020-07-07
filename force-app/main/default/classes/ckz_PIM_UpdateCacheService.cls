/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@RestResource(urlMapping='/ckzPIMUpdateCache')
global with sharing class ckz_PIM_UpdateCacheService {

    @HttpGet
    global static List<String> doUpdate() {
        List<String> messages = new List<String>();

        updateCache(messages);

        return messages;
    }

    private static void updateCache(List<String> messages) {

        try {

            Set<Object> storefrontSet = getStorefrontSet();

            Set<Object> localeObjectSet = new Set<Object>();
            Set<String> localeStringSet = new Set<String>();

            Set<Object> rootCategoryIdSet = new Set<Object>();

            List<SiteIndexParams> siteIndexParamsList = new List<SiteIndexParams>();

            for (Object storefront : storefrontSet) {

                System.debug('storefront: ' + storefront);

                ccrz.ccContext ctx = new ccrz.ccContext();
                ctx.storefront = (String) storefront;

                ccrz.cc_CallContext.initContext(ctx);

                Map<String, Object> sfSettings = ccrz.cc_CallContext.storeFrontSettings;

                String defLocale = (String) sfSettings.get('DefaultLocale__c');
                String rootCategoryId = (String) sfSettings.get('Root_Category_ID__c');
                String languages = (String) sfSettings.get('Languages__c');

                String [] selectedLocales = languages.split(',');

                for (String locale : selectedLocales) {
                    localeStringSet.add(locale);
                    localeObjectSet.add(locale);
                }

                rootCategoryIdSet.add(rootCategoryId);

                SiteIndexParams siteIndexParams = new SiteIndexParams();
                siteIndexParams.storefront = (String) storefront;
                siteIndexParams.rootCategoryId = rootCategoryId;
                siteIndexParams.locales = localeStringSet;
                siteIndexParams.localeObjects = localeObjectSet;

                siteIndexParamsList.add(siteIndexParams);

            }

            System.debug('storefrontSet: ' + storefrontSet);

            System.debug('localeSet: ' + localeObjectSet);

            System.debug('rootCategoryIdSet: ' + rootCategoryIdSet);

// Category Tree Cache

            Id catBatchJobId = Database.executeBatch(new ccrz.ccCategoryCacheBuildJob(storefrontSet, rootCategoryIdSet, localeObjectSet, new Map<String, Object>()), 1000);

            messages.add('category tree cache updated');

// Page label cache

            Id plBatchJobId = Database.executeBatch(new ccrz.ccPageLabelCacheBuildJob(storefrontSet, new Set<Object>(), localeObjectSet, new Map<String, Object>()), 1000);

            messages.add('page label cache updated');

// Menu Cache

            Id menuBatchJobId = Database.executeBatch(new ccrz.ccMenuCacheBuildJob(storefrontSet, localeObjectSet, new Map<String, Object>()), 1000);

            messages.add('menu cache updated');

// Site index

            for (SiteIndexParams params : siteIndexParamsList) {
                Id siteIndexBatchJobId = Database.executeBatch(new ccrz.ccSiteIndexBuildJob(params.getInputData()), 1000);
                messages.add('site index updated for: ' + params);
            }

// Product Spec index
            ID prodSpecBatchJobId = Database.executeBatch(new ccrz.cc_job_LoadProductSpecIndex('Select Id, ParentProduct__c, FilterData__c from E_Product__c'), 1000);

            messages.add('product spec index updated');

// Product Index
            ccrz.ccProductIndexBuilder.build(new Map<String,Object>{
                ccrz.ccAPIProductIndex.LOCALES => localeStringSet,
                ccrz.ccAPIProductIndex.CLEAN_ONLY => TRUE
            });

        } catch (Exception e) {
            messages.add('Exception: ' + e.getMessage());  System.debug('Exception: ' + e.getMessage());
            messages.add('Exception: ' + e.getLineNumber());  System.debug('Line: ' + e.getLineNumber());
            System.debug(e.getStackTraceString());
        }

    }

    private static Set<Object> getStorefrontSet() {

        Set<Object> storefronts = new Set<Object>();

        if (Schema.sObjectType.ccrz__E_Configuration__c.fields.ccrz__Storefront__c.isAccessible()) {

            List<AggregateResult> configs = [SELECT ccrz__Storefront__c FROM ccrz__E_Configuration__c GROUP BY ccrz__Storefront__c];

            for (AggregateResult ag : configs) {
                storefronts.add(ag.get('ccrz__Storefront__c'));
            }
        }

        return storefronts;
    }

    class SiteIndexParams {
        public Object storefront;
        public Object rootCategoryId;
        public Set<String> locales;
        public Set<Object> localeObjects;

        public Map<String, Object> getInputData() {
            Map<String, Object> inputData = new Map<String, Object>();
            inputData.put(ccrz.ccAPISiteIndex.STOREFRONT, storefront);
            inputData.put(ccrz.ccAPISiteIndex.ROOT_CATEGORY_ID, rootCategoryId);
            inputData.put(ccrz.ccAPISiteIndex.LOCALES, locales);

            return inputData;
        }
    }

}