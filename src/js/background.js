// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let result;


reloadData();


chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('[background]-onMessage', request, sender, sendResponse, request.msgType);
  var msgType = request.msgType;

	if (msgType === "data") {
		sendResponse({data: result});
  }
  // else if (msgType === "reloadData") {
	// 	reloadData();
	// } else if (msgType === "items") {
	// 	processItems(request, sender);
	// } else if (msgType === "itemsSuccess") {
	// 	var url = request.url ? request.url : sender.url;
	// 	var m = url.match(DEFAULT_URL_REGEX);
	// 	if (m) {
	// 		chrome.storage.local.get(["data"], function(result) {
	// 			var details = itemsMap.get(sender.tab.id);
	// 			if (details && m[1] === details.url) {
	// 				for (var item of request.items) {
	// 					sendWebhook(null, details.url, item.alt, item.src, true);
	//             		if (result && result.data && result.data.webhook) {
	//             			sendWebhook(result.data.webhook, details.url, item.alt, item.src, true);
	// 					}
	// 				}
	// 				itemsMap.delete(sender.tab.id);
	// 			}
	// 		});
	// 	}
	// } else if (msgType === "keywords") {
	// 	processKeywords(request, sender);
	// } else if (msgType === "tabId") {
	// 	sendResponse({tabId: sender.tab.id})
	// } else if (msgType === "testWebhook") {
	// 	chrome.storage.local.get(["data"], function(result) {
	// 		if (result && result.data && result.data.webhook) {
	// 			sendWebhook(result.data.webhook, "https://www.testwebhook.com", "Test Webhook", "https://i.imgur.com/dI7i9Wl.png", true);
	// 		}
	// 	});
	// }
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (info.status === 'complete') {
    
  }
});

// restrict the activation based active domains
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        // pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// function sendWebhook(url, website, name, image, isShopify) {
// 	console.log('[background] - sendWebhook',{
// 		url: url,
// 		website: website,
// 		name: name,
// 		image: image,
// 		isShopify: isShopify
// 	});
// 	var xhr = new XMLHttpRequest();
// 	xhr.open("POST", url ? url : getWebhook());
// 	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
// 	var fields = [
// 		{
// 			"name": "Website",
// 			"value": website
// 		},
//      	{
// 			"name": isShopify ? "Product" : "Keywords Found",
// 			"value": name
// 		}
// 	];
	
// 	var data = {
// 		"avatar_url": "https://i.imgur.com/dI7i9Wl.png",
// 		"username": "Auto Fill",
// 		"embeds": [
// 			{
//   				"title": ":fire: Successfully Assisted User Checkout :fire:",
//   				"color": "7297791",
// 				"fields": fields,
//     			"thumbnail": {
//       				"url": image
//     			},
//     			"footer": {
//         			"text": "Auto Fill by Fattye Xtension v" + version,
//         			"icon_url": "https://i.imgur.com/dI7i9Wl.png"
//       			},
//       			"timestamp": new Date()
//   			}
//   		]
// 	};
// 	xhr.send(JSON.stringify(data));
// }

function reloadData() {
  chrome.storage.local.get(["data"], function (res) {
      if (res && res.data) {
          result = res.data;
      }
  })
}

function getWebhook() {
	console.log('[BK] - getWebhook');
	return webhooks[getRandomNumber(0, webhooks.length)];
}