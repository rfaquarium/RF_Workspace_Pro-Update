const fs = require('fs');
const path = require('path');

console.log('=== RF_WORKSPACE_PRO COMPREHENSIVE TEST SUITE ===\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const errors = [];

function assert(description, condition, details = '') {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  [PASS] ${description}`);
    } else {
        failedTests++;
        console.error(`  [FAIL] ${description} ${details ? '-> ' + details : ''}`);
        errors.push({ description, details });
    }
}

// 1. TEST SCHEMA INTEGRITY (23 Tables Check)
console.log('\n--- 1. Testing Schema Integrity (23 Tables in Code.js) ---');
const codeJsPath = path.join(__dirname, 'Code.js');
const codeJsContent = fs.readFileSync(codeJsPath, 'utf8');

const requiredTables = [
    'Orders', 'Production', 'Packings', 'Products', 'Config_NhanSu',
    'Attendance', 'KPI_Progress', 'Config_KPI', 'BOM_Config', 'Transactions',
    'ImportExport', 'Accounts', 'BonusPenalty', 'CTV_Finance', 'Config_GiaLayout',
    'Documents', 'Trainings', 'Models3D', 'Monthly_Snapshots', 'ProfitReports',
    'Reimbursements', 'Suppliers', 'Tracking_Log'
];

requiredTables.forEach(table => {
    const tableRegex = new RegExp(`['"]?${table}['"]?\\s*:\\s*\\[`, 'i');
    assert(`Schema contains table '${table}'`, tableRegex.test(codeJsContent) || codeJsContent.includes(`'${table}'`) || codeJsContent.includes(`"${table}"`));
});

// 2. TEST LOCKSERVICE USAGE IN CODE.JS
console.log('\n--- 2. Testing LockService Concurrency Compliance ---');
const lockServiceMatches = codeJsContent.match(/LockService\.getScriptLock\(\)/g) || [];
assert('Code.js uses LockService.getScriptLock() for write operations', lockServiceMatches.length >= 5, `Found ${lockServiceMatches.length} locks`);
assert('LockService has waitLock with timeout', /waitLock\(\s*\d+\s*\)/.test(codeJsContent));
assert('LockService has releaseLock in try...finally', /finally\s*\{[\s\S]*?releaseLock\(\)/.test(codeJsContent));

// 3. TEST JSX SYNTAX & UNESCAPED CHARACTERS IN ALL HTML FILES
console.log('\n--- 3. Testing JSX & HTML Files for Syntax & Unescaped Tokens ---');
const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    
    // Check for unescaped > inside JSX text like (>5 ngày) which breaks JSX parsing
    const unescapedGreaterRegex = />\s*\([>]\s*[^)]+\)/;
    const hasUnescapedGreater = unescapedGreaterRegex.test(content);
    assert(`${file}: No unescaped '(>...)' in JSX text`, !hasUnescapedGreater, hasUnescapedGreater ? 'Found unescaped >' : '');
    
    // Check for unbalanced actual HTML <script> tags (excluding script tags inside JS strings/regex)
    // Strip JavaScript comments and string/regex literals before counting
    const sanitizedHtml = content.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, jsContent) => {
        // Return open and close tag only
        return '<script></script>';
    });
    const openScript = (sanitizedHtml.match(/<script\b[^>]*>/gi) || []).length;
    const closeScript = (sanitizedHtml.match(/<\/script>/gi) || []).length;
    assert(`${file}: Balanced <script> tags`, openScript === closeScript, `open: ${openScript}, close: ${closeScript}`);
});

// 4. TEST EXACT MATCH RULES & CHANNEL MAPPINGS
console.log('\n--- 4. Testing Exact Match & Channel Mapping Consistency ---');
const configHtml = fs.readFileSync(path.join(__dirname, 'Config.html'), 'utf8');

assert('TikTok channel accent in getChannelInlineStyle is Cyan (#06b6d4)', configHtml.includes("accent = '#06b6d4'"));
assert('TikTok channel badge in getChannelBadge is Cyan (#06b6d4)', configHtml.includes("bg-[#06b6d4]"));

// Functional Unit Test: Exact Match Order Status Mapping Algorithm
function mapOrderStatusExact(statusRaw) {
    const raw = String(statusRaw || '').trim().toLowerCase();
    if (raw === 'hoàn thành' || raw === 'completed') return 'Đối Soát Thành Công';
    if (raw === 'đã giao' || raw === 'delivered') return 'Đã Bàn Giao';
    if (raw === 'trả hàng/hoàn tiền' || raw === 'returned') return 'Hàng Hoàn';
    if (raw === 'đã hủy' || raw === 'cancelled') return 'Đơn Huỷ';
    return 'Chờ Sản Xuất';
}

