var $S, $Sa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, e) {
  b != Array.prototype && b != Object.prototype && (b[c] = e.value)
 },
 $Sb = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

function $Sc(b) {
 if (b) {
  for (var c = $Sb, e = ["Array", "prototype", "copyWithin"], d = 0; d < e.length - 1; d++) {
   var f = e[d];
   f in c || (c[f] = {});
   c = c[f]
  }
  e = e[e.length - 1];
  d = c[e];
  b = b(d);
  b != d && null != b && $Sa(c, e, {
   configurable: !0,
   writable: !0,
   value: b
  })
 }
}
$Sc(function(b) {
 return b ? b : function(b, e, d) {
  var c = this.length;
  b = Number(b);
  e = Number(e);
  d = Number(null != d ? d : c);
  if (b < e)
   for (d = Math.min(d, c); e < d;) e in this ? this[b++] = this[e++] : (delete this[b++], e++);
  else
   for (d = Math.min(d, c + e - b), b += d - e; d > e;) --d in this ? this[--b] = this[d] : delete this[b];
  return this
 }
});

function $Sd(b) {
 if (null == b || "object" != typeof b) return b;
 if (b instanceof Date) {
  var c = new Date;
  c.setTime(b.getTime());
  return c
 }
 if (b instanceof Array) {
  c = [];
  for (var e = 0, d = b.length; e < d; e++) c[e] = $Sd(b[e]);
  return c
 }
 if (b instanceof Object) {
  c = {};
  for (e in b) b.hasOwnProperty(e) && (c[e] = $Sd(b[e]));
  return c
 }
 throw Error("Unable to copy obj! type not supported.");
}

function $Se(b, c) {
 return c in b && "function" === typeof b[c] ? !0 : !1
}

function $Sf() {
 this.g = -1;
 this.f = null;
 this.host = "";
 this.port = 0;
 this.url = "";
 this.l = null;
 this.stopped = this.closed = this.m = 0;
 this.i = 10;
 this.j = 60;
 this.b = this.i
}

function $Sg(b) {
 if (NaN == this.o || void 0 == this.o) this.o = {};
 return this.o[b]
}

function $Sh(b) {
 if (NaN == this.o || void 0 == this.o) this.o = {};
 this.o[b.f] = b
}
$S = $Sf.prototype;
$S.start = function() {
 this.stopped = 0;
 this.b = this.i;
 $Si(this)
};
$S.stop = function() {
 $Sj(this);
 this.stopped = 1;
 this.disconnect()
};

function $Sk(b, c) {
 $Sj(b);
 b.g = setTimeout(function() {
  $Si(b)
 }, c)
}

function $Sj(b) {
 -1 != b.g && clearInterval(b.g);
 b.g = -1
}
$S.send = function(b) {
 this.f.send(b)
};
$S.D = function(b) {
 null != this.l && this.l.D(b)
};
$S.B = function() {
 this.m = 1;
 $Sj(this);
 this.b = this.i;
 null != this.l && this.l.B()
};
$S.A = function() {
 if (!this.closed) {
  $Sj(this);
  this.closed = 1;
  this.f = null;
  var b = 1;
  null != this.l && (b = this.l.A());
  b && !this.stopped && (b = 1E3 * (5 + this.b * Math.random()), this.b += 5, this.b > this.j && (this.b = this.j), $Sk(this, b))
 }
};

