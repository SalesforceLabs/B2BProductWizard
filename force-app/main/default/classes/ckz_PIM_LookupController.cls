/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
public with sharing class ckz_PIM_LookupController {

/**
 * Returns JSON of list of ResultWrapper to Lex Components
 * @objectName - Name of SObject
 * @fld_API_Text - API name of field to display to user while searching
 * @fld_API_Val - API name of field to be returned by Lookup COmponent
 * @lim   - Total number of record to be returned
 * @fld_API_Search - API name of field to be searched
 * @searchText - text to be searched
 * */
    @AuraEnabled
    public static String searchDB(String objectName, String fld_API_Text, String fld_API_Val,
            Integer lim, String fld_API_Search, String searchText) {

        final String [] objFields = new String[]{fld_API_Text
            ,fld_API_Val
            ,fld_API_Search
        };

        if(ckz_PIM_SecurityUtils.checkIsAccessible(objectName, objFields) == false) {
            return '[]';
        }

        searchText = '\'%' + String.escapeSingleQuotes(searchText.trim()) + '%\'';


        String query = 'SELECT ' + string.escapeSingleQuotes(fld_API_Text) + ' ,' + string.escapeSingleQuotes(fld_API_Val) +
                ' FROM ' + string.escapeSingleQuotes(objectName) +
                ' WHERE ' + string.escapeSingleQuotes(fld_API_Search) + ' LIKE ' + searchText +
                ' LIMIT ' + lim;

        List<sObject> sobjList = Database.query(query);
        List<ResultWrapper> lstRet = new List<ResultWrapper>();

        for (SObject s : sobjList) {
            ResultWrapper obj = new ResultWrapper();
            obj.objName = objectName;
            obj.text = String.valueOf(s.get(fld_API_Text)) ;
            obj.val = String.valueOf(s.get(fld_API_Val)) ;
            lstRet.add(obj);
        }
        return JSON.serialize(lstRet) ;
    }

    @AuraEnabled
    public static String getAllFromDB(String objectName, String fld_API_Text, String fld_API_Val,
            Integer lim) {

        final String [] objFields = new String[]{fld_API_Text
            ,fld_API_Val
        };

        if(ckz_PIM_SecurityUtils.checkIsAccessible(objectName, objFields) == false) {
            return '[]';
        }

        String query = 'SELECT ' + fld_API_Text + ' ,' + fld_API_Val +
                ' FROM ' + objectName +
                ' order by ' + fld_API_Text +
                ' LIMIT ' + lim;

        List<sObject> sobjList = Database.query(query);
        List<ResultWrapper> lstRet = new List<ResultWrapper>();

        for (SObject s : sobjList) {
            ResultWrapper obj = new ResultWrapper();
            obj.objName = objectName;
            obj.text = String.valueOf(s.get(fld_API_Text)) ;
            obj.val = String.valueOf(s.get(fld_API_Val)) ;
            lstRet.add(obj);
        }
        return JSON.serialize(lstRet) ;
    }

    public class ResultWrapper {
        public String objName { get; set; }
        public String text { get; set; }
        public String val { get; set; }
    }
}