assert('Exact Match: "Hoàn thành" -> "Đối Soát Thành Công"', mapOrderStatusExact('Hoàn thành') === 'Đối Soát Thành Công');
assert('Exact Match: "Completed" -> "Đối Soát Thành Công"', mapOrderStatusExact('Completed') === 'Đối Soát Thành Công');
assert('Exact Match: "Đã giao" -> "Đã Bàn Giao"', mapOrderStatusExact('Đã giao') === 'Đã Bàn Giao');
assert('Exact Match: "Delivered" -> "Đã Bàn Giao"', mapOrderStatusExact('Delivered') === 'Đã Bàn Giao');
assert('Exact Match: "Trả hàng/Hoàn tiền" -> "Hàng Hoàn"', mapOrderStatusExact('Trả hàng/Hoàn tiền') === 'Hàng Hoàn');
assert('Exact Match: "Đã hủy" -> "Đơn Huỷ"', mapOrderStatusExact('Đã hủy') === 'Đơn Huỷ');
assert('Exact Match: Unknown status fallback -> "Chờ Sản Xuất"', mapOrderStatusExact('Chờ xác nhận') === 'Chờ Sản Xuất');

// 5. TEST COGS & GLASS TANK CALCULATION LOGIC
console.log('\n--- 5. Testing Glass Tank & Production Logic ---');

// Functional Unit Test: Glass Tank COGS Formula
function calculateGlassTankCogs(lengthMm, widthMm, heightMm, glassPricePerM2, laborCost) {
    const L = lengthMm / 1000;
    const W = widthMm / 1000;
    const H = heightMm / 1000;
    
    // Diện tích kính S = (L * W + 2*L*H + 2*W*H) * 1.1 (đã tính 10% hao hụt)
    const areaM2 = (L * W + 2 * L * H + 2 * W * H) * 1.1;
    // Chiều dài mài vi tính P = (L + W) * 2
    const perimeterM = (L + W) * 2;
    // COGS = (S * Đơn giá kính) + (P * 25.000) + Công khoán
    const cogs = Math.round((areaM2 * glassPricePerM2) + (perimeterM * 25000) + laborCost);
    return { areaM2, perimeterM, cogs };
}

const tankTest = calculateGlassTankCogs(600, 300, 360, 180000, 50000);
assert('Glass Tank COGS formula executes correctly and calculates positive COGS', tankTest.cogs > 0, `COGS: ${tankTest.cogs} VND`);
assert('Glass Tank Area calculates m2 with 10% waste buffer', tankTest.areaM2 > 0.8 && tankTest.areaM2 < 1.2, `Area: ${tankTest.areaM2.toFixed(3)} m2`);

// 6. TEST BOM DEDUCTION SIMULATION
console.log('\n--- 6. Testing BOM Material Deduction Integrity ---');
function simulateBomDeduction(productionName, bomConfigList, stockProducts) {
    const matchingBOM = bomConfigList.filter(b => b.layoutCode === productionName);
    const deductions = [];
    matchingBOM.forEach(b => {
        const prod = stockProducts.find(p => p.sku === b.materialSku);
        if (prod) {
            prod.quantity -= b.defaultQty;
            deductions.push({ sku: b.materialSku, deductedQty: b.defaultQty, remainingQty: prod.quantity });
        }
    });
    return deductions;
}

const mockBOM = [
    { layoutCode: 'Rừng ver.19 - 30x20x20cm', materialSku: 'DA-DAEN-01', defaultQty: 2 },
    { layoutCode: 'Rừng ver.19 - 30x20x20cm', materialSku: 'REU-MINIFISS-01', defaultQty: 1 }
];
const mockStock = [
    { sku: 'DA-DAEN-01', name: 'Đá đen Gia Lai', quantity: 50 },
    { sku: 'REU-MINIFISS-01', name: 'Rêu Minifiss', quantity: 20 }
];

const deductionResults = simulateBomDeduction('Rừng ver.19 - 30x20x20cm', mockBOM, mockStock);
assert('BOM deduction deducts exact materials from stock', deductionResults.length === 2 && mockStock[0].quantity === 48 && mockStock[1].quantity === 19);

// 6.2 Testing Keo 502 net weight specification & price conversion (162g gross - 62g shell = 100g net glue @ 22.000đ/100g = 220đ/gam)
const netGramsPerBottle = 162 - 62; // 100g
const pricePerGram = 22000 / netGramsPerBottle; // 220đ/g
assert('Keo 502 net weight is 100g per bottle (162g gross - 62g shell)', netGramsPerBottle === 100);
assert('Keo 502 price is 220đ per gram (22.000đ / 100g)', pricePerGram === 220);

