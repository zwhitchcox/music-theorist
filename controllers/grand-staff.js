'use strict'

app.controller('GSCtrl', ['$scope',
  function($scope) {
    var canvas = document.getElementById('canvas'),
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
				D6:     	1174.66,
      },
      sharps = [],
      naturals = Object.keys(notes).reduce(function(prev,cur){
        if (cur.length < 3) prev.push(cur)
        else sharps.push(cur)
        return prev
      },[])
    createjs.Touch.enable(stage)
    stage.enableMouseOver(10)
    var container = stage.addChild(new createjs.Container()).set({name: "container"});
    var blue = container.addChild(new createjs.Shape()).set({name: "blue", x: 50, y: 100});
		blue.graphics.beginFill("#00F").drawRect(0, 0, 200, 200);
    var lines = []
    function drawBg() {
      lines.forEach(function(line) {stage.removeChild(line)})
      stage.clear()
      $('.container').css({padding:0,margin:0})
      scalex = window.innerWidth,
      scaley = window.innerHeight,
      sizes.lineHeight = scaley / 25
      mid = (scaley >> 1) - 50
      canvas.width=scalex
      canvas.height=scaley
      function drawLines() {
        lines[0] = drawLine(mid)
        for (var i = 1 ; i < 6; i++) {
          lines [i] = drawLine(mid+sizes.lineHeight*i+sizes.lineHeight)
          lines[i+5] = drawLine(mid-sizes.lineHeight*i-sizes.lineHeight)
        }
        function drawLine(liney) {
          return stage.addChild(new createjs.Shape(new createjs.Graphics().
            beginStroke('gray').moveTo(0,liney).
            lineTo(scalex,liney).endStroke()))
        }
      }
      drawLines()
    }
    // document.onclick = drawNote.bind(null,'C4')
    createjs.Ticker.addEventListener("tick", stage)
    // function drawNote (note) {
    //   var note = stage.addChild(new createjs.Shape(new createjs.
    //     naturals.indexOf(note)
    // }
    drawBg()
    window.onresize = drawBg
}])
