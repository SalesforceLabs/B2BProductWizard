/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
private class ckz_PIM_UpdateCacheServiceTest {
    @IsTest
    static void testBehavior() {

        Map<String, Object> inputData = new Map<String, Object>{
                ccrz.ccApi.API_VERSION => 1,
                ccrz.ccApiConfig.CONFIG_JSON => ckz_PIM_TestUtils.configJSON
        };

        ccrz.ccApiConfig.setBulk(inputData);

        // Map<String,Map<String,Object>> testData = new Map<String,Map<String,Object>>{

        //         ccrz.ccApiTestData.STOREFRONT_SETTINGS => new Map<String,Object>{
        //             'Name' => 'DefaultStore'
        //             ,'DEFAULTLOCALE__C' => 'en_US'
        //             ,'Root_Category_ID__c' => 'AllProducts'
        //             ,'Languages__c' => 'en_US'
        //         }
                
        //     };
        // Map<String,Object> retData = ccrz.ccApiTestData.setupData(testData);

        Map<String,Object> retData =
                ccrz.ccApiTestData.setupData(new Map<String,Map<String,Object>>{
                        ccrz.ccApiTestData.DATAOPTIONS => new Map<String,Object>{
                        ccrz.ccApiTestData.INSERTDATA => false,
                        ccrz.ccApiTestData.LOADDEFAULTS => true
                        }
                });

        Test.startTest();

        List<String> messages = ckz_PIM_UpdateCacheService.doUpdate();

        Test.stopTest();

        String msg1 = messages.get(0);

        System.assertEquals('category tree cache updated', msg1);

    }
}