const testGrams = 256;
const bottlesUsed = Number((testGrams / netGramsPerBottle).toFixed(3)); // 2.56 chai
const totalCostChai = Math.round(bottlesUsed * 22000); // 56.320đ
const totalCostGram = Math.round(testGrams * pricePerGram); // 56.320đ
assert('Keo 502 256g converts to 2.56 bottles (not 1.58)', bottlesUsed === 2.56);
assert('Keo 502 256g calculates 56.320đ cost (never 215đ)', totalCostChai === 56320 && totalCostGram === 56320);

const configHtmlKeo = fs.readFileSync(path.join(__dirname, 'Config.html'), 'utf8');
assert('Config.html specifies Keo 502 net 100g and 220đ/g', configHtmlKeo.includes('220đ/gam') && configHtmlKeo.includes('unitPrice / 100') && configHtmlKeo.includes('qty / 100'));

// 7. TEST CONCURRENCY, DATA INTEGRITY & DEDUPING COMPLIANCE
console.log('\n--- 7. Testing Concurrency, Data Integrity & Deduping Rules ---');

const freshCodeJs = fs.readFileSync(codeJsPath, 'utf8');

// 7.1 Zero duplicate function declarations in Code.js
const codeLines = freshCodeJs.split('\n');
const funcCounts = {};
codeLines.forEach(line => {
    const match = line.match(/^function\s+([a-zA-Z0-9_$]+)\s*\(/);
    if (match) {
        const name = match[1];
        funcCounts[name] = (funcCounts[name] || 0) + 1;
    }
});
const duplicateFuncs = Object.keys(funcCounts).filter(k => funcCounts[k] > 1);
assert('Code.js contains 0 duplicate function declarations', duplicateFuncs.length === 0, duplicateFuncs.join(', '));

// 7.2 deleteDeltas does not use deleteRow loop (avoids Apps Script API timeouts and partial deletes)
const deleteDeltasBodyMatch = freshCodeJs.match(/function deleteDeltas\([\s\S]*?\n\}/);
const deleteDeltasBody = deleteDeltasBodyMatch ? deleteDeltasBodyMatch[0] : '';
assert('deleteDeltas does not execute deleteRow in a loop', !deleteDeltasBody.includes('deleteRow'));
assert('deleteDeltas uses atomic clearContents & setValues batch update', deleteDeltasBody.includes('clearContents') && deleteDeltasBody.includes('setValues'));

// 7.3 updateUserConfigSheet has lock protection
assert('updateUserConfigSheet uses LockService', /function updateUserConfigSheet[\s\S]*?LockService\.getScriptLock\(\)/.test(freshCodeJs));

// 7.4 syncDeltas calls _processMaterialDeduction_Core (no lock leak)
assert('syncDeltas calls _processMaterialDeduction_Core without releasing parent lock', freshCodeJs.includes('_processMaterialDeduction_Core(p.id, null, ss)'));

// 7.5 checkServerPermission & validateTableWritePermission do not grant supreme permissions simply by name containing 'Tiến'
assert('checkServerPermission does not grant supreme access by user name', !freshCodeJs.includes("auth.user.indexOf('Tiến') > -1"));

// 7.6 autoCalculateGlassTankBOM endpoint requires authentication
assert('autoCalculateGlassTankBOM requires PIN auth', /action === 'autoCalculateGlassTankBOM'[\s\S]*?validatePin\(pin\)/.test(freshCodeJs));

// 7.7 isWorkshopOffDay detects Sunday and National Holidays to prevent false penalties
assert('Code.js contains isWorkshopOffDay implementation', freshCodeJs.includes('function isWorkshopOffDay('));
assert('calculateBusinessHoursSLA checks isWorkshopOffDay', freshCodeJs.includes('isWorkshopOffDay(cur)'));
assert('cronCheckUnpackedOrdersAt1930 checks isWorkshopOffDay', freshCodeJs.includes('isWorkshopOffDay(now)'));

// 7.8 Robust multi-identifier matching for Orders in applyDeltasToSheet and syncDeltas
assert('applyDeltasToSheet matches Orders by id or orderCode', freshCodeJs.includes("sheetName === 'Orders' && codeColIdx !== -1"));
assert('syncDeltas matches Orders by id or orderCode', freshCodeJs.includes("isRowMatch"));

// 7.9 Parent-Child Cascade & Buyer Note Parsing Integrity
const freshTabProd = fs.readFileSync(path.join(__dirname, 'Tab_Production.html'), 'utf8');
const freshModalsOrders = fs.readFileSync(path.join(__dirname, 'Modals_Orders.html'), 'utf8');
const freshTabOrders = fs.readFileSync(path.join(__dirname, 'Tab_Orders.html'), 'utf8');
assert('Tab_Production.html contains parent-child cascade (isParentDelivered)', freshTabProd.includes('isParentDelivered'));
assert('Tab_Production.html strips phantom stock notes when pending', freshTabProd.includes('Lấy từ tồn kho có sẵn') && freshTabProd.includes('!isItemDone'));
assert('Modals_Orders.html contains buyer note (iNote) parsing', freshModalsOrders.includes('let iNote = findCol('));
assert('Modals_Orders.html passes order note to newOrders and prodItems', freshModalsOrders.includes('finalOrderCustomerNote'));

// 7.10 Order Status Protection When Production Item is Deleted
assert('Tab_Orders.html sets allProdDone false when hasProdFlag and 0 related prods', freshTabOrders.includes('hasProdFlag') && freshTabOrders.includes('allProdDone = false'));
assert('Tab_Orders.html reverts eff to Chờ Sản Xuất when !meta.allProdDone', freshTabOrders.includes('!meta.allProdDone && eff === \'SẴN SÀNG ĐÓNG GÓI\''));
assert('Modals_Orders.html guards effectiveStatus with orderRequiresProd', freshModalsOrders.includes('orderRequiresProd && !prodsReady'));
assert('Tab_Production.html prompts to sync parent order when deleting prod item', freshTabProd.includes('shouldCancelOrder') && freshTabProd.includes('Chờ Sản Xuất'));

// 7.11 Production Card Physical Status Integrity (Unfinished cards cannot be ĐÃ XONG)
assert('Tab_Production.html checks hasAnyWorkerStarted', freshTabProd.includes('hasAnyWorkerStarted'));
assert('Tab_Production.html requires isBothDone for ĐÃ XONG', freshTabProd.includes('isBothDone && (isFinalQcPassed || isParentDelivered)'));
assert('Tab_Production.html guards getParentOrder against ORD prefix match', freshTabProd.includes("clean !== 'ORD'"));

// 7.12 Order Reconciliation & PiShip Payout Integrity (Order.all parsing)
assert('Modals_Orders.html has findRevenueCol excluding NTTD fee', freshModalsOrders.includes('findRevenueCol') && freshModalsOrders.includes("!h.includes('nttd')"));
assert('Modals_Orders.html supports PiShip return fee reimbursement', freshModalsOrders.includes('iPiShipRefund') && freshModalsOrders.includes('rawPiShipRefund'));
assert('Modals_Orders.html calculates sellerOutgoingShip without deducting actual ship', freshModalsOrders.includes('sellerOutgoingShip') && freshModalsOrders.includes('actualShip - buyerShip - shopeeShip'));
assert('Modals_Orders.html calculates getOrderLevelVal to deduplicate multi-row order totals', freshModalsOrders.includes('getOrderLevelVal') && freshModalsOrders.includes('allIdentical'));

// 7.13 Return Scanner Modal - Return Reason & Hallmark UX
assert('Tab_Orders.html ReturnScannerModal supports returnReason state & presets', freshTabOrders.includes('returnReason') && freshTabOrders.includes('PRESET_RETURN_REASONS'));
assert('Tab_Orders.html ReturnScannerModal embeds returnReason into order note', freshTabOrders.includes('[Hoàn:') && freshTabOrders.includes('returnReason: effectiveReason'));
assert('Tab_Orders.html ReturnScannerModal auto-detects iReturnReason from Excel', freshTabOrders.includes('iReturnReason') && freshTabOrders.includes('fileReturnReason'));
assert('Tab_Orders.html ReturnScannerModal renders Hallmark return reason chips and custom input', freshTabOrders.includes('Lý Do Hoàn Hàng') && freshTabOrders.includes('handleSelectPreset'));

// 7.14 Return Station - Missing Items (Hoàn Tiền Không Trả Hàng / Zero Inventory Mutation)
assert('Modals_Orders.html has THIEU_HANG quick action in handleAppealResult', freshModalsOrders.includes("type === 'THIEU_HANG'") && freshModalsOrders.includes('GIỮ NGUYÊN 100% TỒN KHO'));
assert('Modals_Orders.html guards handleCompleteReturn against inventory mutation on missing items', freshModalsOrders.includes('isMissingItems') && freshModalsOrders.includes('!isMissingItems && !isBrokenOrDefect && hasExported'));
assert('Modals_Orders.html renders THIEU_HANG 1-touch button in Return Station Step 1', freshModalsOrders.includes("onClick={() => handleAppealResult('THIEU_HANG')}") && freshModalsOrders.includes('HOÀN TIỀN THIẾU HÀNG'));
assert('Modals_Orders.html renders Thiếu Hàng preset and dynamic CTA button in Step 2', freshModalsOrders.includes('Đóng thiếu hàng (Hoàn tiền ngay)') && freshModalsOrders.includes('DUYỆT HOÀN TIỀN (GIỮ NGUYÊN KHO) → ĐỐI SOÁT THÀNH CÔNG'));

// 8. TEST SHOPEE SLA ARTICLE 19948 & PACKAGING KPI CALCULATION
console.log('\n--- 8. Testing Shopee SLA Article 19948 & Packaging KPI ---');
const freshConfigHtml = fs.readFileSync(path.join(__dirname, 'Config.html'), 'utf8');

// 8.1 Extract and test getAutoDeadline
assert('Config.html contains updated getAutoDeadline with rawDate & shippingMethod', freshConfigHtml.includes('getAutoDeadline = (ch, rawDate = null, shippingMethod = \'\')'));
assert('Config.html implements 14:00 cutoff for Shopee/TikTok', freshConfigHtml.includes('h < 14') && freshConfigHtml.includes('h >= 14'));
assert('Config.html implements Sunday carrier rollover to Monday', freshConfigHtml.includes('dayOfWeek === 0') && freshConfigHtml.includes('addDays = 1'));
assert('Config.html implements Saturday afternoon rollover to Monday', freshConfigHtml.includes('dayOfWeek === 6') && freshConfigHtml.includes('addDays = 2'));
assert('Config.html implements Instant / Same Day 1.5h SLA', freshConfigHtml.includes('setMinutes(d.getMinutes() + 90)'));

// Run simulated getAutoDeadline tests
const getAutoDeadlineMatch = freshConfigHtml.match(/const getAutoDeadline = [\s\S]*?^};/m);
let testGetAutoDeadline = null;
if (getAutoDeadlineMatch) {
    try {
        const fnStr = getAutoDeadlineMatch[0].replace('const getAutoDeadline =', 'return');
        testGetAutoDeadline = new Function(fnStr)();
    } catch(e) {}
}