function $Si(b) {
 if (!b.stopped)
  if ($Sj(b), 1 === (null != b.f ? b.f.readyState : 0)) b.f.onopen = function() {
   $Sg(this).B()
  };
  else try {
   b.closed = 0, b.m = 0, null != b.l && $Sl(b.l, 6, 0), b.f = new WebSocket(b.url), $Sh(b), b.f.binaryType = "arraybuffer", b.f.onopen = function() {
    $Sg(this).B()
   }, b.f.onmessage = function(b) {
    $Sg(this).D(b)
   }, b.f.onclose = function() {
    $Sg(this).A()
   }, b.f.onerror = function() {
    $Sg(this).A()
   }
  } catch (c) {}
}
$S.disconnect = function() {
 $Sj(this);
 null != this.f && (this.f.onclose = function() {}, this.f.onerror = function() {}, this.f.close(1E3), this.f = null)
};
ArrayBuffer.b || (ArrayBuffer.b = function(b, c) {
 if (!(b instanceof ArrayBuffer)) throw new TypeError("Source must be an instance of ArrayBuffer");
 if (c <= b.byteLength) return b.slice(0, c);
 b = new Uint8Array(b);
 c = new Uint8Array(new ArrayBuffer(c));
 c.set(b);
 return c.buffer
});

function $Sm(b, c) {
 var e = 0;
 for (--c; 0 <= c; c--) e = 256 * e + b[0 + c];
 return e
}

function $Sn(b, c) {
 for (var e = 0, d = 0; 4 > d; d++) c[e++] = b & 255, b >>>= 8
}

function $So(b, c, e, d) {
 for (var f = 0; f < c; f++) e[d++] = b[f + 0] & 255
}

function $Sp(b, c, e, d) {
 for (var f = 0; f < c; f++) e[d++] = b.charCodeAt(f + 0)
}

function $Sq(b, c) {
 for (var e = "", d = 0; d < 0 + c; d++) e += String.fromCharCode(parseInt(b[d], 10));
 return e
}

function $Sr() {
 this.data = []
}
$Sr.prototype.add = function(b) {
 this.data.push(b)
};
$Sr.prototype.first = function() {
 return 0 == this.data.length ? null : this.data.shift()
};

function $Ss(b) {
 this.mode = 0 == b ? 0 : 1;
 this.g = this.start = this.b = this.h = 0;
 this.id = this.result = this.op = -1;
 this.S = this.R = 0;
 this.items = this.P = null;
 this.buffer = new Uint8Array(32);
 0 == this.mode && (this.h = 8)
}

function $St(b, c) {
 b.id = c;
 c = 4;
 b.buffer[c++] = b.id & 255;
 b.buffer[c++] = b.id >> 8 & 255;
 b.buffer[c++] = b.id >> 16 & 255;
 b.buffer[c++] = b.id >> 24 & 255
}

function $Su(b) {
 var c = 0;
 b.op = b.buffer[c++];
 b.result = b.buffer[c++];
 c++;
 c++;
 b.id = b.buffer[c] + 256 * b.buffer[c + 1] + 65536 * b.buffer[c + 2] + 16777216 * b.buffer[c + 3];
 b.b = c + 4
}

function $Sv(b, c) {
 var e = c + b.h;
 if (!(b.buffer.byteLength > e)) {
  if (0 < b.b && (b.buffer.copyWithin(0, b.b, b.h - b.b), b.h -= b.b, b.b = 0, e = c + b.h, b.buffer.byteLength > e)) return;
  c = e - b.buffer.byteLength;
  64 > c && (c = 64);
  c = new Uint8Array(b.buffer.byteLength + c);
  c.set(b.buffer);
  b.buffer = c
 }
}

function $Sw(b, c, e) {
 0 == e && (e = c.length);
 $Sv(b, e);
 b.buffer.set(new Uint8Array(c), b.h);
 b.h += e
}

function $Sx(b, c) {
 0 == c && 0 == b.b && $Su(b);
 b.g = 0;
 b.items = [];
 for (b.map = {}; $Sy(b) && 0 == b.g;);
 return 1 != b.mode || 0 == b.g ? null : b.items
}

