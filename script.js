(function(w){
  //some const
  var v_eff = 2;
  var _2phi = 2*Math.PI;
  //end of const
  var d = w.getElementById;
  function make_color(r,g,b,o=1.0){
    return 'rgba('+r+', '+g+', '+b+', '+o+')';
  }
  function random_range(min, max){
    return Math.floor((Math.random()*(max-min))+min);
  }
  function makeClickEffect(x, y, maxSize, color){
    if(!color)
      color = [0,0,0];
    var _obj = {
      x: x,
      y: y,
      size: 0,
      maxSize: maxSize,
      color: color,
      render: function(ctx){
        if(this.size < this.maxSize){
          var _op_now = (this.maxSize-this.size)/this.maxSize;
          ctx.strokeStyle = make_color(this.color[0],this.color[1],this.color[2], _op_now);
          ctx.lineWidth= 3;
          ctx.beginPath();
          ctx.arc(this.x,this.y,this.size,0,_2phi);
          ctx.stroke();
          this.size += v_eff;
          return true;
        }else{
          return false;
        }
      }
    };

    return _obj;
  }

  var _stock_colors = w.interpolateColors("rgb(95, 205, 255)", "rgb(175, 42, 239)", 10);

  w.hiasan = {
    init: function(ele){
      this.ele = document.getElementById(ele);
      this.ctx = this.ele.getContext('2d');
      this._eff = [];

      this.updateSize();
      this.playing = true;
      this.render();
    },
    updateSize: function(){
      var _pn = this.ele.parentNode;
      if(!_pn)
        return console.error('Must have parent node!!');
      this.width = _pn.clientWidth;
      this.height = _pn.clientHeight;
      this.ele.width = _pn.clientWidth;
      this.ele.height = _pn.clientHeight;
      //calculate more stuff
      console.log('size updated');
    },
    render: function(){
      if(this.playing)
        w.requestAnimationFrame(function(){
          w.hiasan.render();
        });
      //doing something here
      this.ctx.clearRect(0,0,this.width, this.height);
      var ctx = this.ctx;
      this._eff = this._eff.filter(function(e){return e.render(ctx)});
    },
    togglePlay: function(playing){
      if(playing)
        this.playing = playing;
      else
        this.playing = !this.playing;
      if(this.playing === true)
        render();
    },
    addEffect: function(x, y, size = 100){
      var color = _stock_colors[random_range(0,_stock_colors.length)];
      this._eff.push(makeClickEffect(x, y, size, color));
    }
  };

  w.hiasan.init('hiasan');
  w.addEventListener('resize', function(){
    w.hiasan.updateSize();
  });

  w.hiasan.ele.addEventListener('click', function(e){
    w.hiasan.addEffect(e.clientX, e.clientY);
  });

  w.setInterval(function(){
    //only add effect if window has focus
    if(w.document.hasFocus())
      w.hiasan.addEffect(random_range(0,w.hiasan.width), random_range(0, w.hiasan.height), random_range(100, 500));
  }, 1000);

})(window);