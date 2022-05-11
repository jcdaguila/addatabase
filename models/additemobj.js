module.exports={
    getEbayObject:
    function()
{
    let obj = {
        "Item": {
           "#text": "ItemType",
           "ApplicationData": "string",
           "AutoPay": "boolean",
           "BestOfferDetails": {
              "#text": "BestOfferDetailsType",
              "BestOfferEnabled": "boolean"
           },
           "BuyerRequirementDetails": {
              "#text": "BuyerRequirementDetailsType",
              "MaximumItemRequirements": {
                 "#text": "MaximumItemRequirementsType",
                 "MaximumItemCount": "int",
                 "MinimumFeedbackScore": "int"
              },
              "MaximumUnpaidItemStrikesInfo": {
                 "#text": "MaximumUnpaidItemStrikesInfoType",
                 "Count": "int",
                 "Period": "PeriodCodeType"
              },
              "ShipToRegistrationCountry": "boolean",
              "ZeroFeedbackScore": "boolean"
           },
           "BuyerResponsibleForShipping": "boolean",
           "BuyItNowPrice": {
              "@currencyID": "CurrencyCodeType",
              "#text": "AmountType (double)"
           },
           "CategoryMappingAllowed": "boolean",
           "Charity": {
              "#text": "CharityType",
              "CharityID": "string",
              "CharityNumber": "int",
              "DonationPercent": "float"
           },
           "ConditionDescription": "string",
           "ConditionID": "int",
           "Country": "CountryCodeType",
           "CrossBorderTrade": "string",
           "Currency": "CurrencyCodeType",
           "CustomPolicies": {
              "#text": "CustomPoliciesType",
              "ProductCompliancePolicyID": "long",
              "TakeBackPolicyID": "long"
           },
           "Description": "string",
           "DigitalGoodInfo": {
              "#text": "DigitalGoodInfoType",
              "DigitalDelivery": "boolean"
           },
           "DisableBuyerRequirements": "boolean",
           "DiscountPriceInfo": {
              "#text": "DiscountPriceInfoType",
              "MadeForOutletComparisonPrice": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              },
              "MinimumAdvertisedPrice": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              },
              "MinimumAdvertisedPriceExposure": "MinimumAdvertisedPriceExposureCodeType",
              "OriginalRetailPrice": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              },
              "SoldOffeBay": "boolean",
              "SoldOneBay": "boolean"
           },
           "DispatchTimeMax": "int",
           "eBayPlus": "boolean",
           "ExtendedProducerResponsibility": {
              "#text": "ExtendedProducerResponsibilityType",
              "EcoParticipationFee": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              },
              "ProducerProductID": "string",
              "ProductDocumentationID": "string",
              "ProductPackageID": "string",
              "ShipmentPackageID": "string"
           },
           "ExtendedSellerContactDetails": {
              "#text": "ExtendedContactDetailsType",
              "ClassifiedAdContactByEmailEnabled": "boolean",
              "ContactHoursDetails": {
                 "#text": "ContactHoursDetailsType",
                 "Hours1AnyTime": "boolean",
                 "Hours1Days": "DaysCodeType",
                 "Hours1From": "time",
                 "Hours1To": "time",
                 "Hours2AnyTime": "boolean",
                 "Hours2Days": "DaysCodeType",
                 "Hours2From": "time",
                 "Hours2To": "time",
                 "TimeZoneID": "string"
              }
           },
           "HitCounter": "HitCounterCodeType",
           "ItemCompatibilityList": {
              "#text": "ItemCompatibilityListType",
              "Compatibility": {
                 "#text": "ItemCompatibilityType",
                 "CompatibilityNotes": "string",
                 "NameValueList": {
                    "#text": "NameValueListType",
                    "Name": "string",
                    "Value": "string"
                 }
              }
           },
           "ItemSpecifics": {
              "#text": "NameValueListArrayType",
              "NameValueList": {
                 "#text": "NameValueListType",
                 "Name": "string",
                 "Value": "string"
              }
           },
           "ListingDetails": {
              "#text": "ListingDetailsType",
              "BestOfferAutoAcceptPrice": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              },
              "LocalListingDistance": "string",
              "MinimumBestOfferPrice": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              }
           },
           "ListingDuration": "token",
           "ListingEnhancement": "ListingEnhancementsCodeType",
           "ListingSubtype2": "ListingSubtypeCodeType",
           "ListingType": "ListingTypeCodeType",
           "Location": "string",
           "LotSize": "int",
           "PaymentDetails": {
              "#text": "PaymentDetailsType",
              "DaysToFullPayment": "int",
              "DepositAmount": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              },
              "DepositType": "DepositTypeCodeType",
              "HoursToDeposit": "int"
           },
           "PaymentMethods": "BuyerPaymentMethodCodeType",
           "PayPalEmailAddress": "string",
           "PickupInStoreDetails": {
              "#text": "PickupInStoreDetailsType",
              "EligibleForPickupInStore": "boolean"
           },
           "PictureDetails": {
              "#text": "PictureDetailsType",
              "GalleryType": "GalleryTypeCodeType",
              "PhotoDisplay": "PhotoDisplayCodeType",
              "PictureURL": "anyURI"
           },
           "PostalCode": "string",
           "PrimaryCategory": {
              "#text": "CategoryType",
              "CategoryID": "string"
           },
           "PrivateListing": "boolean",
           "ProductListingDetails": {
              "#text": "ProductListingDetailsType",
              "BrandMPN": {
                 "#text": "BrandMPNType",
                 "Brand": "string",
                 "MPN": "string"
              },
              "EAN": "string",
              "IncludeeBayProductDetails": "boolean",
              "IncludeStockPhotoURL": "boolean",
              "ISBN": "string",
              "ProductReferenceID": "string",
              "ReturnSearchResultOnDuplicates": "boolean",
              "TicketListingDetails": {
                 "#text": "TicketListingDetailsType",
                 "EventTitle": "string",
                 "PrintedDate": "string",
                 "PrintedTime": "string",
                 "Venue": "string"
              },
              "UPC": "string",
              "UseFirstProduct": "boolean",
              "UseStockPhotoURLAsGallery": "boolean"
           },
           "Quantity": "int",
           "QuantityInfo": {
              "#text": "QuantityInfoType",
              "MinimumRemnantSet": "int"
           },
           "QuantityRestrictionPerBuyer": {
              "#text": "QuantityRestrictionPerBuyerInfoType",
              "MaximumQuantity": "int"
           },
           "ReservePrice": {
              "@currencyID": "CurrencyCodeType",
              "#text": "AmountType (double)"
           },
           "ReturnPolicy": {
              "#text": "ReturnPolicyType",
              "Description": "string",
              "InternationalRefundOption": "token",
              "InternationalReturnsAcceptedOption": "token",
              "InternationalReturnsWithinOption": "token",
              "InternationalShippingCostPaidByOption": "token",
              "RefundOption": "token",
              "ReturnsAcceptedOption": "token",
              "ReturnsWithinOption": "token",
              "ShippingCostPaidByOption": "token"
           },
           "ScheduleTime": "dateTime",
           "SecondaryCategory": {
              "#text": "CategoryType",
              "CategoryID": "string"
           },
           "Seller": "UserType",
           "SellerContactDetails": {
              "#text": "AddressType",
              "CompanyName": "string",
              "County": "string",
              "PhoneAreaOrCityCode": "string",
              "PhoneCountryCode": "CountryCodeType",
              "PhoneLocalNumber": "string",
              "Street": "string",
              "Street2": "string"
           },
           "SellerProfiles": {
              "#text": "SellerProfilesType",
              "SellerPaymentProfile": {
                 "#text": "SellerPaymentProfileType",
                 "PaymentProfileID": "long",
                 "PaymentProfileName": "string"
              },
              "SellerReturnProfile": {
                 "#text": "SellerReturnProfileType",
                 "ReturnProfileID": "long",
                 "ReturnProfileName": "string"
              },
              "SellerShippingProfile": {
                 "#text": "SellerShippingProfileType",
                 "ShippingProfileID": "long",
                 "ShippingProfileName": "string"
              }
           },
           "SellerProvidedTitle": "string",
           "ShippingDetails": {
              "#text": "ShippingDetailsType",
              "CalculatedShippingRate": {
                 "#text": "CalculatedShippingRateType",
                 "InternationalPackagingHandlingCosts": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 },
                 "OriginatingPostalCode": "string",
                 "PackagingHandlingCosts": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 }
              },
              "CODCost": {
                 "@currencyID": "CurrencyCodeType",
                 "#text": "AmountType (double)"
              },
              "ExcludeShipToLocation": "string",
              "GlobalShipping": "boolean",
              "InternationalPromotionalShippingDiscount": "boolean",
              "InternationalShippingDiscountProfileID": "string",
              "InternationalShippingServiceOption": {
                 "#text": "InternationalShippingServiceOptionsType",
                 "ShippingService": "token",
                 "ShippingServiceAdditionalCost": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 },
                 "ShippingServiceCost": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 },
                 "ShippingServicePriority": "int",
                 "ShipToLocation": "string"
              },
              "PromotionalShippingDiscount": "boolean",
              "RateTableDetails": {
                 "#text": "RateTableDetailsType",
                 "DomesticRateTable": "string",
                 "DomesticRateTableId": "string",
                 "InternationalRateTable": "string",
                 "InternationalRateTableId": "string"
              },
              "SalesTax": {
                 "#text": "SalesTaxType",
                 "SalesTaxPercent": "float",
                 "SalesTaxState": "string",
                 "ShippingIncludedInTax": "boolean"
              },
              "ShippingDiscountProfileID": "string",
              "ShippingServiceOptions": {
                 "#text": "ShippingServiceOptionsType",
                 "FreeShipping": "boolean",
                 "ShippingService": "token",
                 "ShippingServiceAdditionalCost": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 },
                 "ShippingServiceCost": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 },
                 "ShippingServicePriority": "int"
              },
              "ShippingType": "ShippingTypeCodeType"
           },
           "ShippingPackageDetails": {
              "#text": "ShipPackageDetailsType",
              "MeasurementUnit": "MeasurementSystemCodeType",
              "PackageDepth": {
                 "@unit": "token",
                 "@measurementSystem": "MeasurementSystemCodeType",
                 "#text": "MeasureType (decimal)"
              },
              "PackageLength": {
                 "@unit": "token",
                 "@measurementSystem": "MeasurementSystemCodeType",
                 "#text": "MeasureType (decimal)"
              },
              "PackageWidth": {
                 "@unit": "token",
                 "@measurementSystem": "MeasurementSystemCodeType",
                 "#text": "MeasureType (decimal)"
              },
              "ShippingIrregular": "boolean",
              "ShippingPackage": "ShippingPackageCodeType",
              "WeightMajor": {
                 "@unit": "token",
                 "@measurementSystem": "MeasurementSystemCodeType",
                 "#text": "MeasureType (decimal)"
              },
              "WeightMinor": {
                 "@unit": "token",
                 "@measurementSystem": "MeasurementSystemCodeType",
                 "#text": "MeasureType (decimal)"
              }
           },
           "ShippingServiceCostOverrideList": {
              "#text": "ShippingServiceCostOverrideListType",
              "ShippingServiceCostOverride": {
                 "#text": "ShippingServiceCostOverrideType",
                 "ShippingServiceAdditionalCost": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 },
                 "ShippingServiceCost": {
                    "@currencyID": "CurrencyCodeType",
                    "#text": "AmountType (double)"
                 },
                 "ShippingServicePriority": "int",
                 "ShippingServiceType": "ShippingServiceType"
              }
           },
           "ShipToLocations": "string",
           "Site": "SiteCodeType",
           "SKU": "SKUType (string)",
           "StartPrice": {
              "@currencyID": "CurrencyCodeType",
              "#text": "AmountType (double)"
           },
           "Storefront": {
              "#text": "StorefrontType",
              "StoreCategory2ID": "long",
              "StoreCategory2Name": "string",
              "StoreCategoryID": "long",
              "StoreCategoryName": "string"
           },
           "SubTitle": "string",
           "TaxCategory": "string",
           "Title": "string",
           "UseTaxTable": "boolean",
           "UUID": "UUIDType (string)",
           "VATDetails": {
              "#text": "VATDetailsType",
              "BusinessSeller": "boolean",
              "RestrictedToBusiness": "boolean",
              "VATPercent": "float"
           },
           "VideoDetails": {
              "#text": "VideoDetailsType",
              "VideoID": "string"
           },
           "VIN": "string",
           "VRM": "string"
        },
        "ErrorHandling": "ErrorHandlingCodeType",
        "ErrorLanguage": "string",
        "MessageID": "string",
        "Version": "string",
        "WarningLevel": "WarningLevelCodeType"
     };
     return obj;
    }
 }