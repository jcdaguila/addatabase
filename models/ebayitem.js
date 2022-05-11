const getCalculatedFields = (part, pics)=>{
    let calculatedFields={};
    calculatedFields['title']=(part[0].name + " " + part[0].model + (part[0].pname?' - ' + part[0].pname:'') + (part[0].pmodel?" " + part[0].pmodel:"")).substring(0,80);
    let descriptionpart = part[0].name + " " + part[0].model + (part[0].pname?' for ' + ' - ' + part[0].pname:'') + (part[0].pmodel?" " + part[0].pmodel:"") + (part[0].condition_? ' Condition: ' + part[0].condition_:'');
    calculatedFields['description'] = "<!doctype html><html><head><title>APLIANCES DEPOT</title></head><body>" +
    "<h1>APLIANCES DEPOT</h1>" +
    "<h3>Up for sale in good working condition a</h3>" +
    "<h3>" + descriptionpart + "</h3>" + 
    "<h3>See pictures for details</h3>" + 
    "<h3>if you have any questions don&#39;t hesitate to contact Us</h3>" + 
    "<h3>Thanks</h3>" + 
    "<h3>" + (part[0].comments?part[0].comments:'') + "</h3>" + 
    "</body></html>";

    let ShippingServiceOptions = {};
    if(part[0].WeightMajor > 1 ||(part[0].WeightMajor ===1 && part[0].WeightMinor > 0))
        ShippingServiceOptions= {
            "ShippingServicePriority": "1",
            "ShippingService": "USPSPriority"
        };
    else
        ShippingServiceOptions= {
            "ShippingService": "USPSFirstClass"
        }; 
    calculatedFields['ShippingServiceOptions']=ShippingServiceOptions;
    let PictureURL = [];
    console.log(pics);
    pics.forEach(element => {
        PictureURL.push({"#":element.url});
    });
    calculatedFields['PictureURL']=PictureURL;
    return calculatedFields;
};

module.exports = {
    createEbayItem:
    function (part, pics, userToken)
    {
        let calculatedFields = getCalculatedFields(part, pics);
        let ebayitem = {
            '?xml version=\"1.0\" encoding=\"utf-8\"?' : null,
            'AddItemRequest': {
                '@' : {"xmlns" : "urn:ebay:apis:eBLBaseComponents"},
                "RequesterCredentials": {
                    "eBayAuthToken": userToken
                 },
                "ErrorLanguage": "en_US",
                "WarningLevel": "High",
                "Item": {
                    "AutoPay": "0",
                    "BestOfferDetails": {
                    "BestOfferEnabled": "1"
                    },
                    "BuyerResponsibleForShipping": "1",
                    "ConditionDescription": part[0].condition_+ " in good working condition, see pictures for details.",
                    "ConditionID": part[0].ebaycode,
                    "Title": calculatedFields['title'],
                    "Description": calculatedFields['description'],
                    "PrimaryCategory": {
                        "CategoryID":[{"#":"70574"},{"#":"185109"}]
                    },
                    "ProductListingDetails":{
                        "BrandMPN":{
                            "Brand": part[0].brand,
                            "MPN": part[0].mpn
                        }    
                    },
                    "StartPrice": part[0].pricestore,
                    "CategoryMappingAllowed": "true",
                    "Country": "US",
                    "Currency": "USD",
                    "DispatchTimeMax": "3",
                    "ListingType": "FixedPriceItem",
                    "ListingDuration": "GTC",
                    "PictureDetails": {
                        "GalleryType": "Gallery"
                    },
                    "PostalCode": "32211",
                    "Quantity": part[0].quantity,
                    "ReturnPolicy": {
                    "ReturnsAcceptedOption": "ReturnsAccepted",
                    "RefundOption": "MoneyBack",
                    "ReturnsWithinOption": "Days_30",
                    "ShippingCostPaidByOption": "Buyer"
                    },
                    "ShippingDetails": {
                    "ShippingType": "Calculated",
                    "ShippingServiceOptions": calculatedFields['ShippingServiceOptions'],
                    },
                    "Site": "US",
                    "ShippingPackageDetails":{
                        "PackageDepth":{'@' : {unit : 'inches'},"#":part[0].PackageDepth.toString()},
                        "PackageLength":{'@' : {unit : 'inches'},"#":part[0].PackageLength.toString()},
                        "PackageWidth":{'@' : {unit : 'inches'},"#":part[0].PackageWidth.toString()},
                        "WeightMajor":{'@' : {unit : 'lbs'},"#":part[0].WeightMajor.toString()},
                        "WeightMinor":{'@' : {unit : 'oz'},"#":part[0].WeightMinor.toString()}
                    }
                }
            }
        };
        ebayitem.AddItemRequest.Item.PictureDetails["PictureURL"] = calculatedFields['PictureURL'];
        return ebayitem;
    },

    reviseEbayItem:
    function (part, pics, userToken, ebayid)
    {
        let calculatedFields = getCalculatedFields(part, pics);
        let ebayitem = {
            '?xml version=\"1.0\" encoding=\"utf-8\"?' : null,
            'ReviseItemRequest': {
                '@' : {"xmlns" : "urn:ebay:apis:eBLBaseComponents"},
                "RequesterCredentials": {
                    "eBayAuthToken": userToken
                 },
                "ErrorLanguage": "en_US",
                "WarningLevel": "High",
                "Item": {
                    "ItemID": ebayid,
                    "ConditionDescription": part[0].condition_+ " in good working condition, see pictures for details.",                    
                    "ConditionID": part[0].ebaycode,
                    "Title": calculatedFields['title'],
                    "Description": calculatedFields['description'],
                    "ProductListingDetails":{
                        "BrandMPN":{
                            "Brand": part[0].brand,
                            "MPN": part[0].mpn
                        }    
                    },
                    "StartPrice": part[0].pricestore,
                    "ShippingDetails": {
                        "ShippingType": "Calculated",
                        "ShippingServiceOptions": calculatedFields['ShippingServiceOptions'],
                    },                    
                    "ShippingPackageDetails":{
                        "PackageDepth":{'@' : {unit : 'inches'},"#":part[0].PackageDepth.toString()},
                        "PackageLength":{'@' : {unit : 'inches'},"#":part[0].PackageLength.toString()},
                        "PackageWidth":{'@' : {unit : 'inches'},"#":part[0].PackageWidth.toString()},
                        "WeightMajor":{'@' : {unit : 'lbs'},"#":part[0].WeightMajor.toString()},
                        "WeightMinor":{'@' : {unit : 'oz'},"#":part[0].WeightMinor.toString()}
                    }
                }
            }
        };
        //ebayitem.ReviseItemRequest.Item.PictureDetails["PictureURL"] = calculatedFields['PictureURL'];
        return ebayitem;
    }    
};