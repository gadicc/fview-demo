Easing = null, Transform = null;
FView.ready(function() {
  Easing = famous.transitions.Easing;
  Transform = famous.core.Transform;
});

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template: 'home',
  yieldTemplates: {
    'homePageIndicator': { to: 'pageHelper' }
  }
});

Session.setDefault('menuOpen', false);

Template.layout.helpers({
  menuTranslate: function() {
    return Session.get('menuOpen') ? [0, 50, 20] : [-window.outerWidth, 50, 20];
  }
});

Blaze.registerHelper('menuOpen', function() {
  return Session.get('menuOpen');
});

Template.menu.rendered = function() {
  FView.from(this).modifierTransition
    = { curve: 'easeOut', duration: 500 };
}

Template.headerIcon.rendered = function() {
  FView.from(this).modifierTransition
    = { curve: 'easeOut', duration: 500 };  
}

Template.header.helpers({
  headerIconRotate: function() {
    return Session.get('menuOpen') ? 179 : 0;
  }
});
Template.headerIcon.famousEvents({
  'click': function() {
    Session.set('menuOpen', !Session.get('menuOpen'));
  }
});

Template.homePageIndicator.helpers({
  isActive: function(index) {
    var scrollview = FView.byId('homeScroll');
    var currentIndex = scrollview.properties.get('index');

    // this is the wrong place and wrong way to do this, but it works great :>
    if (currentIndex == index) {
      var modifier = FView.from(Blaze.getView()).children[index].modifier;
      var currentX = modifier.getTransform()[12];
      modifier.halt();
      modifier.setTransform(Transform.translate(currentX, -20),
        { duration: 300, curve: Easing.outQuart });
      modifier.setTransform(Transform.translate(currentX, 0),
        { duration: 500, curve: Easing.outBounce });
    }

    return currentIndex == index ? 'active' : '';
  }
});
