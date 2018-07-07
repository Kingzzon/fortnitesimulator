$(document).ready(function(){
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");
    
    $("#desktopChromeAlert").hide();
    
    function desktopChromeAlert(){
        $("#desktopChromeAlert").show();
    };
    

  if (isIOSChrome) {
   desktopChromeAlert();
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
   console.log("ready");
    $("#wholeScreen").hide();
    $("#peopleLeftId").hide();
    $("#currentKills").hide();
    var landingSpot = "";
    var skin = "Default";
    var peopleLeft = 100;
    var currentKills = 0;
    var seconds = 0;
    var vbucksTotal = 0;
    var playerName = "crispifnotcrunch";
    var randomName = "";
    var killedWith = "";
    var killedWithNumber = 0;
    var killedUsingNumber = 0;
    var randomNamesArray = ["RespectedArcturus","CheesesFrozen","HaumeAmar","ShoreHonky","KintailMedial","SurepParts","EggCharlie","TaffrailSilky","AlkalisWeakest","MimosaHalogen","ShoreditchPolonium","Morainerna","WhoopProperty","SuperscriptCraven","ConspiracySoundcloud","Saladmachine","TravelerDate","PufferfishDiligent","AustrinaImpala","Stressdesigner","FutureEuhedral","hyundaitrice","worldinclude","hoodiegoogol","GastrinCutter","compilersuggestion","cleftpissed","admirableskip","powerfultidally","redundantfuelpump","encourageADN","typebivvy","clappedurgonian","labelpizz","weightedself","carnbulb","hooffishing","gentlerevered","MonsterLark","geldingsleepy","unwieldyprick","unsteadybless","CanalScales","strikerbutterfly","gazemildew","serveutensil","foglists","puttockflawed","perlstart","stillposset"]
    var landingSpotNames = ["Anarchy Acres", "Dusty Divot", "Fatal Fields", "Flush Factory", "Greasy Grove", "Haunted Hills", "Junk Junction", "Lonely Lodge", "Loot Lake", "Lucky Landing", "Moisty Mire", "Pleasant Park", "Retail Row", "Risky Reels", "Salty Springs", "Shifty Shafts", "Snobby Shores", "Tilted Towers", "Tomato Town", "Wailing Woods"];
    var killedWithArray = ["with a sniper", "with a rifle", "with a shotgun", "with an explosion"];
    var killedUsingArray = ["using a sniper", "using a rifle", "using a shotgun", "using an explosion"];
    var username = "";
    var gameObjects = [];
    var secondsConst = 0;
 
    function getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    pc.createDataChannel("");

    pc.createOffer(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }, noop); 

    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

    getUserIP(function(ip){
		console.log(ip);
        $("#all").hide();
        $("#newUserDiv").hide();
        var userIPGet = localStorage.getItem(ip);
         function checkUser(){
           if(userIPGet == null){
            $("#newUserDiv").show();
            gameObjects = ["username", 0, "defaultSkin"];
            localStorage.setItem(ip, JSON.stringify(gameObjects));
            vbucksTotal = gameObjects[1];
            $("#vbucksTotal").html(vbucksTotal)
            determineSkin();
            getUserSkin();
            $("#submitUsername").click(function(){
               username = $("#username").val();
               console.log(username);
               gameObjects = JSON.parse(localStorage.getItem(ip));
               gameObjects[0] = username;
               localStorage.setItem(ip, JSON.stringify(gameObjects));
               newUserConfirmed();
           });
        } else{
            $("#newUserDiv").hide();
            gameObjects = JSON.parse(localStorage.getItem(ip));
            vbucksTotal = gameObjects[1];
            $("#usernameDisplay").html(gameObjects[0]);
            $("#vbucksTotal").html(vbucksTotal);
            determineSkin();
            getUserSkin();
            $("#all").show();
            username = gameObjects[0];
         };
            
        }; 
        checkUser();
    });

    function newUserConfirmed(){
        getUserIP(function(ip){
	    $("#newUserDiv").hide();
            gameObjects = JSON.parse(localStorage.getItem(ip));
            vbucksTotal = gameObjects[1];
            $("#usernameDisplay").html(gameObjects[0]);
            $("#vbucksTotal").html(vbucksTotal);
            determineSkin();
            getUserSkin();
            $("#all").show();
            username = gameObjects[0];
	})
    };
	
    $("#startGame").click(function(){
        restartGame();
        $("#startGame").hide();
        $("#peopleLeftId").show();
        $("#currentKills").show();
        landingSpotGenerator();
        simulateGame();        
    });
    
    function landingSpotGenerator(){
        console.log("simulating landing spot");
        var landingSpotNumber = Math.floor(Math.random() * 19) + 0
        landingSpot = landingSpotNames[landingSpotNumber];
        $("#simulateUpdate").append("<div><p1 style='color:white;'>Landing at " + landingSpot + "...</p1></div>")
    };
    
    function restartGame(){
        landingSpot = "";
        peopleLeft = 100;
        currentKills = 0;
        seconds = 0;
        $("#simulateUpdate").empty();
        $("#currentKills").html("Kills: " + currentKills);
        $("#peopleLeftId").html("People Left: " + peopleLeft);
        randomNamesArray = ["RespectedArcturus","CheesesFrozen","HaumeAmar","ShoreHonky","KintailMedial","SurepParts","EggCharlie","TaffrailSilky","AlkalisWeakest","MimosaHalogen","ShoreditchPolonium","Morainerna","WhoopProperty","SuperscriptCraven","ConspiracySoundcloud","Saladmachine","TravelerDate","PufferfishDiligent","AustrinaImpala","Stressdesigner","FutureEuhedral","hyundaitrice","worldinclude","hoodiegoogol","GastrinCutter","compilersuggestion","cleftpissed","admirableskip","powerfultidally","redundantfuelpump","encourageADN","typebivvy","clappedurgonian","labelpizz","weightedself","carnbulb","hooffishing","gentlerevered","MonsterLark","geldingsleepy","unwieldyprick","unsteadybless","CanalScales","strikerbutterfly","gazemildew","serveutensil","foglists","puttockflawed","perlstart","stillposset"]
    };
    
    function gameWon(vbucks){
        vbucksTotal += vbucks;
        getUserIP(function(ip){
           gameObjects = JSON.parse(localStorage.getItem(ip));
           gameObjects[1] = vbucksTotal;
           localStorage.setItem(ip, JSON.stringify(gameObjects));
        });
        $("#vbucksTotal").html(vbucksTotal);
    };

    function simulateGame(){
      getUserIP(function(ip){
      seconds = Math.floor(Math.random() * 10) + 1;
      secondsConst = seconds;
      var killRandomizer = setInterval(randomizeKills, 1000);
      function randomizeKills(){
          peopleLeft -= 5;
          seconds -= 0.5;
          console.log(seconds);
          $("#peopleLeftId").html("People Left: " + peopleLeft);
          var killNumber = Math.floor(Math.random() * 3) + 0;
          
          if(killNumber == 1){
            waysToDieNumber = Math.floor(Math.random() * 9) + 0;
            randomNamesArrayNumber = Math.floor(Math.random() * 49) + 0;
            killedWithNumber = Math.floor(Math.random() * 3) + 0;
            killedWith = killedWithArray[killedWithNumber];
            randomName = randomNamesArray[randomNamesArrayNumber];
            currentKills += 1;
            $("#simulateUpdate").append("<div><p1 style='color:lawngreen;'>" + username + "</p1><p1 style='color:white;'> killed </p1><p1 style='color:firebrick;'>" + randomName + "</p1><p1 style='color:white;'> " + killedWith + "</p1></div>")
            $("#currentKills").html("Kills: " + currentKills);
            randomNamesArray.splice(randomNamesArrayNumber, 1);
          };
 
          if(seconds == 0){
              $("#startGame").show();
              console.log("game over");
              clearInterval(killRandomizer);
              gameObjects = JSON.parse(localStorage.getItem(ip));
            if(gameObjects[2] == "defaultSkin"){
                console.log("default");
               if(secondsConst == 10 && seconds == 0.5){
                $("#peopleLeftId").html("People Left: 2");
              };
               if(secondsConst == 10){
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>Victory Royale!</p1></div>")
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+10 V-Bucks</p1></div>")
                  $("#peopleLeftId").html("People Left: 1");
                  gameWon(10);
              }
               else{
                  waysToDieNumber = Math.floor(Math.random() * 9) + 0;
                  randomNamesArrayNumber = Math.floor(Math.random() * 49) + 0;
                  killedUsingNumber = Math.floor(Math.random() * 3) + 0;
                  killedUsing = killedUsingArray[killedUsingNumber];
                  randomName = randomNamesArray[randomNamesArrayNumber];
                  $("#simulateUpdate").append("<div><p1 style='color:lawngreen;'>" + username + "</p1><p1 style='color:white;'> was killed by </p1><p1 style='color:firebrick;'>" + randomName + "</p1><p1 style='color:white;'> " + killedUsing + "</div>")
                  randomNamesArray.splice(randomNamesArrayNumber, 1);
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+2 V-Bucks</p1></div>")
                  gameWon(2);
              };
            };
          
             if (gameObjects[2] == "whiplash"){
              if(secondsConst == 10 && seconds == 0.5 || secondsConst == 9 && seconds == 0.5 || secondsConst == 8 && seconds == 0.5){
                $("#peopleLeftId").html("People Left: 2");
              };
              if(secondsConst == 10 || secondsConst == 9 || secondsConst == 8){
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>Victory Royale!</p1></div>")
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+10 V-Bucks</p1></div>")
                  $("#peopleLeftId").html("People Left: 1");
                  gameWon(15);
              }
              else{
                  waysToDieNumber = Math.floor(Math.random() * 9) + 0;
                  randomNamesArrayNumber = Math.floor(Math.random() * 49) + 0;
                  killedUsingNumber = Math.floor(Math.random() * 3) + 0;
                  killedUsing = killedUsingArray[killedUsingNumber];
                  randomName = randomNamesArray[randomNamesArrayNumber];
                  $("#simulateUpdate").append("<div><p1 style='color:lawngreen;'>" + username + "</p1><p1 style='color:white;'> was killed by </p1><p1 style='color:firebrick;'>" + randomName + "</p1><p1 style='color:white;'> " + killedUsing + "</div>")
                  randomNamesArray.splice(randomNamesArrayNumber, 1);
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+2 V-Bucks</p1></div>")
                  gameWon(2);
              };
          };
              
          if (gameObjects[2] == "briteBomber"){
              if(secondsConst == 10 && seconds == 0.5 || secondsConst == 9 && seconds == 0.5 || secondsConst == 8 && seconds == 0.5 || secondsConst == 7 && seconds == 0.5 || secondsConst == 6 && seconds == 0.5){
                $("#peopleLeftId").html("People Left: 2");
              };
              if(secondsConst == 10 || secondsConst == 9 || secondsConst == 8 || secondsConst == 7 || secondsConst == 6){
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>Victory Royale!</p1></div>")
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+10 V-Bucks</p1></div>")
                  $("#peopleLeftId").html("People Left: 1");
                  gameWon(10);
              }
              else{
                  waysToDieNumber = Math.floor(Math.random() * 9) + 0;
                  randomNamesArrayNumber = Math.floor(Math.random() * 49) + 0;
                  killedUsingNumber = Math.floor(Math.random() * 3) + 0;
                  killedUsing = killedUsingArray[killedUsingNumber];
                  randomName = randomNamesArray[randomNamesArrayNumber];
                  $("#simulateUpdate").append("<div><p1 style='color:lawngreen;'>" + username + "</p1><p1 style='color:white;'> was killed by </p1><p1 style='color:firebrick;'>" + randomName + "</p1><p1 style='color:white;'> " + killedUsing + "</div>")
                  randomNamesArray.splice(randomNamesArrayNumber, 1);
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+2 V-Bucks</p1></div>")
                  gameWon(2);
              };
          };
              
          if (gameObjects[2] == "skullTrooper"){
              if(secondsConst == 10 && seconds == 0.5 || secondsConst == 9 && seconds == 0.5 || secondsConst == 8 && seconds == 0.5 || secondsConst == 7 && seconds == 0.5 || secondsConst == 6 && seconds == 0.5 || secondsConst == 5 && seconds == 0.5 || secondsConst == 4 && seconds == 0.5){
                $("#peopleLeftId").html("People Left: 2");
              };
              if(secondsConst == 10 || secondsConst == 9 || secondsConst == 8 || secondsConst == 7 || secondsConst == 6 || secondsConst == 5 || secondsConst == 4){
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>Victory Royale!</p1></div>")
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+10 V-Bucks</p1></div>")
                  $("#peopleLeftId").html("People Left: 1");
                  gameWon(10);
              }
              else{
                  waysToDieNumber = Math.floor(Math.random() * 9) + 0;
                  randomNamesArrayNumber = Math.floor(Math.random() * 49) + 0;
                  killedUsingNumber = Math.floor(Math.random() * 3) + 0;
                  killedUsing = killedUsingArray[killedUsingNumber];
                  randomName = randomNamesArray[randomNamesArrayNumber];
                  $("#simulateUpdate").append("<div><p1 style='color:lawngreen;'>" + username + "</p1><p1 style='color:white;'> was killed by </p1><p1 style='color:firebrick;'>" + randomName + "</p1><p1 style='color:white;'> " + killedUsing + "</div>")
                  randomNamesArray.splice(randomNamesArrayNumber, 1);
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+2 V-Bucks</p1></div>")
                  gameWon(2);
              };
          };    
           
          if (gameObjects[2] == "blackKnight"){
              console.log("blackknight");
              console.log(secondsConst);
              if(secondsConst == 10 && seconds == 0.5 || secondsConst == 9 && seconds == 0.5 || secondsConst == 8 && seconds == 0.5 || secondsConst == 7 && seconds == 0.5 || secondsConst == 6 && seconds == 0.5 || secondsConst == 5 && seconds == 0.5 || secondsConst == 4 && seconds == 0.5 || secondsConst == 3 && seconds == 0.5 || secondsConst == 2 && seconds == 0.5){
                $("#peopleLeftId").html("People Left: 2");
              };
              if(secondsConst == 10 || secondsConst == 9 || secondsConst == 8 || secondsConst == 7 || secondsConst == 6 || secondsConst == 5 || secondsConst == 4 || secondsConst == 3 || secondsConst == 2){
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>Victory Royale!</p1></div>")
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+10 V-Bucks</p1></div>")
                  $("#peopleLeftId").html("People Left: 1");
                  gameWon(10);
              }
              else{
                  waysToDieNumber = Math.floor(Math.random() * 9) + 0;
                  randomNamesArrayNumber = Math.floor(Math.random() * 49) + 0;
                  killedUsingNumber = Math.floor(Math.random() * 3) + 0;
                  killedUsing = killedUsingArray[killedUsingNumber];
                  randomName = randomNamesArray[randomNamesArrayNumber];
                  $("#simulateUpdate").append("<div><p1 style='color:lawngreen;'>" + username + "</p1><p1 style='color:white;'> was killed by </p1><p1 style='color:firebrick;'>" + randomName + "</p1><p1 style='color:white;'> " + killedUsing + "</div>")
                  randomNamesArray.splice(randomNamesArrayNumber, 1);
                  $("#simulateUpdate").append("<div><p1 style='color:white;'>+2 V-Bucks</p1></div>")
                  gameWon(2);
              };
          };    
      };
    };
      });
};
    
    getUserSkin();

    function getUserSkin(){
        getUserIP(function(ip){
          gameObjects = JSON.parse(localStorage.getItem(ip));
          function determineBuyOrEquip(skin){
              var n = gameObjects.includes(skin);
              if (gameObjects[2] == skin){
                  var m = "#" + skin + "SkinButton";
                  $(m).html("Equipped");
              } else if (n == true){
                  var m = "#" + skin + "SkinButton";
                  $(m).html("Equip");
              } else{
                  var m = "#" + skin + "SkinButton";
                  $(m).html("Buy");
              };
          };
            determineBuyOrEquip("defaultSkin");
            determineBuyOrEquip("whiplash");
            determineBuyOrEquip("briteBomber");
            determineBuyOrEquip("skullTrooper");
            determineBuyOrEquip("blackKnight");
        });
        
  };
    
    function equipSkin(skin){
        getUserIP(function(ip){
            gameObjects = JSON.parse(localStorage.getItem(ip));
            var indexNumber = gameObjects.indexOf(skin);
            var oldEquipped = gameObjects[2];
            gameObjects.splice(indexNumber, 1);
            gameObjects[2] = skin;
            gameObjects.push(oldEquipped);
            localStorage.setItem(ip, JSON.stringify(gameObjects));
        });
        getUserSkin();
        determineSkin();
    };
    
    function buyWhiplashSkinSkin(){
        getUserIP(function(ip){
           gameObjects = JSON.parse(localStorage.getItem(ip));
          if (vbucksTotal >= 100){
            gameObjects.push("whiplash");
            vbucksTotal -= 100;
            gameObjects[1] -= 100;
            alert("You bought Whiplash!")
            $("#vbucksTotal").html(vbucksTotal);
            getUserSkin();
            localStorage.setItem(ip, JSON.stringify(gameObjects));
          } else{
          alert("You do not have enough V-Bucks!")  
          };
        });
    };
    
    function buyBriteBomberSkinSkin(){
        getUserIP(function(ip){
           gameObjects = JSON.parse(localStorage.getItem(ip));
          if (vbucksTotal >= 200){
            gameObjects.push("briteBomber");
            vbucksTotal -= 200;
            gameObjects[1] -= 200;
            alert("You bought Brite Bomber!")
            $("#vbucksTotal").html(vbucksTotal);
            getUserSkin();
            localStorage.setItem(ip, JSON.stringify(gameObjects));
          } else{
          alert("You do not have enough V-Bucks!")  
          };
        });
    };
    
    function buySkullTrooperSkinSkin(){
        getUserIP(function(ip){
           gameObjects = JSON.parse(localStorage.getItem(ip));
          if (vbucksTotal >= 500){
            gameObjects.push("skullTrooper");
            vbucksTotal -= 500;
            gameObjects[1] -= 500;
            alert("You bought Skull Trooper!")
            $("#vbucksTotal").html(vbucksTotal);
            getUserSkin();
            localStorage.setItem(ip, JSON.stringify(gameObjects));
          } else{
          alert("You do not have enough V-Bucks!")  
          };
        });
    };
    
    function buyBlackKnightSkinSkin(){
        getUserIP(function(ip){
           gameObjects = JSON.parse(localStorage.getItem(ip));
          if (vbucksTotal >= 1000){
            gameObjects.push("blackKnight");
            vbucksTotal -= 1000;
            gameObjects[1] -= 1000;
            alert("You bought Black Knight!")
            $("#vbucksTotal").html(vbucksTotal);
            getUserSkin();
            localStorage.setItem(ip, JSON.stringify(gameObjects));
          } else{
          alert("You do not have enough V-Bucks!")  
          };
        });
    };
    
  $("#defaultSkinSkinButton").click(function(){
        var n = gameObjects.includes("defaultSkin");
              if (gameObjects[2] == "defaultSkin"){
                  
              } else if (n == true){
                  equipSkin("defaultSkin");
              } else{
                 
              };
  });
    
  $("#whiplashSkinButton").click(function(){
        var n = gameObjects.includes("whiplash");
              if (gameObjects[2] == "whiplash"){
                  
              } else if (n == true){
                  equipSkin("whiplash");
              } else{
                  buyWhiplashSkin();
              };
  });
    
  $("#briteBomberSkinButton").click(function(){
        var n = gameObjects.includes("briteBomber");
              if (gameObjects[2] == "briteBomber"){
                  
              } else if (n == true){
                  equipSkin("briteBomber");
              } else{
                  buyBriteBomberSkinSkin();
              };
  });
    
  $("#skullTrooperSkinButton").click(function(){
        var n = gameObjects.includes("skullTrooper");
              if (gameObjects[2] == "skullTrooper"){
                  
              } else if (n == true){
                  equipSkin("skullTrooper");
              } else{
                  buySkullTrooperSkinSkin();
              };
  });
    
  $("#blackKnightSkinButton").click(function(){
        var n = gameObjects.includes("blackKnight");
              if (gameObjects[2] == "blackKnight"){
                  
              } else if (n == true){
                  equipSkin("blackKnight");
              } else{
                  buyBlackKnightSkinSkin();
              };
  });
    
    function determineSkin(){
      getUserIP(function(ip){
         gameObjects = JSON.parse(localStorage.getItem(ip));
         var skin = gameObjects[2]
         if (skin == "defaultSkin"){
             $("#skinImage").attr("src", "https://image.fnbr.co/outfit/5ab1bcd09116ac5688c6d7f5/png.png")
         } else if (skin == "whiplash"){
             $("#skinImage").attr("src", "https://image.fnbr.co/outfit/5abcf2bf9542fb144ada12a9/png.png")
         } else if (skin == "briteBomber"){
             $("#skinImage").attr("src", "https://image.fnbr.co/outfit/5ab175f75f957f27504aa518/png.png")
         } else if (skin == "skullTrooper"){
             $("#skinImage").attr("src", "https://image.fnbr.co/outfit/5ab172825f957f27504aa504/png.png")
         } else if (skin == "blackKnight"){
             $("#skinImage").attr("src", "https://image.fnbr.co/outfit/5ab1562ce9847b3170da0322/png.png")
         };
          
      });
    };
    
    
    
} else { 
   desktopChromeAlert();
}
    
    
});
