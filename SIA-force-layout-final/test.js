data = {
   "children":[
      {
         "name":"CondensedCrnReportDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":95,
         "weight":3,
         "x":452.93667388027853,
         "y":804.2849876887977,
         "px":453.1393917537675,
         "py":803.7402547038805
      },
      {
         "name":"ConsolidatedCommercialInvoiceDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":96,
         "weight":3,
         "x":492.8004425879163,
         "y":807.78302427907,
         "px":492.56214838326224,
         "py":807.2998330795458
      },
      {
         "name":"CustomDocumentDetailsCustomConsolidationDocumentDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"LabelPrintingOrientation",
               "type":"LabelPrintingOrientationType"
            },
            {
               "name":"LabelRotation",
               "type":"LabelRotationType"
            },
            {
               "name":"SpecificationId",
               "type":"string"
            },
            {
               "name":"CustomDocumentIdentifier",
               "type":"string"
            },
            {
               "name":"DocTabContent",
               "type":"DocTabContent"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":97,
         "weight":4,
         "x":411.1683813552281,
         "y":811.1653114632376,
         "px":411.68098677995636,
         "py":810.6517360781089
      },
      {
         "name":"ConsolidatedCustomsLinehaulReportDetailConsolidationCustomsLinehaulReportDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":98,
         "weight":3,
         "x":471.65017093645974,
         "y":806.4258361347909,
         "px":471.7641000559607,
         "py":805.7641049398794
      },
      {
         "name":"ConsolidatedPartyReportDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":99,
         "weight":3,
         "x":554.4140297882923,
         "y":818.0565336030236,
         "px":554.2481535941436,
         "py":817.4488140490356
      },
      {
         "name":"ConsolidatedSoldToSummaryReportDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":100,
         "weight":3,
         "x":532.3206549687909,
         "y":814.8001354933698,
         "px":531.8369804887858,
         "py":813.7846628129666
      },
      {
         "name":"CustomsPackingListDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":101,
         "weight":3,
         "x":433.82594433568335,
         "y":807.5825095629432,
         "px":434.3569733800381,
         "py":806.8999319283638
      },
      {
         "name":"CrnReportDetail",
         "attributes":[
            {
               "name":"Format",
               "type":"ShippingDocumentFormat"
            },
            {
               "name":"CustomerImageUsages",
               "type":"CustomerImageUsage"
            },
            {
               "name":"SignatureName",
               "type":"string"
            }
         ],
         "compulsory":false,
         "index":102,
         "weight":3,
         "x":511.57238945425934,
         "y":813.2123352259566,
         "px":511.5102271840879,
         "py":812.3159086696664
      }
   ],
   "parents":[
      {
         "name":"Consolidation",
         "attributes":[
            {
               "name":"ConsolidationType",
               "type":"ConsolidationType"
            },
            {
               "name":"ShipDate",
               "type":"date"
            },
            {
               "name":"TrackingIds",
               "type":"TrackingId"
            },
            {
               "name":"Description",
               "type":"string"
            },
            {
               "name":"Shipper",
               "type":"Party"
            },
            {
               "name":"Origin",
               "type":"ContactAndAddress"
            },
            {
               "name":"SoldTo",
               "type":"Party"
            },
            {
               "name":"BookingNumber",
               "type":"string"
            },
            {
               "name":"ConsolidationDataSources",
               "type":"ConsolidationDataSource"
            },
            {
               "name":"SpecialServicesRequested",
               "type":"ConsolidationSpecialServicesRequested"
            },
            {
               "name":"CustomerReferences",
               "type":"CustomerReference"
            },
            {
               "name":"LabelSpecification",
               "type":"LabelSpecification"
            },
            {
               "name":"InternationalDistributionDetail",
               "type":"InternationalDistributionDetail"
            },
            {
               "name":"TransborderDistributionDetail",
               "type":"ConsolidationTransborderDistributionDetail"
            },
            {
               "name":"DistributionLocations",
               "type":"RequestedDistributionLocation"
            },
            {
               "name":"CustomsClearanceDetail",
               "type":"CustomsClearanceDetail"
            },
            {
               "name":"ShippingChargesPayment",
               "type":"Payment"
            },
            {
               "name":"ConsolidationDocumentSpecification",
               "type":"ConsolidationDocumentSpecification"
            },
            {
               "name":"CrnShippingDocumentTypes",
               "type":"RequestedShippingDocumentType"
            }
         ],
         "compulsory":false,
         "index":103,
         "weight":14,
         "x":568.2540588105521,
         "y":433.52140985155745,
         "px":568.1262180609733,
         "py":433.6309721989467
      }
   ],
   "rootNode":{
      "name":"ConsolidationDocumentSpecification",
      "attributes":[
         {
            "name":"ConsolidationDocumentTypes",
            "type":"RequestedConsolidationDocumentType"
         },
         {
            "name":"CondensedCrnReportDetail",
            "type":"CondensedCrnReportDetail"
         },
         {
            "name":"ConsolidatedCommercialInvoiceDetail",
            "type":"ConsolidatedCommercialInvoiceDetail"
         },
         {
            "name":"CustomDocumentDetails",
            "type":"CustomConsolidationDocumentDetail"
         },
         {
            "name":"ConsolidatedCustomsLinehaulReportDetail",
            "type":"ConsolidationCustomsLinehaulReportDetail"
         },
         {
            "name":"ConsolidatedPartyReportDetail",
            "type":"ConsolidatedPartyReportDetail"
         },
         {
            "name":"ConsolidatedSoldToSummaryReportDetail",
            "type":"ConsolidatedSoldToSummaryReportDetail"
         },
         {
            "name":"CustomsPackingListDetail",
            "type":"CustomsPackingListDetail"
         },
         {
            "name":"CrnReportDetail",
            "type":"CrnReportDetail"
         }
      ],
      "compulsory":false,
      "index":94,
      "weight":9,
      "x":510.4863450127782,
      "y":655.107561563167,
      "px":510.4863450127782,
      "py":655.107561563167,
      "fixed":0
   }
};