function $Sz(b, c, e, d, f) {
 if (!(0 != b.mode || 2047 < c)) {
  $Sv(b, d + 8);
  $SA == c && (b.g = 1);
  0 < f && e && 0 < d && (d = 256 > e ? 1 : 65536 > e ? 2 : 16777216 > e ? 3 : 4294967296 > e ? 4 : 1099511627776 > e ? 5 : 281474976710656 > e ? 6 : 72057594037927936 > e ? 7 : 8);
  var g = 0;
  16777215 < d ? g = 4 : 65535 < d ? g = 3 : 255 < d ? g = 2 : 0 < d && (g = 1);
  var h = 1,
   l = c & 31,
   k = 0;
  31 < c || 2 < g ? (h = 2, l |= 224) : 5 > d ? (g = 0, k = d) : k = g + 4;
  b.buffer[b.h++] = l | k << 5;
  1 < h && (b.buffer[b.h++] = c >> 5 | g - 1 << 6);
  g && $SB(b, d, g);
  if (f) $SB(b, e, d);
  else
   for (c = d, d = 0; d < c; d++) b.buffer[b.h++] = e[d + 0] & 255
 }
}

function $SB(b, c, e) {
 for (var d = 0; d < e; d++) b.buffer[b.h++] = c & 255, c /= 256
}

function $SC(b, c, e) {
 for (var d = 0; e--;) d *= 256, d += b.buffer[c + e] & 255;
 return d
}

function $SD(b, c, e, d) {
 $SE == c ? b.R = e : $SF == c && (b.S = e);
 $Sz(b, c, e, d, 1)
}

function $SG(b, c, e, d) {
 $SH == c && (b.P = e);
 if ("[object String]" === Object.prototype.toString.call(e)) {
  for (var f = e.length, g = new Uint8Array(f), h = 0; h < f; h++) g[h] = e.charCodeAt(h);
  e = g
 } else e = Uint8Array.from(e);
 if (0 == d || void 0 == d) d = e.byteLength;
 $Sz(b, c, e, d, 0)
}

function $Sy(b) {
 var c = {},
  e = b.buffer[b.b],
  d = e >> 5,
  f = 0;
 e &= 31;
 var g = d,
  h = 1;
 if ($SI == e && 0 < b.items.length) return b.g = 1, !0;
 5 == d || 6 == d ? f = d - 4 : 7 == d && (d = b.buffer[b.b + 1], f = (d >> 6) + 1, e |= (d & 63) << 5, h = 2);
 if (b.h < b.b + h + f) return !1;
 c.type = e;
 f && (g = $SC(b, b.b + h, f));
 if (b.h < b.b + h + f + g) return !1;
 c.len = g;
 c.val = 0;
 d = h + f + b.b;
 c.data = b.buffer.slice(d, d + g);
 4 >= g && (c.val = $SC(b, b.b + h + f, g));
 b.items.push(c);
 b.map[e] = c;
 b.b += h + f + g;
 b.b == b.h && (b.g = 1, b.h = 0, b.b = 0);
 return !0
}
var $SI = 1,
 $SA = 2,
 $SF = 3,
 $SH = 4,
 $SE = 6;

