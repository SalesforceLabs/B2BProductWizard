/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
public with sharing class ckz_PIM_TypeaheadController {

    @AuraEnabled
    public static list<sObject> selectRecords( String queryString, String objectName, 
        String fieldsToReturn, String fieldsToSearch, String orderBy, Integer recordLimit ) {

        //if (queryString == null) return null;

        String sQuery = String.escapeSingleQuotes( queryString );
        //if (sQuery.length() == 0) return null;

        String sObjectName = (objectName == null) ? 'Contact' : String.escapeSingleQuotes( objectName );


        String [] searchFields = fieldsToSearch.split(',');

        String filterClause = '';
        if(fieldsToSearch == null || fieldsToSearch == '') {
            filterClause = 'Name LIKE \'%' + sQuery + '%\'';
        }
        else {
            for(String searchField : searchFields) {
                
                if(filterClause != '') {
                    filterClause += ' OR ';
                }
                
                filterClause += searchField + ' LIKE \'%' + sQuery + '%\' ';
            }
        }
        
        String sFields = null;
		if(fieldsToReturn == null || fieldsToReturn == '') {
            sFields = 'Id, Name';
        }
		else {
    		String [] temp = fieldsToReturn.split(',');
    		sFields = String.escapeSingleQuotes( String.join( temp, ', ' ) );  
		}
        
        String sOrder = ' ORDER BY ' + ( (orderBy == null || orderBy == '') ? 'Name' : String.escapeSingleQuotes(orderBy) ); 
        
        String sLimit = (recordLimit == null || recordLimit == 0 || recordLimit >= 2000) ? '' : 
            ( ' LIMIT ' + String.valueOf(recordLimit));
        
        // can't escape the filter clause
        String sWhere = (filterClause == null || filterClause == '') ? '' : 
            ( ' WHERE ' + filterClause );

        String finalQuery = 'SELECT ' + sFields + ' FROM ' + objectName + sWhere + 
                sOrder + sLimit;

        System.debug('finalQuery: ' + finalQuery);

        list<sObject> results = Database.query( finalQuery );
        
        return results;

        }

}