console.log(data.children);
console.log(data.parents);
console.log(data.rootNode);


create_modal();
render_uml(data, 900, 750);
function render_uml(data, width, height) {
  if(modal) {

    var block = 80;
    var center = (900 - 80) / 2;
    var heightPerAttribute = 20;
    var padding = 20;

    console.log("start uml");
    console.log(data);
    modal = d3.select("g.modal-container");
    // modal = canvas.select("g.modal-container");

    children = data.children;
    parents = data.parents;
    main = [data.rootNode];

    console.log("num children: " + children.length);
    console.log("num parents: " + parents.length);

    var main = modal.selectAll(".main-node")
      .data(main)
      .enter()
      .append("rect")
      .attr("width", 90)
      .attr("height", 20)
      .attr("x", center)
      .attr("y", height / 2)
      .attr("stroke", "black")
      .attr("fill", "none");

    var sub = modal.selectAll(".sub-elements")
      .data(children)
      .enter()
      .append("g")
      .attr("class", "sub-container");

    sub
      .append("rect")
      .attr("x",
      function(d, i) {
        // return ( (i * block) + ((i + 1) * 10));
        return ( i*block + i*20 );
      })
      .attr("y", 10)
      .attr("width", 90)
      .attr("height", 200)
      .attr("fill", "none")
      .attr("stroke", "black");

    sub
      .append("text")
      .attr("x", function(d, i) { return i*block + i*20; })
      .attr("y", 10)
      .style("font", "6px sans-serif")
      .text(function(d) { return d.name; });
  }
}

function create_modal() {
  var x = 40,
    y = 50,
    width = 900,
    height = 750;

  d3.select("body")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000)
    .append("g")
    .attr("class", "modal-container")
    .attr("transform", "translate(" + x + "," + y + ")")
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "white")
    .attr("stroke", "grey");

  modal = true;
}