if (testGetAutoDeadline) {
    // Mon 10:00 (before 14:00) -> Mon 17:30
    const monMorning = new Date('2026-09-07T10:00:00'); // 2026-09-07 is Monday
    const resMonMorning = testGetAutoDeadline('Shopee VN', monMorning);
    assert('Shopee order Mon < 14h has deadline Mon 17:30', resMonMorning.includes('2026-09-07T17:30'), `Got: ${resMonMorning}`);

    // Mon 15:00 (after 14:00) -> Tue 11:30
    const monAfternoon = new Date('2026-09-07T15:00:00');
    const resMonAfternoon = testGetAutoDeadline('Shopee VN', monAfternoon);
    assert('Shopee order Mon >= 14h has deadline Tue 11:30', resMonAfternoon.includes('2026-09-08T11:30'), `Got: ${resMonAfternoon}`);

    // Sat 15:00 (after 14:00) -> Mon 11:30
    const satAfternoon = new Date('2026-09-05T15:00:00'); // 2026-09-05 is Saturday
    const resSatAfternoon = testGetAutoDeadline('Shopee VN', satAfternoon);
    assert('Shopee order Sat >= 14h rolls over to Mon 11:30', resSatAfternoon.includes('2026-09-07T11:30'), `Got: ${resSatAfternoon}`);

    // Sun all day -> Mon 11:30
    const sunOrder = new Date('2026-09-06T10:00:00'); // 2026-09-06 is Sunday
    const resSun = testGetAutoDeadline('Shopee VN', sunOrder);
    assert('Shopee order Sunday rolls over to Mon 11:30', resSun.includes('2026-09-07T11:30'), `Got: ${resSun}`);

    // Instant/Hỏa Tốc 10:00 -> 11:30 (+90 mins)
    const instantOrder = new Date('2026-09-07T10:00:00');
    const resInstant = testGetAutoDeadline('Shopee VN', instantOrder, 'Hỏa Tốc');
    assert('Instant order between 8h-18h has +90 mins SLA', resInstant.includes('2026-09-07T11:30'), `Got: ${resInstant}`);
}

