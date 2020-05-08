/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_ProductPricingControllerTest {
    
    @IsTest
    public static void testCode() {

        Id priceListId = ckz_PIM_TestUtils.createPriceList();

        List<String> selectedStorefronts = new List<String>{'DefaultStore'};

        List<Map<String, String>> priceListOptions = ckz_PIM_ProductPricingController.fetchPriceListOptions(selectedStorefronts);

        System.assertEquals(1, priceListOptions.size());

    }

}
