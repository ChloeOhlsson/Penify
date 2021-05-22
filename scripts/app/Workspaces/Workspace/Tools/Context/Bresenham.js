CanvasRenderingContext2D.prototype.bresenham = function(x1,y1,x2,y2, point) {
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0; //no float values!
    
    let dx = x2 - x1, dy = y2 - y1; //find delta x,y
    
    let sx = (dx > 0) - (dx < 0), sy = (dy > 0) - (dy < 0); //sign of delta values +1 or 0 or -1
    
    dx *= sx; dy *= sy; //convert dx,dy to abs values use the multiple with sign

    point(x1, y1); //start point draw always

    if( !(dx || dy) )return;    //if no any delta dx or dy stop
    
    let d = 0, x = x1, y = y1, v;
    
    if(dy < dx) { //if abs delta Y less then abs delta X - iterate by X += sign of delta X (+1 or -1)
      for(v = 0 | (dy << 15) / dx * sy; x ^ x2; x += sx, d &= 32767) //v is Tan() = y/x scaled by * 32768 (sub grid step) 
        point(x, y += (d += v) >> 15); //d accumulate += grid step, so Y take +1px for each 32768 steps.
    }
    else { //else if abs delta X less then abs delta Y - iterate by Y += sign of delta Y (+1 or -1)
      for(v = 0 | (dx << 15) / dy * sx; y ^ y2; y += sy, d &= 32767) //v is Ctn() = x/y scaled by * 32768 (sub grid step)
        point(x += (d += v) >> 15, y); // d &= 32767 is accumulator partial emptyer
    }
};

CanvasRenderingContext2D.prototype.bresenhamLine = function(x1,y1,x2,y2) {
  const lineRadius = Math.floor(this.lineWidth / 2);

    this.bresenham(x1,y1,x2,y2, (left, top) => {
        this.fillRect(left - lineRadius, top - lineRadius, this.lineWidth, this.lineWidth);
    });
};