function $SJ(b) {
 if (!b.C)
  if (b.g) b.send(b.g);
  else {
   var c = b.I.first();
   if (null != c) {
    b.M = [];
    var e = new $Ss(0);
    c.id && b.M.push(c.id);
    e.op = 2;
    e.result = 1;
    e.id = 0;
    var d = parseInt(c.fid, 10) & 65535;
    $SD(e, 17, d, 2);
    $SD(e, $SI, 0, 0);
    d = parseInt(c.id, 10) & 4294967295;
    0 < d && $SD(e, $SF, d, 4);
    d = parseInt(c.channel, 10);
    0 < d && $SD(e, 10, d, 1);
    d = parseInt(c.type, 10);
    0 < d && $SD(e, 11, d, 1);
    d = parseInt(c.flag, 10);
    0 < d && $SD(e, 9, d, 4);
    c.hasOwnProperty("groupid") ? (d = parseInt(c.groupid, 10), 0 < d && $SD(e, $SE, d, 4)) : $SG(e, $SH, c.peer, 0);
    d = parseInt(c.expiry, 10);
    d != b.H && $SD(e, 8, d, 4);
    d = parseInt(c.refid, 10) & 4294967295;
    0 < d && $SD(e, 13, d, 4);
    $SG(e, 7, c.msg, 0);
    b.g = e;
    b.send(b.g)
   }
  }
}
$S = Mesibo.prototype;
$S.V = function(b, c, e) {
 if (!b.hasOwnProperty("peer") && !b.hasOwnProperty("groupid")) return !1;
 b = $Sd(b);
 b.msg = e;
 b.id = c;
 b.fid = this.T++;
 b.hasOwnProperty("expiry") || (b.expiry = this.H);
 b.hasOwnProperty("channel") || (b.channel = 0);
 b.hasOwnProperty("type") || (b.type = 0);
 b.hasOwnProperty("flag") || (b.flag = 3);
 b.hasOwnProperty("refid") || (b.refid = 0);
 this.I.add(b);
 $SJ(this);
 return !0
};

function Mesibo() {
 this.N = this.uid = 0;
 this.token = "";
 this.J = "javascript";
 this.j = this.i = 0;
 this.L = 3E4;
 this.O = 0;
 this.H = 604800;
 this.stopped = this.s = 0;
 this.f = new $Sf;
 this.u = -1;
 this.b = null;
 this.F = {};
 this.v = null;
 this.G = 0;
 this.w = -1;
 this.m = 15E3;
 this.C = 0;
 this.M = this.g = null;
 this.I = new $Sr;
 this.T = parseInt(Math.floor(65535 * Math.random()), 10);
 this.K = -1
}

function $Sl(b, c, e) {
 null != b.b && $Se(b.b, "Mesibo_OnConnectionStatus") && c != b.K && (b.K = c, b.b.Mesibo_OnConnectionStatus(c, e))
}

