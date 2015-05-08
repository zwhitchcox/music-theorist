'use strict'

app.controller('NNCtrl', ['$scope',
  function($scope) {
    $scope.startGame = function(difficulty) {
      $scope.showMenu = false
      $('#gameStage').html('<canvas id="canvas"></canvas>')
      var canvas = document.getElementById('canvas'),
        startcx,
        startcy,
        stage = new createjs.Stage(canvas),
        notes = {
  				B1:     	61.74,
  				C2:     	65.41,
  				C2sharp: 	69.30,
  				D2:     	73.42,
  				D2sharp: 	77.78,
  				E2:     	82.41,
  				F2:     	87.31,
  				F2sharp: 	92.50,
  				G2:     	98.00,
  				G2sharp: 	103.83,
  				A2:     	110.00,
  				A2sharp: 	116.54,
  				B2:     	123.47,
  				C3:     	130.81,
  				C3sharp: 	138.59,
  				D3:     	146.83,
  				D3sharp: 	155.56,
  				E3:     	164.81,
  				F3:     	174.61,
  				F3sharp: 	185.00,
  				G3:     	196.00,
  				G3sharp: 	207.65,
  				A3:     	220.00,
  				A3sharp: 	233.08,
  				B3:     	246.94,
  				C4:     	261.63,
  				C4sharp: 	277.18,
  				D4:     	293.66,
  				D4sharp: 	311.13,
  				E4:     	329.63,
  				F4:     	349.23,
  				F4sharp: 	369.99,
  				G4:     	392.00,
  				G4sharp: 	415.30,
  				A4:     	440.00,
  				A4sharp: 	466.16,
  				B4:     	493.88,
  				C5:     	523.25,
  				C5sharp: 	554.37,
  				D5:     	587.33,
  				D5sharp: 	622.25,
  				E5:     	659.25,
  				F5:     	698.46,
  				F5sharp: 	739.99,
  				G5:     	783.99,
  				G5sharp: 	830.61,
  				A5:     	880.00,
  				A5sharp: 	932.33,
  				B5:     	987.77,
  				C6:     	1046.50,
  				C6sharp: 	1108.73,
  				D6:     	1174.66
        },
        sharps = [],
        naturals = Object.keys(notes).reduce(function(prev,cur){
          if (cur.length < 3) prev.push(cur)
          else sharps.push(cur)
          return prev
        },[]),
        mid,
        lineHeight,
        curNote,
        btns = {},
        removeNotes = [],
        noteTimeout,
        score
      $('.container').css({padding:0,margin:0})
      createjs.Touch.enable(stage)
      stage.enableMouseOver(10)
      var container = stage.addChild(new createjs.Container())

      function drawBg() {
        startcx = window.innerWidth
        startcy = window.innerHeight
        mid = (startcy >> 1) - 50
        lineHeight = startcy / 25 | 0
        canvas.width=startcx
        canvas.height=startcy
        function drawLines() {
          for (var i = 1 ; i < 6; i++) {
            container.addChild(drawLine(mid+lineHeight*i+lineHeight))
            container.addChild(drawLine(mid-lineHeight*i-lineHeight))
          }
          function drawLine(liney) {
            return new createjs.Shape(new createjs.Graphics().
              beginStroke('#000').moveTo(0,liney).
              lineTo(startcx,liney).endStroke())
          }
        }

        drawLines()
      }
      function drawRandomNote() {
        noteTimeout = setTimeout(function(){
          clicked('')
          drawScore(0)
        },3000)
        console.log(naturals.length)
        var noteIdx
        if (difficulty==='bass') {
          noteIdx = Math.random()*(15)|0
        } else if (difficulty==='treble') {
          noteIdx = (Math.random()*(15)|0) + 15
        } else {
          noteIdx = Math.random()*(naturals.length-1)|0
        }
        return drawNote(naturals[noteIdx])
      }
      createjs.Ticker.addEventListener("tick", stage)
      function drawNote (note,label) {
        try {
          container.removeChild(randNote[0])
          container.removeChild(randNote[1])
        } catch (e) {}
        var idx = naturals.indexOf(note),
          noteX = (window.innerWidth>>1) - (lineHeight>>1),
          noteY = mid + (14- idx)*.5*lineHeight,
          s = new createjs.Shape();
    		s.graphics.f('000').dc(0, 0, lineHeight>>1);
    		s.x = noteX
        if (idx>15) {noteY-= lineHeight*0.5}
        else if (idx < 15) {noteY+=lineHeight*1.5}
        else {noteY+=lineHeight*.5}
        s.lines = []
        if (idx>=27) {
          var noteLineY = mid + (14- 28)*.5*lineHeight
          s.lines.push(new createjs.Shape(new createjs.Graphics().
            beginStroke('#000').moveTo(noteX-30,noteLineY).
            lineTo(noteX+30,noteLineY).endStroke()))
        }
        if (idx>=29) {
          var noteLineY = mid + (14- 30)*.5*lineHeight
          s.lines.push(new createjs.Shape(new createjs.Graphics().
            beginStroke('#000').moveTo(noteX-30,noteLineY).
            lineTo(noteX+30,noteLineY).endStroke()))


        }
        if (idx<=1){
          var noteLineY = mid + (8)*lineHeight
          s.lines.push(new createjs.Shape(new createjs.Graphics().
            beginStroke('#000').moveTo(noteX-30,noteLineY).
            lineTo(noteX+30,noteLineY).endStroke()))
        }
        if (idx<=3){
          var noteLineY = mid + (7)*lineHeight
          s.lines.push(new createjs.Shape(new createjs.Graphics().
            beginStroke('#000').moveTo(noteX-25,noteLineY).
            lineTo(noteX+25,noteLineY).endStroke()))
        }
        if (idx === 15) {
          var noteLineY = mid
          s.lines.push(new createjs.Shape(new createjs.Graphics().
            beginStroke('#000').moveTo(noteX-25,noteLineY).
            lineTo(noteX+25,noteLineY).endStroke()))
        }
        s.lines.forEach(function(cur) {
          container.addChild(cur)
        })
        s.y = noteY
        container.addChild(s)
        if (label) {
          var text = new createjs.Text(note.charAt(0),
            lineHeight*1.5+"px Arial", "#000")
  		    text.textAlign = "top"
          text.x = (window.innerWidth>>1) + lineHeight*.5
          text.y = noteY - lineHeight*.75
          container.addChild(text)
        }
        return [s,note,text]
      }

      function drawButtons() {
        var btnNames = ['A','B','C','D','E','F','G'],
          btnW = startcx/4,
          btnH = startcy/12
        for (var i = 0; i <= btnNames.length; i++) {

          var n = btnNames[i],
            btnX = btnW*(i % 4),
            btnY = (startcy- startcy/6) + startcy/12*(i/4|0)
          btns[n] = new createjs.Shape()
          btns[n].graphics.setStrokeStyle(1).beginStroke('#666').beginFill('#FFF').drawRect(0, 0, btnW, btnH).endStroke()
          btns[n].x = btnX
          btns[n].y = btnY
          container.addChild(btns[n])
          if (i === btnNames.length) {
            var sqLW = btnH / 2
            btns[n].text = new createjs.Shape()
            btns[n].text.graphics.beginFill('#666').drawRect(btnX+(btnW>>1)-(sqLW>>1),
              btnY+(btnH>>1)-(sqLW>>1),sqLW,sqLW)
            btns[n].on('click',hideGame)
            container.addChild(btns[n].text)
          } else {
            btns[n].text = new createjs.Text(n, btnH-3+"px Arial", '#666')
            btns[n].text.lineWidth = btnW
            btns[n].text.textBaseline = "middle"
            btns[n].text.textAlign = "center"
            btns[n].text.x = btnX+(btnW>>1)
            btns[n].text.y = btnY+(btnH>>1)
            container.addChild(btns[n].text)
            btns[n].on('click',clicked.bind(null,n))
          }

        }
      }
      function drawScore(val) {
        if (score!==undefined) {
          container.removeChild(score[0])
        }
        score = [new createjs.Text(val,window.innerHeight/20+'px Arial','#000'),val]
        score[0].x = window.innerWidth-50
        score[0].y = 7
        container.addChild(score[0])
      }
      function clicked(n) {
        clearTimeout(noteTimeout)
        removeNotes.forEach(function(cur){
          container.removeChild(cur)
        })
        curNote[0].lines.forEach(function(cur){
          container.removeChild(cur)
        })
        container.removeChild(curNote[0])
        if (curNote[1].charAt(0) === n) {
          curNote = drawRandomNote()
          drawScore(++score[1])
          if (score[1] > (localStorage['note-names']|0)) {
            localStorage['note-names'] = score[1]
            $scope.$apply($scope.highScore = score[1])
          }
        } else {
          drawScore(0)
          curNote = drawNote(curNote[1],true)
          removeNotes.push(curNote[2])
          setTimeout(function(){
            curNote[0].lines.forEach(function(cur){
              container.removeChild(cur)
            })
            container.removeChild(curNote[0])
            container.removeChild(curNote[2])
            curNote = drawRandomNote()
          },1000)
        }
      }
      window.onkeydown = function(evt) {
        if (evt.which >= 'a'.charCodeAt(0) || evt.which <='g'.charCodeAt(0)) {
          clicked(String.fromCharCode(evt.which).toUpperCase())
        }
      }
      drawBg()
      drawButtons()
      curNote = drawRandomNote()
      drawScore(0)
      window.onresize = scale
      function scale () {
        // canvas.width=window.innerWidth
        // canvas.height=window.innerHeight
        // var scalex = canvas.width  / startcx
        // var scaley = canvas.height / startcy
        // container.setTransform(0,0,scalex,scaley)
        stage.removeAllChildren()
        container = stage.addChild(new createjs.Container())
        drawBg()
        drawButtons()
        curNote = drawNote(curNote[1])
      }
    }
    function hideGame() {
      $('#gameStage').html('')
      $scope.$apply($scope.showMenu = true)
      $('.container').css({'margin-top':'70px','padding':'0 15px'})
    }
    $scope.showMenu=true
    $scope.highScore = localStorage['note-names'] | 0

}])
