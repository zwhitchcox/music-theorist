'use strict'

app.controller('ScalesCtrl', ['$scope',
  function($scope) {
    $('.navbar').hide()
    $('.container').css({margin:'0',padding:'0'})
    $('[ng-view]').css('height',window.innerHeight)
    $('.container').css({'margin-top':'70px','padding':'0 15px'})
    $scope.startGame = function() {
      $('.container').css({margin:0,padding:0})
      $scope.showMenu = false
      $('#gameStage').html('<canvas id="canvas"></canvas>')
      var canvas = document.getElementById('canvas')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      var stage = new createjs.Stage(canvas),
        keyNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
        keys = [],
        scales = {
          'Ionian (Major)':           '02212221',
          'Dorian':                   '02122212',
          'Phrygian':                 '01222122',
          'Lydian':                   '02221221',
          'Mixolydian':               '02212212',
          'Aeolian':                  '02122122',
          'Locrian':                  '01221222',
          'Melodic Minor':            '02122221',
          'Major 7#4#5':              '02222121',
          'Lydian Dominant':          '02221212',
          'Minor 7b5':                '021221222',
          'Super Locrian':            '01212222',
          'Harmonic Minor':           '02122131',
          'Phrygian Dominant':        '01312122',
          '8-note Diminished':        '021212121',
          '8-note Dominant':          '012121212',
          'Whole Tone':               '0222222',
          'Major Pentatonic':         '022323',
          'Major "Blues" Pentatonic': '0211323',
          'Minor Pentatonic':         '032232',
          'Blues Scale':              '0321132',
          'Minor 6th Pentatonic':     '032223',
          'b5 Pentatonic':            '032142'
        },
        challengeTxt,
        curScale = getRandomScale(),
        curRoot = getRandomRoot(),
        curNum = 0,
        curPos = 0,
        ans,
        answerTimeout,
        score = 0,
        scoreEl
      drawScore(score)
      function showAns(answerTxt) {
        var textHeight
        if (window.innerWidth<700) {
          textHeight = window.innerWidth/15
        } else {
          textHeight = window.innerWidth/17
        }
        ans = new createjs.Text(answerTxt,
          Math.max(textHeight,20)+'px Arial','#555')
        ans.x = 5
        ans.y = 5
        ans.textAlign = 'left'
        stage.addChild(ans)
        stage.update()
      }
      function clicked(key) {
        clearTimeout(answerTimeout)
        answerTimeout = setTimeout(clicked.bind(null,''),2000)
        stage.removeChild(ans)
        stage.update()
        if (curNum+1>=scales[curScale].length) {
          curScale = getRandomScale()
          curRoot = getRandomRoot()
          stage.removeAllChildren()
          drawKeys(curRoot)
          displayChallenge()
          curPos = 0
          curNum= 0
          drawHome()
          stage.update()
        }
        curPos+=parseInt(scales[curScale].charAt(curNum))
        if (parseInt(scales[curScale].charAt(curNum))===0) {
          curPos = keyNames.indexOf(curRoot)
          if (key===curRoot) ++score;
          else showAns(curRoot)
        } else {
          if (key===keyNames[curPos%12]) {
            ++score
          }
          else {
            score = 0
            showAns(keyNames[curPos%12])
          }
        }
        drawScore(score)
        curNum++
      }
      function drawKeys(root) {
        var offset = keyNames.indexOf(root),
          numNotes = 7,
          isSharp = root.charAt(1)==='#'
        if (isSharp) {
          offset -= 1
          numNotes++
        } else if (root!=='C'&& keyNames[keyNames.indexOf(root)-1].charAt(1)==='#')
          numNotes++
        if (window.innerWidth>700) {
          numNotes = ((window.innerWidth /700 | 0)+1)*7
          offset = 0
        }
        var keyHeight = window.innerHeight/1.8
        var keyWidth = window.innerWidth / numNotes + 1

        for (var i = offset,j=0; j < numNotes; i++,j++) {
          var keyContainer = new createjs.Container()
          var key = new createjs.Shape()
          keyContainer.x = j*(keyWidth-1)
          keyContainer.y = window.innerHeight-keyHeight
          //textHeight = keyHeight/4
          var textHeight
          if (window.innerWidth<700) {
            textHeight = window.innerWidth/15
          } else {
            textHeight = window.innerWidth/17
          }
          key.graphics.beginFill('#FFF').beginStroke('#555').drawRect(0,0,keyWidth,keyHeight)
          key.on('click',clicked.bind(null,keyNames[i%12]))
          keyContainer.addChild(key)
          var keyTxt = new createjs.Text(keyNames[i%keyNames.length], textHeight+'px Arial', '#555')
          keyTxt.regX = -keyWidth>>1
          keyTxt.regY = -keyHeight + keyHeight/8 + keyHeight/20
          keyTxt.textAlign = 'center'
          keyTxt.textBaseline = 'middle'
          keyContainer.addChild(keyTxt)
          if (keyNames[(i-1)%12]&&keyNames[(i-1)%12].charAt(1)==='#') {
            var blackKey = new createjs.Shape()
            blackKey.graphics.beginFill('#555').drawRect(0,0,keyWidth-keyWidth/5,keyHeight/1.8)
            blackKey.regX = (keyWidth-keyWidth/5)>>1
            blackKey.on('click',clicked.bind(null,keyNames[(i-1)%12]))
            keyContainer.addChild(blackKey)
          }
          if ((j+1)===numNotes&&keyNames[(i+1)%12]&&keyNames[(i+1)%12].charAt(1)==='#') {
            var blackKey = new createjs.Shape()
            blackKey.graphics.beginFill('#555').drawRect(0,0,keyWidth-keyWidth/5,keyHeight/1.8)
            blackKey.regX = (-keyWidth-keyWidth/5)>>1
            blackKey.on('click',clicked.bind(null,keyNames[(i-1)%12]))
            keyContainer.addChild(blackKey)
          }
          if (keyNames[(i+1)%12]&&keyNames[(i+1)%12].charAt(1)==='#') i++
          keys.push(keyContainer)
        }
        keys.forEach(function(cur){stage.addChild(cur)})
      }
      function getRandomScale() {
      var myScales = Object.keys(scales)
        return myScales[Math.random() * myScales.length|0]
      }
      function getRandomRoot() {
        return keyNames[Math.random()*12|0]
      }
      function displayChallenge() {
        challengeTxt = new createjs.Text(curRoot+' '+curScale,
          Math.min(window.innerWidth/18,100)+'px Arial','#555')
        challengeTxt.x = window.innerWidth>>1
        challengeTxt.y = window.innerHeight/10
        challengeTxt.textAlign = 'center'
        stage.addChild(challengeTxt)
      }
      function drawHome() {
        var homeButton = new createjs.Shape()
        homeButton.graphics.beginFill('#555').drawRect(0,0,20,20)
        homeButton.x = window.innerWidth - 30
        homeButton.y = (window.innerHeight>>1) - 50
        homeButton.on('click',hideGame)
        stage.addChild(homeButton)
      }
      curScale = getRandomScale(),
      curRoot = getRandomRoot()
      drawKeys(curRoot)
      displayChallenge()
      drawHome()
      stage.update()
      window.onkeypress = function(evt) {
        if (evt.which>='a'.charCodeAt(0) &&evt.which<='g'.charCodeAt(0))
          clicked(String.fromCharCode(evt.which).toUpperCase())
        else if (evt.which>='A'.charCodeAt(0) &&evt.which<='G'.charCodeAt(0)) {
          var char = String.fromCharCode(evt.which)
          if (char!=='B'&&char!=='E')
            clicked(char+'#')
        }

      }
      window.onresize = function() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        stage.removeAllChildren()
        keys = []
        drawKeys(curRoot)
        displayChallenge()
        drawHome()
        stage.update()
      }
      function drawScore(val) {
        if (score>(localStorage['scales'] | 0)) {
          localStorage['scales'] = score
        }
        stage.removeChild(scoreEl)
        scoreEl = new createjs.Text(val,window.innerWidth/17+'px Arial','#555')
        scoreEl.x = window.innerWidth-60
        scoreEl.y = 7
        stage.addChild(scoreEl)
        stage.update()
      }
    }
    function hideGame() {
      $('#gameStage').html('')
      $scope.$apply($scope.showMenu = true)
      $('.container').css({'margin-top':'70px','padding':'0 15px'})
    }
    $scope.showMenu=true
    $scope.highScore = localStorage['scales'] | 0


}])