function $SK(b, c) {
 null != b.b && $Se(b.b, "Mesibo_OnMessageStatus") && b.b.Mesibo_OnMessageStatus(c)
}
$S.X = function(b) {
 if (39 > b.length) return !1;
 this.s = this.uid = 0;
 this.token = b;
 return !0
};
$S.Y = function(b) {
 this.b = b
};
$S.W = function(b) {
 this.J = b
};
$S.start = function() {
 this.stopped = 0;
 var b = this.f;
 b.host = "rtc.voicephp.com";
 b.port = 5443;
 b.url = "wss://rtc.voicephp.com:5443";
 this.f.l = this;
 this.f.start()
};
$S.random = function() {
 return parseInt(Math.floor(4294967295 * Math.random()))
};
$S.B = function() {
 this.j = 0;
 this.U = parseInt(performance.now(), 10);
 if (0 == this.uid) {
  for (var b = this.token, c = b.length, e = new Uint8Array(16), d = 0; 32 > d; d += 2) e[d >> 1] = parseInt(b.substr(d, 2), 16);
  this.cookie = e;
  e = 32 + parseInt(b[11], 16) / 2;
  d = b.substring(e, c);
  var f = 15 - parseInt(d[0], 16);
  this.uid = $SL(d, 1, f) ^ $SL(d, 1 + f, f);
  e += 1 + 2 * f;
  d = b.substring(e, c);
  f = 15 - parseInt(d[0], 16);
  d = b.substring(e + (1 + 2 * f), c);
  this.N = parseInt(d, 16)
 }
 0 == this.uid ? this.s = 1 : (b = new $Ss(0), b.op = 1, b.result = 1, b.id = 1433999274, $SD(b, 3, this.N, 4), $SD(b, 6, 1, 1), this.send(b))
};
$S.A = function() {
 $SM(this);
 $SN(this);
 $Sl(this, 2, 0);
 return this.s || this.stopped ? 0 : 1
};
$S.D = function(b) {
 var c = new $Ss(1);
 $Sw(c, b.data, b.data.byteLength);
 0 == c.b && $Su(c);
 b = c.result;
 switch (b) {
  case 65:
   for (this.i = c.id;;) {
    var e = $Sx(c, 0);
    if (null == e || 0 >= e.length) break;
    var d = {},
     f = 0,
     g = null;
    for (p in e) {
     var h = e[p],
      l = h.val,
      k = h.data,
      m = h.len;
     h = parseInt(h.type, 10);
     if ($SI != h) switch (h) {
      case $SF:
       d.id = $Sm(k, k.byteLength);
       break;
      case 13:
       d.refid = $Sm(k, k.byteLength);
       break;
      case $SE:
       d.groupid = l;
       break;
      case 5:
       f = l;
       break;
      case $SH:
       g = $Sq(k, k.byteLength);
       d.peer = g;
       break;
      case 7:
       d.message = k;
       d.mlen = m;
       break;
      case 16:
       d.ts =
        l;
       break;
      case 9:
       d.flag = l;
       break;
      case 10:
       d.channel = l;
       break;
      case 11:
       d.type = l;
       break;
      case 12:
       d.status = l
     }
    }
    0 < f && null != g ? (this.v = this.F[f] = g, this.G = f) : 0 < f ? (this.F.hasOwnProperty(f) ? this.v = g = this.F[f] : g = this.v, this.G = f, d.peer = g) : d.peer = this.v;
    d.origin = 0;
    if (d.hasOwnProperty("status")) $SK(this, d);
    else if (d.hasOwnProperty("message")) {
     if (256 & parseInt(d.flag) && (e = void 0, f = d, g = new $Ss(1), $Sw(g, d.message, d.mlen), g = $Sx(g, 1), f.message = "", f.mlen = 0, !(null == g || 0 >= g.length)))
      for (e in g) switch (l = g[e], k = l.val, m = l.data, h =
       l.len, parseInt(l.type, 10)) {
       case 1:
        f.title = $Sq(m, m.byteLength - 1);
        break;
       case 3:
        f.launchurl = $Sq(m, m.byteLength - 1);
        break;
       case 6:
        k = $Sm(m, m.byteLength);
        l = (k & 4294967295) / 11930400 - 180;
        k = (k >> 64) / 11930400 - 90;
        f.lat = k;
        f.lon = l;
        break;
       case 16:
        f.filetype = k;
        break;
       case 17:
        f.filesize = k;
        break;
       case 18:
        f.fileflag = k;
        break;
       case 19:
        f.fileurl = $Sq(m, m.byteLength - 1);
        break;
       case 4:
        f.tn = m;
        break;
       case 20:
        f.rrid = $Sm(m, m.byteLength) & 4294967295;
        break;
       case 2:
        f.message = m;
        f.mlen = h;
        break;
       case 21:
        f.presence = k
      }
     if (d.hasOwnProperty("rrid")) d.status =
      3, d.id = d.rrid, d.rrid = 0, $SK(this, d);
     else if (0 == (d.flag & 16)) {
      if (4294967295 > parseInt(d.id) && 0 < parseInt(d.id)) {
       e = this.G;
       for (f = 0; 32 > f; f++) e *= 2;
       d.id = e + parseInt(d.id)
      }
      d.flag & 512 || null == this.b || !$Se(this.b, "Mesibo_OnMessage") || this.b.Mesibo_OnMessage(d, d.message)
     }
    }
   }
   break;
  case 79:
   this.stopped = 1;
   break;
  case 5:
   var n = c;
   $Sx(n, 0);
   $SO(this, this.uid, n.id, this.cookie, n.map[10].data, this.J);
   n = null;
   null != n && this.send(n);
   return
 }
 if (b & 128 && ($SN(this), b & 192)) {
  $Sl(this, 4, 0);
  this.j = 0;
  this.s = 1;
  this.f.stop();
  return
 }
 if (0 == (b &
   64)) {
  $SN(this);
  0 == c.b && $Su(c);
  var p = c.op;
  if (1 == p) {
   if (0 == b) {
    this.m = 5 * (parseInt(performance.now(), 10) - this.U);
    5E3 > this.m ? this.m = 5E3 : 3E4 < this.m && (this.m = 3E4);
    this.j = 1;
    c = $Sx(c, 0);
    if (!(null == c || 0 >= c.length))
     for (n in c)
      if (p = c[n], b = p.val, p = parseInt(p.type, 10), $SI != p) switch (p) {
       case 5:
        this.L = 1E3 * b;
        break;
       case 11:
        this.O = b;
        break;
       case 13:
        this.H = b
      }
    $SP(this);
    $Sl(this, 1, this.O)
   }
  } else 2 == p && (n = {
   status: 1
  }, n.id = this.g.S, n.gid = this.g.R, 0 == n.gid && (n.peer = this.g.P), $SK(this, n), this.g = null);
  this.C = 0;
  0 < this.I.length && $SJ(this)
 }
 this.i &&
  $SP(this)
};
$S.send = function(b) {
 this.j && 0 < this.i && ($St(b, this.i), this.i = 0);
 if (0 != b.mode) b = null;
 else {
  var c = 0;
  b.buffer[c++] = b.op;
  b.buffer[c++] = b.result;
  var e = b.h - 8;
  b.buffer[c++] = e & 255;
  b.buffer[c++] = e >> 8 & 255;
  $St(b, b.id);
  b = b.buffer.slice(0, b.h)
 }
 this.C = 1;
 this.f.send(b);
 this.j && $SP(this);
 $SQ(this)
};

