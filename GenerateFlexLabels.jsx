// create new document/file
if (!app.homeScreenVisible) {
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

// main code
var docPreset = new DocumentPreset();
docPreset.width = 600;
docPreset.height = 500;
docPreset.units = RulerUnits.Millimeters;
docPreset.artboardLayout = DocumentArtboardLayout.GridByCol;
docPreset.numArtboards = 1;
var myDocument = app.documents.addDocument(DocumentColorSpace.CMYK, docPreset);
myDocument.layers[0].name = "Background Layer";
var layerTwo = myDocument.layers.add();
layerTwo.name = "Label Layer";
var layerThree = myDocument.layers.add();
layerThree.name = "Text Layer";

// parameters
var qty = 100;

// loop to create labels
for (var i = 0; i < qty; i++){
  // create rectangle
  generateLabel(i);

  // create text
  generateText(i);

  // import QR from file
  importQR(i);
}

function generateText(i) {
  var doc = app.activeDocument;
  var textFrame = doc.textFrames.add();
  textFrame.name = "Test Text Frame";
  // .contents to change text
  // first build the serial number, need to have right number of digits
  var realSerial = i + 1;
  var serialVal = ("00000" + realSerial).slice(-5); 
  textFrame.contents = "SATFF02"+serialVal;
  var textRange = textFrame.textRange;
  textRange.size = 5.8;
  textRange.justification = Justification.CENTER;
  textFrame.position = [103, 92-i*30];
}

function generateLabel(i) {
  var doc = app.activeDocument;
  var rect = doc.pathItems.roundedRectangle(
    100-(i*30),
    100,
    20.8 / 0.3527,
    7.8 / 0.3527,
    1,
    1
  );
  rect.strokeColor = makeColor(75, 0, 100, 0);
  rect.strokeWidth = 0.5;
}

function importQR(i) {
  var doc = app.activeDocument;
//   var newLayer = doc.layers.add();
//   newLayer.name = "QR Layer";
  var imagePlacedItem = doc.placedItems.add();
  imagePlacedItem.file = File(
    "~/Documents/Programming/Illustrator/ai-basic-script/QR/("+(i+1)+").eps"
  );
  imagePlacedItem.resize(22.5, 22.5);
  imagePlacedItem.position = [137, 99.5-i*30];
}

function makeColor(c, m, y, k) {
  var color = new CMYKColor();
  color.cyan = c;
  color.magenta = m;
  color.yellow = y;
  color.black = k;
  return color;
}
