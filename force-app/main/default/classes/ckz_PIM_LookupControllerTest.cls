/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
@IsTest
public with sharing class ckz_PIM_LookupControllerTest {
    
    @IsTest
    public static void testCode() {

        ckz_PIM_TestUtils.createSpecRecord('Warranty');

        String objectName = 'ccrz__E_Spec__c';

        String fld_API_Text = 'Name';
        String fld_API_Val = 'Id';
        Integer lim = 250;

        String results = ckz_PIM_LookupController.getAllFromDB(objectName, fld_API_Text, fld_API_Val, lim);

        List<ckz_PIM_LookupController.ResultWrapper> lstRet = (List<ckz_PIM_LookupController.ResultWrapper>)Json.deserialize(results, List<ckz_PIM_LookupController.ResultWrapper>.class);

        System.debug('lstRet.size() = ' + lstRet.size());

        System.assertEquals(1, lstRet.size());

    }

    @IsTest
    public static void testCode2() {

        ckz_PIM_TestUtils.createSpecRecord('Warranty');
        ckz_PIM_TestUtils.createSpecRecord('Type');

        String objectName = 'ccrz__E_Spec__c';

        String fld_API_Text = 'Name';
        String fld_API_Val = 'Id';
        Integer lim = 250;
        String fld_API_Search = 'Name';
        String searchText = 'war';

        String results = ckz_PIM_LookupController.searchDB(objectName, fld_API_Text, fld_API_Val, lim, fld_API_Search, searchText);

        List<ckz_PIM_LookupController.ResultWrapper> lstRet = (List<ckz_PIM_LookupController.ResultWrapper>)Json.deserialize(results, List<ckz_PIM_LookupController.ResultWrapper>.class);

        System.debug('lstRet.size() = ' + lstRet.size());

        System.assertEquals(1, lstRet.size());

        ckz_PIM_LookupController.ResultWrapper obj = lstRet.get(0);

        System.debug('text: ' + obj.text);
        System.debug('val: ' + obj.val);

        System.assertEquals('Warranty', obj.text);

    }

}
