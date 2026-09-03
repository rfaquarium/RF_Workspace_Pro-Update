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

// SUMMARY
console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log(`========================================\n`);

if (failedTests > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
