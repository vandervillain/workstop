import fetch from 'node-fetch';

const bingKey = "AvHMpUTqtm4l8QRYQhQrF_9Uc4VE26x0sjO4aE7FiHJ8WPeqth7CsxgreuSgsvMK";

interface LocationResponse {  
    resourceSets: ResourceSet[];
    statusCode: number;
    statusDescription: string;
    traceId: string;
}

interface ResourceSet {
    estimatedTotal: number;  
    resources: Resource[];
}

interface Resource {
    bbox: number[]; // length = 4, gps coords bounding box  
    point: GpsPoint;
    address: Address;
    confidence: string; // "High"
    entityType: string; //"Address"
    geocodePoints: GeocodePoint[];
    matchCodes: string[]; // ["Good"]
}

interface GpsPoint {
    type: string; // "Point"
    coordinates: number[]; // [47.640120461583138, -122.12971039116383]
}

interface GeocodePoint {
    type: string; // "Point"
    coordinates: number[]; // [47.640120461583138, -122.12971039116383]
    calculationMethod: string; // "InterpolationOffset"
    usageTypes: string[]; // ["Display"], ["Route"], etc
}

interface Address {
    addressLine: string; // "1 Microsoft Way"
    adminDistrict: string; // "WA"
    adminDistrict2: string; // "King Co."
    countryRegion: string; // "United States"
    formattedAddress: string; // "1 Microsoft Way, Redmond, WA 98052"
    locality: string; // "Redmond"
    postalCode: string; // "98052"
}

function getUrl(state, zip, city, address, numResults) {
    return `http://dev.virtualearth.net/REST/v1/Locations/US/${state}/${zip}/${city}/${address}?maxResults=${numResults}&key=${bingKey}`;
}

async function getGpsCoords(zip, city, address) {
    var url = getUrl("WA", zip, city, address, 1);
  
    var rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    var response: LocationResponse = await rawResponse.json();
    if (response) {
        if (response.statusCode && response.statusCode === 200) {
            if (response.resourceSets && response.resourceSets.length > 0) {
                if (response.resourceSets[0].resources && response.resourceSets[0].resources[0]) {
                    if (response.resourceSets[0].resources[0].point && response.resourceSets[0].resources[0].point.coordinates) {
                        return response.resourceSets[0].resources[0].point.coordinates;
                    }
                }
            }
        }
    }
    return false;
}

export default getGpsCoords;