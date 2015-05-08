'use strict'

app.controller('SFCtrl', ['$scope',
  function($scope) {
    $('.navbar').hide()
    $('.container').css({margin:'0',padding:'0'})
    $('[ng-view]').css('height',window.innerHeight)
    $('.container').css({'margin-top':'70px','padding':'0 15px'})
    $scope.showMenu = true
    $scope.highScore = parseInt(localStorage['scale-formulas']) | 0
    $scope.startGame = function() {
      $scope.showMenu = false
      $('#gameStage').html('<canvas id="canvas"></canvas>')
      var canvas = document.getElementById('canvas'),
        stage = new createjs.Stage(canvas),
        scales = {
          'Ionian (Major)':           '2212221',
          'Dorian':                   '2122212',
          'Phrygian':                 '1222122',
          'Lydian':                   '2221221',
          'Mixolydian':               '2212212',
          'Aeolian':                  '2122122',
          'Locrian':                  '1221222',
          'Melodic Minor':            '2122221',
          'Major 7#4#5':              '2222121',
          'Lydian Dominant':          '2221212',
          'Minor 7b5':                '21221222',
          'Super Locrian':            '1212222',
          'Harmonic Minor':           '2122131',
          'Phrygian Dominant':        '1312122',
          '8-note Diminished':        '21212121',
          '8-note Dominant':          '12121212',
          'Whole Tone':               '222222',
          'Major Pentatonic':         '22323',
          'Major "Blues" Pentatonic': '211323',
          'Minor Pentatonic':         '32232',
          'Blues Scale':              '321132',
          'Minor 6th Pentatonic':     '32223',
          'b5 Pentatonic':            '32142'
        },
        ans,
        curScale = getRandomScale(),
        curPos = 0,
        scaleEl,
        score = 0,
        scoreEl,
        clickTimeout
      $('.navbar').hide()
      $('.container').css({margin:0,padding:0})
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      function drawBtns() {
        var btnW = window.innerWidth>>1,
          btnH = window.innerHeight>>2
        for (var i = 1; i <= 4; i++) {
          var btnContainer = new createjs.Container(),
            btn = new createjs.Shape(),
            btnTxt = new createjs.Text(i,
              window.innerWidth/16+'px Arial','#555')
          btn.graphics.beginStroke('#555').beginFill('#FFF')
            .drawRect(0,0,btnW,btnH)
          btn.on('click',clicked.bind(null,i))
          btnContainer.x = ((i-1)%2)*btnW
          btnContainer.y = (window.innerHeight>>1)+ (((i-1)/2)|0)*btnH
          btnContainer.addChild(btn)
          btnTxt.regX = -btnW>>1
          btnTxt.regY = -btnH>>1
          btnTxt.textAlign = "center"
          btnTxt.textBaseline = "middle"
          btnContainer.addChild(btnTxt)
          stage.addChild(btnContainer)
        }
      }
      function getRandomScale() {
        var myScales = Object.keys(scales)
        return myScales[Math.random() * myScales.length|0]
      }
      function clicked(val) {
        clearTimeout(clickTimeout)
        clickTimeout = setTimeout(clicked.bind(''),1500)
        if (curPos === scales[curScale].length) {
          curPos = 0
          curScale = getRandomScale()
          drawScaleName()
          stage.removeChild(ans)
          stage.update()
          return
        }
        stage.removeChild(ans)
        if (parseInt(scales[curScale].charAt(curPos))===val) {
          score++
          if (score > $scope.highScore)
            $scope.$apply($scope.highScore = score)
            localStorage['scale-formulas'] = score
          drawScore()
        } else {
          score = 0
          drawScore()
        }
        curPos++
        drawAns()
      }
      function drawScaleName() {
        stage.removeChild(scaleEl)
        scaleEl = new createjs.Text(curScale,Math.min(window.innerHeight/9,window.innerWidth/14)+'px Arial', '#555')
        scaleEl.x = window.innerWidth >> 1
        scaleEl.y = (window.innerHeight >> 2) - window.innerHeight/20
        scaleEl.textAlign = 'center'
        scaleEl.textBaseline = 'middle'
        stage.addChild(scaleEl)
      }
      function drawScore() {
        stage.removeChild(scoreEl)
        scoreEl = new createjs.Text(score,Math.min(window.innerHeight/10,window.innerWidth/17)+'px Arial', '#555')
        scoreEl.x = window.innerWidth - (window.innerWidth/8)
        scoreEl.y = 7
        stage.addChild(scoreEl)
        stage.update()
      }
      function drawAns() {
        ans = new createjs.Text(scales[curScale].substr(0,curPos),
          Math.min(window.innerHeight/6,60)+'px Arial', '#555')
        ans.textAlign = 'center'
        ans.textBaseline = 'middle'
        ans.x = window.innerWidth  >> 1
        ans.y = (window.innerHeight >> 1)-window.innerHeight/9
        stage.addChild(ans)
        stage.update()
      }
      function drawStopButton() {
        var stopBtn = new createjs.Shape()
        var btnS = Math.min(window.innerWidth/15,window.innerHeight/15)
        stopBtn.graphics.beginFill('#555').drawRect(window.innerWidth-btnS-5,
          (window.innerHeight>>1)-btnS-5,btnS,btnS)
        stopBtn.on('click',hideGame)
        stage.addChild(stopBtn)
      }
      drawScore()
      drawBtns()
      drawScaleName()
      drawStopButton()
      stage.update()
      window.onresize = function() {
        stage.removeAllChildren()
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        drawScore()
        drawBtns()
        drawScaleName()
        drawAns()
        drawStopButton()
        stage.update()
      }
    }

    function hideGame() {
      $('#gameStage').html('')
      $scope.$apply($scope.showMenu = true)
      $('.container').css({'margin-top':'70px','padding':'0 15px'})
    }


}])
