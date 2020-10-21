"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require('puppeteer');
var fs = require('fs');
var getInnerHTML = function (element, selector) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, element.$eval(selector, function (elm) { return elm.innerHTML.trim(); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getSubjectUrls = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var table, tds, aElms, propertyJsHandles, hrefs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$('#mainTable')];
            case 1:
                table = _a.sent();
                return [4 /*yield*/, table.$$("tbody > tr > td:nth-child(1)")];
            case 2:
                tds = _a.sent();
                return [4 /*yield*/, Promise.all(tds.map(function (td) { return td.$('a'); }))
                    // take out subjects without course listings this term
                ];
            case 3:
                aElms = _a.sent();
                // take out subjects without course listings this term
                aElms = aElms.filter(function (a) { return (a != null && a != undefined); });
                return [4 /*yield*/, Promise.all(aElms.map(function (handle) { return handle.getProperty('href'); }))];
            case 4:
                propertyJsHandles = _a.sent();
                return [4 /*yield*/, Promise.all(propertyJsHandles.map(function (handle) { return handle.jsonValue(); }))];
            case 5:
                hrefs = _a.sent();
                return [2 /*return*/, hrefs];
        }
    });
}); };
// given a url to a subject listing, get the course urls 
var getCourseUrls = function (url, browser) { return __awaiter(void 0, void 0, void 0, function () {
    var subjectPage, hrefs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.newPage()];
            case 1:
                subjectPage = _a.sent();
                return [4 /*yield*/, subjectPage.goto(url)];
            case 2:
                _a.sent();
                return [4 /*yield*/, getSubjectUrls(subjectPage)];
            case 3:
                hrefs = _a.sent();
                return [4 /*yield*/, subjectPage.close()];
            case 4:
                _a.sent();
                return [2 /*return*/, hrefs];
        }
    });
}); };
// given a url to a course listing, get course information
var getCourseInfo = function (url, browser) { return __awaiter(void 0, void 0, void 0, function () {
    var sectionPage, courseCode, courseTitle, courseData, tableRows, isMultiRow, i, rowTimeInfo, nextRowTitle, _a, _b, _c, _d;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, browser.newPage()];
            case 1:
                sectionPage = _f.sent();
                return [4 /*yield*/, sectionPage.goto(url)];
            case 2:
                _f.sent();
                return [4 /*yield*/, getInnerHTML(sectionPage, '.breadcrumb.expand > li:nth-child(4)')];
            case 3:
                courseCode = _f.sent();
                return [4 /*yield*/, getInnerHTML(sectionPage, '.content.expand > h4')];
            case 4:
                courseTitle = _f.sent();
                courseData = {
                    courseTitle: courseTitle,
                    courseCode: courseCode,
                    sections: []
                };
                return [4 /*yield*/, sectionPage.$$('.table.table-striped.section-summary > tbody > tr')];
            case 5:
                tableRows = _f.sent();
                isMultiRow = false;
                i = 0;
                _f.label = 6;
            case 6:
                if (!(i < tableRows.length - 1)) return [3 /*break*/, 15];
                if (!isMultiRow) return [3 /*break*/, 11];
                _e = {};
                return [4 /*yield*/, getInnerHTML(tableRows[i], 'td:nth-child(4)')];
            case 7:
                _e.term = _f.sent();
                return [4 /*yield*/, getInnerHTML(tableRows[i], 'td:nth-child(6)')];
            case 8:
                _e.day = _f.sent();
                return [4 /*yield*/, getInnerHTML(tableRows[i], 'td:nth-child(7)')];
            case 9:
                _e.start = _f.sent();
                return [4 /*yield*/, getInnerHTML(tableRows[i], 'td:nth-child(8)')];
            case 10:
                rowTimeInfo = (_e.end = _f.sent(),
                    _e);
                courseData.sections[courseData.sections.length - 1].timeInfo.push(rowTimeInfo);
                _f.label = 11;
            case 11: return [4 /*yield*/, tableRows[i + 1].$('td:nth-child(2)')
                    .then(function (elm) { return elm.$eval('a', function (elm) { return elm.innerHTML; }); })["catch"](function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        // unable to find a title in the next row
                        return [2 /*return*/, null];
                    });
                }); })];
            case 12:
                nextRowTitle = _f.sent();
                isMultiRow = (nextRowTitle == null);
                _b = (_a = courseData.sections).push;
                return [4 /*yield*/, formatSectionInfo(tableRows[i])];
            case 13:
                _b.apply(_a, [_f.sent()]);
                _f.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 6];
            case 15:
                if (!!isMultiRow) return [3 /*break*/, 17];
                _d = (_c = courseData.sections).push;
                return [4 /*yield*/, formatSectionInfo(tableRows[tableRows.length - 1])];
            case 16:
                _d.apply(_c, [_f.sent()]);
                _f.label = 17;
            case 17: return [4 /*yield*/, sectionPage.close()];
            case 18:
                _f.sent();
                return [2 /*return*/, courseData];
        }
    });
}); };
var formatSectionInfo = function (elmHandle) { return __awaiter(void 0, void 0, void 0, function () {
    var sStatus, sTitle, sTerms, sDays, timeStart, timeEnd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getInnerHTML(elmHandle, 'td:first-child')];
            case 1:
                sStatus = _a.sent();
                return [4 /*yield*/, elmHandle.$('td:nth-child(2)')
                        .then(function (elm) { return elm.$eval('a', function (elm) { return elm.innerHTML.trim(); }); })["catch"](function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ""];
                        });
                    }); })];
            case 2:
                sTitle = _a.sent();
                return [4 /*yield*/, getInnerHTML(elmHandle, 'td:nth-child(4)')];
            case 3:
                sTerms = _a.sent();
                return [4 /*yield*/, getInnerHTML(elmHandle, 'td:nth-child(6)')];
            case 4:
                sDays = _a.sent();
                return [4 /*yield*/, getInnerHTML(elmHandle, 'td:nth-child(7)')];
            case 5:
                timeStart = _a.sent();
                return [4 /*yield*/, getInnerHTML(elmHandle, 'td:nth-child(8)')];
            case 6:
                timeEnd = _a.sent();
                return [2 /*return*/, {
                        sectionTitle: sTitle,
                        status: sStatus,
                        terms: sTerms,
                        timeInfo: [
                            {
                                term: sTerms,
                                day: sDays,
                                start: timeStart,
                                end: timeEnd
                            }
                        ]
                        /* days: sDays[0] != "" ? [sDays] : [],
                        start: timeStart,
                        end: timeEnd */
                    }];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, subjectUrls, data, i, courseUrls, j, sectionInfo, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                console.time('scraper');
                return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments')];
            case 3:
                _a.sent();
                return [4 /*yield*/, getSubjectUrls(page)];
            case 4:
                subjectUrls = _a.sent();
                data = [];
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < 146)) return [3 /*break*/, 11];
                console.log(i);
                return [4 /*yield*/, getCourseUrls(subjectUrls[i], browser)];
            case 6:
                courseUrls = _a.sent();
                j = 0;
                _a.label = 7;
            case 7:
                if (!(j < courseUrls.length)) return [3 /*break*/, 10];
                if (j > 1)
                    return [3 /*break*/, 10];
                console.log(j);
                return [4 /*yield*/, getCourseInfo(courseUrls[j], browser)];
            case 8:
                sectionInfo = _a.sent();
                data.push(sectionInfo);
                _a.label = 9;
            case 9:
                j++;
                return [3 /*break*/, 7];
            case 10:
                i++;
                return [3 /*break*/, 5];
            case 11:
                fs.writeFile('courses.json', JSON.stringify(data), function (err) {
                    if (err)
                        return console.error(err);
                    console.log("Wrote to courses.json");
                });
                /* let courseUrls: string[] = await getCourseUrls(subjectUrls[145], browser);
                let sectionInfo = await getCourseInfo(courseUrls[0], browser);
                console.log(sectionInfo.sections[0]); */
                // axios.post('webhook url', data); <-- post request to trigger front-end build script
                console.timeEnd('scraper');
                return [4 /*yield*/, browser.close()];
            case 12:
                _a.sent();
                return [3 /*break*/, 14];
            case 13:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); })();
