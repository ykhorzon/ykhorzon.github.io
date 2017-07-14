/* pathnamereplace.js v0.1.3, URL pathname replace for conditional redirects to support multi-language sites, now with cookies and passtrue list.
 * Author & copyright (c) 2017: Göran Svensson, goran@molnsys.com. MIT license.
 * Tested with Chrome 36, Firefox 29 and Safari 7.0.5 on OSX.
 * Tested with Chrome 36 on Xperia V (Android 4.3) and Internet 2.3.6 on Samsung GT-S5360 (Android 2.3.6).
 * Works with any number of path name items and language acronymes. Does not break the back button.
 * How to use it; add this in your nav menu: javascript:changeLanguage('se') to switch to swedish version.
 * REQUIRES: JavaScript Cookie v2.1.4 https://github.com/js-cookie/js-cookie

 *CatalystScripts/Java_Cookies.js and country = '{module_visitorcountrycode}'; added
 * above this script (does not work inside a js file).
 * No bugs have been harmed.
 * To avoid unnecesary reload, build a nav menu for each language with the right path.
 */

var defaultLang = CONTENTLANGUAGE, // get language from config file DefaultContentLanguage.
    pathArray = window.location.pathname.split('/'), // get the path and split the string on "/"
    langArray = ["sv", "es"], // Do not include the default lang here! For pages just create files like this: filename.en.md, filename.sv.md). For blog posts we redirect to the front page for each language.
    passtrueArray = ["CampaignProcess.aspx", "FormProcessv2.aspx"], // sometimes it is not possible to add language support to a module. Then we do not check language.
    constructPath = window.location.protocol + "//" + window.location.host;

var firstPartofPathname = pathArray[0],
    //cookieValue = readCookie('selectedLanguage')
    cookieValue = Cookies.get('selectedLanguage'),
    thepathname = window.location.pathname,
    visitorLanguage = defaultLang;
// run it on every request
// if (!checkPassTrue()) {
//     if (cookieValue != null) {
//         changeLanguage(cookieValue);
//     } else {
//         changeLanguage(visitorLanguage);
//     }
// }
// helper function: check if the first path item contains any of the known language acronymes
function checkLanguage() {
    var itemFoundFlag = false;
    if (langArray.indexOf(firstPartofPathname) > -1) itemFoundFlag = true;
    return itemFoundFlag;
}

// helper function: don´t redirect if the first path contains anything from the passtrue array.
function checkPassTrue() {
    var itemFoundFlag = false;
    if (passtrueArray.indexOf(firstPartofPathname) > -1) itemFoundFlag = true;
    return itemFoundFlag;
}

// helper function: put the pathname back together with slashes
function buildPath(theArray) {
    var newPathname = "";
    for (i = 0; i < theArray.length; i++) {
        newPathname += "/";
        newPathname += theArray[i];
    }
    return newPathname;

}

function trimEmptyStringInArray(arr) {
    return arr.join('').split('');
}

// main function: changeLanguage takes a language acronyme as an argument and replaces the path name in the URL using JavaScript Cookie v2.1.4 https://github.com/js-cookie/js-cookie
function changeLanguage(toSwitchLang) {
    
    // currentPath = window.location.pathname
    // pathArray = window.location.pathname.split('/')
    
    // // console.log(window.location.pathname);
    // // console.log(pathArray);
    // // console.log(defaultLang)
    // // console.log(toSwitchLang)

    // if (toSwitchLang != defaultLang) {
        
    //     // 
    //     // Testcase 1: home url 
    //     // 
        
    //     // 1.1 en to tw
    //     // Input URL: localhost:1313, toSwitchLang: tw
    //     // Output localhost:1313/tw/

    //     // 1.2 tw to en
    //     // Input URL:localhost:1313/tw/, toSwitchLang: en
    //     // Output localhost:1313

    //     // // remove the first item
    //     // pathArray.splice(0, 3);

    //     // // add the toSwitchLang
    //     // pathArray.splice(0, 0, toSwitchLang);
    //     pathArray = trimEmptyStringInArray(pathArray);

            
    //     // create cookie
    //     Cookies.set('selectedLanguage', toSwitchLang);
    //     pathArray.push("");
    //     pathArray.push(toSwitchLang);
    //     console.log(pathArray);
        
    //     urlPath = pathArray.join("/");
    //     console.log(urlPath);
    //     window.location.replace(urlPath);
    //     //     if (pathArray.length > 4)  {
    //     //         window.location.replace(constructPath + '/' + toSwitchLang );
    //     //     } else {
    //     //         window.location.replace(constructPath + buildPath(pathArray));
    //     //     }

        
    // }
   
}

 (function () {
     
    // Bind Language switch link handler
     var lsl = $("#langSwitchLink")
     lsl.bind( "click", function(event){
            
            var lslValue = lsl.attr("toSwitchLang")

            // create cookie
            Cookies.set('selectedLanguage', lslValue);
            
            var pathArray = []
            pathArray.push("");
            pathArray.push(lslValue);
            urlPath = pathArray.join("/");
            window.location.replace(urlPath);
    });
 })();