function $SQ(b) {
 $SN(b);
 b.w = setTimeout(function() {
  b.f.disconnect()
 }, b.m)
}

function $SN(b) {
 -1 != b.w && clearInterval(b.w);
 b.w = -1
}
window.performance = window.performance || {};
performance.now = performance.now || performance.b || performance.g || performance.i || performance.webkitNow || Date.now;
window.Mesibo = Mesibo;
Mesibo.prototype.start = Mesibo.prototype.start;
Mesibo.prototype.stop = Mesibo.prototype.stop;
Mesibo.prototype.setListener = Mesibo.prototype.Y;
Mesibo.prototype.setAppName = Mesibo.prototype.W;
Mesibo.prototype.setCredentials = Mesibo.prototype.X;
Mesibo.prototype.sendMessage = Mesibo.prototype.V;
Mesibo.prototype.sendReadReceipt = Mesibo.prototype.Z;
Mesibo.prototype.random = Mesibo.prototype.random;

function $SL(b, c, e) {
 b = b.substring(c, c + e);
 return parseInt(b, 16)
}

function $SO(b, c, e, d, f, g) {
 var h = new Uint8Array(4 + d.byteLength + f.byteLength + g.length);
 $Sn(c, h);
 $So(f, f.byteLength, h, 4);
 $So(d, d.byteLength, h, 4 + f.byteLength);
 $Sp(g, g.length, h, 4 + d.byteLength + f.byteLength);
 crypto.subtle.digest("SHA-256", h).then(function(c) {
  c = new Uint8Array(c);
  var d = new $Ss(0);
  d.op = 1;
  d.result = 1;
  d.id = e;
  $SG(d, 11, c, c.byteLength);
  b.send(d)
 })
}

function $SP(b) {
 0 != b.j && (b.i && $SR(b), $SM(b), b.u = setTimeout(function() {
  $SR(b)
 }, b.L))
}

function $SM(b) {
 -1 != b.u && clearInterval(b.u);
 b.u = -1
}

function $SR(b) {
 if (0 != b.j) {
  var c = new $Ss(0),
   e = b.i;
  c.op = 16;
  c.result = 0;
  c.id = e;
  b.i = 0;
  b.send(c)
 }
};