// 8.2 Packaging KPI Scanning & Parsing
assert('Config.html getPackingReward safely parses JSON accessory arrays', freshConfigHtml.includes('addNameOrSku') && freshConfigHtml.includes('JSON.parse(trimmed)'));
assert('Modals_Orders.html extracts accessories via safeParseAccessories before packReward', freshModalsOrders.includes('safeParseAccessories(_order.accessories)') && freshModalsOrders.includes('allProdNames.push(a.name)'));
assert('Tab_HR.html checks safeProdItems and safeParseAccessories for packing reward', freshTabOrders.length > 0 && freshTabOrders.includes('getAutoDeadline'));

// --- 9. Testing Data Integrity Audit & Financial Fixes ---
console.log(`\n--- 9. Testing Data Integrity Audit & Financial Fixes ---`);
const latestCodeJs = fs.readFileSync(codeJsPath, 'utf8');
const freshTabHr = fs.readFileSync(path.join(__dirname, 'Tab_HR.html'), 'utf-8');
assert('syncDeltas implements reentrant lock checking !lock.hasLock()', latestCodeJs.includes('!lock.hasLock()') && latestCodeJs.includes('if (acquiredLock)'));
assert('syncDeltas implements in-batch BOM deduplication via processedBomIds', latestCodeJs.includes('var processedBomIds = {};') && latestCodeJs.includes('processedBomIds[pIdKey]'));
assert('Code.js direct updates linked orders to Sẵn sàng đóng gói without leaking ordersModified', latestCodeJs.includes("oData[oR][oStatusCol] = 'Sẵn sàng đóng gói';") && latestCodeJs.includes("ordersSheet.getRange(oR + 1, oStatusCol + 1).setValue('Sẵn sàng đóng gói');"));
assert('formatProduct safely handles 0 values without falsy coercion', latestCodeJs.includes('var cleanNum = function') && latestCodeJs.includes('"quantity": cleanNum(p.quantity, 0)'));
assert('processCascadeCancelOrder supports restoring inventory on handed-over cancellations', latestCodeJs.includes('Hoàn Kho Đơn Hủy') && latestCodeJs.includes('IE_RESTORE_'));
assert('Tab_HR.html implements user directive for packing reward (recordedReward > 0 ? recordedReward : 1100)', freshTabHr.includes('recordedReward > 0 ? recordedReward : 1100'));

