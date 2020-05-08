/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_ProductDetailControllerTest {

    @IsTest
    public static void testCode() {

        Map<String, Object> inputData = new Map<String, Object>{
            ccrz.ccApi.API_VERSION => 1,
            ccrz.ccApiConfig.CONFIG_JSON => ckz_PIM_TestUtils.configJSON
        };

        ccrz.ccApiConfig.setBulk(inputData);

        Test.startTest();

        List<Map<String, String>> storefrontList = ckz_PIM_ProductDetailController.fetchStorefrontOptions();

        Test.stopTest();

        System.debug('storefrontList: ' + storefrontList);

        Map<String, String> storefrontMap = storefrontList.get(0);

        System.assertEquals('DefaultStore', storefrontMap.get('label'));

    }

}
