FView.ready ->
  @Easing = famous.transitions.Easing
  @Transform = famous.core.Transform

Router.configure layoutTemplate: 'layout'

Router.route '/',
  template: 'home'
  yieldTemplates: homePageIndicator: to: 'pageHelper'

Session.setDefault 'menuOpen', false

Template.layout.helpers
  menuTranslate: ->
    if Session.get 'menuOpen' then [0, 50, 20] else [-window.outerWidth, 50, 20]

Blaze.registerHelper 'menuOpen', ->
  Session.get 'menuOpen'

Template.menu.rendered = ->
  (FView.from @).modifierTransition = curve: 'easeOut', duration: 500

Template.headerIcon.rendered = ->
  (FView.from @).modifierTransition = curve: 'easeOut', duration: 500

Template.header.helpers
  headerIconRotate: ->
    if Session.get 'menuOpen' then 179 else 0

Template.headerIcon.famousEvents
  click: ->
    Session.set 'menuOpen', not (Session.get 'menuOpen')

Template.homePageIndicator.helpers
  isActive: (index) ->
    scrollview = FView.byId 'homeScroll'
    currentIndex = scrollview.properties.get 'index'
    return '' unless currentIndex is Number index

    # this is the wrong place and wrong way to do this, but it works great :>
    modifier = (FView.from Blaze.getView()).children[index].modifier
    currentX = modifier.getTransform()[12]
    modifier.halt()
    modifier.setTransform (Transform.translate currentX, -20),
      duration: 300, curve: Easing.outQuart
    modifier.setTransform (Transform.translate currentX, 0),
      duration: 500, curve: Easing.outBounce
    # Return active
    'active'
