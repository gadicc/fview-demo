maincss =  new CSSC

maincss
  .add '#header',
    lineHeight: CSSC.px 50
    background: CSSC.black
    color: CSSC.white
    fontSize: CSSC.pc 150
    paddingLeft: CSSC.px 60

  .add '#headerIcon',
    color: CSSC.white
    fontSize: CSSC.pc 150

  .add '.red-bg', background: CSSC.red
  .add '.yellow-bg', background: CSSC.yellow
  .add '.green-bg', background: CSSC.green
  .add '.blue-bg', background: CSSC.blue

  .add '.padding',
    paddingLeft: CSSC.px 20
    paddingRight: CSSC.px 20

  .add '.opac',
    opacity: 0.5

  .add '.active',
    color: CSSC.red
