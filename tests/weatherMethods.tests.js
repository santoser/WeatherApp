const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const weatherMethods = require("../api/src/weather/weatherMethods");

describe("weatherMethods", function()  {
    describe("owmGetWeather", async function()  {
        it("...",async function () {

            const cities = ['lisbon'];
            const apiKey = '123456789';

            const stub = {
                data: { 
                    main: { 
                        temp: 15.61,
                        feels_like: 13.18,
                        temp_min: 13.89,
                        temp_max: 17,
                        pressure: 1024,
                        humidity: 82 
                    }
                }
            }

            const stub2 = {
                Lisbon: {
                    temp: 15.61,
                    feels_like: 13.18,
                    temp_min: 13.89,
                    temp_max: 17,
                    pressure: 1024,
                    humidity: 82 
                }
            }

            const owmGetWeatherStub = sinon.stub(weatherMethods, 'owmWeatherHttpReq')
                .resolves(stub);
            const parseRespondeStub = sinon.stub(weatherMethods, 'parseResponse')
                .returns(stub2); 

            const result = await weatherMethods.owmGetWeather(cities, apiKey);
            expect(result).to.be.eql(stub2);

            owmGetWeatherStub.restore();
            parseRespondeStub.restore();

        })
        
    });
    describe("parseResponse", function(){
        it("should parse the response Array and return a valid weather object", function(){
            const stub = [{
                data: { 
                    main: { 
                        temp: 15.61,
                        feels_like: 13.18,
                        temp_min: 13.89,
                        temp_max: 17,
                        pressure: 1024,
                        humidity: 82 
                    },
                    name: 'Lisbon'
                }
            }]

            const stub2 = {
                Lisbon: {
                    temp: 15.61,
                    feels_like: 13.18,
                    temp_min: 13.89,
                    temp_max: 17,
                    pressure: 1024,
                    humidity: 82,
                }
            }

            const result = weatherMethods.parseResponse(stub);
            expect(result).to.be.eql(stub2);

        });




    })
});