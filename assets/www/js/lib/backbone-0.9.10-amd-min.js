// Backbone.js 0.9.10 (modified to add AMD registration)

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function (m, g) {
  typeof exports !== "undefined" ? g(m, exports, require("underscore")) : typeof define === "function" && define.amd ? define(["underscore", "jquery", "exports"], function (f, h, s) {
    m.Backbone = g(m, s, f, h)
  }) : m.Backbone = g(m, {}, m._, m.jQuery || m.Zepto || m.ender)
})(this, function (m, g, f, h) {
  var s = m.Backbone, o = [], z = o.push, t = o.slice, A = o.splice;
  g.VERSION = "0.9.10";
  g.$ = h;
  g.noConflict = function () {
    m.Backbone = s;
    return this
  };
  g.emulateHTTP = false;
  g.emulateJSON = false;
  var u = /\s+/, p = function (a, b, c, d) {
    if (!c)return true;
    if (typeof c ===
        "object")for (var e in c)a[b].apply(a, [e, c[e]].concat(d)); else if (u.test(c)) {
      c = c.split(u);
      e = 0;
      for (var f = c.length; e < f; e++)a[b].apply(a, [c[e]].concat(d))
    } else return true
  }, v = function (a, b) {
    var c, d = -1, e = a.length;
    switch (b.length) {
      case 0:
        for (; ++d < e;)(c = a[d]).callback.call(c.ctx);
        break;
      case 1:
        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, b[0]);
        break;
      case 2:
        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, b[0], b[1]);
        break;
      case 3:
        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, b[0], b[1], b[2]);
        break;
      default:
        for (; ++d < e;)(c = a[d]).callback.apply(c.ctx,
            b)
    }
  }, h = g.Events = {on:function (a, b, c) {
    if (!p(this, "on", a, [b, c]) || !b)return this;
    this._events || (this._events = {});
    (this._events[a] || (this._events[a] = [])).push({callback:b, context:c, ctx:c || this});
    return this
  }, once:function (a, b, c) {
    if (!p(this, "once", a, [b, c]) || !b)return this;
    var d = this, e = f.once(function () {
      d.off(a, e);
      b.apply(this, arguments)
    });
    e._callback = b;
    this.on(a, e, c);
    return this
  }, off:function (a, b, c) {
    var d, e, g, j, k, l, i, h;
    if (!this._events || !p(this, "off", a, [b, c]))return this;
    if (!a && !b && !c)return this._events =
    {}, this;
    j = a ? [a] : f.keys(this._events);
    for (k = 0, l = j.length; k < l; k++)if (a = j[k], d = this._events[a]) {
      g = [];
      if (b || c)for (i = 0, h = d.length; i < h; i++)e = d[i], (b && b !== e.callback && b !== e.callback._callback || c && c !== e.context) && g.push(e);
      this._events[a] = g
    }
    return this
  }, trigger:function (a) {
    if (!this._events)return this;
    var b = t.call(arguments, 1);
    if (!p(this, "trigger", a, b))return this;
    var c = this._events[a], d = this._events.all;
    c && v(c, b);
    d && v(d, arguments);
    return this
  }, listenTo:function (a, b, c) {
    var d = this._listeners || (this._listeners =
    {}), e = a._listenerId || (a._listenerId = f.uniqueId("l"));
    d[e] = a;
    a.on(b, typeof b === "object" ? this : c, this);
    return this
  }, stopListening:function (a, b, c) {
    var d = this._listeners;
    if (d) {
      if (a)a.off(b, typeof b === "object" ? this : c, this), !b && !c && delete d[a._listenerId]; else {
        typeof b === "object" && (c = this);
        for (var e in d)d[e].off(b, c, this);
        this._listeners = {}
      }
      return this
    }
  }};
  h.bind = h.on;
  h.unbind = h.off;
  f.extend(g, h);
  var q = g.Model = function (a, b) {
    var c, d = a || {};
    this.cid = f.uniqueId("c");
    this.attributes = {};
    if (b && b.collection)this.collection =
        b.collection;
    b && b.parse && (d = this.parse(d, b) || {});
    if (c = f.result(this, "defaults"))d = f.defaults({}, d, c);
    this.set(d, b);
    this.changed = {};
    this.initialize.apply(this, arguments)
  };
  f.extend(q.prototype, h, {changed:null, idAttribute:"id", initialize:function () {
  }, toJSON:function () {
    return f.clone(this.attributes)
  }, sync:function () {
    return g.sync.apply(this, arguments)
  }, get:function (a) {
    return this.attributes[a]
  }, escape:function (a) {
    return f.escape(this.get(a))
  }, has:function (a) {
    return this.get(a) != null
  }, set:function (a, b, c) {
    var d, e, g, j, k, l, i;
    if (a == null)return this;
    typeof a === "object" ? (e = a, c = b) : (e = {})[a] = b;
    c || (c = {});
    if (!this._validate(e, c))return false;
    g = c.unset;
    j = c.silent;
    a = [];
    k = this._changing;
    this._changing = true;
    if (!k)this._previousAttributes = f.clone(this.attributes), this.changed = {};
    i = this.attributes;
    l = this._previousAttributes;
    if (this.idAttribute in e)this.id = e[this.idAttribute];
    for (d in e)b = e[d], f.isEqual(i[d], b) || a.push(d), f.isEqual(l[d], b) ? delete this.changed[d] : this.changed[d] = b, g ? delete i[d] : i[d] = b;
    if (!j) {
      if (a.length)this._pending =
          true;
      b = 0;
      for (d = a.length; b < d; b++)this.trigger("change:" + a[b], this, i[a[b]], c)
    }
    if (k)return this;
    if (!j)for (; this._pending;)this._pending = false, this.trigger("change", this, c);
    this._changing = this._pending = false;
    return this
  }, unset:function (a, b) {
    return this.set(a, void 0, f.extend({}, b, {unset:true}))
  }, clear:function (a) {
    var b = {}, c;
    for (c in this.attributes)b[c] = void 0;
    return this.set(b, f.extend({}, a, {unset:true}))
  }, hasChanged:function (a) {
    return a == null ? !f.isEmpty(this.changed) : f.has(this.changed, a)
  }, changedAttributes:function (a) {
    if (!a)return this.hasChanged() ?
        f.clone(this.changed) : false;
    var b, c = false, d = this._changing ? this._previousAttributes : this.attributes, e;
    for (e in a)if (!f.isEqual(d[e], b = a[e]))(c || (c = {}))[e] = b;
    return c
  }, previous:function (a) {
    return a == null || !this._previousAttributes ? null : this._previousAttributes[a]
  }, previousAttributes:function () {
    return f.clone(this._previousAttributes)
  }, fetch:function (a) {
    a = a ? f.clone(a) : {};
    if (a.parse === void 0)a.parse = true;
    var b = a.success;
    a.success = function (a, d, e) {
      if (!a.set(a.parse(d, e), e))return false;
      b && b(a, d, e)
    };
    return this.sync("read",
        this, a)
  }, save:function (a, b, c) {
    var d, e, g = this.attributes;
    a == null || typeof a === "object" ? (d = a, c = b) : (d = {})[a] = b;
    if (d && (!c || !c.wait) && !this.set(d, c))return false;
    c = f.extend({validate:true}, c);
    if (!this._validate(d, c))return false;
    if (d && c.wait)this.attributes = f.extend({}, g, d);
    if (c.parse === void 0)c.parse = true;
    e = c.success;
    c.success = function (a, b, c) {
      a.attributes = g;
      var i = a.parse(b, c);
      c.wait && (i = f.extend(d || {}, i));
      if (f.isObject(i) && !a.set(i, c))return false;
      e && e(a, b, c)
    };
    a = this.isNew() ? "create" : c.patch ? "patch" : "update";
    if (a === "patch")c.attrs = d;
    a = this.sync(a, this, c);
    if (d && c.wait)this.attributes = g;
    return a
  }, destroy:function (a) {
    var a = a ? f.clone(a) : {}, b = this, c = a.success, d = function () {
      b.trigger("destroy", b, b.collection, a)
    };
    a.success = function (a, b, e) {
      (e.wait || a.isNew()) && d();
      c && c(a, b, e)
    };
    if (this.isNew())return a.success(this, null, a), false;
    var e = this.sync("delete", this, a);
    a.wait || d();
    return e
  }, url:function () {
    var a = f.result(this, "urlRoot") || f.result(this.collection, "url") || w();
    return this.isNew() ? a : a + (a.charAt(a.length - 1) ===
        "/" ? "" : "/") + encodeURIComponent(this.id)
  }, parse:function (a) {
    return a
  }, clone:function () {
    return new this.constructor(this.attributes)
  }, isNew:function () {
    return this.id == null
  }, isValid:function (a) {
    return!this.validate || !this.validate(this.attributes, a)
  }, _validate:function (a, b) {
    if (!b.validate || !this.validate)return true;
    var a = f.extend({}, this.attributes, a), c = this.validationError = this.validate(a, b) || null;
    if (!c)return true;
    this.trigger("invalid", this, c, b || {});
    return false
  }});
  var r = g.Collection = function (a, b) {
    b || (b = {});
    if (b.model)this.model = b.model;
    if (b.comparator !== void 0)this.comparator = b.comparator;
    this.models = [];
    this._reset();
    this.initialize.apply(this, arguments);
    a && this.reset(a, f.extend({silent:true}, b))
  };
  f.extend(r.prototype, h, {model:q, initialize:function () {
  }, toJSON:function (a) {
    return this.map(function (b) {
      return b.toJSON(a)
    })
  }, sync:function () {
    return g.sync.apply(this, arguments)
  }, add:function (a, b) {
    a = f.isArray(a) ? a.slice() : [a];
    b || (b = {});
    var c, d, e, g, j, k, l, i, h, m;
    l = [];
    i = b.at;
    h = this.comparator && i ==
        null && b.sort != false;
    m = f.isString(this.comparator) ? this.comparator : null;
    for (c = 0, d = a.length; c < d; c++)(e = this._prepareModel(g = a[c], b)) ? (j = this.get(e)) ? b.merge && (j.set(g === e ? e.attributes : g, b), h && !k && j.hasChanged(m) && (k = true)) : (l.push(e), e.on("all", this._onModelEvent, this), this._byId[e.cid] = e, e.id != null && (this._byId[e.id] = e)) : this.trigger("invalid", this, g, b);
    l.length && (h && (k = true), this.length += l.length, i != null ? A.apply(this.models, [i, 0].concat(l)) : z.apply(this.models, l));
    k && this.sort({silent:true});
    if (b.silent)return this;
    for (c = 0, d = l.length; c < d; c++)(e = l[c]).trigger("add", e, this, b);
    k && this.trigger("sort", this, b);
    return this
  }, remove:function (a, b) {
    a = f.isArray(a) ? a.slice() : [a];
    b || (b = {});
    var c, d, e, g;
    for (c = 0, d = a.length; c < d; c++)if (g = this.get(a[c])) {
      delete this._byId[g.id];
      delete this._byId[g.cid];
      e = this.indexOf(g);
      this.models.splice(e, 1);
      this.length--;
      if (!b.silent)b.index = e, g.trigger("remove", g, this, b);
      this._removeReference(g)
    }
    return this
  }, push:function (a, b) {
    a = this._prepareModel(a, b);
    this.add(a, f.extend({at:this.length},
        b));
    return a
  }, pop:function (a) {
    var b = this.at(this.length - 1);
    this.remove(b, a);
    return b
  }, unshift:function (a, b) {
    a = this._prepareModel(a, b);
    this.add(a, f.extend({at:0}, b));
    return a
  }, shift:function (a) {
    var b = this.at(0);
    this.remove(b, a);
    return b
  }, slice:function (a, b) {
    return this.models.slice(a, b)
  }, get:function (a) {
    if (a != null)return this._idAttr || (this._idAttr = this.model.prototype.idAttribute), this._byId[a.id || a.cid || a[this._idAttr] || a]
  }, at:function (a) {
    return this.models[a]
  }, where:function (a) {
    return f.isEmpty(a) ?
        [] : this.filter(function (b) {
      for (var c in a)if (a[c] !== b.get(c))return false;
      return true
    })
  }, sort:function (a) {
    if (!this.comparator)throw Error("Cannot sort a set without a comparator");
    a || (a = {});
    f.isString(this.comparator) || this.comparator.length === 1 ? this.models = this.sortBy(this.comparator, this) : this.models.sort(f.bind(this.comparator, this));
    a.silent || this.trigger("sort", this, a);
    return this
  }, pluck:function (a) {
    return f.invoke(this.models, "get", a)
  }, update:function (a, b) {
    b = f.extend({add:true, merge:true, remove:true},
        b);
    b.parse && (a = this.parse(a, b));
    var c, d, e, g, j = [], h = [], l = {};
    f.isArray(a) || (a = a ? [a] : []);
    if (b.add && !b.remove)return this.add(a, b);
    for (d = 0, e = a.length; d < e; d++)c = a[d], g = this.get(c), b.remove && g && (l[g.cid] = true), (b.add && !g || b.merge && g) && j.push(c);
    if (b.remove)for (d = 0, e = this.models.length; d < e; d++)c = this.models[d], l[c.cid] || h.push(c);
    h.length && this.remove(h, b);
    j.length && this.add(j, b);
    return this
  }, reset:function (a, b) {
    b || (b = {});
    b.parse && (a = this.parse(a, b));
    for (var c = 0, d = this.models.length; c < d; c++)this._removeReference(this.models[c]);
    b.previousModels = this.models.slice();
    this._reset();
    a && this.add(a, f.extend({silent:true}, b));
    b.silent || this.trigger("reset", this, b);
    return this
  }, fetch:function (a) {
    a = a ? f.clone(a) : {};
    if (a.parse === void 0)a.parse = true;
    var b = a.success;
    a.success = function (a, d, e) {
      a[e.update ? "update" : "reset"](d, e);
      b && b(a, d, e)
    };
    return this.sync("read", this, a)
  }, create:function (a, b) {
    b = b ? f.clone(b) : {};
    if (!(a = this._prepareModel(a, b)))return false;
    b.wait || this.add(a, b);
    var c = this, d = b.success;
    b.success = function (a, b, f) {
      f.wait && c.add(a,
          f);
      d && d(a, b, f)
    };
    a.save(null, b);
    return a
  }, parse:function (a) {
    return a
  }, clone:function () {
    return new this.constructor(this.models)
  }, _reset:function () {
    this.length = 0;
    this.models.length = 0;
    this._byId = {}
  }, _prepareModel:function (a, b) {
    if (a instanceof q) {
      if (!a.collection)a.collection = this;
      return a
    }
    b || (b = {});
    b.collection = this;
    var c = new this.model(a, b);
    return!c._validate(a, b) ? false : c
  }, _removeReference:function (a) {
    this === a.collection && delete a.collection;
    a.off("all", this._onModelEvent, this)
  }, _onModelEvent:function (a, b, c, d) {
    (a === "add" || a === "remove") && c !== this || (a === "destroy" && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], b.id != null && (this._byId[b.id] = b)), this.trigger.apply(this, arguments))
  }, sortedIndex:function (a, b, c) {
    b || (b = this.comparator);
    var d = f.isFunction(b) ? b : function (a) {
      return a.get(b)
    };
    return f.sortedIndex(this.models, a, d, c)
  }});
  f.each("forEach,each,map,collect,reduce,foldl,inject,reduceRight,foldr,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,toArray,size,first,head,take,initial,rest,tail,drop,last,without,indexOf,shuffle,lastIndexOf,isEmpty,chain".split(","),
      function (a) {
        r.prototype[a] = function () {
          var b = t.call(arguments);
          b.unshift(this.models);
          return f[a].apply(f, b)
        }
      });
  f.each(["groupBy", "countBy", "sortBy"], function (a) {
    r.prototype[a] = function (b, c) {
      var d = f.isFunction(b) ? b : function (a) {
        return a.get(b)
      };
      return f[a](this.models, d, c)
    }
  });
  var o = g.Router = function (a) {
    a || (a = {});
    if (a.routes)this.routes = a.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments)
  }, B = /\((.*?)\)/g, C = /(\(\?)?:\w+/g, D = /\*\w+/g, E = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  f.extend(o.prototype, h, {initialize:function () {
  },
    route:function (a, b, c) {
      f.isRegExp(a) || (a = this._routeToRegExp(a));
      c || (c = this[b]);
      g.history.route(a, f.bind(function (d) {
        d = this._extractParameters(a, d);
        c && c.apply(this, d);
        this.trigger.apply(this, ["route:" + b].concat(d));
        this.trigger("route", b, d);
        g.history.trigger("route", this, b, d)
      }, this));
      return this
    }, navigate:function (a, b) {
      g.history.navigate(a, b);
      return this
    }, _bindRoutes:function () {
      if (this.routes)for (var a, b = f.keys(this.routes); (a = b.pop()) != null;)this.route(a, this.routes[a])
    }, _routeToRegExp:function (a) {
      a =
          a.replace(E, "\\$&").replace(B, "(?:$1)?").replace(C,function (a, c) {
            return c ? a : "([^/]+)"
          }).replace(D, "(.*?)");
      return RegExp("^" + a + "$")
    }, _extractParameters:function (a, b) {
      return a.exec(b).slice(1)
    }});
  var n = g.History = function () {
    this.handlers = [];
    f.bindAll(this, "checkUrl");
    if (typeof window !== "undefined")this.location = window.location, this.history = window.history
  }, x = /^[#\/]|\s+$/g, F = /^\/+|\/+$/g, G = /msie [\w.]+/, H = /\/$/;
  n.started = false;
  f.extend(n.prototype, h, {interval:50, getHash:function (a) {
    return(a = (a || this).location.href.match(/#(.*)$/)) ?
        a[1] : ""
  }, getFragment:function (a, b) {
    if (a == null)if (this._hasPushState || !this._wantsHashChange || b) {
      var a = this.location.pathname, c = this.root.replace(H, "");
      a.indexOf(c) || (a = a.substr(c.length))
    } else a = this.getHash();
    return a.replace(x, "")
  }, start:function (a) {
    if (n.started)throw Error("Backbone.history has already been started");
    n.started = true;
    this.options = f.extend({}, {root:"/"}, this.options, a);
    this.root = this.options.root;
    this._wantsHashChange = this.options.hashChange !== false;
    this._wantsPushState = !!this.options.pushState;
    this._hasPushState = !(!this.options.pushState || !this.history || !this.history.pushState);
    var a = this.getFragment(), b = document.documentMode, b = G.exec(navigator.userAgent.toLowerCase()) && (!b || b <= 7);
    this.root = ("/" + this.root + "/").replace(F, "/");
    if (b && this._wantsHashChange)this.iframe = g.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(a);
    if (this._hasPushState)g.$(window).on("popstate", this.checkUrl); else if (this._wantsHashChange && "onhashchange"in window &&
        !b)g.$(window).on("hashchange", this.checkUrl); else if (this._wantsHashChange)this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
    this.fragment = a;
    a = this.location;
    b = a.pathname.replace(/[^\/]$/, "$&/") === this.root;
    if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b)return this.fragment = this.getFragment(null, true), this.location.replace(this.root + this.location.search + "#" + this.fragment), true; else if (this._wantsPushState && this._hasPushState && b && a.hash)this.fragment = this.getHash().replace(x,
        ""), this.history.replaceState({}, document.title, this.root + this.fragment + a.search);
    if (!this.options.silent)return this.loadUrl()
  }, stop:function () {
    g.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
    clearInterval(this._checkUrlInterval);
    n.started = false
  }, route:function (a, b) {
    this.handlers.unshift({route:a, callback:b})
  }, checkUrl:function () {
    var a = this.getFragment();
    a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
    if (a === this.fragment)return false;
    this.iframe &&
    this.navigate(a);
    this.loadUrl() || this.loadUrl(this.getHash())
  }, loadUrl:function (a) {
    var b = this.fragment = this.getFragment(a);
    return f.any(this.handlers, function (a) {
      if (a.route.test(b))return a.callback(b), true
    })
  }, navigate:function (a, b) {
    if (!n.started)return false;
    if (!b || b === true)b = {trigger:b};
    a = this.getFragment(a || "");
    if (this.fragment !== a) {
      this.fragment = a;
      var c = this.root + a;
      if (this._hasPushState)this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c); else if (this._wantsHashChange)this._updateHash(this.location,
          a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, a, b.replace)); else return this.location.assign(c);
      b.trigger && this.loadUrl(a)
    }
  }, _updateHash:function (a, b, c) {
    c ? (c = a.href.replace(/(javascript:|#).*$/, ""), a.replace(c + "#" + b)) : a.hash = "#" + b
  }});
  g.history = new n;
  var y = g.View = function (a) {
    this.cid = f.uniqueId("view");
    this._configure(a || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents()
  }, I = /^(\S+)\s*(.*)$/, J = "model,collection,el,id,attributes,className,tagName,events".split(",");
  f.extend(y.prototype, h, {tagName:"div", $:function (a) {
    return this.$el.find(a)
  }, initialize:function () {
  }, render:function () {
    return this
  }, remove:function () {
    this.$el.remove();
    this.stopListening();
    return this
  }, setElement:function (a, b) {
    this.$el && this.undelegateEvents();
    this.$el = a instanceof g.$ ? a : g.$(a);
    this.el = this.$el[0];
    b !== false && this.delegateEvents();
    return this
  }, delegateEvents:function (a) {
    if (a ||
        (a = f.result(this, "events"))) {
      this.undelegateEvents();
      for (var b in a) {
        var c = a[b];
        f.isFunction(c) || (c = this[a[b]]);
        if (!c)throw Error('Method "' + a[b] + '" does not exist');
        var d = b.match(I), e = d[1], d = d[2], c = f.bind(c, this);
        e += ".delegateEvents" + this.cid;
        if (d === "")this.$el.on(e, c); else this.$el.on(e, d, c)
      }
    }
  }, undelegateEvents:function () {
    this.$el.off(".delegateEvents" + this.cid)
  }, _configure:function (a) {
    this.options && (a = f.extend({}, f.result(this, "options"), a));
    f.extend(this, f.pick(a, J));
    this.options = a
  }, _ensureElement:function () {
    if (this.el)this.setElement(f.result(this,
        "el"), false); else {
      var a = f.extend({}, f.result(this, "attributes"));
      if (this.id)a.id = f.result(this, "id");
      this.className && (a["class"] = f.result(this, "className"));
      this.setElement(g.$("<" + f.result(this, "tagName") + ">").attr(a), false)
    }
  }});
  var K = {create:"POST", update:"PUT", patch:"PATCH", "delete":"DELETE", read:"GET"};
  g.sync = function (a, b, c) {
    var d = K[a];
    f.defaults(c || (c = {}), {emulateHTTP:g.emulateHTTP, emulateJSON:g.emulateJSON});
    var e = {type:d, dataType:"json"};
    if (!c.url)e.url = f.result(b, "url") || w();
    if (c.data == null &&
        b && (a === "create" || a === "update" || a === "patch"))e.contentType = "application/json", e.data = JSON.stringify(c.attrs || b.toJSON(c));
    if (c.emulateJSON)e.contentType = "application/x-www-form-urlencoded", e.data = e.data ? {model:e.data} : {};
    if (c.emulateHTTP && (d === "PUT" || d === "DELETE" || d === "PATCH")) {
      e.type = "POST";
      if (c.emulateJSON)e.data._method = d;
      var h = c.beforeSend;
      c.beforeSend = function (a) {
        a.setRequestHeader("X-HTTP-Method-Override", d);
        if (h)return h.apply(this, arguments)
      }
    }
    if (e.type !== "GET" && !c.emulateJSON)e.processData =
        false;
    var j = c.success;
    c.success = function (a) {
      j && j(b, a, c);
      b.trigger("sync", b, a, c)
    };
    var k = c.error;
    c.error = function (a) {
      k && k(b, a, c);
      b.trigger("error", b, a, c)
    };
    a = c.xhr = g.ajax(f.extend(e, c));
    b.trigger("request", b, a, c);
    return a
  };
  g.ajax = function () {
    return g.$.ajax.apply(g.$, arguments)
  };
  q.extend = r.extend = o.extend = y.extend = n.extend = function (a, b) {
    var c = this, d;
    d = a && f.has(a, "constructor") ? a.constructor : function () {
      return c.apply(this, arguments)
    };
    f.extend(d, c, b);
    var e = function () {
      this.constructor = d
    };
    e.prototype = c.prototype;
    d.prototype = new e;
    a && f.extend(d.prototype, a);
    d.__super__ = c.prototype;
    return d
  };
  var w = function () {
    throw Error('A "url" property or function must be specified');
  };
  return g
});