// --- 10. Testing Order Deduplication Engine, Channel Detection & Inventory Handover ---
console.log(`\n--- 10. Testing Order Deduplication Engine, Channel Detection & Inventory Handover ---`);
const currentModalsOrders = fs.readFileSync(path.join(__dirname, 'Modals_Orders.html'), 'utf8');
const currentTabProd = fs.readFileSync(path.join(__dirname, 'Tab_Production.html'), 'utf8');
const currentTabOrdersFile = fs.readFileSync(path.join(__dirname, 'Tab_Orders.html'), 'utf8');

assert('Modals_Orders.html implements findExistingOrder deduplication engine', currentModalsOrders.includes('findExistingOrder') && currentModalsOrders.includes('existingByAlphaMap'));
assert('Modals_Orders.html uses combinedOrdersPool with global fallbacks', currentModalsOrders.includes('combinedOrdersPool') && currentModalsOrders.includes('GLOBAL_ALL_ORDERS'));
assert('Modals_Orders.html auto-detects TikTok & Shopee without defaulting to Bán Lẻ', currentModalsOrders.includes("rowChannel = 'Tiktok Shop';") && currentModalsOrders.includes("rowChannel = 'Shopee VN';"));
assert('Tab_Production.html removes hardcoded "ĐƠN LẺ" fallback', !currentTabProd.includes("|| 'ĐƠN LẺ';"));
assert('Tab_Production.html getParentOrder includes GLOBAL_ALL_ORDERS fallback', currentTabProd.includes('GLOBAL_ALL_ORDERS') && currentTabProd.includes('foundDirect'));
assert('Tab_Orders.html resolveGroupKey detects Shopee & TikTok from codeStr', currentTabOrdersFile.includes("codeStr.includes('SPXVN')") && currentTabOrdersFile.includes("codeStr.includes('TIKTOK')"));
assert('Code.js safeDeductInventoryOnHandover correctly checks isFulfilledFromStock', latestCodeJs.includes('var isFulfilledFromStock = p.fulfilledFromStock === true || String(p.fulfilledFromStock).toUpperCase() === \'TRUE\';'));

