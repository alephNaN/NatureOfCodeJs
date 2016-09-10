#!/bin/bash
function write_js
{
cat <<- _EOF_
function setup() {
  createCanvas(640, 360);
  background(255);
}

function draw() {
  background(255);

}
_EOF_
}

function write_html
{
cat <<- _EOF_
<html>
  <head>
    <meta charset="UTF-8">
    <script language="javascript" type="text/javascript" src="../libraries/p5.min.js"></script>
    <!-- uncomment lines below to include extra p5 libraries -->
    <!--<script language="javascript" src="libraries/p5.dom.js"></script>-->
    <!--<script language="javascript" src="libraries/p5.sound.js"></script>-->
    <script language="javascript" type="text/javascript" src="$jsfile"></script>
    <!-- this line removes any default padding and style. you might only need one of these values set. -->
    <style> body {padding: 0; margin: 0;} </style>
  </head>
  <body>
  </body>
</html>
_EOF_
}


if [ "$1" != "" ]; then
  jsfile="$1.js"
  htmlfile="$1.html"

  write_js > $jsfile
  write_html > $htmlfile
  exit 0
else
  echo "You did not pass in filename"
  exit 1
fi
