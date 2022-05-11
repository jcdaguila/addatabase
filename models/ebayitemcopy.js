module.exports = {
    getEbayItem:
    function (part, pics)
    {
        let ebayitem = {
            '?xml version=\"1.0\" encoding=\"utf-8\"?' : null,
            'AddItemRequest': {
                '@' : {"xmlns" : "urn:ebay:apis:eBLBaseComponents"},
                "RequesterCredentials": {
                    "eBayAuthToken": "v^1.1#i^1#r^0#f^0#p^3#I^3#t^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"
                },
                "ErrorLanguage": "en_US",
                "WarningLevel": "High",
                "Item": {
                    "AutoPay": "0",
                    "BestOfferDetails": {
                    "BestOfferEnabled": "1"
                    },
                    "BuyerResponsibleForShipping": "1",
                    "ConditionDescription": "Used in good working condition, see pictures for details.",
                    "ConditionID": "3000",
                    "Title": part[0].name + " " + part[0].model,
                    "Description": "Up for sale in good working condition a " + part[0].name + " " + part[0].model + ", see pictures for details.\n      Thanks.",
                    "PrimaryCategory": {
                        "CategoryID": "70574",
                        "CategoryID": "185109"
                    },
                    "StartPrice": part[0].pricestore,
                    "CategoryMappingAllowed": "true",
                    "Country": "US",
                    "Currency": "USD",
                    "DispatchTimeMax": "3",
                    "ListingType": "FixedPriceItem",
                    "ListingDuration": "GTC",
                    "PictureDetails": {
                        "GalleryType": "Gallery",
                        "PictureURL": "https://res.cloudinary.com/dleagle/image/upload/v1640790789/appliancesdepot/v9kcpigenug6gr7m9xl9.jpg"
                    },
                    "PostalCode": "32211",
                    "Quantity": "1",
                    "ReturnPolicy": {
                    "ReturnsAcceptedOption": "ReturnsAccepted",
                    "RefundOption": "MoneyBack",
                    "ReturnsWithinOption": "Days_30",
                    "ShippingCostPaidByOption": "Buyer"
                    },
                    "ShippingDetails": {
                    "ShippingType": "Calculated",
                    "ShippingServiceOptions": {
                        "ShippingServicePriority": "1",
                        "ShippingService": "USPSPriority"
                    }
                    },
                    "Site": "US",
                    "ShippingPackageDetails":{
                        "PackageDepth":{'@' : {unit : 'inches'},"#":part[0].PackageDepth.toString()},
                        "PackageLength":{'@' : {unit : 'inches'},"#":part[0].PackageLength.toString()},
                        "PackageWidth":{'@' : {unit : 'inches'},"#":part[0].PackageWidth.toString()},
                        "WeightMajor":{'@' : {unit : 'lbs'},"#":part[0].WeightMajor.toString()},
                        "WeightMinor":{'@' : {unit : 'oz'},"#":part[0].WeightMinor.toString()}
                    },
                    "BrandMPN":{
                        "Brand": part[0].Brand,
                        "MPN": part[0].MPN
                    }
                }
            }
        };
        //console.log(part[0], pics);
        pics.forEach(element => {
            console.log(element);
        });
        return ebayitem;
    }
};