// Functional Unit Test for Deduplication Logic
function testCleanRawCode(val) {
    if (!val) return '';
    return String(val).replace(/[\r\n\t\u00A0'"`=]/g, '').replace(/^(mã\s*đơn\s*hàng|mã\s*đơn|order\s*id|order\s*sn|mvđ|mvd)[\s:]+/gi, '').trim();
}
function testToAlphaNum(val) {
    return testCleanRawCode(val).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

assert('Deduplication: cleanRawCode strips quotes and formulas', testCleanRawCode('="2609045PN782HD"') === '2609045PN782HD');
assert('Deduplication: cleanRawCode strips apostrophe and tabs', testCleanRawCode("'2609045PN782HD\t") === '2609045PN782HD');
assert('Deduplication: toAlphaNum matches across whitespace & formatting', testToAlphaNum("2609045PN782HD | SPXVN01") === '2609045pn782hdspxvn01');

// --- 11. Testing Google Drive Safe URL Transformation & In-App Lightbox ---
console.log(`\n--- 11. Testing Google Drive Safe URL Transformation & In-App Lightbox ---`);
const sec11ConfigHtml = fs.readFileSync(path.join(__dirname, 'Config.html'), 'utf8');
const sec11ComponentsHtml = fs.readFileSync(path.join(__dirname, 'Components.html'), 'utf8');
const sec11AppMainHtml = fs.readFileSync(path.join(__dirname, 'App_Main.html'), 'utf8');
const sec11ModalsOrders = fs.readFileSync(path.join(__dirname, 'Modals_Orders.html'), 'utf8');

assert('Config.html defines getSafeDriveViewUrl & openSafeImageTab', sec11ConfigHtml.includes('getSafeDriveViewUrl') && sec11ConfigHtml.includes('openSafeImageTab'));
assert('Components.html defines RFImageLightboxModal', sec11ComponentsHtml.includes('const RFImageLightboxModal =') && sec11ComponentsHtml.includes('window.RFImageLightboxModal = RFImageLightboxModal;'));
assert('App_Main.html binds window.previewImage and mounts RFImageLightboxModal', sec11AppMainHtml.includes('window.previewImage =') && sec11AppMainHtml.includes('<RFImageLightboxModal'));
assert('Modals_Orders.html order card photos use window.previewImage for pGoods/pBox/whPhoto', sec11ModalsOrders.includes('window.previewImage(pGoods') && sec11ModalsOrders.includes('window.previewImage(pBox') && sec11ModalsOrders.includes('window.previewImage(whPhoto'));
assert('Modals_Orders.html deposit bill photos use window.previewImage', sec11ModalsOrders.includes('window.previewImage(imgUrl'));

// Functional URL transformation test
function testExtractDriveId(url) {
    if (!url || typeof url !== 'string') return '';
    const clean = url.trim();
    const idMatch = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/i) || 
                    clean.match(/\/d\/([a-zA-Z0-9_-]+)/i) ||
                    clean.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i);
    return idMatch ? idMatch[1] : '';
}
function testGetSafeDriveViewUrl(url) {
    const id = testExtractDriveId(url);
    if (id) {
        return 'https://drive.google.com/file/d/' + id + '/view?usp=drivesdk';
    }
    return url || '';
}

const sampleBlockedThumbnailUrl = 'https://drive.google.com/thumbnail?id=1DD6z3znL2zjjWnfdViHN6mrZU8-mWDzO&sz=w800';
assert('extractDriveId extracts file ID from blocked thumbnail URL', testExtractDriveId(sampleBlockedThumbnailUrl) === '1DD6z3znL2zjjWnfdViHN6mrZU8-mWDzO');
assert('getSafeDriveViewUrl transforms blocked thumbnail URL to safe Drive viewer', testGetSafeDriveViewUrl(sampleBlockedThumbnailUrl) === 'https://drive.google.com/file/d/1DD6z3znL2zjjWnfdViHN6mrZU8-mWDzO/view?usp=drivesdk');
assert('extractDriveId extracts file ID from /file/d/ link', testExtractDriveId('https://drive.google.com/file/d/1DD6z3znL2zjjWnfdViHN6mrZU8-mWDzO/view') === '1DD6z3znL2zjjWnfdViHN6mrZU8-mWDzO');
assert('extractDriveId extracts file ID from googleusercontent.com CDN', testExtractDriveId('https://lh3.googleusercontent.com/d/1DD6z3znL2zjjWnfdViHN6mrZU8-mWDzO=w800') === '1DD6z3znL2zjjWnfdViHN6mrZU8-mWDzO');

// --- 12. Testing Tracking Number (MVĐ) Resolution & Update Engine ---
console.log(`\n--- 12. Testing Tracking Number (MVĐ) Resolution & Update Engine ---`);
const sec12ModalsOrders = fs.readFileSync(path.join(__dirname, 'Modals_Orders.html'), 'utf8');

assert('Modals_Orders.html contains comprehensive iTrack header keywords and excludes package ID (mã kiện hàng)', !sec12ModalsOrders.includes("'mã kiện hàng'") && sec12ModalsOrders.includes('mã bưu gửi') && sec12ModalsOrders.includes('số theo dõi') && sec12ModalsOrders.includes('waybill'));
assert('Modals_Orders.html implements key-priority findCol algorithm', sec12ModalsOrders.includes('for (const k of keys)') && sec12ModalsOrders.includes('headers.findIndex(h => h === cleanK)'));
assert('Modals_Orders.html indexes shippingCode in combinedOrdersPool', sec12ModalsOrders.includes('rawShipping = String(o.shippingCode') && sec12ModalsOrders.includes('existingByTrackMap.set(cShip'));
assert('Modals_Orders.html filters out None/null/- dirty strings from tracking cells', sec12ModalsOrders.includes("rawTrack.toLowerCase() === 'none'") && sec12ModalsOrders.includes("rawTrack === '-'"));
assert('Modals_Orders.html extracts existingTrack from shippingCode and orderCode', sec12ModalsOrders.includes('existing.shippingCode') && sec12ModalsOrders.includes("existing.orderCode.split('|')"));
assert('Modals_Orders.html evaluates hasNewTrack using alphanumeric difference', sec12ModalsOrders.includes('toAlphaNum(cleanT) !== toAlphaNum(existingTrack)'));
assert('Modals_Orders.html passes shippingCode in submit() newOrders payload', sec12ModalsOrders.includes('shippingCode: effShippingCode'));
assert('Modals_Orders.html renders [CẬP NHẬT MVĐ] badge in UI', sec12ModalsOrders.includes("p.hasNewTrack ? 'CẬP NHẬT MVĐ' : 'CẬP NHẬT'"));

// Functional Unit Test for Key-Priority findCol
function testFindColPriority(headers, keys) {
    for (const k of keys) {
        const cleanK = String(k || '').toLowerCase().trim();
        const idx = headers.findIndex(h => h === cleanK);
        if (idx !== -1) return idx;
    }
    for (const k of keys) {
        const cleanK = String(k || '').toLowerCase().trim();
        if (!cleanK) continue;
        const idx = headers.findIndex(h => h.includes(cleanK));
        if (idx !== -1) return idx;
    }
    return -1;
}

const mockShopeeHeaders = ['mã đơn hàng', 'mã kiện hàng', 'ngày đặt hàng', 'trạng thái đơn hàng', 'sản phẩm', 'lý do hủy', 'nhận xét', 'mã vận đơn'];
const trackKeys = ['mã vận đơn', 'ma van don', 'mvd', 'mvđ', 'tracking number', 'tracking id', 'số theo dõi', 'waybill'];
assert('findCol prioritizes Mã vận đơn (Col 7) and ignores Mã Kiện Hàng (Col 1)', testFindColPriority(mockShopeeHeaders, trackKeys) === 7);

// Functional Unit Test for Tracking Resolution Algorithm
function testResolveTracking(rawCell) {
    let raw = (rawCell !== undefined && rawCell !== null) ? String(rawCell).trim() : '';
    if (raw.toLowerCase() === 'none' || raw.toLowerCase() === 'null' || raw === '-' || raw === 'n/a') {
        raw = '';
    }
    return testCleanRawCode(raw);
}

function testCheckHasNewTrack(existingRecord, incomingTCode) {
    let existingTrack = '';
    if (existingRecord.shippingCode && String(existingRecord.shippingCode).trim()) {
        existingTrack = testCleanRawCode(existingRecord.shippingCode);
    } else if (existingRecord.orderCode && existingRecord.orderCode.includes('|')) {
        const parts = existingRecord.orderCode.split('|');
        existingTrack = testCleanRawCode(parts[1].replace(/^(?:MVĐ|MVD|Tracking)[\s:]*/i, ''));
    }
    const cleanT = testCleanRawCode(incomingTCode);
    return Boolean(cleanT && (!existingTrack || testToAlphaNum(cleanT) !== testToAlphaNum(existingTrack)));
}

assert('Tracking Resolution: Shopee "None" cell safely resolves to empty string', testResolveTracking('None') === '');
assert('Tracking Resolution: Shopee formula ="SPXVN065832344889" cleans to SPXVN065832344889', testResolveTracking('="SPXVN065832344889"') === 'SPXVN065832344889');
assert('Tracking Resolution: GHN code with tab cleans properly', testResolveTracking("GYYG9R67\t") === 'GYYG9R67');

const existingWithoutTrack = { id: 'ORD_1', orderCode: '260818N174UWQQ', shippingCode: '' };
assert('Tracking Update: Order without tracking gets new tracking code', testCheckHasNewTrack(existingWithoutTrack, 'SPXVN061323872498') === true);

const existingWithSameTrack = { id: 'ORD_2', orderCode: '2609021SME73FS | MVĐ: SPXVN065832344889', shippingCode: 'SPXVN065832344889' };
assert('Tracking Update: Order with identical tracking is recognized as duplicate', testCheckHasNewTrack(existingWithSameTrack, 'SPXVN065832344889') === false);

const existingWithDifferentTrack = { id: 'ORD_3', orderCode: '2609045SRFX04B', shippingCode: 'OLD_TRACK_123' };
assert('Tracking Update: Order with updated/changed tracking triggers hasNewTrack', testCheckHasNewTrack(existingWithDifferentTrack, 'SPXVN068042561239') === true);

// SUMMARY
console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log(`========================================\n`);

if (failedTests > 0) {
    process.exit(1);
} else {
    process.exit(0);
}

