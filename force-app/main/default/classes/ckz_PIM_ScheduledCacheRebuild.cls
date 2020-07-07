/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
/*
Run the following in Developer Console to schedule the job to run every two minutes.
ckz_PIM_ScheduledCacheRebuild c = new ckz_PIM_ScheduledCacheRebuild();

String jobId2 = system.schedule('B2B Cache Build 2', '0 2 * * * ?', c);
String jobId4 = system.schedule('B2B Cache Build 4', '0 4 * * * ?', c);
String jobId6 = system.schedule('B2B Cache Build 6', '0 6 * * * ?', c);
String jobId8 = system.schedule('B2B Cache Build 8', '0 8 * * * ?', c);
String jobId10 = system.schedule('B2B Cache Build 10', '0 10 * * * ?', c);
String jobId12 = system.schedule('B2B Cache Build 12', '0 12 * * * ?', c);
String jobId14 = system.schedule('B2B Cache Build 14', '0 14 * * * ?', c);
String jobId16 = system.schedule('B2B Cache Build 16', '0 16 * * * ?', c);
String jobId18 = system.schedule('B2B Cache Build 18', '0 18 * * * ?', c);
String jobId20 = system.schedule('B2B Cache Build 20', '0 20 * * * ?', c);
String jobId22 = system.schedule('B2B Cache Build 22', '0 22 * * * ?', c);
String jobId24 = system.schedule('B2B Cache Build 24', '0 24 * * * ?', c);
String jobId26 = system.schedule('B2B Cache Build 26', '0 26 * * * ?', c);
String jobId28 = system.schedule('B2B Cache Build 28', '0 28 * * * ?', c);
String jobId30 = system.schedule('B2B Cache Build 30', '0 30 * * * ?', c);
String jobId32 = system.schedule('B2B Cache Build 32', '0 32 * * * ?', c);
String jobId34 = system.schedule('B2B Cache Build 34', '0 34 * * * ?', c);
String jobId36 = system.schedule('B2B Cache Build 36', '0 36 * * * ?', c);
String jobId38 = system.schedule('B2B Cache Build 38', '0 38 * * * ?', c);
String jobId40 = system.schedule('B2B Cache Build 40', '0 40 * * * ?', c);
String jobId42 = system.schedule('B2B Cache Build 42', '0 42 * * * ?', c);
String jobId44 = system.schedule('B2B Cache Build 44', '0 44 * * * ?', c);
String jobId46 = system.schedule('B2B Cache Build 46', '0 46 * * * ?', c);
String jobId48 = system.schedule('B2B Cache Build 48', '0 48 * * * ?', c);
String jobId50 = system.schedule('B2B Cache Build 50', '0 50 * * * ?', c);
String jobId52 = system.schedule('B2B Cache Build 52', '0 52 * * * ?', c);
String jobId54 = system.schedule('B2B Cache Build 54', '0 54 * * * ?', c);
String jobId56 = system.schedule('B2B Cache Build 56', '0 56 * * * ?', c);
String jobId58 = system.schedule('B2B Cache Build 58', '0 58 * * * ?', c);
String jobId60 = system.schedule('B2B Cache Build 60', '0 0 * * * ?', c);
*/
global class ckz_PIM_ScheduledCacheRebuild implements Schedulable {
    global void execute (SchedulableContext SC) {
        ckz_PIM_UpdateCacheService.doUpdate();
    }
}
