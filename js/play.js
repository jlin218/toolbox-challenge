"use strict";
var pairsLeft;
var numClicks = 0;
var startTime;
var timer;
var gameBoard = $('#game-board');
for(var i = 0 ; i < 16; i++){
	var name = '#' + "pic" + i;
	var newTile = $(name);
	newTile.attr('src', 'img/tile-back.png');
	newTile.attr('alt', 'grey');
}
document.getElementById('suggestion').innerHTML = 'CLICK PLAY TO START';

function clickstart(){
	pairsLeft = 8;
	numClicks = 0;
	document.getElementById('timeElasped').innerHTML = 0;
	document.getElementById('pairsLeft').innerHTML = pairsLeft;
	document.getElementById('numOfClicks').innerHTML = numClicks;
	var picGroup = _.sample([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
		25,26,27,28,29,30,31,32], 8);
	var doubleGroup =[];
	for (var i=0; i<8;i++) {
		doubleGroup[i*2] = picGroup[i];
		doubleGroup[Math.floor(i*2+1)] = picGroup[i];
	}
	var shuffledList = _.shuffle(doubleGroup);
	for(var i = 0 ; i < 16; i++) {
		var name = '#' + 'pic' + i;
		var newTile = $(name);
		var tile = 'img/tile' + shuffledList[i]+'.jpg'; 
		newTile.attr('src', 'img/tile-back.png');
		newTile.attr('alt', 'grey');
		newTile.data('assocTile', tile);
		newTile.data('back', 'img/tile-back.png');
		newTile.data('side', true);
	}
}

$('#play').click(function(){
	clickstart();
	startTime = _.now();
	timer = window.setInterval(onTimer, 1000);
});

function onTimer() {
	var elapsedSeconds = Math.floor((_.now() - startTime) / 1000);
	document.getElementById('timeElasped').innerHTML = elapsedSeconds;
};

function stopTimer(){
	timer = window.clearInterval(timer);
}
var tempSideValue;
var tempSideValue2;
var check1 = false;
var check2 = false;

$('#game-board img').click(function(){
	var clickedImage = $(this);
	var back = clickedImage.data('side'); 
	if (back){
		numClicks+=1;
		var tileData1 = clickedImage.data('assocTile');
		var tileData2 = clickedImage.data('no pic');
		var tileData3 = !clickedImage.data('side');
		clickedImage.attr('src', tileData1);
		clickedImage.attr('alt', tileData2);
		clickedImage.data('side', tileData3);
		if (numClicks % 2 == 1) {
			tempSideValue = clickedImage;
		} else{
			tempSideValue2 = clickedImage;
			var compareImage = compare(tempSideValue,tempSideValue2);
			action(compareImage, tempSideValue, tempSideValue2);
		}

	}
	document.getElementById('numOfClicks').innerHTML = Math.floor(numClicks/2);
});

function compare(value, value2){
	var tempSideValue = value.attr('src');
	var tempSideValue2 = value2.attr('src');
	if(tempSideValue == tempSideValue2){
		value.data('side', false);
		value2.data('side', false);
		pairsLeft -= 1;
		document.getElementById('suggestion').innerHTML = 'Good Job';
		document.getElementById('pairsLeft').innerHTML = pairsLeft;
		if (pairsLeft == 0){
			stopTimer();
			alert("Congratulations!!! You Won!");
		}
		return true;
	}else{
		return false;
	}
}

function action(value, clickedImage1, clickedImage2){
	if(!value){
		document.getElementById('suggestion').innerHTML = 'They Do not Match';
		setTimeout(function(){turnBack(clickedImage1, clickedImage2)}, 1000);
	}
}

function turnBack(clickedImage1,clickedImage2){
	var tileData1 = clickedImage1.data('back'); //turn back
	var tileData2 = clickedImage1.data('no pic');
	clickedImage1.attr('src', tileData1);
	clickedImage1.attr('alt', tileData2);
	clickedImage1.data('side', true);
	tileData1 = clickedImage2.data('back'); //turn back
	tileData2 = clickedImage2.data('no pic');
	clickedImage2.attr('src', tileData1);
	clickedImage2.attr('alt', tileData2);
	clickedImage2.data('side', true);
}




